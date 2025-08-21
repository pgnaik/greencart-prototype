
import React from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { currency, discountPercent } from '../utils/format'

export default function ProductCard({ p }: { p: Product }) {
  const pct = discountPercent(p.price, p.mrp)
  return (
    <div className="card overflow-hidden">
      <Link to={`/products/${p.id}`} className="block aspect-[4/3] bg-neutral-100">
        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs">
          {p.isRecommended && <span className="badge border-emerald-200 text-emerald-700">Recommended</span>}
          <span className="badge border-emerald-200 text-emerald-700">Sustainable</span>
        </div>
        <h3 className="mt-1 text-lg font-semibold">
          <Link to={`/products/${p.id}`} className="hover:underline">{p.name}</Link>
        </h3>
        <div className="text-sm text-neutral-600">by {p.brand}</div>

        <div className="mt-2 flex items-end gap-2">
          <div className="text-xl font-semibold">{currency(p.currency, p.price)}</div>
          <div className="text-sm text-neutral-500 line-through">{currency(p.currency, p.mrp)}</div>
          {pct > 0 && <span className="badge border-rose-200 text-rose-700">{pct}% off</span>}
        </div>

        <p className="mt-2 text-sm text-neutral-700 line-clamp-3">{p.description}</p>

        <div className="mt-2 text-xs text-neutral-600">Eco Score: <b>{p.sustainabilityScore}/100</b> • Impact: <b>{p.scoreDeltaOnPurchase >= 0 ? '+' : ''}{p.scoreDeltaOnPurchase}</b></div>
      </div>
    </div>
  )
}
