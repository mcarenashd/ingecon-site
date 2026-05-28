import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n';
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

const Home: React.FC = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Projects />
    <Clients />
    <Contact />
  </>
);

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="bg-white text-gray-800 font-sans leading-normal tracking-tight">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carreras" element={<Careers />} />
            <Route path="/politica-de-datos" element={<DataPolicy />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
