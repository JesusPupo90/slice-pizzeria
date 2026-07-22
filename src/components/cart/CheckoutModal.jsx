import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, CheckCircle, Pizza, CreditCard, DollarSign } from 'lucide-react'
import { useCart, useCartDispatch } from '../../context/CartContext'
import { formatPrice } from '../../utils/currencyFormatter'

export default function CheckoutModal() {
  const { t, i18n } = useTranslation()
  const { isCheckoutOpen, items, subtotal } = useCart()
  const dispatch = useCartDispatch()
  const lang = i18n.language?.split('-')[0] || 'es'

  /** Tracks the current screen: 'form' or 'success'. */
  const [step, setStep] = useState('form')
  /** Holds the checkout form field values. */
  const [form, setForm] = useState({ name: '', phone: '', address: '', payment: 'cash' })
  /** Randomly generated order number shown on success. */
  const [orderNumber, setOrderNumber] = useState('')

  /** Closes the modal when Escape is pressed. */
  useEffect(() => {
    if (!isCheckoutOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckoutOpen])

  if (!isCheckoutOpen) return null

  /** Generates an order number and transitions to the success screen. */
  const handleSubmit = (e) => {
    e.preventDefault()
    const num = `#SLICE-${Math.floor(1000 + Math.random() * 9000)}`
    setOrderNumber(num)
    setStep('success')
  }

  /**
   * Resets the modal state and dispatches cleanup actions.
   * Clears the cart only if the order was placed.
   */
  const handleClose = () => {
    if (step === 'success') {
      dispatch({ type: 'CLEAR_CART' })
      dispatch({ type: 'CLOSE_CART' })
    }
    setStep('form')
    setForm({ name: '', phone: '', address: '', payment: 'cash' })
    dispatch({ type: 'CLOSE_CHECKOUT' })
  }

  /** Returns an onChange handler bound to a specific form field. */
  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface-charcoal rounded-2xl border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
        {step === 'form' ? (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="font-heading text-2xl text-text-light">{t('checkout.title')}</h2>
              <button
                onClick={handleClose}
                className="p-2 text-text-muted hover:text-text-light transition-colors"
                aria-label={t('navbar.close')}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block font-body text-sm text-text-muted mb-1.5">{t('checkout.name')}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={updateField('name')}
                  placeholder={t('checkout.namePlaceholder')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 font-body text-base text-text-light placeholder-text-muted/50 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-body text-sm text-text-muted mb-1.5">{t('checkout.phone')}</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={updateField('phone')}
                  placeholder={t('checkout.phonePlaceholder')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 font-body text-base text-text-light placeholder-text-muted/50 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-body text-sm text-text-muted mb-1.5">{t('checkout.address')}</label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={updateField('address')}
                  placeholder={t('checkout.addressPlaceholder')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 font-body text-base text-text-light placeholder-text-muted/50 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div>
                <label className="block font-body text-sm text-text-muted mb-1.5">{t('checkout.paymentMethod')}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, payment: 'cash' }))}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border font-body text-sm font-semibold transition-all duration-200 ${
                      form.payment === 'cash'
                        ? 'bg-brand-primary border-brand-primary text-text-light'
                        : 'border-white/10 text-text-muted hover:border-brand-primary/50'
                    }`}
                  >
                    <DollarSign size={16} />
                    {t('checkout.cash')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, payment: 'card' }))}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border font-body text-sm font-semibold transition-all duration-200 ${
                      form.payment === 'card'
                        ? 'bg-brand-primary border-brand-primary text-text-light'
                        : 'border-white/10 text-text-muted hover:border-brand-primary/50'
                    }`}
                  >
                    <CreditCard size={16} />
                    {t('checkout.card')}
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm text-text-muted">
                  <span>{t('cart.subtotal')} ({items.length} {t('cart.items')})</span>
                  <span>{formatPrice(subtotal, lang)}</span>
                </div>
                <div className="flex justify-between font-heading text-xl">
                  <span className="text-text-light">{t('cart.total')}</span>
                  <span className="text-brand-primary">{formatPrice(subtotal, lang)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-hover text-text-light font-body font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Pizza size={18} />
                {t('checkout.submit')}
              </button>
            </form>
          </>
        ) : (
          <div className="p-8 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle size={48} className="text-green-400" />
            </div>

            <h2 className="font-heading text-3xl text-text-light">{t('checkout.orderPlaced')}</h2>

            <p className="font-body text-lg text-brand-primary font-semibold tracking-wider">
              {t('checkout.orderNumber')} {orderNumber}
            </p>

            <p className="font-body text-sm text-text-muted max-w-xs">
              {t('checkout.estimatedTime')}
            </p>

            <button
              onClick={handleClose}
              className="mt-2 bg-brand-primary hover:bg-brand-hover text-text-light font-body font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('checkout.close')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
