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

  const [step, setStep] = useState('form')
  const [form, setForm] = useState({ name: '', phone: '', address: '', payment: 'cash' })
  const [errors, setErrors] = useState({}) // <-- Estado para mensajes de error
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    if (!isCheckoutOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCheckoutOpen])

  if (!isCheckoutOpen) return null

  // Función de validación personalizada
  const validateForm = () => {
    const newErrors = {}
    
    // Validar nombre (mínimo 3 caracteres, sin contar espacios extras)
    if (!form.name.trim() || form.name.trim().length < 3) {
      newErrors.name = 'Ingresa un nombre válido (mínimo 3 caracteres)'
    }

    // Validar teléfono con Expresión Regular (ej: solo números y entre 7 y 15 dígitos)
    const phoneRegex = /^[0-9\s\+\-]{7,15}$/
    if (!form.phone.trim() || !phoneRegex.test(form.phone.trim())) {
      newErrors.phone = 'Ingresa un número de teléfono válido'
    }

    // Validar dirección (mínimo 5 caracteres)
    if (!form.address.trim() || form.address.trim().length < 5) {
      newErrors.address = 'Ingresa una dirección completa'
    }

    setErrors(newErrors)
    // Retorna true solo si NO hay errores
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Si la validación falla, detenemos la ejecución aquí
    if (!validateForm()) return

    const num = `#SLICE-${Math.floor(1000 + Math.random() * 9000)}`
    setOrderNumber(num)
    setStep('success')
  }

  const handleClose = () => {
    if (step === 'success') {
      dispatch({ type: 'CLEAR_CART' })
      dispatch({ type: 'CLOSE_CART' })
    }
    setStep('form')
    setErrors({})
    setForm({ name: '', phone: '', address: '', payment: 'cash' })
    dispatch({ type: 'CLOSE_CHECKOUT' })
  }

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    // Limpiamos el error del campo a medida que el usuario escribe
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
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

            <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
              {/* Campo Nombre */}
              <div>
                <label className="block font-body text-sm text-text-muted mb-1.5">{t('checkout.name')}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={updateField('name')}
                  placeholder={t('checkout.namePlaceholder')}
                  className={`w-full bg-white/5 border rounded-lg px-3 py-2 font-body text-base text-text-light placeholder-text-muted/50 focus:outline-none transition-colors ${
                    errors.name ? 'border-red-500' : 'border-white/10 focus:border-brand-primary'
                  }`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 font-body">{errors.name}</p>}
              </div>

              {/* Campo Teléfono */}
              <div>
                <label className="block font-body text-sm text-text-muted mb-1.5">{t('checkout.phone')}</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={updateField('phone')}
                  placeholder={t('checkout.phonePlaceholder')}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 font-body text-base text-text-light placeholder-text-muted/50 focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-white/10 focus:border-brand-primary'
                  }`}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1 font-body">{errors.phone}</p>}
              </div>

              {/* Campo Dirección */}
              <div>
                <label className="block font-body text-sm text-text-muted mb-1.5">{t('checkout.address')}</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={updateField('address')}
                  placeholder={t('checkout.addressPlaceholder')}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 font-body text-base text-text-light placeholder-text-muted/50 focus:outline-none transition-colors ${
                    errors.address ? 'border-red-500' : 'border-white/10 focus:border-brand-primary'
                  }`}
                />
                {errors.address && <p className="text-red-400 text-xs mt-1 font-body">{errors.address}</p>}
              </div>

              {/* Métodos de pago */}
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