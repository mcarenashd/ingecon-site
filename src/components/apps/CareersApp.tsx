import React from 'react';
import { LanguageProvider } from '../../i18n';
import Header from '../Header';
import Careers from '../Careers';
import Footer from '../Footer';
import WhatsAppButton from '../WhatsAppButton';

const CareersApp: React.FC = () => (
  <LanguageProvider>
    <Header currentPath="/carreras" />
    <main id="main-content">
      <Careers />
    </main>
    <Footer currentPath="/carreras" />
    <WhatsAppButton />
  </LanguageProvider>
);

export default CareersApp;
