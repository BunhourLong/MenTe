export type Currency = 'USD' | 'KHR'
export type PriceRange = { min: number; max: number }

// ponytail: fixed rate, the riel has held near 4,000 per dollar for years; fetch a live rate if it drifts.
export const KHR_PER_USD = 4000

// Prices are stored in USD. Riel is rounded to the nearest 100, the smallest note in common use.
export function formatPriceRange({ min, max }: PriceRange, currency: Currency): string {
    if (currency === 'KHR') {
        const riel = (usd: number) => (Math.round((usd * KHR_PER_USD) / 100) * 100).toLocaleString('en-US')
        return min === max ? `${riel(min)}៛` : `${riel(min)} – ${riel(max)}៛`
    }
    const usd = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    return min === max ? usd(min) : `${usd(min)} – ${usd(max)}`
}
