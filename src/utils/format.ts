
export const currency = (sym: string, val: number) => `${sym}${val.toLocaleString('en-IN')}`
export const discountPercent = (price: number, mrp: number) => Math.max(0, Math.round(((mrp - price) / mrp) * 100))
