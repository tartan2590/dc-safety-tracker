import React from 'react'

export default function Hero() {
  return (
    <div className="card p-6 md:p-10 bg-gradient-to-br from-brand-50 to-white">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">DC Safety & Enforcement Tracker</h1>
      <p className="text-gray-600 mt-2 max-w-3xl">
        Daily status of promises and actions announced for the federal takeover of Washington, D.C. policing and public safety operations. Data updates flow from a maintained Google Sheet.
      </p>
    </div>
  )
}
