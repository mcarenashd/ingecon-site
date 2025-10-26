import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  setPage: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ setPage, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}images/logo-ingecon-CUG5jr9Z.png`;

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);

    if (isOpen) {
      setIsOpen(false);
    }

    if (targetId === 'politica-de-datos') {
      setPage('policy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const scrollToTarget = () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerOffset = document.querySelector('header')?.offsetHeight || 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="text-2xl font-bold">
            <img src={logoSrc} alt="Ingecon Logo" className="h-12 w-auto" />
          </a>
          
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-600 hover:text-[#7cb342] transition-colors duration-300 font-medium cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none z-[1001]">
              <div className="w-6 h-6 flex flex-col justify-around">
                <span className={`block w-full h-0.5 bg-gray-800 transition-transform duration-300 ${isOpen ? 'transform rotate-45 translate-y-[5px]' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-gray-800 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-gray-800 transition-transform duration-300 ${isOpen ? 'transform -rotate-45 -translate-y-[5px]' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col items-center space-y-8">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)} 
                    className="text-gray-800 hover:text-[#7cb342] transition-colors duration-300 font-medium text-2xl cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
