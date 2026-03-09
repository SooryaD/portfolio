import React, { useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TechnicalSkills.css';

const skills = [
    {
        name: 'Flutter',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
        label: 'Mobile App Development',
        sub: '2+ years experience',
        size: 'large',
        delay: 0,
        floatDuration: 3.2,
        accentColor: 'rgba(84,190,247,0.15)',
        glowColor: '54,190,247',
        desc: 'Open-source UI toolkit by Google for building natively compiled, cross-platform apps from a single Dart codebase.',
    },
    {
        name: 'Firebase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
        label: 'Backend & Auth',
        sub: 'API Integration',
        size: 'large',
        delay: 0.1,
        floatDuration: 3.8,
        accentColor: 'rgba(255,196,0,0.14)',
        glowColor: '255,160,0',
        desc: 'Google\'s backend-as-a-service platform providing authentication, Firestore database, cloud storage, and hosting.',
    },
    {
        name: 'Dart',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
        label: 'Core Language',
        sub: 'Flutter & CLI',
        size: 'normal',
        delay: 0.2,
        floatDuration: 3.5,
        accentColor: 'rgba(0,180,255,0.12)',
        glowColor: '0,180,255',
        desc: 'Strongly-typed, object-oriented programming language optimised for fast client-side and UI development.',
    },
    {
        name: 'Google Cloud',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
        label: 'Cloud & Infra',
        sub: 'GCP Certified',
        size: 'large',
        delay: 0.15,
        floatDuration: 4.0,
        accentColor: 'rgba(66,133,244,0.14)',
        glowColor: '66,133,244',
        desc: 'Google\'s suite of cloud services — compute, storage, ML APIs, and serverless functions at global scale.',
    },
    {
        name: 'GraphQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
        label: 'API Layer',
        sub: 'Hasura & Apollo',
        size: 'normal',
        delay: 0.3,
        floatDuration: 3.6,
        accentColor: 'rgba(229,53,171,0.12)',
        glowColor: '229,53,171',
        desc: 'Modern API query language that lets clients request exactly the data they need — no over or under-fetching.',
    },
    {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        label: 'Version Control',
        sub: 'Project Collaboration',
        size: 'normal',
        delay: 0.35,
        floatDuration: 3.3,
        accentColor: 'rgba(240,80,51,0.12)',
        glowColor: '240,80,51',
        desc: 'Distributed version control system for tracking changes in source code and enabling team collaboration.',
    },
    {
        name: 'GitHub',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        label: 'Code Hosting',
        sub: 'CI/CD & Actions',
        size: 'normal',
        delay: 0.4,
        floatDuration: 3.7,
        accentColor: 'rgba(150,150,150,0.12)',
        glowColor: '100,100,100',
        invertDark: true,
        desc: 'Cloud platform for hosting Git repositories with CI/CD pipelines, pull requests, and GitHub Actions automation.',
    },
    {
        name: 'Figma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
        label: 'UI/UX Design',
        sub: 'Prototyping',
        size: 'normal',
        delay: 0.45,
        floatDuration: 3.4,
        accentColor: 'rgba(162,89,255,0.12)',
        glowColor: '162,89,255',
        desc: 'Browser-based collaborative design tool for wireframing, component systems, and interactive prototypes.',
    },
    {
        name: 'VS Code',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
        label: 'Primary IDE',
        sub: 'Extensions & Workflow',
        size: 'normal',
        delay: 0.5,
        floatDuration: 3.9,
        accentColor: 'rgba(0,122,204,0.12)',
        glowColor: '0,122,204',
        desc: 'Lightweight but powerful source-code editor with a rich extension ecosystem for Dart, Flutter, and web dev.',
    },
    {
        name: 'Postman',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
        label: 'API Testing',
        sub: 'REST & GraphQL',
        size: 'normal',
        delay: 0.55,
        floatDuration: 3.2,
        accentColor: 'rgba(255,108,55,0.12)',
        glowColor: '255,108,55',
        desc: 'API platform for building, testing, and documenting REST and GraphQL endpoints with environment management.',
    },
    {
        name: 'Cloudinary',
        icon: 'https://res.cloudinary.com/cloudinary/image/upload/new_cloudinary_logo_square.png',
        label: 'Media Storage',
        sub: 'Image & Video CDN',
        size: 'normal',
        delay: 0.6,
        floatDuration: 3.6,
        accentColor: 'rgba(50,170,240,0.12)',
        glowColor: '50,170,240',
        desc: 'Cloud-based media management for storing, transforming, and delivering images and videos via global CDN.',
    },
    {
        name: 'JSON',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg',
        label: 'Data Format',
        sub: 'Parsing & Serialization',
        size: 'normal',
        delay: 0.65,
        floatDuration: 3.5,
        accentColor: 'rgba(255,200,0,0.12)',
        glowColor: '255,200,0',
        desc: 'Lightweight, human-readable data-interchange format used for API responses, config files, and local storage.',
    },
];

/* Calculates the fixed popup position from the card's bounding rect */
function getPopupPos(rect) {
    const POPUP_W = 270;
    const POPUP_H = 130; // approximate
    const GAP = 12;
    const VP_W = window.innerWidth;
    const VP_H = window.innerHeight;

    // Default: appear above the card, horizontally centred on it
    let left = rect.left + rect.width / 2 - POPUP_W / 2;
    let top = rect.top - POPUP_H - GAP;

    // If above viewport, place below instead
    if (top < 8) {
        top = rect.bottom + GAP;
    }

    // Clamp horizontally within viewport
    left = Math.max(8, Math.min(left, VP_W - POPUP_W - 8));
    // Clamp vertically at bottom edge
    top = Math.min(top, VP_H - POPUP_H - 8);

    return { left, top };
}

/* ── Single skill card ── */
const SkillCard = ({ skill, index, onHover, onHoverEnd }) => {
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
        card.style.setProperty('--spotlight-opacity', '1');
    }, []);

    const handleMouseEnter = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        onHover(skill, card.getBoundingClientRect());
    }, [skill, onHover]);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        card.style.setProperty('--spotlight-opacity', '0');
        onHoverEnd();
    }, [onHoverEnd]);

    // Mobile tap toggle
    const handleClick = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        onHover(skill, card.getBoundingClientRect(), /* toggle */ true);
    }, [skill, onHover]);

    return (
        <motion.div
            ref={cardRef}
            className={`bento-card bento-card--${skill.size}`}
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: skill.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
                '--card-glow': skill.accentColor,
                '--icon-glow': skill.glowColor,
                '--x': '50%',
                '--y': '50%',
                '--spotlight-opacity': '0',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Cursor spotlight overlay */}
            <div className="bento-spotlight" />

            {/* Floating icon */}
            <div
                className={`bento-icon-ring ${skill.invertDark ? 'invert-dark' : ''}`}
                style={{
                    animationDuration: `${skill.floatDuration}s`,
                    animationDelay: `${index * 0.28}s`,
                }}
            >
                <img
                    src={skill.icon}
                    alt={skill.name}
                    className="bento-icon"
                    loading="lazy"
                />
            </div>

            {/* Text */}
            <div className="bento-text">
                <span className="bento-name">{skill.name}</span>
                {skill.size === 'large' && (
                    <>
                        <span className="bento-label">{skill.label}</span>
                        <span className="bento-sub">{skill.sub}</span>
                    </>
                )}
            </div>

            {/* Tooltip */}
            <div className="bento-tooltip">
                <strong>{skill.name}</strong>
                <span>{skill.label}</span>
                <span className="bento-tooltip-sub">{skill.sub}</span>
            </div>

            {/* Ambient glow orb */}
            <div className="bento-glow" />
        </motion.div>
    );
};

