import React from 'react'
import { Button, IconPlus } from '@1hive/1hive-ui'
import { useWallet } from '../../providers/Wallet'

function HeroBanner({ onRequestNewProposal }) {
  const { account } = useWallet()

  return (
    <div
      css={`
        flex-basis: 25%;
        text-align: right;
        outline: 1px solid red;
      `}
    >
      Hero Banner
      {account && (
        <Button
          mode="strong"
          onClick={onRequestNewProposal}
          label="New proposal"
          icon={<IconPlus />}
        />
      )}
    </div>
  )
}

export default HeroBanner
