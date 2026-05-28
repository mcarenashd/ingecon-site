import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider, useTranslation } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Clients from './components/Clients';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SEO from './components/SEO';

const Careers = lazy(() => import('./components/Careers'));
const DataPolicy = lazy(() => import('./components/DataPolicy'));
const NotFound = lazy(() => import('./components/NotFound'));

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

const RouteLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#6a9a10] border-t-transparent rounded-full animate-spin motion-reduce:animate-none" />
  </div>
);

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
      <FAQ />
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
      <Suspense fallback={<RouteLoader />}>
        <Careers />
      </Suspense>
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
      <Suspense fallback={<RouteLoader />}>
        <DataPolicy />
      </Suspense>
    </>
  );
};

const NotFoundRoute: React.FC = () => {
  const { locale } = useTranslation();
  const title = locale === 'es'
    ? 'Página no encontrada | INGECON S.A.S.'
    : 'Page not found | INGECON S.A.S.';
  return (
    <>
      <SEO path="/404" title={title} noindex />
      <Suspense fallback={<RouteLoader />}>
        <NotFound />
      </Suspense>
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
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default App;
