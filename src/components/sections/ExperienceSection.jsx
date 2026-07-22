import { useTranslation } from 'react-i18next'
import { Timer, Flame, Globe } from 'lucide-react'

import ovenImg from '../../assets/oven.webp'

const KEY_POINTS = [
  { key: 'dough', icon: Timer },
  { key: 'oven', icon: Flame },
  { key: 'ingredients', icon: Globe },
]

export default function ExperienceSection() {
  const { t } = useTranslation()

  return (
    <section
      id="experience"
      className="bg-surface-cream py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl text-text-dark mb-6">
              {t('experience.title')}
            </h2>
            <p className="font-body text-lg text-text-muted leading-relaxed mb-10">
              {t('experience.description')}
            </p>

            <div className="space-y-6">
              {KEY_POINTS.map(({ key, icon: Icon }) => (
                <div key={key} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Icon size={22} className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-text-dark">
                      {t(`experience.points.${key}.title`)}
                    </h3>
                    <p className="font-body text-sm text-text-muted mt-1">
                      {t(`experience.points.${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={ovenImg}
                alt="Horno de leña artesanal"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-brand-primary text-white p-4 rounded-xl shadow-lg hidden sm:flex items-center gap-3">
              <Flame size={32} className="text-white shrink-0" />
              <div>
                <p className="font-heading text-2xl leading-none">{t('experience.tempValue')}</p>
                <p className="font-body text-xs text-white/90 font-medium">{t('experience.points.oven.title')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
