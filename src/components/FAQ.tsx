import React, { useState } from 'react';
import { useTranslation } from '../i18n';

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-14 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#6a9a10] mb-2">
            {t.faq.eyebrow}
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
            {t.faq.heading}
          </h2>
        </div>

        <div className="max-w-3xl divide-y divide-gray-100 border-y border-gray-100">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={i}>
                <h3>
                  <button
                    id={buttonId}
                    onClick={() => toggle(i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="w-full text-left flex items-center justify-between gap-4 py-4 hover:text-[#6a9a10] transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a9a10]/40 focus-visible:rounded"
                  >
                    <span className="font-medium text-gray-800 text-sm md:text-base leading-snug">
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
                  className="pb-4 pr-8"
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
