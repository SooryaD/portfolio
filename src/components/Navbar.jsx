import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.jpg';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ['home', 'services', 'about', 'projects', 'skills', 'faq', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) current = section;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Blogs', id: 'contact' },
  ];

  return (
    <motion.nav
      className={`portavia-nav ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-inner">

        {/* LEFT: Avatar + "Available for work" — all in the same pill */}
        <div className="nav-available">
          <img
            src={heroImage}
            alt="Avatar"
            className="nav-avatar-img"
          />
          <span className="nav-available-text">Available for work</span>
          <span className="nav-available-dot" />
        </div>

        {/* Divider */}
        <div className="nav-divider" />

        {/* CENTER: Nav links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT: Contact button */}
        <a href="#contact" className="nav-contact-btn">Contact</a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
