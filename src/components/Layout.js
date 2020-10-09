import React from 'react'
import { Layout } from '@1hive/1hive-ui'
import { BREAKPOINTS } from '../styles/breakpoints'

function CustomLayout({ children, paddingBottom = 0 }) {
  return (
    <Layout
      breakpoints={BREAKPOINTS}
      paddingBottom={paddingBottom}
      css={`
        min-width: auto;
      `}
    >
      {children}
    </Layout>
  )
}

export default CustomLayout
