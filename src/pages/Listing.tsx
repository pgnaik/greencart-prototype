
import React, { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

export default function Listing() {
  const [q, setQ] = useState('')
  const [recOnly, setRecOnly] = useState(true)
  const [minScore, setMinScore] = useState(70)

  const list = useMemo(() => {
    let l = [...PRODUCTS]
    const qq = q.toLowerCase()
    if (q.trim()) l = l.filter(p => (p.name + p.brand + p.description).toLowerCase().includes(qq))
    if (recOnly) l = l.filter(p => p.isRecommended)
    l = l.filter(p => p.sustainabilityScore >= minScore)
    return l
  }, [q, recOnly, minScore])

  return (
    <div className="grid gap-4">
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <input className="input w-64" placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={recOnly} onChange={e => setRecOnly(e.target.checked)} />
          Recommended only
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span>Min Eco Score</span>
          <input type="range" min={0} max={100} value={minScore} onChange={e => setMinScore(parseInt(e.target.value))} />
          <span className="w-8 text-right">{minScore}</span>
        </label>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
