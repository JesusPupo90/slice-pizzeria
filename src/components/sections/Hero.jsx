import { useTranslation } from 'react-i18next'
import heroImg from '../../assets/pizza-hero.webp'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center pt-16"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Overlay para mejorar el contraste del texto */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/60" />

      {/* Contenido (relative y z-10 para quedar sobre el overlay) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center lg:text-left max-w-2xl">
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-tight text-white whitespace-pre-line">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 font-body leading-tight max-w-lg mx-auto lg:mx-0">
            {t('hero.subtitle')}
          </p>
          <a
            href="#menu"
            className="mt-8 inline-block bg-brand-primary hover:bg-brand-hover text-text-light font-heading text-xl px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] uppercase"
          >
            {t('hero.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
