import React from 'react';
import { LanguageProvider } from '../../i18n';
import Header from '../Header';
import Hero from '../Hero';
import About from '../About';
import Services from '../Services';
import Projects from '../Projects';
import Clients from '../Clients';
import Contact from '../Contact';
import Footer from '../Footer';
import WhatsAppButton from '../WhatsAppButton';

const HomeApp: React.FC = () => (
  <LanguageProvider>
    <Header currentPath="/" />
    <main id="main-content">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Clients />
      <Contact />
    </main>
    <Footer currentPath="/" />
    <WhatsAppButton />
  </LanguageProvider>
);

export default HomeApp;
