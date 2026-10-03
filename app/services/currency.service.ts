import { create } from 'zustand'
import { Currency } from './format.service'
import { getCurrency, setCurrency as saveCurrency } from './storage.service'

export const CURRENCIES: Currency[] = ['USD', 'KHR']

export const useCurrency = create<{ currency: Currency; setCurrency: (currency: Currency) => void }>(set => ({
    currency: (getCurrency() as Currency) || 'USD',
    setCurrency: currency => {
        saveCurrency(currency)
        set({ currency })
    },
}))
