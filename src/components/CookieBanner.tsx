import React, { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';

const STORAGE_KEY = 'cookies-accepted';

const CookieBanner: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-message"
      className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900 text-white border-t border-gray-700 shadow-2xl"
    >
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p id="cookie-message" className="text-sm flex-1 leading-relaxed">
          {t.cookies.message}
          <a
            href="/politica-de-datos"
            className="underline text-[#c5db5a] hover:text-white transition-colors"
          >
            {t.cookies.policyLink}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="flex-shrink-0 bg-[#6a9a10] hover:bg-[#5a8509] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          {t.cookies.accept}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
