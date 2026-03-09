import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroServices from './components/HeroServices';
import About from './components/About';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08, // Very smooth interpolation
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Override GSAP's internal ticker to use Lenis's perfectly synchronized RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <HeroServices />
        <About />
        <Projects />
        <TechnicalSkills />
        <FAQ />
        <Contact />
      </main>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
    </>
  );
}

export default App;
