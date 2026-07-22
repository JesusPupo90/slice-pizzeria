import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { products } from '../../data/products'
import ProductCard from '../ui/ProductCard'

const CATEGORIES = ['pizzas', 'sides', 'drinks', 'desserts']

export default function MenuSection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('pizzas')

  const safeProducts = Array.isArray(products) ? products : []

  const filteredProducts = useMemo(() => {
    return safeProducts.filter((p) => p && p.category === activeTab)
  }, [safeProducts, activeTab])

  return (
    <section id="menu" className="bg-surface-charcoal py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl sm:text-5xl text-center text-text-light mb-12">
          {t('menu.title')}
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`font-body text-sm uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full transition-all duration-200 ${
                activeTab === cat
                  ? 'bg-brand-primary text-text-light'
                  : 'bg-white/5 text-text-light/70 hover:bg-white/10'
              }`}
            >
              {t(`menu.categories.${cat}`, cat)}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id ?? Math.random()} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-text-light/50">
            <p>{t('menu.emptyCategory', 'No hay productos disponibles en esta categoría.')}</p>
          </div>
        )}
      </div>
    </section>
  )
}