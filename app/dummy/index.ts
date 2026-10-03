import cosmetics from './cosmetics.json'

export type Product = (typeof cosmetics)[number]

export const PRODUCTS: Product[] = cosmetics
