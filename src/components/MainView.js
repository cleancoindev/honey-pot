import React from 'react'
import { GU, ScrollView, useViewport } from '@1hive/1hive-ui'

import Footer from './Footer'
import Header from './Header/Header'
import Layout from './Layout'

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
      <ScrollView>
        <div
          css={`
            flex-grow: 1;
          `}
        >
          <Layout paddingBottom={3 * GU}>{children}</Layout>
        </div>
        <Footer compact={compactMode} />
      </ScrollView>
    </div>
  )
}

export default MainView
