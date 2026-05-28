import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, locale, setLocale } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const logoSrc = `${import.meta.env.BASE_URL}images/logo-ingecon-CUG5jr9Z.webp`;

  const navLinks = [
    { target: { path: '/', hash: 'inicio' }, label: t.nav.inicio },
    { target: { path: '/', hash: 'nosotros' }, label: t.nav.nosotros },
    { target: { path: '/', hash: 'servicios' }, label: t.nav.servicios },
    { target: { path: '/', hash: 'proyectos' }, label: t.nav.proyectos },
    { target: { path: '/', hash: 'contacto' }, label: t.nav.contacto },
    { target: { path: '/carreras' }, label: t.nav.carreras },
  ];

  const allLinks = [...navLinks, { target: { path: '/politica-de-datos' }, label: t.nav.politicaDatos }];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force header to opaque background on non-home routes
  const isHome = location.pathname === '/';
  const transparentMode = isHome && !isScrolled;

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: { path: string; hash?: string }
  ) => {
    event.preventDefault();
    if (isOpen) setIsOpen(false);

    const scrollToHash = () => {
      if (!target.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(target.hash);
      if (el) {
        const headerOffset = document.querySelector('header')?.offsetHeight || 72;
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else if (target.hash === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (location.pathname !== target.path) {
      navigate(target.path);
      setTimeout(scrollToHash, 100);
    } else {
      scrollToHash();
    }
  };

  const toggleLocale = () => setLocale(locale === 'es' ? 'en' : 'es');

  const langBtnClass = `px-3 py-1.5 rounded-md text-xs font-bold border transition-all duration-200 ${
    transparentMode
      ? 'border-white/30 text-white/90 hover:border-white hover:text-white'
      : 'border-gray-300 text-gray-700 hover:border-[#6a9a10] hover:text-[#6a9a10]'
  }`;

  const hrefFor = (target: { path: string; hash?: string }) =>
    target.hash ? `${target.path}#${target.hash}` : target.path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparentMode ? 'bg-transparent' : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, { path: '/', hash: 'inicio' })}
            className="flex-shrink-0"
            aria-label="Ingecon S.A.S. - Inicio"
          >
            <img src={logoSrc} alt="Ingecon S.A.S." className="h-14 w-auto drop-shadow-md" width={120} height={56} />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Navegación principal">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={hrefFor(link.target)}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  transparentMode
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-[#6a9a10] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleLocale}
              className={langBtnClass}
              aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              {locale === 'es' ? 'EN' : 'ES'}
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${transparentMode ? 'text-white' : 'text-gray-700'}`}
            aria-label={t.nav.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true" className={`block w-5 h-0.5 mb-1 transition-transform duration-300 ${transparentMode ? 'bg-white' : 'bg-gray-700'} ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span aria-hidden="true" className={`block w-5 h-0.5 mb-1 transition-opacity duration-300 ${transparentMode ? 'bg-white' : 'bg-gray-700'} ${isOpen ? 'opacity-0' : ''}`} />
            <span aria-hidden="true" className={`block w-5 h-0.5 transition-transform duration-300 ${transparentMode ? 'bg-white' : 'bg-gray-700'} ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 border-t transition-all duration-300 overflow-hidden ${
          transparentMode ? 'bg-gray-900/95 backdrop-blur-md border-white/10' : 'bg-white border-gray-100'
        } ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="px-6 py-4 flex flex-col space-y-1" aria-label="Navegación móvil">
          {allLinks.map(link => (
            <a
              key={link.label}
              href={hrefFor(link.target)}
              onClick={(e) => handleNavClick(e, link.target)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                transparentMode
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-gray-700 hover:text-[#6a9a10] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLocale}
            className={`px-4 py-3 rounded-lg font-medium text-left transition-colors ${
              transparentMode
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-gray-700 hover:text-[#6a9a10] hover:bg-gray-50'
            }`}
          >
            {locale === 'es' ? 'English' : 'Español'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
