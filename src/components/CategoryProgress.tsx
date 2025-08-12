import React, { useMemo } from 'react'
import type { Item } from '../types'
import ProgressBar from './ProgressBar'

export default function CategoryProgress({ items }: { items: Item[] }) {
  const categories = useMemo(() => {
    const map = new Map<string, { total: number, done: number }>()
    for (const it of items) {
      const cur = map.get(it.category) || { total: 0, done: 0 }
      cur.total += 1
      if (it.status === 'Completed') cur.done += 1
      map.set(it.category, cur)
    }
    return Array.from(map.entries()).sort((a,b) => a[0].localeCompare(b[0]))
  }, [items])

  return (
    <div className="card p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Progress by Category</h2>
      </div>
      <div className="space-y-4">
        {categories.map(([cat, v]) => (
          <div key={cat} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            <div className="md:col-span-1 text-sm font-medium text-gray-800">{cat}</div>
            <div className="md:col-span-4"><ProgressBar value={v.done} total={v.total} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}
