import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

const projects = [
    {
        title: 'PROJECT TRACKING SYSTEM',
        category: 'React.js · MySQL · Node.js ',
        description: 'A project management and tracking application designed to monitor project progress, manage tasks, and improve workflow efficiency for teams.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1400&auto=format&fit=crop',
    },
    {
        title: 'MOVIE STREAMING APP',
        category: 'Flutter · GraphQL',
        description: 'A Flutter-based mobile application allowing users to browse and stream movies with a clean and fully responsive user interface.',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1400&auto=format&fit=crop',
    },
    {
        title: 'FOOD ORDERING APP',
        category: 'Flutter · Hasura · REST API',
        description: 'A mobile application where users can browse restaurants and place food orders through a simple and intuitive interface.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1400&auto=format&fit=crop',
    },
    {
        title: 'POCKET GIVING CHARITY APP',
        category: 'Flutter · Firebase · GCP',
        description: 'A charity donation mobile application built using Flutter with API integrations, Firebase Authentication, and Google Cloud Platform services.',
        image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1400&auto=format&fit=crop',
    },
];

const StackedCard = ({ project, i, progress, range, targetScale, isLast }) => {
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div style={{
            position: 'sticky',
            top: `calc(10vh + ${i * 25}px)`,
            zIndex: i,
            marginBottom: isLast ? '0' : '24vh',
        }}>
            <motion.div style={{ scale, transformOrigin: 'top center' }}>
                <motion.div
                    className="project-card"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.015 }}
                >
                    <div className="project-img-container">
                        <img src={project.image} alt={project.title} className="project-img" />
                        <div className="project-overlay">
                            <div className="project-top-row">
                                <div className="project-arrow-btn">
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>
                            <div className="project-center-content">
                                <span className="project-category-pill">{project.category}</span>
                                <h3 className="project-name">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const Projects = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section id="projects" className="section projects-section" ref={container}>
            <div className="container">
                <motion.div
                    className="projects-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h2 className="projects-title">FEATURED PROJECTS</h2>
                        <p className="projects-subtitle">
                            Mobile applications built with Flutter, Dart, REST APIs, GraphQL,<br />
                            Firebase, and Google Cloud Platform.
                        </p>
                    </div>
                </motion.div>

                <div className="projects-list">
                    {projects.map((project, i) => {
                        const targetScale = 1 - ((projects.length - 1 - i) * 0.04);
                        const progressStart = i * 0.25;
                        return (
                            <StackedCard
                                key={i}
                                i={i}
                                project={project}
                                progress={scrollYProgress}
                                range={[progressStart, 1]}
                                targetScale={targetScale}
                                isLast={i === projects.length - 1}
                            />
                        );
                    })}
                </div>

                <motion.div
                    className="projects-cta"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <button className="projects-browse-btn">VIEW ALL PROJECTS</button>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
