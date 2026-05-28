import React from 'react';
import { LanguageProvider } from '../i18n';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Projects from './Projects';
import Clients from './Clients';
import FAQ from './FAQ';
import Contact from './Contact';
import Careers from './Careers';
import DataPolicy from './DataPolicy';
import NotFound from './NotFound';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export type Page = 'home' | 'careers' | 'policy' | 'notfound';

interface AppProps {
  page: Page;
  currentPath: string;
}

const App: React.FC<AppProps> = ({ page, currentPath }) => (
  <LanguageProvider>
    <Header currentPath={currentPath} />
    <main id="main-content">
      {page === 'home' && (
        <>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Clients />
          <FAQ />
          <Contact />
        </>
      )}
      {page === 'careers' && <Careers />}
      {page === 'policy' && <DataPolicy />}
      {page === 'notfound' && <NotFound />}
    </main>
    <Footer currentPath={currentPath} />
    <WhatsAppButton />
  </LanguageProvider>
);

export default App;
