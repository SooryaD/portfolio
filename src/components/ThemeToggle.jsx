import React from 'react';
import { motion } from 'framer-motion';
import './ThemeToggle.css';

const ThemeToggle = ({ isDark, toggleTheme }) => {
    return (
        <motion.div
            className="theme-toggle-float"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
        >
            <button
                className={`toggle-switch ${isDark ? 'is-dark' : ''}`}
                onClick={toggleTheme}
                aria-label="Toggle dark/light mode"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                <motion.div
                    className="toggle-knob"
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
            </button>
        </motion.div>
    );
};

export default ThemeToggle;
