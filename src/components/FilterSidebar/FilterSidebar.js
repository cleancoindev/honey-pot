import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, DropDown, GU, Tag, textStyle, useTheme } from '@1hive/1hive-ui'
import ListFilter from './ListFilter'

const FilterSidebar = React.memo(
  ({
    proposalsSize = 0,
    proposalStatusFilter,
    proposalSupportFilter,
    proposalTypeFilter,
    onClearFilters,
    onStatusFilterChange,
    onSupportFilterChange,
    onTypeFilterChange,
  }) => {
    const theme = useTheme()
    const supportFilterDisabled = proposalStatusFilter === 1

    return (
      <div
        css={`
          flex-basis: 25%;
          margin-right: ${8 * GU}px;
        `}
      >
        <div
          css={`
            margin-bottom: ${4 * GU}px;
            padding-bottom: ${3 * GU}px;
            border-bottom: 1px solid ${theme.border};
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
              justify-content: space-between;

              margin-bottom: ${2 * GU}px;
            `}
          >
            <div
              css={`
                ${textStyle('label2')};
              `}
            >
              Filters
            </div>
            <Button onClick={onClearFilters} label="Clear" size="mini" />
          </div>
          <ListFilter
            items={['All', 'Suggestion', 'Proposal', 'Decision']}
            selected={proposalTypeFilter}
            onChange={onTypeFilterChange}
          />
        </div>
        <div
          css={`
            margin-bottom: ${3 * GU}px;
          `}
        >
          <label
            css={`
              display: block;
              ${textStyle('label2')};
              margin-bottom: ${1 * GU}px;
            `}
          >
            Status
          </label>
          <DropDown
            header="Status"
            items={['All', 'Open', 'Closed', 'Removed']}
            onChange={onStatusFilterChange}
            placeholder="All"
            selected={proposalStatusFilter}
            wide
          />
        </div>
        {!supportFilterDisabled && (
          <div>
            <label
              css={`
                display: block;
                ${textStyle('label2')};
                margin-bottom: ${1 * GU}px;
              `}
            >
              Support
            </label>
            <DropDown
              header="Support"
              items={[
                <div>
                  All
                  {proposalsSize !== -1 && (
                    <SizeTagWrapper theme={theme.info}>
                      <Tag limitDigits={4} label={proposalsSize} size="small" />
                    </SizeTagWrapper>
                  )}
                </div>,
                'Supported',
                'Not Supported',
              ]}
              onChange={onSupportFilterChange}
              placeholder="All"
              selected={proposalSupportFilter}
              wide
            />
          </div>
        )}
      </div>
    )
  }
)

const SizeTagWrapper = styled.span`
  margin-left: ${1.5 * GU}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme};
`

FilterSidebar.propTypes = {
  proposalsSize: PropTypes.number,
  proposalStatusFilter: PropTypes.number.isRequired,
  proposalSupportFilter: PropTypes.number.isRequired,
  proposalTypeFilter: PropTypes.number.isRequired,
  onStatusFilterChange: PropTypes.func.isRequired,
  onSupportFilterChange: PropTypes.func.isRequired,
  onTypeFilterChange: PropTypes.func.isRequired,
}

export default FilterSidebar
