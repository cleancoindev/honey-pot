import React, { useCallback, useMemo } from 'react'
import { GU, textStyle, useTheme } from '@1hive/1hive-ui'

import { useAppState } from '../../providers/AppState'
import { useWallet } from '../../providers/Wallet'

import { isEntitySupporting } from '../../lib/conviction'
import { QUICK_STAKE_PCT, STAKE_PCT_BASE } from '../../constants'

import thumbsUpSvg from '../../assets/thumbs-up.svg'
import thumbsDownSvg from '../../assets/thumbs-down.svg'

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
          <div>{supportersCount} Supporters</div>
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
        <img
          src={thumbsUpSvg}
          alt=""
          height="28"
          width="28"
          onClick={onThumbsUp}
          css={`
            margin-right: ${1 * GU}px;
            cursor: pointer;
          `}
        />
      ) : (
        <img
          src={thumbsDownSvg}
          alt=""
          height="28"
          width="28"
          onClick={onThumbsDown}
          css={`
            margin-right: ${1.5 * GU}px;
            cursor: pointer;
          `}
        />
      )}
    </div>
  )
}

export default ProposalFooter
