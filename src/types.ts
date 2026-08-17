export type ChangeStatus = 'improved' | 'tradeoff' | 'review' | 'unchanged'

export type ProposalSource = {
  file: string
  section: string
  excerpt: string
}

export type ProposalRevision = {
  id: string
  venue: string
  version: string
  submittedAt: string
  total: number
}

export type ProposalChange = {
  id: string
  category: string
  label: string
  originalValue: string
  revisedValue: string
  numericImpact?: number
  humanReadableImpact: string
  estimatedEventImpact?: string
  status: ChangeStatus
  originalSource: ProposalSource
  revisedSource: ProposalSource
  notes: string
}

export type NegotiationSummary = {
  originalTotal: number
  revisedTotal: number
  grossSavings: number
  newCommitments: number
  netImprovement: number
  improvementsCount: number
  tradeoffsCount: number
  reviewCount: number
}

export type DemoEvent = {
  name: string
  location: string
  dates: string
  guests: number
  venue: string
}
