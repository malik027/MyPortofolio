import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="antialiased w-full min-h-screen flex flex-col bg-[#0B0B0C] relative overflow-x-hidden text-white font-sans selection:bg-teal-500/30 selection:text-teal-200">

        {/* Background Effects */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-[20%] left-[20%] w-[20%] h-[20%] bg-blue-500/5 rounded-full blur-[80px] animate-bounce delay-1000 duration-[10s]"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 flex flex-col w-full">
          <Navbar />

          <main className="flex flex-col w-full pb-0 bg-transparent space-y-24 md:space-y-32">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;

