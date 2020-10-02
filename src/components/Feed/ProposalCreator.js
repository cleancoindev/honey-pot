import React, { useEffect, useState } from 'react'
import { EthIdenticon, GU, shortenAddress } from '@1hive/1hive-ui'

import { getProfileForAccount } from '../../lib/profile'
import { convertToString } from '../../types'

const addressCache = new Map()

function ProposalCreator({ proposal }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchProfile() {
      if (addressCache.get(proposal.creator)) {
        setProfile(addressCache.get(proposal.creator))
        return
      }

      const profile = await getProfileForAccount(proposal.creator)
      if (profile && !cancelled) {
        const profileData = { name: profile.name, image: profile.image }
        setProfile(profileData)
        addressCache.set(proposal.creator, profileData)
      }
    }

    fetchProfile()
    return () => {
      cancelled = true
    }
  }, [proposal.creator])

  return (
    <div
      css={`
        display: flex;
      `}
    >
      <div>
        {profile?.image ? (
          <img
            src={profile.image}
            height="48"
            width="48"
            alt=""
            css={`
              border-radius: 50%;
              display: block;
              object-fit: cover;
            `}
          />
        ) : (
          <EthIdenticon address={proposal.creator} radius={50} scale={2} />
        )}
      </div>
      <div
        css={`
          margin-left: ${1 * GU}px;
        `}
      >
        <div>
          <strong
            css={`
              margin-right: ${1 * GU}px;
            `}
          >
            {profile?.name ? profile.name : shortenAddress(proposal.creator)}
          </strong>
          created a {convertToString(proposal.type)}
        </div>
        <div>{proposal.createdAt}</div>
      </div>
    </div>
  )
}

export default ProposalCreator
