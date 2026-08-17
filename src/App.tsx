import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, CircleAlert, CircleHelp, Clock3, Columns3, ExternalLink, FileText, Filter, Flag, History, Info, Layers3, MessageSquareText, Share2, Sparkles, ThumbsUp, X, Zap,
} from 'lucide-react'
import { demoEvent, negotiationSummary, proposalChanges, proposalHistory } from './data'
import type { ChangeStatus, ProposalChange, ProposalSource } from './types'

type FilterKey = 'all' | ChangeStatus
type ModalType = 'negotiation' | 'share' | null

const statusLabels: Record<ChangeStatus, string> = { improved: 'Improved', tradeoff: 'Trade-off', review: 'Needs review', unchanged: 'No change' }
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function Button({ children, variant = 'secondary', onClick, icon, className = '', type = 'button' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'soft'; onClick?: () => void; icon?: React.ReactNode; className?: string; type?: 'button' | 'submit' }) {
  return <button type={type} className={'button button-' + variant + ' ' + className} onClick={onClick}>{icon}{children}</button>
}

function IconButton({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return <button aria-label={label} title={label} className="icon-button" onClick={onClick}>{children}</button>
}

function BrandMark() {
  return <div className="brand-lockup"><span className="brand-mark"><span /></span><span className="brand-name">nowadays</span></div>
}

function StatusBadge({ status }: { status: ChangeStatus }) {
  const Icon = status === 'improved' ? CheckCircle2 : status === 'tradeoff' ? CircleAlert : status === 'review' ? Info : Check
  return <span className={'status-badge status-' + status}><Icon size={14} />{statusLabels[status]}</span>
}

function AppHeader({ activeView, onViewChange, onShare }: { activeView: string; onViewChange: (view: string) => void; onShare: () => void }) {
  return <>
    <header className="topbar">
      <BrandMark />
      <div className="topbar-divider" />
      <div className="topbar-context"><span>Events</span><ChevronRight size={14} /><strong>{demoEvent.name}</strong></div>
      <div className="topbar-actions"><span className="concept-label">Speculative product concept</span><Button variant="ghost" onClick={onShare} icon={<Share2 size={16} />}>Share for review</Button><IconButton label="Help"><CircleHelp size={18} /></IconButton></div>
    </header>
    <nav className="subnav" aria-label="Negotiation review navigation">
      <div className="event-context"><span className="venue-avatar">MM</span><div><strong>{demoEvent.venue}</strong><span>Revised proposal received</span></div></div>
      <div className="view-tabs"><button className={activeView === 'summary' ? 'is-active' : ''} onClick={() => onViewChange('summary')}>Summary</button><button className={activeView === 'impact' ? 'is-active' : ''} onClick={() => onViewChange('impact')}>Negotiation impact</button><button className={activeView === 'decision' ? 'is-active' : ''} onClick={() => onViewChange('decision')}>Decision</button></div>
      <span className="complete-badge"><Check size={13} /> Negotiation complete</span>
    </nav>
  </>
}

function EventMeta() {
  return <div className="event-meta"><span><Clock3 size={15} /> {demoEvent.dates}</span><span><Layers3 size={15} /> {demoEvent.location}</span><span><Sparkles size={15} /> {demoEvent.guests} guests</span><span className="demo-tag">DEMO DATA</span></div>
}

function ImpactCard({ onFilter }: { onFilter: (filter: FilterKey) => void }) {
  return <section className="impact-card">
    <div className="impact-card-head"><div><div className="eyebrow">Top impact</div><h2>Headline savings, with the context attached</h2></div><span className="impact-spark"><Zap size={17} /></span></div>
    <div className="total-compare"><div><span>Before negotiation</span><strong>{money.format(negotiationSummary.originalTotal)}</strong></div><ArrowRight size={22} /><div><span>Revised proposal</span><strong className="revised-total">{money.format(negotiationSummary.revisedTotal)}</strong></div><div className="net-save"><span>Net difference</span><strong>Save {money.format(negotiationSummary.netImprovement)}</strong></div></div>
    <div className="impact-counts"><button onClick={() => onFilter('improved')}><span className="count-icon improved"><CheckCircle2 size={14} /></span><strong>{negotiationSummary.improvementsCount}</strong><span>improvements</span></button><button onClick={() => onFilter('tradeoff')}><span className="count-icon tradeoff"><CircleAlert size={14} /></span><strong>{negotiationSummary.tradeoffsCount}</strong><span>trade-offs</span></button><button onClick={() => onFilter('review')}><span className="count-icon review"><Info size={14} /></span><strong>{negotiationSummary.reviewCount}</strong><span>item needs review</span></button></div>
  </section>
}

function ChangeRow({ change, onOpen }: { change: ProposalChange; onOpen: () => void }) {
  return <button className={'change-row row-' + change.status} onClick={onOpen}>
    <div className="change-label"><span className="change-icon"><StatusGlyph status={change.status} /></span><div><strong>{change.label}</strong><span>{change.category}</span></div></div>
    <div className="change-value"><span className="row-label">Original</span><strong>{change.originalValue}</strong></div>
    <div className="change-value"><span className="row-label">Revised</span><strong>{change.revisedValue}</strong></div>
    <div className="change-difference"><span className="row-label">Difference</span><strong>{change.humanReadableImpact}</strong>{change.estimatedEventImpact && <span>{change.estimatedEventImpact}</span>}</div>
    <div className="change-status"><StatusBadge status={change.status} /><ChevronRight size={16} /></div>
  </button>
}

function StatusGlyph({ status }: { status: ChangeStatus }) {
  const Icon = status === 'improved' ? CheckCircle2 : status === 'tradeoff' ? CircleAlert : status === 'review' ? Info : Check
  return <Icon size={16} />
}

function ChangesSection({ activeFilter, onFilter, onOpen }: { activeFilter: FilterKey; onFilter: (filter: FilterKey) => void; onOpen: (change: ProposalChange) => void }) {
  const filtered = useMemo(() => activeFilter === 'all' ? proposalChanges : proposalChanges.filter(change => change.status === activeFilter), [activeFilter])
  const counts: Record<FilterKey, number> = { all: proposalChanges.length, improved: 4, tradeoff: 2, review: 1, unchanged: 1 }
  return <section className="changes-section">
    <div className="section-header"><div><div className="eyebrow">Proposal delta</div><h2>What changed</h2><p>Meaningful differences between the original and revised proposal.</p></div><Button variant="ghost" icon={<Columns3 size={15} />}>View full proposal comparison <ExternalLink size={14} /></Button></div>
    <div className="filter-bar"><div className="filter-label"><Filter size={15} /> Filter changes</div>{(['all', 'improved', 'tradeoff', 'review'] as FilterKey[]).map(status => <button key={status} className={'filter-button ' + (activeFilter === status ? 'is-active' : '')} onClick={() => onFilter(status)}>{status === 'all' ? 'All changes' : statusLabels[status]}<span>{counts[status]}</span></button>)}</div>
    <div className="change-list">{filtered.map(change => <ChangeRow key={change.id} change={change} onOpen={() => onOpen(change)} />)}</div>
    <p className="section-footnote"><Info size={14} /> Estimated event impact is based on demo proposal values. Review source language before making a consequential decision.</p>
  </section>
}

function NegotiationImpact({ onOpen, onDecision }: { onOpen: (change: ProposalChange) => void; onDecision: () => void }) {
  const gained = proposalChanges.filter(change => change.status === 'improved')
  const given = proposalChanges.filter(change => change.status === 'tradeoff')
  const needsReview = proposalChanges.filter(change => change.status === 'review')
  return <section className="impact-view">
    <div className="impact-view-intro"><div><div className="eyebrow">Negotiation impact</div><h1>What did you gain, give up, and still need to review?</h1><p>The revised proposal is lower overall. This view keeps the trade-offs visible so a human can decide what matters for this event.</p></div><div className="impact-stat"><span>Estimated net improvement</span><strong>{money.format(negotiationSummary.netImprovement)}</strong><small>based on proposal changes</small></div></div>
    <div className="impact-columns"><ImpactGroup title="You gained" tone="improved" icon={<ThumbsUp size={17} />} changes={gained} onOpen={onOpen} /><ImpactGroup title="You gave up" tone="tradeoff" icon={<CircleAlert size={17} />} changes={given} onOpen={onOpen} /><ImpactGroup title="Needs review" tone="review" icon={<Info size={17} />} changes={needsReview} onOpen={onOpen} /></div>
    <NetValueBreakdown />
    <div className="impact-next"><div><strong>Ready to decide?</strong><span>Review the remaining language, then choose the next step.</span></div><Button variant="primary" onClick={onDecision} icon={<ArrowRight size={16} />}>Go to decision</Button></div>
  </section>
}

function ImpactGroup({ title, tone, icon, changes, onOpen }: { title: string; tone: ChangeStatus; icon: React.ReactNode; changes: ProposalChange[]; onOpen: (change: ProposalChange) => void }) {
  return <div className={'impact-group group-' + tone}><div className="group-header"><span className="group-icon">{icon}</span><div><h2>{title}</h2><span>{changes.length} {changes.length === 1 ? 'item' : 'items'}</span></div></div><div className="group-items">{changes.map(change => <button key={change.id} onClick={() => onOpen(change)}><span><strong>{change.label}</strong><small>{change.notes}</small></span><b>{change.estimatedEventImpact || change.humanReadableImpact}</b><ChevronRight size={15} /></button>)}</div></div>
}

function NetValueBreakdown() {
  return <section className="net-breakdown"><div><div className="eyebrow">Net value breakdown</div><h2>Why the headline moved</h2><p>Estimated based on proposal changes</p></div><div className="calculation"><div><span>Gross savings</span><strong>{money.format(negotiationSummary.grossSavings)}</strong></div><span className="minus">−</span><div><span>New commitments</span><strong className="commitment">+{money.format(negotiationSummary.newCommitments)}</strong></div><span className="equals">=</span><div className="net-result"><span>Estimated net improvement</span><strong>{money.format(negotiationSummary.netImprovement)}</strong></div></div></section>
}

function DecisionView({ accepted, onAccept, onNegotiate, onShare }: { accepted: boolean; onAccept: () => void; onNegotiate: () => void; onShare: () => void }) {
  return <section className="decision-view"><div className="decision-copy"><div className="eyebrow">Decision</div><h1>{accepted ? 'Revised proposal accepted for review' : 'Is this revised proposal ready to move forward?'}</h1><p>{accepted ? 'This is a prototype state. No contract has been signed and no action has been sent to the venue.' : 'You have a lower total, two visible commitments, and one piece of language that deserves a human read.'}</p><span className="decision-trust"><Info size={15} /> Nowadays organizes the change. You decide what it means for this event.</span></div><div className="decision-card"><div className="decision-summary"><div><span>Estimated savings</span><strong>{money.format(negotiationSummary.netImprovement)}</strong></div><div><span>Improvements</span><strong>{negotiationSummary.improvementsCount}</strong></div><div><span>Trade-offs</span><strong>{negotiationSummary.tradeoffsCount}</strong></div><div><span>Needs review</span><strong className="review-number">{negotiationSummary.reviewCount}</strong></div></div>{accepted ? <div className="accepted-state"><CheckCircle2 size={20} /><div><strong>Saved as a prototype decision</strong><span>Next step: confirm the cancellation language with your team.</span></div></div> : <div className="decision-actions"><Button variant="primary" onClick={onAccept} icon={<Check size={16} />}>Accept revised proposal</Button><Button variant="secondary" onClick={onNegotiate} icon={<MessageSquareText size={16} />}>Continue negotiation</Button><Button variant="ghost" onClick={onShare} icon={<Share2 size={16} />}>Share for review</Button></div>}</div></section>
}

function ProposalHistory() {
  return <section className="proposal-history"><div className="eyebrow"><History size={13} /> Proposal history</div><div className="history-list">{proposalHistory.map((item, index) => <div key={item.label} className={index === proposalHistory.length - 1 ? 'is-current' : ''}><span className="history-dot">{index === proposalHistory.length - 1 ? <span /> : <Check size={11} />}</span><div><strong>{item.label}</strong><span>{item.time}</span></div></div>)}</div></section>
}

function SourceToggle({ source, selected, onClick }: { source: 'original' | 'revised'; selected: boolean; onClick: () => void }) {
  return <button className={'source-toggle ' + (selected ? 'is-active' : '')} onClick={onClick}>{source === 'original' ? 'Original proposal' : 'Revised proposal'}<span>{source === 'original' ? 'v1' : 'v2'}</span></button>
}

function ChangeDrawer({ change, onClose }: { change: ProposalChange; onClose: () => void }) {
  const [source, setSource] = useState<'original' | 'revised'>('revised')
  const activeSource: ProposalSource = source === 'original' ? change.originalSource : change.revisedSource
  useEffect(() => { const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; document.addEventListener('keydown', handleKey); return () => document.removeEventListener('keydown', handleKey) }, [onClose])
  return <div className="overlay" onMouseDown={event => event.target === event.currentTarget && onClose()}><aside className="drawer" role="dialog" aria-modal="true" aria-label={change.label + ' change details'}><div className="drawer-top"><div><div className="eyebrow">Change inspection</div><h2>{change.label}</h2></div><IconButton label="Close change details" onClick={onClose}><X size={19} /></IconButton></div><StatusBadge status={change.status} /><div className="drawer-values"><div><span>Original proposal</span><strong>{change.originalValue}</strong></div><ArrowRight size={18} /><div><span>Revised proposal</span><strong>{change.revisedValue}</strong></div><div className={'drawer-diff diff-' + change.status}><span>Difference</span><strong>{change.humanReadableImpact}</strong></div></div><section className="drawer-section"><div className="drawer-section-title"><Sparkles size={15} /> Why this changed</div><p>{change.notes}</p><span className="speculative-note"><Info size={14} /> This is a demo interpretation of the proposal change, not an AI explanation.</span></section><section className="drawer-section"><div className="drawer-section-title"><FileText size={15} /> Source</div><div className="source-switcher"><SourceToggle source="original" selected={source === 'original'} onClick={() => setSource('original')} /><SourceToggle source="revised" selected={source === 'revised'} onClick={() => setSource('revised')} /></div><div className="source-preview"><div className="source-file"><FileText size={16} /><div><strong>{activeSource.file}</strong><span>{activeSource.section}</span></div><span className="demo-source">Demo source excerpt</span></div><p>“{activeSource.excerpt}”</p></div><div className="source-actions"><Button variant="ghost" icon={<ExternalLink size={15} />}>View {source === 'original' ? 'original' : 'revised'} proposal</Button><Button variant="soft" icon={<Flag size={15} />}>Flag for review</Button></div></section><ProposalHistory /><div className="drawer-footer"><Button variant="secondary" onClick={onClose}>Close</Button><Button variant="primary" onClick={onClose} icon={<Check size={15} />}>Confirm value</Button></div></aside></div>
}

function NegotiationModal({ onClose }: { onClose: () => void }) {
  const [option, setOption] = useState('Lower F&B minimum')
  const [context, setContext] = useState('')
  return <ModalShell onClose={onClose}><div className="modal-icon"><MessageSquareText size={20} /></div><div className="modal-copy"><div className="eyebrow">Continue negotiation</div><h2>What would you like to improve?</h2><p>Prepare a negotiation request for your review. This prototype does not send anything to the venue.</p><div className="option-list">{['Lower F&B minimum', 'Reduce room-block commitment', 'Improve cancellation terms', 'Other'].map(item => <button key={item} className={option === item ? 'is-selected' : ''} onClick={() => setOption(item)}><span className="radio-dot" />{item}</button>)}</div><textarea value={context} onChange={event => setContext(event.target.value)} placeholder="Add context" rows={3} /><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="primary" onClick={onClose}>Prepare negotiation request</Button></div></div></ModalShell>
}

function ShareModal({ onClose }: { onClose: () => void }) {
  const [shared, setShared] = useState(false)
  return <ModalShell onClose={onClose}><div className="modal-icon modal-icon-share"><Share2 size={20} /></div><div className="modal-copy">{shared ? <><div className="eyebrow">Ready to share</div><h2>Summary prepared</h2><p>This is a lightweight prototype state. No messages have been sent.</p><div className="share-ready"><CheckCircle2 size={17} /> Finance, Event lead, and Executive sponsor are selected.</div><div className="modal-actions"><Button variant="primary" onClick={onClose}>Done</Button></div></> : <><div className="eyebrow">Share for review</div><h2>Share negotiation summary</h2><p>Give your reviewers the context behind the revised proposal.</p><div className="share-summary"><span>Net savings</span><strong>{money.format(negotiationSummary.netImprovement)}</strong><span>Trade-offs</span><strong>{negotiationSummary.tradeoffsCount}</strong><span>Needs review</span><strong>{negotiationSummary.reviewCount}</strong><span>Decision deadline</span><strong>Aug 18, 2026</strong></div><div className="recipient-list">{['Finance', 'Event lead', 'Executive sponsor'].map(item => <label key={item}><input type="checkbox" defaultChecked />{item}</label>)}</div><div className="modal-actions"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="primary" onClick={() => setShared(true)} icon={<Share2 size={15} />}>Prepare share</Button></div></>}</div></ModalShell>
}

function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return <div className="overlay modal-overlay" onMouseDown={event => event.target === event.currentTarget && onClose()}><div className="modal" role="dialog" aria-modal="true">{children}<IconButton label="Close dialog" onClick={onClose}><X size={18} /></IconButton></div></div>
}

