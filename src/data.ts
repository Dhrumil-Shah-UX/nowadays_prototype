import type { DemoEvent, NegotiationSummary, ProposalChange, ProposalRevision } from './types'

// SPECULATIVE DEMO DATA - NOT REAL NOWADAYS CUSTOMER OR VENUE DATA.
export const demoEvent: DemoEvent = {
  name: '2026 Company Retreat',
  location: 'San Diego, CA',
  dates: 'September 14-17, 2026',
  guests: 148,
  venue: 'Marriott Marquis San Diego',
}

export const proposalRevisions: ProposalRevision[] = [
  { id: 'original', venue: demoEvent.venue, version: 'Original proposal', submittedAt: 'Aug 12, 2026 at 10:42 AM', total: 181400 },
  { id: 'revised', venue: demoEvent.venue, version: 'Revised proposal', submittedAt: 'Aug 13, 2026 at 9:18 AM', total: 168900 },
]

export const negotiationSummary: NegotiationSummary = {
  originalTotal: 181400,
  revisedTotal: 168900,
  grossSavings: 15700,
  newCommitments: 3200,
  netImprovement: 12500,
  improvementsCount: 4,
  tradeoffsCount: 2,
  reviewCount: 1,
}

export const proposalChanges: ProposalChange[] = [
  {
    id: 'room-rate', category: 'Room rate', label: 'Room rate', originalValue: '$305 / night', revisedValue: '$289 / night', numericImpact: -16, humanReadableImpact: '-$16 / night', estimatedEventImpact: '-$6,144 estimated', status: 'improved',
    originalSource: { file: 'Proposal_v1.pdf', section: 'Guest room rates', excerpt: 'Standard room: $305 per room, per night.' }, revisedSource: { file: 'Proposal_v2.pdf', section: 'Guest room rates', excerpt: 'Negotiated standard room: $289 per room, per night.' }, notes: 'The revised room rate lowers the estimated room spend for the event.',
  },
  {
    id: 'wifi', category: 'Meeting room Wi-Fi', label: 'Meeting room Wi-Fi', originalValue: '$2,400', revisedValue: 'Complimentary', numericImpact: -2400, humanReadableImpact: '-$2,400', estimatedEventImpact: '-$2,400 estimated', status: 'improved',
    originalSource: { file: 'Proposal_v1.pdf', section: 'Meeting room services', excerpt: 'Dedicated meeting room Wi-Fi: $2,400 flat fee.' }, revisedSource: { file: 'Proposal_v2.pdf', section: 'Meeting room services', excerpt: 'Meeting room Wi-Fi included at no additional charge.' }, notes: 'Wi-Fi is listed as complimentary in the revised proposal.',
  },
  {
    id: 'meeting-rental', category: 'Meeting room rental', label: 'Meeting room rental', originalValue: '$18,450', revisedValue: '$11,294', numericImpact: -7156, humanReadableImpact: '-$7,156', estimatedEventImpact: '-$7,156 estimated', status: 'improved',
    originalSource: { file: 'Proposal_v1.pdf', section: 'Meeting rooms', excerpt: 'Meeting room rental: $18,450 for three event days.' }, revisedSource: { file: 'Proposal_v2.pdf', section: 'Meeting rooms', excerpt: 'Meeting room rental: $11,294 for three event days.' }, notes: 'The revised room package includes a lower meeting room rental line item.',
  },
  {
    id: 'cancellation', category: 'Cancellation deadline', label: 'Cancellation deadline', originalValue: '30 days before event', revisedValue: '45 days before event', humanReadableImpact: 'More flexibility', status: 'improved',
    originalSource: { file: 'Proposal_v1.pdf', section: 'Cancellation', excerpt: 'Cancellation permitted up to 30 days before arrival.' }, revisedSource: { file: 'Proposal_v2.pdf', section: 'Cancellation', excerpt: 'Cancellation permitted up to 45 days before arrival.' }, notes: 'The revised deadline gives the planning team more flexibility before the event.',
  },
  {
    id: 'fb-minimum', category: 'Food & beverage minimum', label: 'Food & beverage minimum', originalValue: '$28,000', revisedValue: '$31,200', numericImpact: 3200, humanReadableImpact: '+$3,200 commitment', status: 'tradeoff',
    originalSource: { file: 'Proposal_v1.pdf', section: 'Food & Beverage', excerpt: 'Estimated food and beverage minimum: $28,000 before service charge and taxes.' }, revisedSource: { file: 'Proposal_v2.pdf', section: 'Food & Beverage', excerpt: 'Estimated food and beverage minimum: $31,200 before service charge and taxes.' }, notes: 'Revised catering minimum appears in the updated proposal submitted after negotiation.',
  },
  {
    id: 'room-block', category: 'Room block commitment', label: 'Room block commitment', originalValue: '42 rooms / night', revisedValue: '48 rooms / night', humanReadableImpact: '+6 rooms / night', status: 'tradeoff',
    originalSource: { file: 'Proposal_v1.pdf', section: 'Guest room block', excerpt: 'Committed room block: 42 rooms per night.' }, revisedSource: { file: 'Proposal_v2.pdf', section: 'Guest room block', excerpt: 'Committed room block: 48 rooms per night.' }, notes: 'The revised proposal requests a larger room block commitment each night.',
  },
  {
    id: 'cancellation-language', category: 'Contract language', label: 'Cancellation language', originalValue: 'Standard language', revisedValue: 'Updated clause', humanReadableImpact: 'Review wording', status: 'review',
    originalSource: { file: 'Proposal_v1.pdf', section: 'Cancellation terms', excerpt: 'Standard cancellation language applies.' }, revisedSource: { file: 'Proposal_v2.pdf', section: 'Cancellation terms', excerpt: 'Updated cancellation terms included in revised agreement.' }, notes: 'The revised proposal contains updated cancellation terms beyond the date change.',
  },
  {
    id: 'destination-fee', category: 'Resort / destination fee', label: 'Resort / destination fee', originalValue: '$24 / room / night', revisedValue: '$24 / room / night', humanReadableImpact: 'No change', status: 'unchanged',
    originalSource: { file: 'Proposal_v1.pdf', section: 'Taxes & fees', excerpt: 'Destination fee: $24 per room, per night.' }, revisedSource: { file: 'Proposal_v2.pdf', section: 'Taxes & fees', excerpt: 'Destination fee: $24 per room, per night.' }, notes: 'This line item stayed the same between versions.',
  },
]

export const proposalHistory = [
  { label: 'Original proposal', time: 'Aug 12 · 10:42 AM' },
  { label: 'Negotiation started', time: 'Aug 12 · 11:03 AM' },
  { label: 'Revised proposal received', time: 'Aug 13 · 9:18 AM' },
  { label: 'Review opened', time: 'Today' },
]
