import React, { useMemo, useState } from 'react'
import { Search, FileText, FileType, Download, FolderOpen } from 'lucide-react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import { materials } from '../data/materials'
import { competencyList } from '../data/competencies'
import { formatDate } from '../utils/format'

const typeIcon = { PDF: FileText, DOCX: FileType }

export default function Materials() {
  const [query, setQuery] = useState('')
  const [competencyFilter, setCompetencyFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filterOptions = [
    { value: 'all', label: 'All competencies' },
    ...competencyList.map((c) => ({ value: c.id, label: c.name })),
  ]

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      const matchesQuery = m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase())
      const matchesCompetency = competencyFilter === 'all' || m.competencyId === competencyFilter
      return matchesQuery && matchesCompetency
    })
  }, [query, competencyFilter])

  const competencyName = (id) => competencyList.find((c) => c.id === id)?.name

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Learning Materials</h2>
        <p className="text-sm text-ink-700/70">Reference documents and guides to support your learning modules.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          icon={Search}
          placeholder="Search materials..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Select
          options={filterOptions}
          value={competencyFilter}
          onChange={(e) => setCompetencyFilter(e.target.value)}
          className="sm:w-56"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No materials found"
          description="Try a different search term or competency filter."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => {
            const Icon = typeIcon[m.type] || FileText
            return (
              <Card key={m.id} className="flex flex-col">
                <div className="mb-2 flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-navy-700">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <Badge tone="neutral">{m.type}</Badge>
                </div>
                <h3 className="text-sm font-semibold leading-snug text-ink-900">{m.title}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-700/70">{m.description}</p>
                <p className="mt-3 text-xs text-ink-700/50">
                  {competencyName(m.competencyId)} &middot; {m.pages} pages &middot; Updated {formatDate(m.updated)}
                </p>
                <Button size="sm" variant="secondary" className="mt-3 w-full" onClick={() => setSelected(m)}>
                  View details
                </Button>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
            <Button icon={Download}>Download (mock)</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-3 text-sm text-ink-700">
            <p>{selected.description}</p>
            <div className="grid grid-cols-2 gap-3 rounded-md bg-navy-50 p-3 text-xs">
              <div><span className="text-ink-700/50">Competency</span><p className="font-medium text-ink-900">{competencyName(selected.competencyId)}</p></div>
              <div><span className="text-ink-700/50">Format</span><p className="font-medium text-ink-900">{selected.type}</p></div>
              <div><span className="text-ink-700/50">Length</span><p className="font-medium text-ink-900">{selected.pages} pages</p></div>
              <div><span className="text-ink-700/50">Last updated</span><p className="font-medium text-ink-900">{formatDate(selected.updated)}</p></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
