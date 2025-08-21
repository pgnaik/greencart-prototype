
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const nav = useNavigate()
  const { total } = useCart()
  const [form, setForm] = useState({ name: '', email: '', address: '', pin: '' })
  const canPay = form.name && form.email && form.address && form.pin

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 card p-4">
        <div className="text-lg font-semibold">Shipping Details</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input className="input" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="input sm:col-span-2" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <input className="input" placeholder="PIN code" value={form.pin} onChange={e => setForm({ ...form, pin: e.target.value })} />
        </div>
      </div>
      <aside className="card p-4 h-fit">
        <div className="text-lg font-semibold">Payment</div>
        <div className="mt-2 text-sm">Amount payable</div>
        <div className="text-2xl font-extrabold">₹{total.toLocaleString('en-IN')}</div>
        <button className="mt-3 w-full btn btn-primary" disabled={!canPay} onClick={() => nav('/payment')}>Continue to Payment</button>
        {!canPay && <div className="mt-2 text-xs text-neutral-500">Fill shipping details to continue.</div>}
      </aside>
    </div>
  )
}
