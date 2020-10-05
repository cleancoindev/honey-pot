import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import Proposals from './Proposals'
import ProposalDetail from './ProposalDetail'
import useFilterProposals from '../../hooks/useFilterProposals'

const MainScreen = React.memo(
  ({
    isLoading,
    myStakes,
    onCancelProposal,
    onExecuteProposal,
    onRequestNewProposal,
    onStakeToProposal,
    onWithdrawFromProposal,
    proposals,
    selectedProposal,
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

    const history = useHistory()
    const handleBack = useCallback(() => {
      history.goBack()
    }, [history])

    const handleTabChange = tabIndex => {
      handleProposalExecutionFilterChange(tabIndex)
      handleProposalSupportFilterChange(-1)
    }

    if (isLoading) {
      return null
    }

    return (
      <>
        {selectedProposal ? (
          <ProposalDetail
            onBack={handleBack}
            onExecuteProposal={onExecuteProposal}
            onCancelProposal={onCancelProposal}
            onStakeToProposal={onStakeToProposal}
            onWithdrawFromProposal={onWithdrawFromProposal}
            proposal={selectedProposal}
          />
        ) : (
          <Proposals
            filteredProposals={filteredProposals}
            proposalExecutionStatusFilter={proposalExecutionStatusFilter}
            proposalSupportStatusFilter={proposalSupportStatusFilter}
            proposalTextFilter={proposalTextFilter}
            proposalTypeFilter={proposalTypeFilter}
            handleProposalSupportFilterChange={
              handleProposalSupportFilterChange
            }
            handleExecutionStatusFilterChange={handleTabChange}
            handleSearchTextFilterChange={handleSearchTextFilterChange}
            handleProposalTypeFilterChange={handleProposalTypeFilterChange}
            onRequestNewProposal={onRequestNewProposal}
          />
        )}
      </>
    )
  }
)

export default MainScreen
