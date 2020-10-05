import { useMemo } from 'react'
import BigNumber from '../lib/bigNumber'
import { useLatestBlock } from './useBlock'
import {
  calculateThreshold,
  getCurrentConviction,
  getCurrentConvictionByEntity,
  getConvictionTrend,
  getMaxConviction,
  getMinNeededStake,
  getRemainingTimeToPass,
} from '../lib/conviction'
import { useWallet } from '../providers/Wallet'
import { useAppState } from '../providers/AppState'

const TIME_UNIT = (60 * 60 * 24) / 15

export function useProposals() {
  const { account } = useWallet()
  const {
    config,
    isLoading,
    proposals = [],
    vaultBalance,
    effectiveSupply,
  } = useAppState()

  const { alpha, maxRatio, totalStaked, weight } = config?.conviction || {}

  const latestBlock = useLatestBlock()

  const proposalsWithData = useMemo(() => {
    if (isLoading) {
      return proposals
    }

    return proposals.map(proposal => {
      let threshold = null
      let neededConviction = null
      let minTokensNeeded = null
      let neededTokens = null
      let remainingTimeToPass = null

      const maxConviction = getMaxConviction(
        effectiveSupply || new BigNumber('0'),
        alpha
      )
      const currentConviction = getCurrentConviction(
        proposal.stakesHistory,
        latestBlock.number,
        alpha
      )
      const userConviction = getCurrentConvictionByEntity(
        proposal.stakesHistory,
        account,
        latestBlock.number,
        alpha
      )

      const userStakedConviction = userConviction.div(maxConviction)

      const stakedConviction = currentConviction.div(maxConviction)
      const futureConviction = getMaxConviction(totalStaked, alpha)
      const futureStakedConviction = futureConviction.div(maxConviction)
      const convictionTrend = getConvictionTrend(
        proposal.stakesHistory,
        maxConviction,
        latestBlock.number,
        alpha,
        TIME_UNIT
      )

      // Funding proposal needed values
      if (proposal.requestedAmount.gt(0)) {
        threshold = calculateThreshold(
          proposal.requestedAmount,
          vaultBalance || new BigNumber('0'),
          effectiveSupply || new BigNumber('0'),
          alpha,
          maxRatio,
          weight
        )

        neededConviction = threshold?.div(maxConviction)

        minTokensNeeded = getMinNeededStake(threshold, alpha)

        neededTokens = minTokensNeeded.minus(totalStaked)

        remainingTimeToPass = getRemainingTimeToPass(
          threshold,
          currentConviction,
          totalStaked,
          alpha
        )
      }

      return {
        ...proposal,
        currentConviction,
        userConviction,
        userStakedConviction,
        stakedConviction,
        futureConviction,
        futureStakedConviction,
        neededConviction,
        maxConviction,
        threshold,
        minTokensNeeded,
        neededTokens,
        remainingTimeToPass,
        convictionTrend,
        totalStaked,
      }
    })
  }, [
    account,
    alpha,
    effectiveSupply,
    isLoading,
    latestBlock,
    maxRatio,
    proposals,
    totalStaked,
    vaultBalance,
    weight,
  ])

  return [proposalsWithData, latestBlock.number !== 0]
}
