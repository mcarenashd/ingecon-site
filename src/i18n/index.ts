import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import es from './es';
import en from './en';
import type { Translations } from './es';

export type Locale = 'es' | 'en';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const translations: Record<Locale, Translations> = { es, en };

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const isBrowser = typeof window !== 'undefined';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // SSR-safe: server always renders with 'es'. Client hydrates and reads localStorage in effect.
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    if (!isBrowser) return;
    const stored = localStorage.getItem('lang') as Locale | null;
    if (stored === 'en') setLocaleState('en');
  }, []);

  useEffect(() => {
    if (!isBrowser) return;
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (isBrowser) {
      localStorage.setItem('lang', newLocale);
      document.documentElement.lang = newLocale;
    }
  }, []);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: translations[locale],
  }), [locale, setLocale]);

  return React.createElement(LanguageContext.Provider, { value }, children);
};

export const useTranslation = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
};
