import { useCallback, useState } from 'react'

const NULL_FILTER_STATE = -1
const STAKE_STATUS_FILTER_SUPPORTED = 1
const STAKE_STATUS_FILTER_NOT_SUPPORTED = 2
const STATUS_FILTER_OPEN = 1
const STATUS_FILTER_ACCEPTED = 2
const STATUS_FILTER_CANCELLED = 3
const TYPE_FILTER_FUNDING = 1
const TYPE_FILTER_SIGNALING = 2

export default function useProposalFilters() {
  const [executionFilter, setExecutionFilter] = useState(STATUS_FILTER_OPEN)
  const [supportFilter, setSupportFilter] = useState(NULL_FILTER_STATE)
  const [typeFilter, setTypeFilter] = useState(NULL_FILTER_STATE)

  return {
    proposalExecutionStatusFilter: executionFilter,
    proposalSupportStatusFilter: supportFilter,
    proposalTypeFilter: typeFilter,
    handleProposalExecutionFilterChange: useCallback(
      index => setExecutionFilter(index || NULL_FILTER_STATE),
      [setExecutionFilter]
    ),
    handleProposalSupportFilterChange: useCallback(
      index => setSupportFilter(index || NULL_FILTER_STATE),
      [setSupportFilter]
    ),
    handleProposalTypeFilterChange: useCallback(
      index => setTypeFilter(index || NULL_FILTER_STATE),
      [setTypeFilter]
    ),
  }
}
