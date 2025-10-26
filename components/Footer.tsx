import React from 'react';

interface FooterProps {
  setPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);

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
    
    setPage('home');
    setTimeout(scrollToTarget, 100);
  };

  return (
    <footer className="bg-[#809419] text-white pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div className="mb-6 md:mb-0">
            <a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="inline-block mb-4 cursor-pointer">
              <img src="/images/logo-ingecon-CUG5jr9Z.png" alt="Ingecon Logo" className="h-12 w-auto" />
            </a>
            <p className="text-gray-200">Convirtiendo ideas en estructuras sólidas con experiencia y dedicación.</p>
          </div>
          
          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" onClick={(e) => handleNavClick(e, '#inicio')} className="text-gray-200 hover:text-white cursor-pointer">Inicio</a></li>
              <li><a href="#servicios" onClick={(e) => handleNavClick(e, '#servicios')} className="text-gray-200 hover:text-white cursor-pointer">Servicios</a></li>
              <li><a href="#proyectos" onClick={(e) => handleNavClick(e, '#proyectos')} className="text-gray-200 hover:text-white cursor-pointer">Proyectos</a></li>
              <li><a href="#contacto" onClick={(e) => handleNavClick(e, '#contacto')} className="text-gray-200 hover:text-white cursor-pointer">Contacto</a></li>
              <li><a href="#politica-de-datos" onClick={(e) => handleNavClick(e, '#politica-de-datos')} className="text-gray-200 hover:text-white cursor-pointer">Política de Datos</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-200">
                <li>Teléfonos: +(57) 1 467.2384 - 467.2385</li>
                <li>Email: <a href="mailto:info@ingecon.com.co" className="hover:text-white">info@ingecon.com.co</a></li>
                <li>Calle 148 No. 7G-42 Barrio Cedritos, Bogotá, Colombia</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-300 mt-12 pt-6 border-t border-white/20">
          <p>&copy; {new Date().getFullYear()} Ingecon S.A.S. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;