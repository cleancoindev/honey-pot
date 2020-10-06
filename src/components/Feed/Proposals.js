import React, { useCallback } from 'react'

import FilterSidebar from '../FilterSidebar/FilterSidebar'
import HeroBanner from './HeroBanner'
import ProposalsList from './ProposalsList'

const Proposals = React.memo(
  ({
    filteredProposals,
    proposalExecutionStatusFilter,
    proposalSupportStatusFilter,
    proposalTextFilter,
    proposalTypeFilter,
    handleProposalSupportFilterChange,
    handleExecutionStatusFilterChange,
    handleSearchTextFilterChange,
    handleProposalTypeFilterChange,
    onRequestNewProposal,
    onStakeToProposal,
    onWithdrawFromProposal,
  }) => {
    const updateTextFilter = useCallback(
      textValue => {
        handleSearchTextFilterChange(textValue)
      },
      [handleSearchTextFilterChange]
    )

    return (
      <div
        css={`
          display: flex;
        `}
      >
        <FilterSidebar
          proposalsSize={filteredProposals.length}
          proposalExecutionStatusFilter={proposalExecutionStatusFilter}
          proposalStatusFilter={proposalSupportStatusFilter}
          proposalTextFilter={proposalTextFilter}
          proposalTypeFilter={proposalTypeFilter}
          handleExecutionStatusFilterChange={handleExecutionStatusFilterChange}
          handleProposalStatusFilterChange={handleProposalSupportFilterChange}
          handleTextFilterChange={updateTextFilter}
          handleProposalTypeFilterChange={handleProposalTypeFilterChange}
        />

        <ProposalsList
          proposals={filteredProposals}
          onStakeToProposal={onStakeToProposal}
          onWithdrawFromProposal={onWithdrawFromProposal}
        />
        <HeroBanner onRequestNewProposal={onRequestNewProposal} />
      </div>
    )
  }
)

export default Proposals
