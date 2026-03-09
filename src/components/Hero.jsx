import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.jpg';
import './Hero.css';

const Hero = ({ heroPlaceholderRef }) => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-inner">
        <div className="hero-main-grid">

          {/* Left block */}
          <motion.div
            className="hero-left-block"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-name-label">SOORYA DURAIRAJ</span>
            <h1 className="hero-giant-text">FLUTTER</h1>
          </motion.div>

          {/* Center Portrait */}
          <motion.div
            className="hero-portrait-wrapper"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div className="hero-portrait-frame" ref={heroPlaceholderRef}>
              <img
                src={heroImage}
                alt="Soorya Durairaj Placeholder"
                className="hero-portrait-img"
                style={{ opacity: 0 }}
              />
            </div>
            <motion.div
              className="hero-hi-badge"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            >
              🤚
            </motion.div>
          </motion.div>

          {/* Right block */}
          <motion.div
            className="hero-right-block"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero-giant-text">DEVELOPER</h1>
            <p className="hero-tagline">
              I build scalable mobile applications and integrate modern APIs to create reliable and efficient digital solutions.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
