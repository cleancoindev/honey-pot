import React, { useCallback, useMemo } from 'react'
import { GU, textStyle, useTheme } from '@1hive/1hive-ui'
import { ThumbsDownIcon, ThumbsUpIcon } from '../Icons'

import { useAppState } from '../../providers/AppState'
import { useWallet } from '../../providers/Wallet'

import { isEntitySupporting } from '../../lib/conviction'
import { QUICK_STAKE_PCT, STAKE_PCT_BASE } from '../../constants'

function ProposalFooter({
  proposal,
  onStakeToProposal,
  onWithdrawFromProposal,
}) {
  const theme = useTheme()
  const { accountBalance } = useAppState()

  const supportersCount = useMemo(
    () => proposal.stakes.filter(({ amount }) => amount.gt(0)).length,
    [proposal]
  )

  const handleThumbsUp = useCallback(() => {
    // Staking 5% of account's balance
    const amount = accountBalance.times(QUICK_STAKE_PCT).div(STAKE_PCT_BASE)
    onStakeToProposal(proposal.id, amount.toFixed(0))
  }, [accountBalance, proposal.id, onStakeToProposal])

  const handleThumbsDown = useCallback(() => {
    onWithdrawFromProposal(proposal.id)
  }, [proposal.id, onWithdrawFromProposal])

  return (
    <div>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;

          color: ${theme.contentSecondary};
          ${textStyle('body3')};
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
          `}
        >
          <QuickActions
            proposal={proposal}
            onThumbsUp={handleThumbsUp}
            onThumbsDown={handleThumbsDown}
          />
          <div>
            {supportersCount} Supporter{supportersCount === 1 ? '' : 's'}
          </div>
        </div>
        <div>Status : {proposal.status}</div>
      </div>
    </div>
  )
}

function QuickActions({ proposal, onThumbsUp, onThumbsDown }) {
  const { account } = useWallet()
  if (!account) {
    return null
  }

  const isSupporting = isEntitySupporting(proposal, account)

  return (
    <div
      css={`
        display: flex;
        align-items: center;
      `}
    >
      {!isSupporting ? (
        <div
          onClick={onThumbsUp}
          css={`
            margin-right: ${1 * GU}px;
            cursor: pointer;
            display: flex;
          `}
        >
          <ThumbsUpIcon />
        </div>
      ) : (
        <div
          onClick={onThumbsDown}
          css={`
            margin-right: ${1.5 * GU}px;
            cursor: pointer;
            display: flex;
          `}
        >
          <ThumbsDownIcon />
        </div>
      )}
    </div>
  )
}

export default ProposalFooter
