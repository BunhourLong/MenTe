import { formatPriceRange } from '../app/services/format.service'

test('formatPriceRange', () => {
    expect(formatPriceRange({ min: 10, max: 20 }, 'USD')).toBe('$10 – $20')
    expect(formatPriceRange({ min: 12.5, max: 12.5 }, 'USD')).toBe('$12.5')
    expect(formatPriceRange({ min: 10, max: 20 }, 'KHR')).toBe('40,000 – 80,000៛')
    expect(formatPriceRange({ min: 7.49, max: 100 }, 'KHR')).toBe('30,000 – 400,000៛')
})
