import useActions from '../hooks/useActions'
import { useAppState } from '../providers/AppState'
import usePanelState from '../hooks/usePanelState'
import { useProposal } from '../hooks/useProposals'

export default function useProposalLogic(match) {
  const { params, path } = match
  const { id: proposalId } = params

  const {
    config,
    isLoading,
    permissions,
    requestToken,
    vaultBalance,
  } = useAppState()
  const appAddress = path.includes('vote')
    ? config?.voting.id
    : config?.conviction.id

  // TODO: Move to proposalLogic file?
  const actions = useActions()
  const panelState = usePanelState()
  const [proposal, blockHasLoaded] = useProposal(proposalId, appAddress)

  return {
    actions,
    isLoading: isLoading || !blockHasLoaded,
    panelState,
    permissions,
    proposal,
    requestToken,
    vaultBalance,
  }
}
