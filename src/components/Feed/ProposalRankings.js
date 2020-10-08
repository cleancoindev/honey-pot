import React, { useCallback, useState } from 'react'
import { GU, textStyle, useTheme } from '@1hive/1hive-ui'

import iconBestSvg from '../../assets/rankings/ranking-best.svg'
import iconBestSelectedSvg from '../../assets/rankings/ranking-best-selected.svg'
import iconNewSvg from '../../assets/rankings/ranking-new.svg'
import iconNewSelectedSvg from '../../assets/rankings/ranking-new-selected.svg'

function ProposalRankings() {
  const [selected, setSelected] = useState(0)

  const handleSelect = useCallback(index => {
    setSelected(index)
  }, [])

  // TODO: Refactor (not very elegant implementation)
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        margin-bottom: ${2 * GU}px;
      `}
    >
      <Item
        icon={selected === 0 ? iconBestSelectedSvg : iconBestSvg}
        label="Best"
        onClick={() => handleSelect(0)}
        selected={selected === 0}
      />
      <Item
        icon={selected === 1 ? iconNewSelectedSvg : iconNewSvg}
        label="New"
        onClick={() => handleSelect(1)}
        selected={selected === 1}
      />
    </div>
  )
}

function Item({ icon, label, onClick, selected }) {
  const theme = useTheme()
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        color: ${theme.content};
        margin-right: ${1 * GU}px;
        border-radius: ${2 * GU}px;
        padding: ${0.5 * GU}px ${0.75 * GU}px;
        background: linear-gradient(
          268deg,
          ${theme.accentEnd},
          ${theme.accentStart}
        );

        ${!selected &&
          `
          background: ${theme.surface};
          color: ${theme.contentSecondary};
          cursor: pointer;
          border: 1px solid ${theme.border};
          &:hover {
            background: linear-gradient(268.53deg, rgba(170, 245, 212, 0.2) 0%, rgba(124, 224, 214, 0.2) 100%);
          }
        `}
      `}
      onClick={onClick}
    >
      <img src={icon} height="22" width="22" alt="" />
      <div
        css={`
          ${textStyle('label1')};
          margin-left: ${0.75 * GU}px;
        `}
      >
        {label}
      </div>
    </div>
  )
}

export default ProposalRankings
