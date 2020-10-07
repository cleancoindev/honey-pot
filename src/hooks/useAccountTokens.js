import { useMemo } from 'react'
import { useAccountStakes } from './useStakes'
import { useAppState } from '../providers/AppState'
import BigNumber from '../lib/bigNumber'

export default function useAccountTokens(account) {
  const myStakes = useAccountStakes(account)
  const { accountBalance } = useAppState()

  const activeTokens = useMemo(() => {
    if (!myStakes) {
      return new BigNumber('0')
    }
    return myStakes.reduce((accumulator, stake) => {
      return accumulator.plus(stake.amount)
    }, new BigNumber('0'))
  }, [myStakes])

  const inactiveTokens = useMemo(() => {
    if (!accountBalance.gte(0) || !activeTokens) {
      return new BigNumber('0')
    }
    return accountBalance.minus(activeTokens)
  }, [accountBalance, activeTokens])

  return { activeTokens, inactiveTokens }
}
