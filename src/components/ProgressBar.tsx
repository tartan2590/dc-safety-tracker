import React from 'react'

interface Props { value: number, total: number }
export default function ProgressBar({ value, total }: Props) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
      <div className="h-3 bg-brand-500" style={{ width: pct + '%' }} />
    </div>
  )
}
