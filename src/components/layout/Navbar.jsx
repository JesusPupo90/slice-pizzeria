import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart, useCartDispatch } from '../../context/CartContext'
import LanguageSwitcher from '../LanguageSwitcher'

const links = [
  { key: 'menu', href: '#menu' },
  { key: 'experience', href: '#experience' },
  { key: 'locations', href: '#locations' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const { totalItems } = useCart()
  const dispatch = useCartDispatch()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-surface-charcoal/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="font-heading text-2xl tracking-wide text-text-light hover:text-brand-primary transition-colors">
          {t('navbar.logo')}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="font-body text-sm uppercase tracking-wider text-text-light/80 hover:text-brand-primary transition-colors duration-200"
            >
              {t(`navbar.${link.key}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => dispatch({ type: 'OPEN_CART' })}
            className="relative p-2 text-text-light hover:text-brand-primary transition-colors"
            aria-label={t('navbar.cart')}
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-text-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 text-text-light hover:text-brand-primary transition-colors"
            aria-label={isOpen ? t('navbar.close') : t('navbar.menu')}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-surface-charcoal border-b border-white/10 px-4 pt-2 pb-6 space-y-4">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block font-body text-sm uppercase tracking-wider text-text-muted hover:text-brand-primary transition-colors duration-200"
            >
              {t(`navbar.${link.key}`)}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <LanguageSwitcher />
            <button
              onClick={() => { dispatch({ type: 'OPEN_CART' }); setIsOpen(false) }}
              className="relative p-2 text-text-muted hover:text-brand-primary transition-colors"
              aria-label={t('navbar.cart')}
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-text-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}