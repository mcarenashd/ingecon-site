import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const logoSrc = `${import.meta.env.BASE_URL}images/logo-ingecon-CUG5jr9Z.webp`;

  const links = [
    { target: { path: '/', hash: 'inicio' }, label: t.nav.inicio },
    { target: { path: '/', hash: 'nosotros' }, label: t.nav.nosotros },
    { target: { path: '/', hash: 'servicios' }, label: t.nav.servicios },
    { target: { path: '/', hash: 'proyectos' }, label: t.nav.proyectos },
    { target: { path: '/', hash: 'contacto' }, label: t.nav.contacto },
    { target: { path: '/carreras' }, label: t.nav.carreras },
    { target: { path: '/politica-de-datos' }, label: t.nav.politicaDatos },
  ];

  const hrefFor = (target: { path: string; hash?: string }) =>
    target.hash ? `${target.path}#${target.hash}` : target.path;

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: { path: string; hash?: string }
  ) => {
    event.preventDefault();

    const scrollToHash = () => {
      if (!target.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(target.hash);
      if (el) {
        const headerOffset = document.querySelector('header')?.offsetHeight || 72;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - headerOffset, behavior: 'smooth' });
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

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <a
              href="/"
              onClick={(e) => handleNavClick(e, { path: '/', hash: 'inicio' })}
              className="inline-block mb-4"
              aria-label="Ingecon S.A.S. - Inicio"
            >
              <img src={logoSrc} alt="Ingecon S.A.S." className="h-16 w-auto" width={140} height={64} />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">{t.footer.navTitle}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={hrefFor(link.target)}
                    onClick={(e) => handleNavClick(e, link.target)}
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
            <address className="not-italic">
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li>
                  <a href="tel:+573174347113" className="hover:text-white transition-colors">
                    +(57) 317 434 7113
                  </a>
                </li>
                <li>
                  <a href="mailto:info@ingecon.com.co" className="hover:text-white transition-colors">
                    info@ingecon.com.co
                  </a>
                </li>
                <li className="leading-relaxed">
                  Calle 148 No. 7G-42, Barrio Cedritos<br />Bogotá, Colombia
                </li>
              </ul>
            </address>
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
