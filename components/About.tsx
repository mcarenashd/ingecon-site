import React from 'react';

const About: React.FC = () => {
  return (
    <section id="nosotros" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&h=800&fit=crop" 
              alt="Equipo de Ingecon colaborando en un proyecto de ingeniería"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Quiénes Somos</h2>
            <p className="text-gray-600 leading-relaxed">
              Somos una organización dedicada a la Interventoría, Consultoría y Gerencia. La Empresa nació en el año de 1.978 con el nombre de Ingenierías Ltda.; a partir de Agosto de 1.998 cambió su razón social a INGECON S.A. y a partir del 5 de Septiembre de 2012 cambió su razón social a <strong>INGENIERIA Y CONSULTORIA INGECON S.A.S</strong>.
            </p>
            <div>
              <h3 className="text-2xl font-semibold text-[#809419] mb-2">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Está encaminada a la prestación de servicios de Ingeniería, buscando la satisfacción del cliente, proveedores y de nuestro recurso humano, a través del mejoramiento continuo.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#809419] mb-2">Nuestra Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Consolidarnos como una de las mejores y más reconocidas empresas de ingeniería, especializada en la ejecución de Interventoría de la construcción y diseño, contribuyendo al desarrollo del país.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;