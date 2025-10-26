
import React from 'react';
import { CLIENTS_DATA } from '../constants';

const Clients: React.FC = () => {
  return (
    <section id="clientes" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nuestros Clientes</h2>
          <p className="text-gray-600 mt-2">Confían en nuestra experiencia y calidad.</p>
          <div className="w-24 h-1 bg-[#7cb342] mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 items-center">
          {CLIENTS_DATA.map((client) => (
            <div key={client.name} className="flex justify-center items-center p-4 transition-transform duration-300 hover:scale-110" title={client.name}>
              <img src={client.logo} alt={client.name} className="max-h-16 md:max-h-20 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
