import React, { useMemo } from 'react'
import { GU, textStyle, useTheme } from '@1hive/1hive-ui'

import { useWallet } from '../../providers/Wallet'

import { isEntitySupporting } from '../../lib/conviction'
import thumbsUpSvg from '../../assets/thumbs-up.svg'
import thumbsDownSvg from '../../assets/thumbs-down.svg'
import { ProposalTypes } from '../../types'

function ProposalFooter({ proposal }) {
  const theme = useTheme()

  const { account } = useWallet()
  const isSupporting = isEntitySupporting(proposal, account)

  const supportersCount = useMemo(
    () => proposal.stakes.filter(({ amount }) => amount.gt(0)).length,
    [proposal]
  )

  return (
    <div>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;

          color: ${theme.contentSecondary};
          ${textStyle('body3')};
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          {account && !isSupporting && (
            <div
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <img
                src={thumbsUpSvg}
                alt=""
                height="28"
                width="28"
                css={`
                  margin-right: ${1 * GU}px;
                  cursor: pointer;
                `}
              />
              {proposal.type === ProposalTypes.Decision && (
                <img
                  src={thumbsDownSvg}
                  alt=""
                  height="28"
                  width="28"
                  css={`
                    margin-right: ${1.5 * GU}px;
                    cursor: pointer;
                  `}
                />
              )}
            </div>
          )}
          <div>{supportersCount} Supporters</div>
        </div>
        <div>Status : {proposal.status}</div>
      </div>
    </div>
  )
}

export default ProposalFooter
