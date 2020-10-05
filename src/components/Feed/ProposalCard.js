import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { GU, textStyle, useTheme } from '@1hive/1hive-ui'

import ProposalCreator from './ProposalCreator'
import { ConvictionBar } from '../ConvictionVisuals'

import { useAppState } from '../../providers/AppState'

import { ProposalTypes } from '../../types'
import { formatTokenAmount } from '../../lib/token-utils'
import honeySvg from '../../assets/honey.svg'

export default function ProposalCard({ proposal }) {
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
        cursor: pointer;
      `}
      onClick={handleSelectProposal}
    >
      <ProposalCreator proposal={proposal} />
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
          Request:{' '}
          <img
            src={honeySvg}
            alt=""
            width="24"
            height="24"
            css={`
              margin: 0 ${0.5 * GU}px;
            `}
          />
          {formatTokenAmount(proposal.requestedAmount, requestToken.decimals)}{' '}
          {requestToken.symbol}
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
        {proposal.type !== ProposalTypes.Decision ? (
          <ProposalInfo proposal={proposal} requestToken={requestToken} />
        ) : (
          <div>Decision support</div>
        )}
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;

          color: ${theme.contentSecondary};
        `}
      >
        <div>Support</div>
        <div>Status : {proposal.status}</div>
      </div>
    </div>
  )
}

const ProposalInfo = ({ proposal, requestToken }) => {
  return (
    <div>
      <ConvictionBar
        proposal={proposal}
        withThreshold={Boolean(requestToken)}
      />
    </div>
  )
}

// const IdAndTitle = ({ id, name, selectProposal }) => {
//   const theme = useTheme()
//   const handleOnClick = useCallback(() => {
//     selectProposal(id)
//   }, [id, selectProposal])

//   return (
//     <Link onClick={handleOnClick}>
//       <span
//         css={`
//           color: ${theme.surfaceContentSecondary};
//         `}
//       >
//         {name}
//       </span>
//     </Link>
//   )
// }

// const Amount = ({
//   requestedAmount = 0,
//   requestToken: { symbol, decimals },
// }) => {
//   const tokenIcon = getTokenIconBySymbol(symbol)
//   return (
//     <div>
//       <Balance
//         amount={requestedAmount}
//         decimals={decimals}
//         icon={tokenIcon}
//         symbol={symbol}
//       />
//     </div>
//   )
// }
