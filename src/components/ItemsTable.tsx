import React, { useMemo, useState } from 'react'
import type { Item } from '../types'
import { StatusBadge, CategoryTag } from './Badges'
import { Search } from 'lucide-react'

const STATUS_ORDER = ['Not Started', 'In Progress', 'Completed', 'Stalled']

function fmt(d?: string) {
  if (!d) return '—'
  const dx = new Date(d)
  return isNaN(dx.getTime()) ? '—' : dx.toLocaleDateString()
}

export default function ItemsTable({ items }: { items: Item[] }) {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState<'status' | 'targetDate' | 'lastUpdated'>('status')

  const filtered = useMemo(() => {
    return items.filter(it => {
      const hit = (it.action + ' ' + it.description + ' ' + it.timingBasis + ' ' + it.notes)
        .toLowerCase().includes(q.toLowerCase())
      const stOk = !status || it.status === status
      const catOk = !category || it.category === category
      return hit && stOk && catOk
    }).sort((a,b) => {
      if (sort === 'status') return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
      if (sort === 'targetDate') return (a.targetDate || '').localeCompare(b.targetDate || '')
      return (b.lastUpdated || '').localeCompare(a.lastUpdated || '')
    })
  }, [items, q, status, category, sort])

  const cats = Array.from(new Set(items.map(i => i.category)))

  return (
    <div className="card p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold">All Trackable Items</h2>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <input className="border border-gray-300 rounded-xl pl-9 pr-3 py-2" placeholder="Search" value={q} onChange={(e)=>setQ(e.target.value)} />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <select className="border border-gray-300 rounded-xl px-3 py-2" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="">All statuses</option>
            {STATUS_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="border border-gray-300 rounded-xl px-3 py-2" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All categories</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="border border-gray-300 rounded-xl px-3 py-2" value={sort} onChange={(e)=>setSort(e.target.value as any)}>
            <option value="status">Sort: Status</option>
            <option value="targetDate">Sort: Target Date</option>
            <option value="lastUpdated">Sort: Last Updated</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">Window End</th>
              <th className="px-3 py-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(it => (
              <tr key={it.id} className="border-t">
                <td className="px-3 py-3">
                  <div className="font-medium text-gray-900">{it.action}</div>
                  <div className="text-gray-600">{it.description}</div>
                  {it.timingBasis && <div className="text-xs text-gray-500 mt-1">
                    Timing: “{it.timingBasis}”
                  </div>}
                  {it.notes && <div className="text-xs text-gray-500 mt-1">Notes: {it.notes}</div>}
                </td>
                <td className="px-3 py-3"><CategoryTag category={it.category} /></td>
                <td className="px-3 py-3"><StatusBadge status={it.status} /></td>
                <td className="px-3 py-3">{fmt(it.targetDate)}</td>
                <td className="px-3 py-3">{fmt(it.windowEnd)}</td>
                <td className="px-3 py-3">{fmt(it.lastUpdated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