/* ── Floating popup rendered at fixed position ── */
const SkillPopup = ({ skill, pos }) => (
    <motion.div
        className="skill-popup"
        style={{ left: pos.left, top: pos.top }}
        initial={{ opacity: 0, scale: 0.88, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 8 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
        <div className="skill-popup-header">
            <div className="skill-popup-icon-wrap">
                <img
                    src={skill.icon}
                    alt={skill.name}
                    className={`skill-popup-icon ${skill.invertDark ? 'invert-dark' : ''}`}
                />
            </div>
            <div className="skill-popup-title-wrap">
                <span className="skill-popup-name">{skill.name}</span>
                <span className="skill-popup-label">{skill.label}</span>
            </div>
        </div>
        <p className="skill-popup-desc">{skill.desc}</p>
    </motion.div>
);

/* ── Section ── */
const TechnicalSkills = () => {
    const [popup, setPopup] = useState(null); // { skill, pos }
    const lastTapped = useRef(null);

    const handleHover = useCallback((skill, rect, isTap = false) => {
        if (isTap) {
            // Toggle: if same card tapped again, dismiss
            if (lastTapped.current === skill.name) {
                lastTapped.current = null;
                setPopup(null);
            } else {
                lastTapped.current = skill.name;
                setPopup({ skill, pos: getPopupPos(rect) });
            }
            return;
        }
        setPopup({ skill, pos: getPopupPos(rect) });
    }, []);

    const handleHoverEnd = useCallback(() => {
        // Only hide on mouse-leave if not a tapped popup
        if (!lastTapped.current) {
            setPopup(null);
        }
    }, []);

    // Close tapped popup on outside click
    const handleSectionClick = useCallback((e) => {
        if (!e.target.closest('.bento-card') && lastTapped.current) {
            lastTapped.current = null;
            setPopup(null);
        }
    }, []);

    return (
        <section id="skills" className="section skills-section" onClick={handleSectionClick}>
            <div className="container">
                <motion.div
                    className="skills-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="skills-title">TECHNICAL SKILLS</h2>
                    <p className="skills-subtitle">
                        Technologies and tools I work with to build modern mobile and cloud applications.
                    </p>
                </motion.div>

                <div className="bento-grid">
                    {skills.map((skill, index) => (
                        <SkillCard
                            key={skill.name}
                            skill={skill}
                            index={index}
                            onHover={handleHover}
                            onHoverEnd={handleHoverEnd}
                        />
                    ))}
                </div>
            </div>

            {/* Fixed-position floating popup — rendered outside the grid flow */}
            <AnimatePresence>
                {popup && (
                    <SkillPopup
                        key={popup.skill.name}
                        skill={popup.skill}
                        pos={popup.pos}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default TechnicalSkills;
