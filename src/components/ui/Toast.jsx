import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, ShoppingCart, Pizza, ChevronUp } from 'lucide-react'
import { useCart, useCartDispatch } from '../../context/CartContext'

export default function Toast() {
  const { t, i18n } = useTranslation()
  const { lastAdded, totalItems } = useCart()
  const dispatch = useCartDispatch()
  
  const [isExpanded, setIsExpanded] = useState(false)

  const lang = i18n.language?.split('-')[0] || 'es'
  const show = !!lastAdded

  // Reinicia el estado de expansión y gestiona el temporizador
  useEffect(() => {
    if (!lastAdded) {
      setIsExpanded(false)
      return
    }

    // Si el usuario lo expandió, puedes darle un poco más de tiempo (ej. 5s) antes de cerrarse
    const duration = isExpanded ? 5000 : 3000
    const timer = setTimeout(() => {
      dispatch({ type: 'CLEAR_LAST_ADDED' })
    }, duration)

    return () => clearTimeout(timer)
  }, [lastAdded, isExpanded, dispatch])

  const handleViewCart = (e) => {
    e.stopPropagation() // Evita activar la expansión si toca el botón directamente
    dispatch({ type: 'OPEN_CART' })
    dispatch({ type: 'CLEAR_LAST_ADDED' })
  }

  const handleClose = (e) => {
    e.stopPropagation() // Evita activar la expansión
    dispatch({ type: 'CLEAR_LAST_ADDED' })
  }

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div
      onClick={toggleExpand}
      className={`fixed bottom-0 left-0 right-0 z-50 p-5 bg-surface-charcoal border-t-2 border-brand-primary shadow-2xl transition-all duration-300 ease-out cursor-pointer ${
        show 
          ? isExpanded 
            ? '-translate-y-8 sm:-translate-y-16 pb-8 shadow-brand-primary/20' 
            : 'translate-y-0' 
          : 'translate-y-full'
      } w-full max-w-md mx-auto rounded-t-2xl`}
    >
      {/* Indicador visual de deslizar / desplegar (pequeña barra superior) */}
      <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
            <Pizza size={20} className="text-brand-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-body text-sm font-semibold text-text-light truncate">
              {lastAdded?.product?.name?.[lang]}
            </p>
            <p className="font-body text-xs text-text-muted">
              {totalItems} {t('cart.title')} {lastAdded?.size ? `· ${t(`menu.sizes.${lastAdded.size}`)}` : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleViewCart}
            className="font-body text-xs font-semibold bg-brand-primary hover:bg-brand-hover text-text-light px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            <ShoppingCart size={14} className="inline mr-1" />
            {t('cart.viewCart')}
          </button>
          <button
            onClick={handleClose}
            className="p-1.5 text-text-muted hover:text-text-light transition-colors"
            aria-label={t('navbar.close')}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Contenido extra que aparece ÚNICAMENTE cuando está expandido */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-text-muted animate-fadeIn">
          <span>{t('cart.itemAddedToOrder')}</span>
          <ChevronUp size={16} className="text-brand-primary rotate-180 transition-transform" />
        </div>
      )}
    </div>
  )
}