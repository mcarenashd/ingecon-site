import React from 'react';
import { useTranslation } from '../i18n';

const ArrowIcon: React.FC = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="w-4 h-4 text-[#6a9a10] flex-shrink-0 group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-[80vh] py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-4">
            {t.notFound.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {t.notFound.heading}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto">
            {t.notFound.description}
          </p>
          <a
            href="/"
            className="inline-block bg-[#6a9a10] hover:bg-[#5a8509] text-white font-bold py-3 px-8 rounded-lg text-sm transition-colors duration-200 motion-reduce:transition-none shadow-sm hover:shadow"
          >
            {t.notFound.backHome}
          </a>
        </div>

        <div className="mt-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-6 text-center">
            {t.notFound.suggestionsTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.notFound.suggestions.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6a9a10]/30 p-5 transition-all duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a9a10]/40"
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-[#6a9a10] transition-colors">
                    {s.title}
                  </h3>
                  <ArrowIcon />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
