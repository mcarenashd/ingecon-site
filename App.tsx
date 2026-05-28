import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider, useTranslation } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Clients from './components/Clients';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DataPolicy from './components/DataPolicy';
import SEO from './components/SEO';

const SITE_URL = 'https://ingecon.com.co';

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-obras-civiles`,
      'serviceType': 'Interventoría de obras civiles',
      'name': 'Interventoría de Edificios y Obras Sanitarias',
      'provider': { '@id': `${SITE_URL}/#organization` },
      'areaServed': { '@type': 'Country', 'name': 'Colombia' },
      'description': 'Control técnico, administrativo y financiero en la construcción de edificios, obras sanitarias y arquitectónicas, garantizando cumplimiento normativo y calidad de entrega.',
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-transporte`,
      'serviceType': 'Interventoría de aeropuertos, infraestructura de transporte y túneles',
      'name': 'Interventoría de Aeropuertos, Infraestructura de Transporte y Túneles',
      'provider': { '@id': `${SITE_URL}/#organization` },
      'areaServed': { '@type': 'Country', 'name': 'Colombia' },
      'description': 'Supervisión integral de proyectos de aeropuertos, infraestructura de transporte y túneles — desde estudios previos hasta entrega final.',
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-urbanismo`,
      'serviceType': 'Interventoría de obras de urbanismo',
      'name': 'Interventoría de Obras de Urbanismo',
      'provider': { '@id': `${SITE_URL}/#organization` },
      'areaServed': { '@type': 'Country', 'name': 'Colombia' },
      'description': 'Gestión de interventoría en proyectos de espacio público, andenes, ciclorutas, puentes peatonales y equipamientos urbanos.',
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-telecom`,
      'serviceType': 'Servicios de Telecomunicaciones',
      'name': 'Servicios de Telecomunicaciones',
      'provider': { '@id': `${SITE_URL}/#organization` },
      'areaServed': { '@type': 'Country', 'name': 'Colombia' },
      'description': 'Instalación, operación y mantenimiento de infraestructura de telecomunicaciones, con gestión técnica, administrativa y financiera integral.',
    },
  ],
};

const Home: React.FC = () => {
  const { locale } = useTranslation();
  const title = locale === 'es'
    ? 'Interventoría de Obras Civiles en Colombia | INGECON S.A.S.'
    : 'Civil Works Oversight in Colombia | INGECON S.A.S.';
  const description = locale === 'es'
    ? 'Firma de interventoría, consultoría y gerencia con más de 25 años respaldando proyectos de infraestructura pública en Colombia. Clientes: INVIAS, IDU, ANI, Aerocivil y entidades territoriales.'
    : 'Oversight, consulting and management firm with over 25 years backing public infrastructure projects in Colombia. Clients: INVIAS, IDU, ANI, Aerocivil and regional entities.';

  return (
    <>
      <SEO path="/" title={title} description={description} schema={homeSchema} />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Clients />
      <Contact />
    </>
  );
};

const CareersRoute: React.FC = () => {
  const { locale } = useTranslation();
  const title = locale === 'es'
    ? 'Trabaja con nosotros | INGECON S.A.S.'
    : 'Careers | INGECON S.A.S.';
  const description = locale === 'es'
    ? 'Vacantes abiertas en INGECON S.A.S. Profesionales de ingeniería para proyectos de interventoría y consultoría en infraestructura pública.'
    : 'Open positions at INGECON S.A.S. Engineering professionals for oversight and consulting projects in public infrastructure.';
  return (
    <>
      <SEO path="/carreras" title={title} description={description} />
      <Careers />
    </>
  );
};

const PolicyRoute: React.FC = () => {
  const { locale } = useTranslation();
  const title = locale === 'es'
    ? 'Política de Protección de Datos | INGECON S.A.S.'
    : 'Data Protection Policy | INGECON S.A.S.';
  return (
    <>
      <SEO path="/politica-de-datos" title={title} noindex />
      <DataPolicy />
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="bg-white text-gray-800 font-sans leading-normal tracking-tight">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carreras" element={<CareersRoute />} />
            <Route path="/politica-de-datos" element={<PolicyRoute />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
