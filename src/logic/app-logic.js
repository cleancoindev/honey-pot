import useActions from '../hooks/useActions'
import { useAppState } from '../providers/AppState'
import { useAccountStakes } from '../hooks/useStakes'
import usePanelState from '../hooks/usePanelState'
import { useProposals } from '../hooks/useProposals'
import { useWallet } from '../providers/Wallet'

// Handles the main logic of the app.
export default function useAppLogic() {
  const wallet = useWallet()
  const { isLoading, totalStaked } = useAppState()

  const proposalPanel = usePanelState()
  const [proposals, blockHasLoaded] = useProposals()
  const myStakes = useAccountStakes(wallet.account)

  const actions = useActions(proposalPanel.requestClose)

  return {
    actions,
    isLoading: isLoading || !blockHasLoaded,
    myStakes,
    proposals,
    proposalPanel,
    totalStaked,
  }
}