function App() {
  const query = new URLSearchParams(window.location.search)
  const [activeView, setActiveView] = useState(query.get('view') || 'summary')
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [selectedChange, setSelectedChange] = useState<ProposalChange | null>(() => {
    const drawerId = query.get('drawer')
    return proposalChanges.find(change => change.id === drawerId) || null
  })
  const [modal, setModal] = useState<ModalType>(null)
  const [accepted, setAccepted] = useState(false)

  const openFilter = (filter: FilterKey) => { setActiveFilter(filter); setActiveView('summary'); window.setTimeout(() => document.getElementById('what-changed')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0) }

  return <div className="app-shell"><AppHeader activeView={activeView} onViewChange={view => { setActiveView(view); window.scrollTo({ top: 0, behavior: 'smooth' }) }} onShare={() => setModal('share')} /><main className="main-content">
    <div className="page-intro"><div><button className="back-link"><ArrowLeft size={15} /> All events</button><div className="eyebrow">Venue proposal · Revised proposal received</div><h1>Your proposal changed</h1><p className="intro-copy">Nowadays negotiated a revised proposal. Review what improved, what changed, and what needs attention before deciding.</p><EventMeta /></div><div className="intro-side"><span className="review-status"><span />Ready for your review</span><span>Updated Aug 13, 2026</span></div></div>
    {activeView === 'summary' && <><ImpactCard onFilter={openFilter} /><div id="what-changed"><ChangesSection activeFilter={activeFilter} onFilter={openFilter} onOpen={setSelectedChange} /></div><DecisionView accepted={accepted} onAccept={() => setAccepted(true)} onNegotiate={() => setModal('negotiation')} onShare={() => setModal('share')} /></>}
    {activeView === 'impact' && <NegotiationImpact onOpen={setSelectedChange} onDecision={() => setActiveView('decision')} />}
    {activeView === 'decision' && <DecisionView accepted={accepted} onAccept={() => setAccepted(true)} onNegotiate={() => setModal('negotiation')} onShare={() => setModal('share')} />}
    <footer className="app-footer"><span><CircleHelp size={14} /> Speculative concept · All figures, proposals, venue names, and timestamps are fictional demo data.</span><span>Human review remains the final step.</span></footer>
  </main>{selectedChange && <ChangeDrawer change={selectedChange} onClose={() => setSelectedChange(null)} />}{modal === 'negotiation' && <NegotiationModal onClose={() => setModal(null)} />}{modal === 'share' && <ShareModal onClose={() => setModal(null)} />}</div>
}

export default App
