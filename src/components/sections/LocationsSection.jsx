import { useTranslation } from 'react-i18next'
import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react'

const LOCATION_KEYS = ['location1', 'location2']

export default function LocationsSection() {
  const { t } = useTranslation()

  return (
    <section id="locations" className="bg-surface-charcoal py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl sm:text-5xl text-text-light mb-4">
            {t('locations.title')}
          </h2>
          <p className="font-body text-lg text-text-muted max-w-xl mx-auto">
            {t('locations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATION_KEYS.map((key) => (
            <div
              key={key}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <h3 className="font-heading text-2xl text-text-light mb-5">
                {t(`locations.items.${key}.name`)}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 mt-0.5 text-brand-primary" />
                  <span className="font-body text-sm text-text-muted">
                    {t(`locations.items.${key}.address`)}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="shrink-0 mt-0.5 text-brand-primary" />
                  <span className="font-body text-sm text-text-muted">
                    {t(`locations.items.${key}.hours`)}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="shrink-0 mt-0.5 text-brand-primary" />
                  <span className="font-body text-sm text-text-muted">
                    {t(`locations.items.${key}.phone`)}
                  </span>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(t(`locations.items.${key}.address`))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 pt-4 border-t border-white/5 font-body text-sm font-semibold text-brand-primary hover:text-brand-hover transition-colors"
              >
                {t('locations.getDirections')}
                <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
