import React from 'react'
import { Button } from '@1hive/1hive-ui'
import EmptyResults from './EmptyResults'
import ProposalCard from './ProposalCard'
import ProposalRankings from './ProposalRankings'

import { useAppState } from '../../providers/AppState'

function ProposalsList({
  activeFilters,
  proposals,
  onStakeToProposal,
  onWithdrawFromProposal,
}) {
  const { increaseProposalCount } = useAppState()

  return (
    <div
      css={`
        flex-basis: 50%;
      `}
    >
      <ProposalRankings />
      <div>
        {proposals.length ? (
          <>
            {proposals.map((proposal, index) => {
              return (
                <ProposalCard
                  key={index}
                  proposal={proposal}
                  onStakeToProposal={onStakeToProposal}
                  onWithdrawFromProposal={onWithdrawFromProposal}
                />
              )
            })}
            <Button label="Load more" onClick={increaseProposalCount} />
          </>
        ) : (
          <EmptyResults
            title={activeFilters ? 'No results found' : 'No proposals yet!'}
            paragraph={
              activeFilters
                ? 'We couldn’t find any proposal matching your filter selection'
                : ''
            }
          />
        )}
      </div>
    </div>
  )
}

export default ProposalsList
