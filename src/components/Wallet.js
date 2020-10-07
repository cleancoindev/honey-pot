import React from 'react'
import styled from 'styled-components'
import { Box, GU, LoadingRing, textStyle, useTheme } from '@1hive/1hive-ui'
import { useAppState } from '../providers/AppState'

import { formatTokenAmount, getTokenIconBySymbol } from '../lib/token-utils'
import { useAccountTokens } from '../hooks/useAccountTokens'

function Wallet({ account }) {
  const theme = useTheme()
  const { stakeToken } = useAppState()
  const { accountBalance } = useAppState()
  const { inactiveTokens } = useAccountTokens(account)

  return (
    <Box padding={0}>
      <div
        css={`
          padding: ${3 * GU}px;
        `}
      >
        <div>
          <Balance
            amount={accountBalance}
            decimals={stakeToken.decimals}
            label="Balance"
            loading={accountBalance.lt(0)}
            symbol={stakeToken.symbol}
          />
          <LineSeparator border={theme.border} />
          <Balance
            amount={inactiveTokens}
            decimals={stakeToken.decimals}
            inactive
            label="Idle"
            symbol={stakeToken.symbol}
          />
        </div>
      </div>
    </Box>
  )
}

const Balance = ({
  amount,
  decimals,
  inactive = false,
  label,
  loading,
  symbol,
}) => {
  const theme = useTheme()
  const tokenIcon = getTokenIconBySymbol(symbol)

  return (
    <div
      css={`
        display: flex;
        align-items: flex-start;
      `}
    >
      <div
        css={`
          margin-right: ${3 * GU}px;
        `}
      >
        <img
          src={tokenIcon}
          height="50"
          alt=""
          css={`
            opacity: ${inactive ? 0.5 : 1};
          `}
        />
      </div>
      <div>
        <h5
          css={`
            color: ${theme.contentSecondary};
          `}
        >
          {label}
        </h5>
        {loading ? (
          <LoadingRing />
        ) : (
          <span
            css={`
              ${textStyle('title4')};
              color: ${theme[inactive ? 'negative' : 'content']};
            `}
          >
            {formatTokenAmount(amount, decimals)}
          </span>
        )}
      </div>
    </div>
  )
}

const LineSeparator = styled.div`
  height: 1px;
  border-bottom: 0.5px solid ${({ border }) => border};
  margin: ${3 * GU}px 0;
`

export default Wallet
