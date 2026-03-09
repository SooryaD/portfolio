import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import heroImage from '../assets/hero.jpg';
import './Contact.css';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:sooryadefence@gmail.com?subject=Portfolio Inquiry from ${form.name}&body=${form.message}`;
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <div className="contact-layout">

                    {/* LEFT — portrait + info */}
                    <motion.div
                        className="contact-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="contact-portrait-wrap">
                            <img
                                src={heroImage}
                                alt="Soorya Durairaj"
                                className="contact-portrait"
                            />
                            <motion.div
                                className="contact-hi-badge"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            >
                                🤚
                            </motion.div>
                        </div>

                        <div className="contact-info-list">
                            <div className="contact-info-item">
                                <Mail size={15} className="contact-info-icon" />
                                sooryadefence@gmail.com
                            </div>
                            <div className="contact-info-item">
                                <Phone size={15} className="contact-info-icon" />
                                +91 7708721878
                            </div>
                            <div className="contact-info-item">
                                <MapPin size={15} className="contact-info-icon" />
                                Chennai, India
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT — form */}
                    <motion.div
                        className="contact-right"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                        <h2 className="contact-title">GET IN TOUCH</h2>
                        <p className="contact-subtitle">
                            Have a Flutter project in mind? Let's build something great together.
                        </p>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="contact-row">
                                <div className="contact-field">
                                    <label>Name</label>
                                    <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="contact-field">
                                    <label>Email</label>
                                    <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="contact-field">
                                <label>Service</label>
                                <select name="service" value={form.service} onChange={handleChange}>
                                    <option value="">Select a service</option>
                                    <option value="flutter">Flutter App Development</option>
                                    <option value="api">API Integration</option>
                                    <option value="firebase">Firebase & Cloud</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="contact-field">
                                <label>Message</label>
                                <textarea name="message" placeholder="Tell me about your project..." rows={5} value={form.message} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="contact-submit-btn">
                                <Send size={15} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="contact-footer-bar">
                    <p className="contact-copy">© 2026 SOORYA DURAIRAJ</p>
                    <div className="contact-socials">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">X / TWITTER</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">LINKEDIN</a>
                        <a href="https://github.com" target="_blank" rel="noreferrer">GITHUB</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
