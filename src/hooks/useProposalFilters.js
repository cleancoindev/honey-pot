import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWallet } from '../providers/Wallet'
import {
  filterArgsMapping,
  NULL_FILTER_STATE,
  STATUS_FILTER_OPEN,
  STATUS_ITEMS,
  SUPPORT_ITEMS,
  TYPE_ITEMS,
} from '../utils/filter-utils'

// Status and Type filters will be used as subgraph query args.
// Support will be filtered locally as there is not an easy way to achieve this only by querying the subgraph.
export default function useProposalFilters() {
  const { account } = useWallet()
  const [statusFilter, setStatusFilter] = useState(STATUS_FILTER_OPEN)
  const [supportFilter, setSupportFilter] = useState(NULL_FILTER_STATE)
  const [typeFilter, setTypeFilter] = useState(NULL_FILTER_STATE)

  const handleStatusFilterChange = useCallback(
    index => setStatusFilter(index || NULL_FILTER_STATE),
    []
  )
  const handleSupportFilterChange = useCallback(
    index => setSupportFilter(index || NULL_FILTER_STATE),
    []
  )
  const handleTypeFilterChange = useCallback(
    index => setTypeFilter(index || NULL_FILTER_STATE),
    []
  )

  const handleClearFilters = useCallback(() => {
    setStatusFilter(STATUS_FILTER_OPEN)
    setSupportFilter(NULL_FILTER_STATE)
    setTypeFilter(NULL_FILTER_STATE)
  }, [])

  useEffect(() => {
    if (!account) {
      setSupportFilter(NULL_FILTER_STATE)
    }
  }, [account])

  const isActive =
    statusFilter > STATUS_FILTER_OPEN ||
    supportFilter > NULL_FILTER_STATE ||
    typeFilter > NULL_FILTER_STATE

  return useMemo(
    () => ({
      isActive,
      onClear: handleClearFilters,
      status: {
        items: STATUS_ITEMS,
        filter: statusFilter,
        onChange: handleStatusFilterChange,
        queryArgs: getQueryArgsByFilter('status', statusFilter),
      },

      support: {
        items: SUPPORT_ITEMS,
        filter: supportFilter,
        onChange: handleSupportFilterChange,
      },

      type: {
        items: TYPE_ITEMS,
        filter: typeFilter,
        onChange: handleTypeFilterChange,
        queryArgs: getQueryArgsByFilter('type', typeFilter),
      },
    }),
    [
      isActive,
      handleClearFilters,
      handleStatusFilterChange,
      handleSupportFilterChange,
      handleTypeFilterChange,
      statusFilter,
      supportFilter,
      typeFilter,
    ]
  )
}

function getQueryArgsByFilter(key, filter) {
  if (filter === NULL_FILTER_STATE) {
    return null
  }

  let queryKey
  if (key === 'status') {
    queryKey = 'statuses'
  }
  if (key === 'type') {
    queryKey = 'types'
  }

  return { [queryKey]: [filterArgsMapping[key][filter]] }
}
