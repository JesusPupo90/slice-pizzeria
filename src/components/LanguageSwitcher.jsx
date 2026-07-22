import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const current = i18n.language

  const toggle = () => {
    const next = current === 'es' ? 'en' : 'es'
    i18n.changeLanguage(next)
  }

  return (
    <button
      onClick={toggle}
      className="text-sm font-body font-semibold uppercase tracking-wider text-text-light hover:text-brand-primary transition-colors duration-200"
      aria-label={t('language.' + current)}
    >
      {current === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
