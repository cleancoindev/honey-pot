import React from 'react'
import { GU, Root, useViewport } from '@1hive/1hive-ui'

import Footer from './Footer'
import Header from './Header/Header'
import Layout from './Layout'
import { ScrollProvider } from '../providers/ScrollProvider'

function MainView({ children }) {
  const { below } = useViewport()
  const compactMode = below('medium')

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        height: 100vh;
      `}
    >
      <div
        css={`
          flex-shrink: 0;
        `}
      >
        <Header compact={compactMode} />
      </div>
      <Root.Provider
        css={`
          flex-grow: 1;
          height: 100%;
          position: relative;
        `}
      >
        <ScrollProvider>
          <div
            css={`
              display: flex;
              flex-direction: column;
              height: 100%;
            `}
          >
            <div
              css={`
                flex: 1 0 auto;
              `}
            >
              <Layout paddingBottom={3 * GU}>{children}</Layout>
            </div>
            <Footer compact={compactMode} />
          </div>
        </ScrollProvider>
      </Root.Provider>
    </div>
  )
}

export default MainView
