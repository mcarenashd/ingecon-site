import React from 'react';
import { useTranslation } from '../i18n';

interface FooterProps {
  setPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const { t } = useTranslation();
  const logoSrc = `${import.meta.env.BASE_URL}images/logo-ingecon-CUG5jr9Z.webp`;

  const links = [
    { href: '#inicio', label: t.nav.inicio },
    { href: '#nosotros', label: t.nav.nosotros },
    { href: '#servicios', label: t.nav.servicios },
    { href: '#proyectos', label: t.nav.proyectos },
    { href: '#contacto', label: t.nav.contacto },
    { href: '#carreras', label: t.nav.carreras },
    { href: '#politica-de-datos', label: t.nav.politicaDatos },
  ];

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);

    if (targetId === 'politica-de-datos') {
      setPage('policy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'carreras') {
      setPage('careers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const scrollToTarget = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = document.querySelector('header')?.offsetHeight || 72;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - headerOffset, behavior: 'smooth' });
      } else if (targetId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    setPage('home');
    setTimeout(scrollToTarget, 100);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="inline-block mb-4">
              <img src={logoSrc} alt="Ingecon S.A.S." className="h-16 w-auto" />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">{t.footer.navTitle}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">{t.footer.contactTitle}</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>+(57) 1 467.2384 — 467.2385</li>
              <li>
                <a href="mailto:info@ingecon.com.co" className="hover:text-white transition-colors">
                  info@ingecon.com.co
                </a>
              </li>
              <li className="leading-relaxed">
                Calle 148 No. 7G-42, Barrio Cedritos<br />Bogotá, Colombia
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
