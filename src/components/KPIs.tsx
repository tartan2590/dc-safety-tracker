import React from 'react'
import type { Item } from '../types'

function countByStatus(items: Item[]) {
  const map: Record<string, number> = { 'Not Started': 0, 'In Progress': 0, 'Completed': 0, 'Stalled': 0 }
  for (const it of items) map[it.status] = (map[it.status] || 0) + 1
  return map
}

export default function KPIs({ items }: { items: Item[] }) {
  const total = items.length
  const byStatus = countByStatus(items)
  const completion = total ? Math.round(((byStatus['Completed'] || 0) / total) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="kpi"><div className="text-sm text-gray-500">Total Items</div><div className="text-3xl font-semibold">{total}</div></div>
      <div className="kpi"><div className="text-sm text-gray-500">Completed</div><div className="text-3xl font-semibold">{byStatus['Completed'] || 0}</div></div>
      <div className="kpi"><div className="text-sm text-gray-500">In Progress</div><div className="text-3xl font-semibold">{byStatus['In Progress'] || 0}</div></div>
      <div className="kpi"><div className="text-sm text-gray-500">Completion Rate</div><div className="text-3xl font-semibold">{completion}%</div></div>
    </div>
  )
}
