import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import ScrollView from '../components/ScrollView'

const ScrollContext = React.createContext()

function ScrollProvider({ children }) {
  const ref = useRef(null)
  const [target, setTarget] = useState(null)

  const handleNewTarget = useCallback((node, action) => {
    setTarget({ node, action })
  }, [])

  const handleRemoveTarget = useCallback(() => {
    setTarget(null)
  }, [])

  const scrollTo = useCallback(target => {
    ref.current.scrollTo(0, target)
  }, [])

  useEffect(() => {
    if (!target) {
      return
    }

    const scrollView = ref.current
    scrollView.addEventListener('scroll', function() {
      if (
        scrollView.innerHeight + scrollView.scrollY >=
        target.node.offsetHeight
      ) {
        target.action()
      }
    })

    return () => {
      scrollView.removeEventListener('scroll')
    }
  }, [target])

  return (
    <ScrollContext.Provider
      value={{
        removeTarget: handleRemoveTarget,
        setNewTarget: handleNewTarget,
        scrollTo,
      }}
    >
      <ScrollView ref={ref}>{children}</ScrollView>
    </ScrollContext.Provider>
  )
}

ScrollProvider.propTypes = {
  children: PropTypes.node,
}

function useScroll() {
  return useContext(ScrollContext)
}

export { ScrollProvider, useScroll }
