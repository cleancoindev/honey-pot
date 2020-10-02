import { useMemo } from 'react'
import { useAppState } from '../providers/AppState'

import { addressesEqual } from '../lib/web3-utils'
import { PROPOSAL_STATUS_ACTIVE_STRING } from '../constants'

// TODO: Use supporter stakes
export function useAccountStakes(account) {
  const { proposals, stakeToken } = useAppState()

  return useMemo(() => {
    if (!stakeToken || !proposals) {
      return []
    }

    return proposals.reduce((acc, proposal) => {
      if (
        !proposal.status === PROPOSAL_STATUS_ACTIVE_STRING ||
        !proposal.stakes
      ) {
        return acc
      }

      const myStake = proposal.stakes.find(
        stake =>
          addressesEqual(stake.entity.address, account) && stake.amount.gt(0)
      )

      if (!myStake) {
        return acc
      }

      return [
        ...acc,
        {
          proposalId: proposal.id,
          proposalName: proposal.name,
          amount: myStake.amount,
        },
      ]
    }, [])
  }, [account, proposals, stakeToken])
}
