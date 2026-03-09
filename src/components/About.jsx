import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import heroImage from '../assets/hero.jpg';
import './About.css';

const useCountUp = (target, duration = 1800, start = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
};

const About = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
            { threshold: 0.25 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const apps = useCountUp(4, 1600, hasStarted);
    const certs = useCountUp(4, 1800, hasStarted);
    const years = useCountUp(2, 1400, hasStarted);

    const certifications = [
        'Associate Google Cloud Engineer – GCP',
        'Flutter Development Certification',
        'Generative AI Certifications',
        'AI Prompt Engineering Certifications',
    ];

    return (
        <section id="about" className="section about-section">
            <div className="container">

                <motion.h2
                    className="about-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    ABOUT ME
                </motion.h2>

                <motion.p
                    className="about-intro"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                >
                    Hello! I'm Soorya Durairaj, a passionate Flutter developer and Technical Support Engineer based in Chennai, India.
                </motion.p>

                <div className="about-layout">

                    {/* Left */}
                    <motion.div
                        className="about-left"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Stats */}
                        <div className="about-stats" ref={ref}>
                            <div className="about-stat">
                                <span className="stat-num">{apps}<span className="stat-plus">+</span></span>
                                <span className="stat-label">Mobile Apps<br />Developed</span>
                            </div>
                            <div className="about-stat">
                                <span className="stat-num">{certs}<span className="stat-plus">+</span></span>
                                <span className="stat-label">Cloud &<br />AI Certifications</span>
                            </div>
                            <div className="about-stat">
                                <span className="stat-num">{years}<span className="stat-plus">+</span></span>
                                <span className="stat-label">Year of<br />Experience</span>
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="about-bio">
                            I currently work at Tata Consultancy Services on the BT Telecom project, maintaining telecom data integrity and troubleshooting system issues in large-scale environments. I also completed a Flutter development internship where I built mobile apps including a movie streaming app and a food ordering app using Flutter, Dart, REST APIs, and GraphQL.
                        </p>

                        {/* Certifications */}
                        <div className="about-certs">
                            <span className="about-certs-label">Certifications</span>
                            {certifications.map((cert, i) => (
                                <span key={i} className="about-cert-item">
                                    <span className="about-cert-dot" />
                                    {cert}
                                </span>
                            ))}
                        </div>

                        {/* Contact info */}
                        <div className="about-contact-row">
                            <div className="about-contact-item">
                                <span className="about-contact-label">Location :</span>
                                <span className="about-contact-val">Chennai, India</span>
                            </div>
                            <div className="about-contact-item">
                                <span className="about-contact-label">Email :</span>
                                <span className="about-contact-val">sooryadefence@gmail.com</span>
                            </div>
                        </div>

                        {/* Social icons */}
                        <div className="about-socials">
                            <a href="mailto:sooryadefence@gmail.com" className="about-social-btn" aria-label="Email"><Mail size={15} /></a>
                            <a href="https://github.com/SooryaD/portfolio" target="_blank" rel="noreferrer" className="about-social-btn" aria-label="GitHub"><Github size={15} /></a>
                            <a href="https://www.linkedin.com/in/soorya-durairaj-b44700288" target="_blank" rel="noreferrer" className="about-social-btn" aria-label="LinkedIn"><Linkedin size={15} /></a>
                            <a href="https://twitter.com/Soorya_Durairaj" target="_blank" rel="noreferrer" className="about-social-btn" aria-label="Twitter"><Twitter size={15} /></a>
                        </div>

                        <div className="about-action-row">
                            <button className="about-story-btn">MY STORY</button>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="about-resume-btn"
                            >
                                VIEW RESUME
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: portrait */}
                    <motion.div
                        className="about-right"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                        <div className="about-portrait-wrapper">
                            <img
                                src={heroImage}
                                alt="Soorya Durairaj"
                                className="about-portrait-img"
                            />
                            <motion.div
                                className="about-hi-badge"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            >
                                🤚
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
