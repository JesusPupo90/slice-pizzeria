const COP_PER_USD = 4000

export function formatPrice(priceInCop, language = 'es') {
  const safePrice = typeof priceInCop === 'number' && !isNaN(priceInCop) ? priceInCop : 0

  if (language === 'en') {
    const usd = safePrice / COP_PER_USD
    return `$${usd.toFixed(2)} USD`
  }

  const formatted = Math.round(safePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `$${formatted} COP`
}
