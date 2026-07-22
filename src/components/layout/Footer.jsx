import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail } from 'lucide-react'

const navigationLinks = [
  { key: 'menu', href: '#menu' },
  { key: 'experience', href: '#experience' },
  { key: 'locations', href: '#locations' },
]

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  )
}

const socialLinks = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: XIcon, label: 'X' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-surface-charcoal border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <a href="#" className="font-heading text-3xl tracking-wide text-text-light hover:text-brand-primary transition-colors">
              {t('navbar.logo')}
            </a>
            <p className="text-text-muted text-sm leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-text-muted hover:text-brand-primary transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-body text-sm uppercase tracking-wider text-text-light font-semibold">
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-brand-primary transition-colors duration-200 text-sm"
                  >
                    {t(`navbar.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-body text-sm uppercase tracking-wider text-text-light font-semibold">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-primary mt-0.5 shrink-0" />
                <span className="text-text-muted text-sm">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-primary shrink-0" />
                <a href={`tel:${t('footer.phone')}`} className="text-text-muted hover:text-brand-primary transition-colors duration-200 text-sm">
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-primary shrink-0" />
                <a href={`mailto:${t('footer.email')}`} className="text-text-muted hover:text-brand-primary transition-colors duration-200 text-sm">
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-body text-sm uppercase tracking-wider text-text-light font-semibold">
              {t('footer.newsletter')}
            </h3>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-text-light text-sm placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors"
              />
              <button className="w-full px-4 py-2.5 bg-brand-primary hover:bg-brand-hover text-text-light text-sm font-semibold rounded-lg transition-colors duration-200">
                {t('footer.newsletterButton')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-text-muted text-xs">{t('footer.copyright')}</p>
          <p className="text-text-muted text-xs">{t('footer.developedBy')}</p>
        </div>
      </div>
    </footer>
  )
}
