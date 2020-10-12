import React from 'react'
import { Box, GU, Link, textStyle, useTheme } from '@1hive/1hive-ui'

import ProposalIcon from '../ProposalIcon'
import { useAppState } from '../../providers/AppState'
import { useSupporterSubscription } from '../../hooks/useSubscriptions'

import { convertToString } from '../../types'

function Activity({ account }) {
  const theme = useTheme()

  const { honeypot } = useAppState()
  const supporter = useSupporterSubscription(honeypot, account)

  return (
    <Box>
      <div>
        <h3
          css={`
            margin-bottom: ${2 * GU}px;
            ${textStyle('title3')};
          `}
        >
          Recent activity
        </h3>
        <div>
          {supporter?.stakesHistory.length ? (
            supporter.stakesHistory.map((stake, index) => (
              <div
                key={index}
                css={`
                  padding-top: ${3 * GU}px;
                  display: flex;
                  align-items: center;

                  & :not(:last-child) {
                    padding-bottom: ${3 * GU}px;
                    border-bottom: ${0.5}px solid ${theme.border};
                  }
                `}
              >
                You supported <ProposalIcon type={stake.proposal.type} />{' '}
                {convertToString(stake.proposal.type)}{' '}
                <Link
                  href={`/#/proposal/${stake.proposal.id}`}
                  external={false}
                  css={`
                    margin-left: ${1 * GU}px;
                    text-decoration: none;
                  `}
                >
                  {stake.proposal.name}
                </Link>
              </div>
            ))
          ) : (
            <span>No recent activity</span>
          )}
        </div>
      </div>
    </Box>
  )
}

export default Activity
