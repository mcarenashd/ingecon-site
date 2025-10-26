import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DataPolicy from './components/DataPolicy';

const App: React.FC = () => {
  const [page, setPage] = useState('home');

  return (
    <div className="bg-white text-gray-800 font-sans leading-normal tracking-tight">
      <Header setPage={setPage} currentPage={page} />
      <main>
        {page === 'home' ? (
          <>
            <Hero />
            <About />
            <Services />
            <Projects />
            <Clients />
            <Contact />
          </>
        ) : (
          <DataPolicy />
        )}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
};

export default App;