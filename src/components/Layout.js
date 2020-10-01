import React from 'react'
import { Layout } from '@1hive/1hive-ui'
import { BREAKPOINTS } from '../styles/breakpoints'

function CustomLayout({ children }) {
  return (
    <Layout
      breakpoints={BREAKPOINTS}
      paddingBottom={0}
      css={`
        min-width: auto;
      `}
    >
      {children}
    </Layout>
  )
}

export default CustomLayout
