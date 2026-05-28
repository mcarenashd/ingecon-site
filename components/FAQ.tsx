import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n';

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className={`w-5 h-5 text-[#6a9a10] flex-shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': t.faq.items.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-3">
            {t.faq.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {t.faq.heading}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {t.faq.subheading}
          </p>
        </div>

        <div className="max-w-3xl space-y-3">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <h3>
                  <button
                    id={buttonId}
                    onClick={() => toggle(i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="w-full text-left flex items-start justify-between gap-4 p-5 hover:bg-gray-50 transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a9a10]/40"
                  >
                    <span className="font-semibold text-gray-900 text-base leading-snug">
                      {item.question}
                    </span>
                    <ChevronIcon open={open} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="px-5 pb-5 -mt-1"
                >
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
