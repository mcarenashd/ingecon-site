
import React from 'react';

const Hero: React.FC = () => {
  const heroBackground = `${import.meta.env.BASE_URL}images/calle-92-654YlBhL.png`;

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center text-center text-white">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('${heroBackground}')` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 drop-shadow-lg">
          Supervisamos cada detalle,<br className="hidden md:block" /> <span className="text-[#a4bf20]">garantizamos resultados.</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-200 leading-relaxed md:leading-loose drop-shadow-md">
          En Ingecon, aseguramos que cada proyecto cumpla con los más altos estándares de calidad, tiempo y presupuesto. Más de 45 años respaldando la excelencia en interventoría e ingeniería en Colombia.
        </p>
        <a 
          href="#proyectos" 
          className="inline-block bg-[#7cb342] hover:bg-[#689f38] text-white font-extrabold py-4 px-10 rounded-full text-lg md:text-xl transition-all transform hover:scale-105 hover:shadow-xl duration-300 shadow-lg ring-4 ring-[#7cb342]/30 hover:ring-[#7cb342]/50"
        >
          Conoce Nuestros Proyectos
        </a>
      </div>
    </section>
  );
};

export default Hero;
