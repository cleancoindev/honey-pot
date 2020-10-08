import React from 'react'
import { GU, SidePanel } from '@1hive/1hive-ui'

import AddProposalPanel from '../components/panels/AddProposalPanel'
import MainScreen from '../components/Feed/MainScreen'
import Loader from '../components/Loader'

import useAppLogic from '../logic/app-logic'
import useSelectedProposal from '../hooks/useSelectedProposal'

const Home = React.memo(function Home() {
  const {
    actions,
    isLoading,
    myStakes,
    proposals,
    proposalPanel,
  } = useAppLogic()

  const selectedProposal = useSelectedProposal(proposals)

  return (
    <div
      css={`
        margin-top: ${3 * GU}px;
      `}
    >
      {isLoading && <Loader />}

      <MainScreen
        isLoading={isLoading}
        myStakes={myStakes}
        onCancelProposal={actions.cancelProposal}
        onExecuteProposal={actions.executeProposal}
        onRequestNewProposal={proposalPanel.requestOpen}
        onStakeToProposal={actions.stakeToProposal}
        onWithdrawFromProposal={actions.withdrawFromProposal}
        proposals={proposals}
        selectedProposal={selectedProposal}
      />

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
