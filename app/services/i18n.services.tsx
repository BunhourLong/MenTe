import { I18n } from 'i18n-js'
import { ViewProps } from 'react-native'
import React from 'react'
import english from '../translations/en.json'
import khmer from '../translations/kh.json'
import { getLanguage, setLanguage } from './storage.service'

export type strT = keyof typeof english & keyof typeof khmer
export enum langT {
  en = 'en',
  kh = 'kh',
}

const i18n = new I18n({
  en: english,
  kh: khmer,
})

// English stays the fallback so a key missing from kh.json renders English
// rather than the raw key name.
i18n.enableFallback = true
i18n.defaultLocale = langT.en
i18n.locale = (getLanguage() as langT) || langT.en

export const currentLocale = i18n.locale as langT

export const defaultValue = {
  language: currentLocale,
  setLanguage: (_: langT) => { },
}

export function strings(name: strT, params?: any) {
  return i18n.t(name, params)
}

export default i18n

export const LanguageContext = React.createContext(defaultValue)

export const useHookLanguage = () => React.useContext(LanguageContext)

export function LanguageProvider(props: ViewProps) {
  const [language, updateState] = React.useState<langT>(currentLocale)

  const updateLanguage = (lang: langT) => {
    i18n.locale = lang
    setLanguage(lang)
    updateState(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  )
}

export function useLocalDateCode() {
  const { language } = useHookLanguage()
  return { code: language === langT.kh ? 'km' : 'en' }
}
