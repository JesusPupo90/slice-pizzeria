import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCartDispatch } from '../../context/CartContext'
import { formatPrice } from '../../utils/currencyFormatter'

const SIZES = ['personal', 'mediana', 'familiar']

export default function ProductCard({ product }) {
  const { t, i18n } = useTranslation()
  const dispatch = useCartDispatch()
  const lang = i18n.language
  const hasSizes = !!product.prices
  const [selectedSize, setSelectedSize] = useState(hasSizes ? 'personal' : null)

  const currentPrice = hasSizes
    ? product.prices[selectedSize]
    : product.price

  const handleAdd = () => {
    if (hasSizes && !selectedSize) return
    dispatch({ type: 'ADD_ITEM', payload: { product, size: selectedSize } })
  }

  return (
    <div className="bg-white/5 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name[lang]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-heading text-2xl text-text-light">
          {product.name[lang]}
        </h3>
        <p className="font-body text-sm text-text-muted leading-relaxed">
          {product.description[lang]}
        </p>

        {hasSizes && (
          <div className="flex gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 text-xs font-body font-semibold uppercase tracking-wider py-2 rounded-lg border transition-all duration-200 ${
                  selectedSize === size
                    ? 'bg-brand-primary border-brand-primary text-text-light'
                    : 'border-white/20 text-text-light/70 hover:border-brand-primary/50'
                }`}
              >
                {t(`menu.sizes.${size}`)}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="font-heading text-xl text-brand-primary">
            {formatPrice(currentPrice, lang)}
          </span>

          <button
            onClick={handleAdd}
            disabled={hasSizes && !selectedSize}
            className="font-body text-sm font-semibold bg-brand-primary hover:bg-brand-hover disabled:opacity-40 disabled:cursor-not-allowed text-text-light px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-xl"
          >
            {hasSizes && !selectedSize
              ? t('menu.selectSize')
              : t('menu.addToCart')}
          </button>
        </div>
      </div>
    </div>
  )
}