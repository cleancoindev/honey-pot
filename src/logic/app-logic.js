import useActions from '../hooks/useActions'
import { useAppState } from '../providers/AppState'
import usePanelState from '../hooks/usePanelState'
import { useProposals } from '../hooks/useProposals'

// Handles the main logic of the app.
export default function useAppLogic() {
  const { isLoading, totalStaked } = useAppState()

  const proposalPanel = usePanelState()
  const [proposals, filters, blockHasLoaded] = useProposals()

  const actions = useActions(proposalPanel.requestClose)

  return {
    actions,
    filters,
    isLoading: isLoading || !blockHasLoaded,
    proposals,
    proposalPanel,
    totalStaked,
  }
}
