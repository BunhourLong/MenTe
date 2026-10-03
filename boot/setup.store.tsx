import React from 'react'
import { createMMKV } from 'react-native-mmkv'
import { Host } from 'react-native-portalize'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import { LanguageProvider } from 'services/i18n.services'

const storage = createMMKV({ id: 'middleware' })

export const clientStorage = {
  setItem: (key: string, value: string) => {
    // Persistence is a cache optimization, not app-critical — never let a
    // failed write surface as a render error.
    try {
      storage.set(key, value)
    } catch (e) {
      console.warn(`[clientStorage] failed to persist "${key}" (${value?.length ?? 0} bytes)`, e)
    }
  },
  getItem: (key: string) => {
    try {
      const value = storage.getString(key)
      return value === undefined ? null : value
    } catch (e) {
      console.warn(`[clientStorage] failed to read "${key}"`, e)
      return null
    }
  },
  removeItem: (key: string) => {
    try {
      storage.remove(key)
    } catch (e) {
      console.warn(`[clientStorage] failed to remove "${key}"`, e)
    }
  },
}

const Routes = React.lazy(() => import('../app/routes'))

function App() {
  return function Setup() {
    return (
      <LanguageProvider>
        {/* Above Host, so portal content (modals) can read safe area insets too. */}
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Host>
            <React.Suspense fallback={null}>
              <Routes />
            </React.Suspense>
          </Host>
        </SafeAreaProvider>
      </LanguageProvider>
    )
  }
}

export default App
