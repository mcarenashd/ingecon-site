import React from 'react';
import { LanguageProvider } from '../../i18n';
import Header from '../Header';
import NotFound from '../NotFound';
import Footer from '../Footer';
import WhatsAppButton from '../WhatsAppButton';

const NotFoundApp: React.FC = () => (
  <LanguageProvider>
    <Header currentPath="/404" />
    <main id="main-content">
      <NotFound />
    </main>
    <Footer currentPath="/404" />
    <WhatsAppButton />
  </LanguageProvider>
);

export default NotFoundApp;
