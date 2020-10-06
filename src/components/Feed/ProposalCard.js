import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { GU, textStyle, useTheme } from '@1hive/1hive-ui'

import Balance from '../Balance'
import ProposalFooter from './ProposalFooter'
import ProposalHeader from './ProposalHeader'
import ProposalSupport from './ProposalSupport'

import { useAppState } from '../../providers/AppState'

import { ProposalTypes } from '../../types'
import honeySvg from '../../assets/honey.svg'

function ProposalCard({ proposal }) {
  const theme = useTheme()
  const history = useHistory()
  const { requestToken } = useAppState()

  const handleSelectProposal = useCallback(() => {
    history.push(`${history.location.pathname}/proposal/${proposal.number}`)
  }, [history, proposal.number])

  return (
    <div
      css={`
        border: 1px solid ${theme.border};
        background: ${theme.surface};
        margin-bottom: ${2 * GU}px;
        padding: ${3 * GU}px;
        border-radius: ${2 * GU}px;
      `}
    >
      <ProposalHeader
        proposal={proposal}
        onSelectProposal={handleSelectProposal}
      />
      <div
        css={`
          margin-bottom: ${3 * GU}px;
          ${textStyle('body1')};
        `}
      >
        {proposal.name}
      </div>
      {proposal.type === ProposalTypes.Proposal && (
        <div
          css={`
            margin-bottom: ${2 * GU}px;
            display: flex;
            align-items: center;
            color: ${theme.contentSecondary};
          `}
        >
          <span
            css={`
              margin-right: ${1 * GU}px;
            `}
          >
            Request:
          </span>
          <Balance
            amount={proposal.requestedAmount}
            decimals={requestToken.decimals}
            icon={honeySvg}
            symbol={requestToken.symbol}
          />
        </div>
      )}
      <div
        css={`
          margin-bottom: ${2 * GU}px;
        `}
      >
        <div
          css={`
            ${textStyle('label2')};
            color: ${theme.contentSecondary};
          `}
        >
          Current{' '}
          {proposal.type !== ProposalTypes.Decision ? 'support' : 'votes'}
        </div>
        <ProposalSupport proposal={proposal} />
      </div>
      <ProposalFooter proposal={proposal} />
    </div>
  )
}

export default ProposalCard
