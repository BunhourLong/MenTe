import { createMMKV } from 'react-native-mmkv'

// Its own instance rather than boot's clientStorage: boot imports the i18n
// service, which reads the language at load time, so importing boot here would
// be circular.
const local_storage = createMMKV({ id: 'local_storage' })

export function setLanguage(language: string) {
    local_storage.set('language', language)
}

export function getLanguage() {
    return local_storage.getString('language')
}

export function setCurrency(currency: string) {
    local_storage.set('currency', currency)
}

export function getCurrency() {
    return local_storage.getString('currency')
}
