import cosmetics from './cosmetics.json'
import trustedStores from './trustedstore.json'

export type Product = (typeof cosmetics)[number]

export const PRODUCTS: Product[] = cosmetics

// A store's `products` are ids into cosmetics.json, resolved here.
export type Store = Omit<(typeof trustedStores)[number], 'products'> & { products: Product[] }

export const STORES: Store[] = trustedStores.map(store => ({
    ...store,
    products: store.products.map(id => PRODUCTS.find(product => product.id === id)!),
}))
