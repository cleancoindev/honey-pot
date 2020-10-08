import React from 'react'
import { GU, SidePanel } from '@1hive/1hive-ui'

import AddProposalPanel from '../components/panels/AddProposalPanel'
import FilterSidebar from '../components/FilterSidebar/FilterSidebar'
import HeroBanner from '../components/Feed/HeroBanner'
import Loader from '../components/Loader'
import ProposalsList from '../components/Feed/ProposalsList'

import useAppLogic from '../logic/app-logic'

const Home = React.memo(function Home() {
  const { actions, isLoading, proposals, proposalPanel } = useAppLogic()

  const {
    proposalStatusFilter,
    proposalSupportFilter,
    proposalTypeFilter,
    handleStatusFilterChange,
    handleSupportFilterChange,
    handleTypeFilterChange,
  } = {}

  return (
    <div
      css={`
        margin-top: ${3 * GU}px;
      `}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div
          css={`
            display: flex;
          `}
        >
          <FilterSidebar
            proposalsSize={proposals.length}
            proposalStatusFilter={proposalStatusFilter}
            proposalSupportFilter={proposalSupportFilter}
            proposalTypeFilter={proposalTypeFilter}
            onStatusFilterChange={handleStatusFilterChange}
            onSupportFilterChange={handleSupportFilterChange}
            onTypeFilterChange={handleTypeFilterChange}
          />
          <ProposalsList
            proposals={proposals}
            onStakeToProposal={actions.stakeToProposal}
            onWithdrawFromProposal={actions.withdrawFromProposal}
          />
          <HeroBanner onRequestNewProposal={proposalPanel.requestOpen} />
        </div>
      )}

      <SidePanel
        title="New proposal"
        opened={proposalPanel.visible}
        onClose={proposalPanel.requestClose}
      >
        <AddProposalPanel onSubmit={actions.newProposal} />
      </SidePanel>
    </div>
  )
})

export default Home
