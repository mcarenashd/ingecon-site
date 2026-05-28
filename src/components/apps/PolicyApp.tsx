import React from 'react';
import { LanguageProvider } from '../../i18n';
import Header from '../Header';
import DataPolicy from '../DataPolicy';
import Footer from '../Footer';

const PolicyApp: React.FC = () => (
  <LanguageProvider>
    <Header currentPath="/politica-de-datos" />
    <main id="main-content">
      <DataPolicy />
    </main>
    <Footer currentPath="/politica-de-datos" />
  </LanguageProvider>
);

export default PolicyApp;
