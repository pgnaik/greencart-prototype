
// Convert credits to discount percentage: every 100 GC => +2% off, capped at 20%
export const creditsToPct = (credits: number) => Math.min(20, Math.floor(credits / 100) * 2)
