import { PRODUCTS, STORES } from '../app/dummy'

// EAN-13 check digit: weights 1,3,1,3... over the first 12 digits.
const isEan13 = (code: string) => /^\d{13}$/.test(code)
    && [...code.slice(0, 12)].reduce((sum, d, i) => sum + Number(d) * (i % 2 ? 3 : 1), 0) % 10 === (10 - Number(code[12])) % 10

test('every product barcode is a unique, valid EAN-13', () => {
    PRODUCTS.forEach(p => expect([p.id, isEan13(p.barcode)]).toEqual([p.id, true]))
    expect(new Set(PRODUCTS.map(p => p.barcode)).size).toBe(PRODUCTS.length)
})

test('every store product id resolves', () => {
    STORES.forEach(s => s.products.forEach(p => expect(p).toBeDefined()))
})
