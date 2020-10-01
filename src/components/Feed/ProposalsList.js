import React, { useMemo } from 'react'
import { textStyle } from '@1hive/1hive-ui'
import ProposalCard from './ProposalCard'

function ProposalsList({ proposals }) {
  const sortedProposals = useMemo(
    () => proposals.sort((a, b) => b.currentConviction - a.currentConviction),
    [proposals]
  )

  return (
    <div
      css={`
        flex-basis: 50%;
      `}
    >
      {sortedProposals.length ? (
        sortedProposals.map((proposal, index) => {
          return <ProposalCard key={index} proposal={proposal} />
        })
      ) : (
        <p
          css={`
            ${textStyle('title2')};
            font-weight: 600;
          `}
        >
          No proposals yet!
        </p>
      )}
    </div>
  )
}

export default ProposalsList
