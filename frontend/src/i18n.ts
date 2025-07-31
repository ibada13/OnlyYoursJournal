import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18en from './assets/i18en.json'
import i18ar from './assets/i18ar.json'
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
en: i18en,
ar: i18ar

    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export default i18n
