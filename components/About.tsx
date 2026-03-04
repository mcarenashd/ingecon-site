import React from 'react';

const stats = [
  { value: '45+', label: 'Años de experiencia' },
  { value: '77+', label: 'Contratos ejecutados' },
  { value: '10+', label: 'Entidades contratantes' },
  { value: '1978', label: 'Año de fundación' },
];

const About: React.FC = () => {
  const aboutImage = `${import.meta.env.BASE_URL}images/about_ingecon_bogota.webp`;

  return (
    <>
      {/* Stats bar */}
      <div className="bg-[#6a9a10]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {stats.map((stat) => (
              <div key={stat.label} className="py-8 px-6 text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-sm md:text-base text-white/80 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About section */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src={aboutImage}
                alt="Equipo de Ingecon en campo"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
              {/* Accent block */}
              <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-[#6a9a10]/10 rounded-xl -z-10" />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-3">
                  Quiénes somos
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Una firma con historial comprobado en infraestructura pública.
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed text-base">
                Somos una organización dedicada a la Interventoría, Consultoría y Gerencia. La Empresa nació en el año de 1.978 con el nombre de Ingenierías Ltda.; a partir de Agosto de 1.998 cambió su razón social a INGECON S.A. y a partir del 5 de Septiembre de 2012 cambió su razón social a <strong className="text-gray-800">INGENIERÍA Y CONSULTORÍA INGECON S.A.S</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-l-4 border-[#6a9a10] pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">Nuestra Misión</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Está encaminada a la prestación de servicios de Ingeniería, buscando la satisfacción del cliente, proveedores y de nuestro recurso humano, a través del mejoramiento continuo.
                  </p>
                </div>
                <div className="border-l-4 border-[#6a9a10] pl-4">
                  <h3 className="font-bold text-gray-900 mb-1">Nuestra Visión</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Consolidarnos como una de las mejores y más reconocidas empresas de ingeniería, especializada en la ejecución de Interventoría de la construcción y diseño, contribuyendo al desarrollo del país.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
