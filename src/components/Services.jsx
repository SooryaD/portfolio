import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, CheckCircle2 } from 'lucide-react';
import './Services.css';
import servicesImage from '../assets/service.jpg';

const services = [
    {
        number: '1.',
        title: 'MOBILE DEVELOPMENT',
        items: [
            'Flutter & Dart for cross-platform iOS and Android apps',
            'State Management using BLoC pattern',
            'Responsive UI development from Figma designs',
        ],
    },
    {
        number: '2.',
        title: 'BACKEND & APIs',
        items: [
            'REST API integration and management',
            'GraphQL and Hasura database integration',
            'Authentication and data flow architecture',
        ],
    },
    {
        number: '3.',
        title: 'CLOUD & TOOLS',
        items: [
            'Firebase Authentication and real-time database',
            'Google Cloud Platform (Associate Certified)',
            'Cloudinary for media management',
        ],
    },
    {
        number: '4.',
        title: 'DEVELOPMENT TOOLS',
        items: [
            'Git & GitHub for version control',
            'Figma for UI design and prototyping',
            'VS Code, Python scripting basics',
        ],
    },
];

const Services = ({ servicesPlaceholderRef }) => {
    const [openIndex, setOpenIndex] = useState(0);
    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section id="services" className="section services-section">
            <div className="container">
                <div className="services-layout">

                    {/* Left: Accordion */}
                    <div className="services-left">
                        <motion.div
                            className="services-header"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="services-title">WHAT I CAN DO FOR YOU</h2>
                            <p className="services-subtitle">
                                As a Flutter developer, I build high-performance mobile apps,<br />
                                integrate modern APIs, and deploy with cloud services.
                            </p>
                        </motion.div>

                        <div className="services-accordion">
                            {services.map((svc, i) => (
                                <motion.div
                                    key={i}
                                    className={`accordion-item ${openIndex === i ? 'open' : ''}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.07 }}
                                >
                                    <button className="accordion-trigger" onClick={() => toggle(i)}>
                                        <span className="accordion-num-title">
                                            <span className="accordion-num">{svc.number}</span>
                                            <span className="accordion-title">{svc.title}</span>
                                        </span>
                                        <motion.div
                                            animate={{ rotate: openIndex === i ? 0 : 180 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronUp size={18} className="accordion-chevron" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === i && (
                                            <motion.div
                                                className="accordion-body"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <ul className="accordion-sub-list">
                                                    {svc.items.map((item, j) => (
                                                        <li key={j} className="accordion-sub-item">
                                                            <CheckCircle2 size={16} className="check-icon" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: 3D tilted image */}
                    <motion.div
                        className="services-right"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="services-img-wrapper" ref={servicesPlaceholderRef}>
                            <img
                                src={servicesImage}
                                alt="Services Placeholder"
                                className="services-img"
                                style={{ opacity: 0 }}
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Services;
