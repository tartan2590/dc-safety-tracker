import React, { useEffect, useState } from 'react'
import { SHEET_CSV_URL } from './config'
import type { Item } from './types'
import { fetchCSV } from './lib/csv'
import KPIs from './components/KPIs'
import CategoryProgress from './components/CategoryProgress'
import ItemsTable from './components/ItemsTable'
import Hero from './components/Hero'

function useItems() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetchCSV(SHEET_CSV_URL)
      .then(data => { if (mounted) { setItems(data); setLoading(false) }})
      .catch(err => { if (mounted) { setError(err.message || String(err)); setLoading(false) }})
    return () => { mounted = false }
  }, [])

  return { items, loading, error }
}

export default function App() {
  const { items, loading, error } = useItems()

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <Hero />

      {loading && <div className="card p-6">Loading data…</div>}
      {error && <div className="card p-6 text-red-700">Error: {error}</div>}

      {!loading && !error && (
        <>
          <KPIs items={items} />
          <CategoryProgress items={items} />
          <ItemsTable items={items} />
        </>
      )}

      <footer className="text-center text-xs text-gray-500 py-6">
        Built with React · TailwindCSS · Google Sheets
      </footer>
    </div>
  )
}
