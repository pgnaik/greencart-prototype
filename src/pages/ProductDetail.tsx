
import React, { useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import { currency } from '../utils/format'

export default function ProductDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const product = useMemo(() => PRODUCTS.find(p => p.id === id) || PRODUCTS[0], [id])
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  const subtotal = product.price * qty
  const ecoDelta = (product.scoreDeltaOnPurchase || 0) * qty

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="aspect-[4/3] rounded-2xl bg-neutral-100 overflow-hidden">
          <img src={product.image} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[product.image, product.image, product.image, product.image].map((src, i) => (
            <button key={i} className="aspect-square rounded-xl bg-neutral-100 overflow-hidden">
              <img src={src} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm text-neutral-600 mb-2"><Link to="/products" className="hover:underline">← Back to products</Link></div>
        <div className="flex items-center gap-2 text-xs">
          {product.isRecommended && <span className="badge border-emerald-200 text-emerald-700">Recommended</span>}
          <span className="badge border-emerald-200 text-emerald-700">Sustainable</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>
        <div className="text-sm text-neutral-600">Brand: <b>{product.brand}</b></div>

        <div className="mt-3 flex items-end gap-3">
          <div className="text-3xl font-extrabold">{currency(product.currency, product.price)}</div>
          <div className="text-sm text-neutral-500 line-through">{currency(product.currency, product.mrp)}</div>
        </div>

        <p className="mt-3 text-sm text-neutral-700">{product.longDescription || product.description}</p>

        <div className="mt-4 card p-4">
          <div className="flex items-center justify-between text-sm">
            <span>Sustainability Score</span>
            <b>{product.sustainabilityScore}/100</b>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded bg-neutral-100">
            <div className="h-full bg-emerald-500" style={{ width: `${product.sustainabilityScore}%` }} />
          </div>
          <div className="mt-2 text-sm text-emerald-700">Buying impact: {product.scoreDeltaOnPurchase >= 0 ? '+' : ''}{product.scoreDeltaOnPurchase}</div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm">Qty</span>
          <div className="flex items-center rounded-xl border bg-white">
            <button className="btn btn-ghost" onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
            <div className="w-10 text-center text-sm">{qty}</div>
            <button className="btn btn-ghost" onClick={() => setQty(q => q+1)}>+</button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { add(product, qty); nav('/cart') }}
          >Add to Cart</button>
        </div>

        <div className="mt-3 text-sm text-neutral-700">
          Subtotal: <b>{currency(product.currency, subtotal)}</b> • Eco Index change: <b className="text-emerald-700">{ecoDelta >= 0 ? `+${ecoDelta}` : ecoDelta}</b>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.badges.map(b => <span key={b} className="badge border-neutral-300">{b}</span>)}
        </div>
      </div>
    </div>
  )
}
