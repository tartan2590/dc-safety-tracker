import React from 'react'

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Not Started': 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-900',
    'Completed': 'bg-green-100 text-green-900',
    'Stalled': 'bg-red-100 text-red-900',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-2xl text-xs font-medium ${map[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  )
}

export function CategoryTag({ category }: { category: string }) {
  return (
    <span className="text-[10px] uppercase tracking-wide text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
      {category}
    </span>
  )
}
