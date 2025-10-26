
import React from 'react';

const Hero: React.FC = () => {
  const heroBackground = `${import.meta.env.BASE_URL}images/calle-92-654YlBhL.png`;

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center text-center text-white">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          Construyendo el futuro, <span className="text-[#a4bf20]">hoy</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200">
          En Ingecon, convertimos ideas en estructuras sólidas. Somos líderes en construcción, ingeniería y gestión de proyectos con un enfoque en la innovación y la calidad.
        </p>
        <a 
          href="#proyectos" 
          className="bg-[#7cb342] hover:bg-[#689f38] text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          Conoce Nuestros Proyectos
        </a>
      </div>
    </section>
  );
};

export default Hero;
