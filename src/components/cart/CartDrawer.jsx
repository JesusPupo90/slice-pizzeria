import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import { useCart, useCartDispatch } from '../../context/CartContext'
import { formatPrice } from '../../utils/currencyFormatter'

export default function CartDrawer() {
  const { t, i18n } = useTranslation()
  const { isOpen, items, subtotal, totalItems } = useCart()
  const dispatch = useCartDispatch()
  const lang = i18n.language?.split('-')[0] || 'es'

  /** Closes the cart drawer when the Escape key is pressed. */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dispatch({ type: 'CLOSE_CART' })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])

  /** Closes the drawer and opens the checkout modal. */
  const handleStartCheckout = () => {
    dispatch({ type: 'CLOSE_CART' })
    dispatch({ type: 'OPEN_CHECKOUT' })
  }

  if (!isOpen) return null
  
  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-charcoal border-l border-white/10 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-heading text-2xl text-text-light">
            {t('cart.title')}
            <span className="font-body text-sm text-text-muted ml-2">
              ({totalItems})
            </span>
          </h2>
          <button
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
            className="p-2 text-text-muted hover:text-text-light transition-colors"
            aria-label={t('navbar.close')}
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <ShoppingBag size={64} className="text-text-muted/40" />
            <p className="font-body text-text-muted text-lg">{t('cart.empty')}</p>
            <button
              onClick={() => dispatch({ type: 'CLOSE_CART' })}
              className="font-body text-sm font-semibold bg-brand-primary hover:bg-brand-hover text-text-light px-6 py-2 rounded-lg transition-colors"
            >
              {t('cart.continueShopping')}
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size ?? ''}-${index}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name[lang]}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-body text-sm font-semibold text-text-light truncate">
                      {item.product.name[lang]}
                    </h3>
                    <p className="font-body text-xs text-text-muted mt-0.5">
                      {item.size ? t(`menu.sizes.${item.size}`) : ''}
                    </p>
                    <p className="font-body text-sm text-brand-primary font-semibold mt-1">
                      {formatPrice(item.product.prices?.[item.size] ?? item.product.price, lang)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity: item.quantity - 1 } })
                      }
                      className="p-1.5 text-text-muted hover:text-text-light transition-colors rounded-lg hover:bg-white/10"
                      aria-label={`${t('cart.quantity')} -`}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-body text-sm text-text-light w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity: item.quantity + 1 } })
                      }
                      className="p-1.5 text-text-muted hover:text-text-light transition-colors rounded-lg hover:bg-white/10"
                      aria-label={`${t('cart.quantity')} +`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: index })}
                    className="p-2 text-text-muted hover:text-red-400 transition-colors"
                    aria-label={t('cart.remove')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/10 bg-surface-charcoal space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between font-body text-sm text-text-muted">
                  <span>{t('cart.subtotal')}</span>
                  <span>{formatPrice(subtotal, lang)}</span>
                </div>
                <div className="flex justify-between font-heading text-xl text-text-light">
                  <span>{t('cart.total')}</span>
                  <span className="text-brand-primary">{formatPrice(subtotal, lang)}</span>
                </div>
              </div>

              <button
                onClick={() => dispatch({ type: 'OPEN_CHECKOUT' })}
                className="w-full bg-brand-primary hover:bg-brand-hover text-text-light font-body font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {t('cart.checkout')}
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="w-full text-center font-body text-xs text-text-muted hover:text-red-400 transition-colors"
              >
                {t('cart.clearCart')}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
