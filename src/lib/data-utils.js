import BigNumber from './bigNumber'

export function transformConfigData(config) {
  const { conviction, voting } = config
  return {
    ...config,
    conviction: {
      ...conviction,
      alpha: new BigNumber(conviction.decay).div(conviction.pctBase),
      maxRatio: new BigNumber(conviction.maxRatio).div(conviction.pctBase),
      weight: new BigNumber(conviction.weight).div(conviction.pctBase),
      pctBase: new BigNumber(conviction.pctBase),
      totalStaked: new BigNumber(conviction.totalStaked),
    },
    voting: {
      ...voting,
      supportRequiredPct: new BigNumber(voting.supportRequiredPct),
      minAcceptQuorumPct: new BigNumber(voting.minAcceptQuorumPct),
      durationBlocks: parseInt(voting.durationBlocks, 10),
      bufferBlocks: parseInt(voting.bufferBlocks, 10),
      executionDelayBlocks: parseInt(voting.executionDelayBlocks, 10),
    },
  }
}

export function transformProposalData(proposal) {
  return {
    ...proposal,
    requestedAmount: new BigNumber(proposal.requestedAmount),
    id: proposal.number,
    stakes: proposal.stakes.map(({ amount, ...stake }) => ({
      ...stake,
      amount: new BigNumber(amount),
    })),
    stakesHistory: proposal.stakesHistory.map(transformStakeHistoryData),
  }
}

function transformStakeHistoryData(stake) {
  return {
    ...stake,
    tokensStaked: BigNumber(stake.tokensStaked),
    totalTokensStaked: BigNumber(stake.totalTokensStaked),
    conviction: BigNumber(stake.conviction),
  }
}

export function getAppAddressByName(apps, appName) {
  return apps?.find(app => app.name === appName).address || ''
}
