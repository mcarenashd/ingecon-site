import React from 'react';
import { LanguageProvider } from '../../i18n';
import Header from '../Header';
import Careers from '../Careers';
import Footer from '../Footer';

const CareersApp: React.FC = () => (
  <LanguageProvider>
    <Header currentPath="/carreras" />
    <main id="main-content">
      <Careers />
    </main>
    <Footer currentPath="/carreras" />
  </LanguageProvider>
);

export default CareersApp;
