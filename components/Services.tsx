
import React from 'react';
import { SERVICES_DATA } from '../constants';
import type { Service } from '../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="bg-white p-8 rounded-lg shadow-md text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
    <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
    <p className="text-gray-600 leading-relaxed">{service.description}</p>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nuestros Servicios</h2>
          <div className="w-24 h-1 bg-[#7cb342] mx-auto mt-4"></div>
          <p className="max-w-3xl mx-auto mt-4 text-gray-600">
            Nuestros servicios están directamente enfocados hacia el logro del óptimo desarrollo de los procesos de Consultoría e Interventoría, lo cual permite asegurar que los trabajos se ejecuten bajo los más estrictos estándares de eficiencia, calidad y cumplimiento.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
