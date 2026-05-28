import React from 'react';
import { useTranslation } from '../i18n';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* LCP image — responsive <picture> with AVIF + WebP fallback */}
      <picture>
        <source
          type="image/avif"
          srcSet="/images/hero-640.avif 640w, /images/hero-1024.avif 1024w, /images/hero-1600.avif 1600w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/images/hero-640.webp 640w, /images/hero-1024.webp 1024w, /images/hero-1600.webp 1600w"
          sizes="100vw"
        />
        <img
          src="/images/hero-1600.webp"
          alt="Autopista urbana iluminada de noche en Bogotá, símbolo de la infraestructura vial colombiana."
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          width={1600}
          height={814}
        />
      </picture>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65" />

      <div className="relative z-10 px-6 max-w-5xl mx-auto">
        <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-[#c5db5a] mb-5">
          {t.hero.eyebrow}
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
          {t.hero.headlineMain}{' '}
          <span className="text-[#c5db5a]">{t.hero.headlineAccent}</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
          {t.hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contacto"
            className="inline-block bg-[#6a9a10] hover:bg-[#5a8509] text-white font-bold py-4 px-10 rounded-lg text-base md:text-lg transition-all duration-300 motion-reduce:transition-none shadow-lg hover:shadow-xl motion-safe:hover:-translate-y-0.5"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#proyectos"
            className="inline-block bg-white/15 hover:bg-white/25 text-white font-semibold py-4 px-10 rounded-lg text-base md:text-lg border-2 border-white/60 hover:border-white transition-all duration-300 motion-reduce:transition-none backdrop-blur-sm motion-safe:hover:-translate-y-0.5"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <a
        href="#nosotros"
        aria-label={t.hero.scrollHint}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60 rounded-md px-2 py-1 z-10"
      >
        <span className="text-xs text-white tracking-widest uppercase">{t.hero.scrollHint}</span>
        <svg aria-hidden="true" focusable="false" className="w-5 h-5 text-white animate-bounce motion-reduce:animate-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
};

export default Hero;
