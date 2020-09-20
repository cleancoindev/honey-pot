import { useMemo } from 'react'
import { useAppData } from './useOrgHooks'
import { STAKE_PCT_BASE } from '../constants'

export default function useEffectiveSupply(totalSupply) {
  const { config } = useAppData()

  return useMemo(() => {
    if (!config) {
      return
    }

    const { minThresholdStakePercentage, totalStaked } = config.conviction

    const percentageOfTotalSupply = totalSupply
      .multipliedBy(minThresholdStakePercentage)
      .div(STAKE_PCT_BASE)

    return totalStaked.lt(percentageOfTotalSupply)
      ? percentageOfTotalSupply
      : totalStaked
  }, [config, totalSupply])
}
