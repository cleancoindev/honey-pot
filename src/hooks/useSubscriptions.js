import { useCallback, useEffect, useRef, useState } from 'react'
import {
  transformConfigData,
  transformProposalData,
  transformSupporterData,
} from '../lib/data-utils'

export function useConfigSubscription(honeypot) {
  const [config, setConfig] = useState(null)

  const configSubscription = useRef(null)

  const onConfigHandler = useCallback((err, config) => {
    if (err || !config) {
      return
    }
    const transformedConfig = transformConfigData(config)
    setConfig(transformedConfig)
  }, [])

  useEffect(() => {
    if (!honeypot) {
      return
    }

    configSubscription.current = honeypot.onConfig(onConfigHandler)

    return () => configSubscription.current.unsubscribe()
  }, [honeypot, onConfigHandler])

  return config
}

export function useProposalsSubscription(honeypot) {
  const [proposals, setProposals] = useState([])

  const proposalsSubscription = useRef(null)

  const onProposalsHandler = useCallback((err, proposals = []) => {
    if (err || !proposals) {
      return
    }

    const transformedProposals = proposals.map(transformProposalData)
    setProposals(transformedProposals)
  }, [])

  useEffect(() => {
    if (!honeypot) {
      return
    }

    proposalsSubscription.current = honeypot.onProposals({}, onProposalsHandler)

    return () => proposalsSubscription.current.unsubscribe()
  }, [honeypot, onProposalsHandler])

  return proposals
}

export function useSupporterSubscription(honeypot, account) {
  const [supporter, setSupporter] = useState(null)

  const supporterSubscription = useRef(null)

  const onSupporterHandler = useCallback((err, supporter) => {
    if (err || !supporter) {
      return
    }

    const transformedSupported = transformSupporterData(supporter)
    setSupporter(transformedSupported)
  }, [])

  useEffect(() => {
    if (!honeypot || !account) {
      return
    }

    supporterSubscription.current = honeypot.onSupporter(
      { id: account.toLowerCase() },
      onSupporterHandler
    )

    return () => {
      supporterSubscription.current.unsubscribe()
    }
  }, [account, honeypot, onSupporterHandler])

  return supporter
}
