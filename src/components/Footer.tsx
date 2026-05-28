import React from 'react';
import { useTranslation } from '../i18n';

interface FooterProps {
  currentPath?: string;
}

const Footer: React.FC<FooterProps> = ({ currentPath = '/' }) => {
  const { t } = useTranslation();
  const logoSrc = '/images/logo-ingecon-CUG5jr9Z.webp';

  const links = [
    { path: '/', hash: 'inicio', label: t.nav.inicio },
    { path: '/', hash: 'nosotros', label: t.nav.nosotros },
    { path: '/', hash: 'servicios', label: t.nav.servicios },
    { path: '/', hash: 'proyectos', label: t.nav.proyectos },
    { path: '/', hash: 'contacto', label: t.nav.contacto },
    { path: '/carreras', label: t.nav.carreras },
    { path: '/politica-de-datos', label: t.nav.politicaDatos },
  ];

  const hrefFor = (link: { path: string; hash?: string }) =>
    link.hash ? `${link.path}#${link.hash}` : link.path;

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: { path: string; hash?: string }
  ) => {
    if (link.path === currentPath && link.hash) {
      event.preventDefault();
      const el = document.getElementById(link.hash);
      if (el) {
        const headerOffset = document.querySelector('header')?.offsetHeight || 72;
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.pageYOffset - headerOffset,
          behavior: 'smooth',
        });
      } else if (link.hash === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <a href="/" className="inline-block mb-4" aria-label="Ingecon S.A.S. - Inicio">
              <img src={logoSrc} alt="Ingecon S.A.S." className="h-16 w-auto" width={140} height={64} />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
            <p className="text-xs text-gray-500 mt-4">
              <span className="font-semibold text-gray-400">{t.footer.nitLabel}:</span> {t.footer.nitValue}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">{t.footer.navTitle}</h3>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={hrefFor(link)}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">{t.footer.contactTitle}</h3>
            <address className="not-italic">
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li>
                  <a href="tel:+573233072588" className="hover:text-white transition-colors">
                    +(57) 323 307 2588
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
