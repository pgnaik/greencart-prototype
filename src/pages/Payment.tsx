
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

declare global {
  interface Window { Razorpay?: any }
}

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

export default function Payment() {
  const nav = useNavigate()
  const { total, clear } = useCart()
  const [ready, setReady] = useState(false)
  const [usingRzp, setUsingRzp] = useState(false)

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js').then(ok => setReady(ok))
  }, [])

  const payRazorpay = async () => {
    if (!window.Razorpay) return alert('Razorpay JS failed to load. Using mock payment instead.')
    const key = import.meta.env.VITE_RAZORPAY_KEY
    if (!key) return alert('No VITE_RAZORPAY_KEY found. Using mock payment instead.')

    setUsingRzp(true)
    const options = {
      key,
      amount: total * 100,
      currency: 'INR',
      name: 'GreenCart',
      description: 'Prototype payment',
      handler: function (response: any) {
        setUsingRzp(false)
        clear()
        nav('/confirmation', { state: { paymentId: response.razorpay_payment_id || 'test_payment' } })
      },
      prefill: { name: 'Demo User', email: 'demo@example.com' }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const mockPay = () => {
    clear()
    nav('/confirmation', { state: { paymentId: 'mock_payment_' + Math.random().toString(36).slice(2,8) } })
  }

  return (
    <div className="card p-6 max-w-lg mx-auto text-center">
      <div className="text-lg font-semibold">Payment</div>
      <div className="mt-2 text-sm">Amount payable</div>
      <div className="text-2xl font-extrabold">₹{total.toLocaleString('en-IN')}</div>

      <div className="mt-4 grid gap-3">
        <button className="btn btn-primary" onClick={payRazorpay} disabled={!ready || usingRzp}>
          {usingRzp ? 'Opening Razorpay…' : 'Pay with Razorpay (test)'}
        </button>
        <button className="btn btn-ghost" onClick={mockPay}>Mock Pay (no gateway)</button>
      </div>
      <div className="mt-2 text-xs text-neutral-500">For a real test, set <code>VITE_RAZORPAY_KEY</code> in <code>.env</code> (Razorpay Test Key).</div>
    </div>
  )
}
