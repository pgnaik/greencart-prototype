
# GreenCart Prototype (End-to-End Mock)

A shareable, runnable React + Vite + Tailwind prototype showing an end-to-end sustainable e‑commerce flow:
- Listing → Product detail → Cart → Checkout → Payment (mock + optional Razorpay test) → Confirmation
- Eco Index delta per item and CRED‑style Green Credits discount
- Clean, production‑like UI

## Quick Start (Local)
```bash
npm i
npm run dev
# open the URL printed in terminal
```

## (Optional) Razorpay Test Checkout
This prototype can open Razorpay's test checkout **without a backend**. Create a `.env` file in the project root:
```env
VITE_RAZORPAY_KEY=rzp_test_xxxxxxxxxxxx
```
Then restart `npm run dev` and use the **Pay with Razorpay (test)** button.

> Without a key (or if the script fails to load), use **Mock Pay** to simulate a successful payment and go to Confirmation.

## One‑Click Shareable Link (StackBlitz)
1) Visit https://stackblitz.com/ (no install).

2) Click **Create Project → Upload Project**, and upload the ZIP of this folder.

3) It will boot automatically and give you a shareable URL you can send to teammates.


## Deploy to Vercel (Free)
1) Push this project to a new GitHub repo.

2) Visit https://vercel.com/new and **Import** the repo.

3) Add `VITE_RAZORPAY_KEY` in **Project Settings → Environment Variables** (optional).

4) Vercel will build & give you a production link.


## Pages
- `/` Home
- `/products` Listing with filters
- `/products/:id` Detail page
- `/cart` Cart with Eco Index + Credits discount

- `/checkout` Shipping info

- `/payment` Razorpay test (optional) + Mock pay

- `/confirmation` Order confirmation

- `/profile` Placeholder for orders & credits history

## Notes
- Data is mocked in `src/data/products.ts`.

- Credits discount: every 100 GC → +2% off (cap 20%).

- This is a **prototype**: no backend/API calls; perfect for UI/flow & backend contract handoff.
