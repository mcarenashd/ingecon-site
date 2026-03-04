import React from 'react';
import { useTranslation } from '../i18n';

const IconRoad = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l3-10h12l3 10M9 7V5m6 2V5M12 7v10m-3 0h6" />
  </svg>
);
const IconBuilding = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M9 21V9l3-3 3 3v12M9 12h6M9 15h6M9 18h6" />
  </svg>
);
const IconCity = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M6 21V9l6-6 6 6v12M10 21v-6h4v6" />
  </svg>
);
const IconRoute = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5-5m0 0l5-5m-5 5h16M15 4l5 5m0 0l-5 5m5-5H4" />
  </svg>
);

const icons = [<IconBuilding />, <IconRoad />, <IconCity />, <IconRoute />];

const Services: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="servicios" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-3">
            {t.services.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {t.services.heading}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {t.services.subheading}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#6a9a10]/10 text-[#6a9a10] mb-5 group-hover:bg-[#6a9a10] group-hover:text-white transition-colors duration-300">
                {icons[i]}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
