import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { GU, useTheme } from '@1hive/1hive-ui'

import ProposalCreator from './ProposalCreator'

export default function ProposalCard({ proposal }) {
  const theme = useTheme()
  const history = useHistory()

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
    </div>
  )
}

// const ProposalInfo = ({ proposal, requestToken }) => {
//   return (
//     <div
//       css={`
//         width: ${23 * GU}px;
//       `}
//     >
//       <ConvictionBar proposal={proposal} withThreshold={requestToken} />
//     </div>
//   )
// }

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
