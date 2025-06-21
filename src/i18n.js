import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

// Detect browser language
function getDefaultLocale() {
  // Check localStorage first (user preference)
  const saved = localStorage.getItem('simplyki-locale')
  if (saved && ['en', 'de'].includes(saved)) {
    return saved
  }
  
  // Detect browser language
  const browserLang = navigator.language || navigator.languages[0]
  
  if (browserLang.startsWith('de')) {
    return 'de'
  }
  
  // Default to English
  return 'en'
}

// Create i18n instance
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    de
  },
  globalInjection: true,
  warnHtmlMessage: false
})

// Export locale switching function
export function setLocale(locale) {
  if (['en', 'de'].includes(locale)) {
    i18n.global.locale.value = locale
    localStorage.setItem('simplyki-locale', locale)
    
    // Update HTML lang attribute
    document.documentElement.lang = locale
    
    return true
  }
  return false
}

// Export current locale getter
export function getCurrentLocale() {
  return i18n.global.locale.value
}

// Export available locales
export const availableLocales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
]

export default i18n