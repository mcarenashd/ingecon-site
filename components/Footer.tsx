import React from 'react';

interface FooterProps {
  setPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const logoSrc = `${import.meta.env.BASE_URL}images/logo-ingecon-CUG5jr9Z.png`;

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);

    if (targetId === 'politica-de-datos') {
      setPage('policy');
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

  const links = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#contacto', label: 'Contacto' },
    { href: '#politica-de-datos', label: 'Política de Datos' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="inline-block mb-4">
              <img src={logoSrc} alt="Ingecon S.A.S." className="h-10 w-auto" />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Ingeniería y Consultoría INGECON S.A.S. — Más de 45 años respaldando proyectos de infraestructura pública en Colombia.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Navegación</h4>
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

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Contacto</h4>
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
          © {new Date().getFullYear()} Ingeniería y Consultoría INGECON S.A.S. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
