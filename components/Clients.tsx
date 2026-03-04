import React from 'react';
import { CLIENTS_DATA } from '../constants';
import { useTranslation } from '../i18n';

const Clients: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="clientes" className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-3">
            {t.clients.eyebrow}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t.clients.heading}
          </h2>
          <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
            {t.clients.subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CLIENTS_DATA.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6a9a10]/30 transition-all duration-300"
              title={client.name}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-14 md:max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
