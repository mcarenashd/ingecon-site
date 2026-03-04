import React from 'react';

const Hero: React.FC = () => {
  const heroBackground = `${import.meta.env.BASE_URL}images/calle-92-654YlBhL.webp`;

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center text-center text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      />
      {/* Overlay: más oscuro en top/bottom para legibilidad del nav y del copy */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65" />

      <div className="relative z-10 px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-[#c5db5a] mb-5">
          Más de 45 años de trayectoria en Colombia
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
          Interventoría e Ingeniería{' '}
          <span className="text-[#c5db5a]">con respaldo institucional.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
          Garantizamos el cumplimiento técnico, financiero y ambiental de cada proyecto. Desde 1978, construyendo confianza con las principales entidades públicas del país.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contacto"
            className="inline-block bg-[#6a9a10] hover:bg-[#5a8509] text-white font-bold py-4 px-10 rounded-lg text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Hablemos de su proyecto
          </a>
          <a
            href="#proyectos"
            className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-lg text-base md:text-lg border border-white/30 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
          >
            Ver trayectoria
          </a>
        </div>

        {/* Trust stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto border-t border-white/20 pt-10">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#c5db5a]">45+</p>
            <p className="text-sm md:text-base text-gray-300 mt-1">Años de experiencia</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#c5db5a]">+77</p>
            <p className="text-sm md:text-base text-gray-300 mt-1">Proyectos ejecutados</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#c5db5a]">10+</p>
            <p className="text-sm md:text-base text-gray-300 mt-1">Entidades contratantes</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
        <span className="text-xs text-white tracking-widest uppercase">Explorar</span>
        <svg className="w-5 h-5 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
