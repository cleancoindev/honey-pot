import React, { useCallback } from 'react'

import FilterSidebar from '../FilterSidebar/FilterSidebar'
import HeroBanner from './HeroBanner'
import ProposalsList from './ProposalsList'
import useFilterProposals from '../../hooks/useFilterProposals'

const MainScreen = React.memo(
  ({
    isLoading,
    myStakes,
    onRequestNewProposal,
    onStakeToProposal,
    onWithdrawFromProposal,
    proposals,
  }) => {
    const {
      filteredProposals,
      proposalExecutionStatusFilter,
      proposalSupportStatusFilter,
      proposalTextFilter,
      proposalTypeFilter,
      handleProposalSupportFilterChange,
      handleProposalExecutionFilterChange,
      handleSearchTextFilterChange,
      handleProposalTypeFilterChange,
    } = useFilterProposals(proposals, myStakes)

    const handleExecutionStatusFilterChange = useCallback(
      tabIndex => {
        handleProposalExecutionFilterChange(tabIndex)
        handleProposalSupportFilterChange(-1)
      },
      [handleProposalExecutionFilterChange, handleProposalSupportFilterChange]
    )

    const updateTextFilter = useCallback(
      textValue => {
        handleSearchTextFilterChange(textValue)
      },
      [handleSearchTextFilterChange]
    )

    if (isLoading) {
      return null
    }

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

export default MainScreen
