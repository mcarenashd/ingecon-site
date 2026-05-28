import React, { lazy } from 'react';
import { LanguageProvider } from '../../i18n';
import Header from '../Header';
import Hero from '../Hero';
import About from '../About';
import Services from '../Services';
import Clients from '../Clients';
import Footer from '../Footer';
import LazySection from '../LazySection';

const Projects = lazy(() => import('../Projects'));
const Contact = lazy(() => import('../Contact'));

const HomeApp: React.FC = () => (
  <LanguageProvider>
    <Header currentPath="/" />
    <main id="main-content">
      <Hero />
      <About />
      <Services />
      <LazySection minHeight="80vh">
        <Projects />
      </LazySection>
      <Clients />
      <LazySection minHeight="80vh">
        <Contact />
      </LazySection>
    </main>
    <Footer currentPath="/" />
  </LanguageProvider>
);

export default HomeApp;
