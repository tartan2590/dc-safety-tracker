import Papa from 'papaparse'
import type { Item } from '../types'

export async function fetchCSV(url: string): Promise<Item[]> {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch CSV')
  const text = await res.text()
  const { data, errors } = Papa.parse(text, { header: true, skipEmptyLines: true })
  if (errors.length) console.warn('CSV parse warnings', errors)

  return (data as any[]).map((row, idx) => ({
    id: row.id || `row-${idx + 1}`,
    category: row.category,
    action: row.action,
    description: row.description,
    targetDate: row.targetDate || '',
    timingBasis: row.timingBasis || '',
    status: row.status,
    lastUpdated: row.lastUpdated || '',
    dependencies: row.dependencies || '',
    windowEnd: row.windowEnd || '',
    source: row.source || '',
    notes: row.notes || ''
  }))
}
