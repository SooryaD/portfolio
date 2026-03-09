import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqs = [
    {
        number: '01',
        question: 'What kind of mobile apps do you build?',
        answer: 'I build cross-platform mobile applications for iOS and Android using Flutter and Dart. My projects include a project tracking system, a movie streaming app, a food ordering app, and a charity donation application — all with REST API or GraphQL integrations.',
    },
    {
        number: '02',
        question: 'What is your technology stack?',
        answer: 'My primary stack is Flutter + Dart for mobile development, with REST API and GraphQL (Hasura) for backend integrations. I use Firebase Authentication, Google Cloud Platform, and Cloudinary for cloud services. I also use Git, GitHub, Figma, and VS Code in my workflow.',
    },
    {
        number: '03',
        question: 'What is your professional background?',
        answer: 'I work as a Technical Support Engineer at Tata Consultancy Services in the Data Integrity team for the BT Telecom project. I handle telecom data validation, troubleshoot service issues, and ensure accuracy across broadband, landline, and mobile services. I also completed a Flutter development internship building production apps.',
    },
    {
        number: '04',
        question: 'What certifications do you hold?',
        answer: 'I hold the Associate Google Cloud Engineer certification from Google Cloud Platform. I also have a Flutter Development Certification, along with Generative AI and AI Prompt Engineering certifications.',
    },
    {
        number: '05',
        question: 'Are you available for freelance Flutter projects?',
        answer: 'Yes! I am open to Flutter freelance projects and collaborations. Feel free to reach out at sooryadefence@gmail.com or call +91 7708721878 to discuss your project requirements and timeline.',
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section id="faq" className="section faq-section">
            <div className="container">
                <motion.div
                    className="faq-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="faq-title">FREQUENTLY ASKED QUESTIONS</h2>
                </motion.div>

                <div className="faq-list">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            className={`faq-item ${openIndex === i ? 'open' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                        >
                            <button className="faq-trigger" onClick={() => toggle(i)}>
                                <span className="faq-trigger-left">
                                    <span className="faq-num">{faq.number}</span>
                                    <span className="faq-question">{faq.question}</span>
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 0 : 180 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronUp size={18} className="faq-chevron" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        className="faq-body"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <p className="faq-answer">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
