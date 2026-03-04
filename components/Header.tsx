import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  setPage: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ setPage, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}images/logo-ingecon-CUG5jr9Z.webp`;

  useEffect(() => {
    const handleScroll = () => {
      // Activate solid header only after scrolling past ~80% of the viewport height (past the hero)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);
    if (isOpen) setIsOpen(false);

    if (targetId === 'politica-de-datos') {
      setPage('policy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const scrollToTarget = () => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = document.querySelector('header')?.offsetHeight || 72;
        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      } else if (targetId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (currentPage !== 'home') {
      setPage('home');
      setTimeout(scrollToTarget, 100);
    } else {
      scrollToTarget();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="flex-shrink-0">
            <img src={logoSrc} alt="Ingecon S.A.S." className="h-14 w-auto drop-shadow-md" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.filter(l => l.href !== '#politica-de-datos').map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-[#6a9a10] hover:bg-gray-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            aria-label="Abrir menú"
          >
            <span className={`block w-5 h-0.5 mb-1 transition-transform duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 mb-1 transition-opacity duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 transition-transform duration-300 ${isScrolled ? 'bg-gray-700' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 border-t transition-all duration-300 overflow-hidden ${
          isScrolled ? 'bg-white border-gray-100' : 'bg-gray-900/95 backdrop-blur-md border-white/10'
        } ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="px-6 py-4 flex flex-col space-y-1">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:text-[#6a9a10] hover:bg-gray-50'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
