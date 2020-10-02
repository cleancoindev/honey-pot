export const ProposalTypes = {
  Decision: Symbol('PROPOSAL_TYPE_DECISION'),
  Proposal: Symbol('PROPOSAL_TYPE_PROPOSAL'),
  Suggestion: Symbol('PROPOSAL_TYPE_SUGGESTION'),
}

const symbolMapping = {
  Decision: ProposalTypes.Decision,
  Proposal: ProposalTypes.Proposal,
  Suggestion: ProposalTypes.Suggestion,
}

const stringMapping = {
  [ProposalTypes.Decision]: 'Decision',
  [ProposalTypes.Proposal]: 'Proposal',
  [ProposalTypes.Suggestion]: 'Suggestion',
}

export function convertFromString(str) {
  return symbolMapping[str]
}

export function convertToString(symbol) {
  return stringMapping[symbol]
}
