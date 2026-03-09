import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './Hero';
import Services from './Services';
import heroImage from '../assets/hero.jpg';
import servicesImage from '../assets/service.jpg';
import './HeroServices.css';

gsap.registerPlugin(ScrollTrigger);

const HeroServices = () => {
    const container = useRef(null);
    const flipCard = useRef(null);
    const heroPlaceholder = useRef(null);
    const servicesPlaceholder = useRef(null);

    useGSAP(() => {
        // Return early if any essential ref is missing
        if (!container.current || !flipCard.current || !heroPlaceholder.current || !servicesPlaceholder.current) {
            return;
        }

        // Ensure images themselves are hidden while the animated flip card is actively moving
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: () => `+=${window.innerHeight * 1.2}`, // Extended scroll distance to ensure a full unhurried flip
                scrub: true,
                invalidateOnRefresh: true,
                onEnter: () => {
                    gsap.set(flipCard.current, { opacity: 1 });
                    gsap.set(heroPlaceholder.current.firstChild, { opacity: 0 });
                    gsap.set(servicesPlaceholder.current.firstChild, { opacity: 0 });
                },
                onLeave: () => {
                    gsap.set(flipCard.current, { opacity: 0 });
                    gsap.set(heroPlaceholder.current.firstChild, { opacity: 0 });
                    gsap.set(servicesPlaceholder.current.firstChild, { opacity: 1 });
                },
                onEnterBack: () => {
                    gsap.set(flipCard.current, { opacity: 1 });
                    gsap.set(heroPlaceholder.current.firstChild, { opacity: 0 });
                    gsap.set(servicesPlaceholder.current.firstChild, { opacity: 0 });
                },
                onLeaveBack: () => {
                    // Back at the very top (Hero section)
                    gsap.set(flipCard.current, { opacity: 0 });
                    gsap.set(heroPlaceholder.current.firstChild, { opacity: 1 });
                    gsap.set(servicesPlaceholder.current.firstChild, { opacity: 0 });
                }
            }
        });

        // Simpler approach: We map exact rect attributes manually.
        // GSAP can smoothly interpolate CSS variables or properties based on functions.

        // We want to animate flipCard from heroPlaceholder rect to servicesPlaceholder rect.
        // Because flipCard is absolute within `container`, its offsets are relative to `container`.

        tl.to(flipCard.current, {
            // End state: match the services placeholder
            x: () => {
                const sRect = servicesPlaceholder.current.getBoundingClientRect();
                const cRect = container.current.getBoundingClientRect();
                return sRect.left - cRect.left;
            },
            y: () => {
                const sRect = servicesPlaceholder.current.getBoundingClientRect();
                const cRect = container.current.getBoundingClientRect();
                return sRect.top - cRect.top;
            },
            width: () => servicesPlaceholder.current.offsetWidth,
            height: () => servicesPlaceholder.current.offsetHeight,
            rotateY: 180, // 3D Flip
            ease: 'power1.inOut' // A smoother ease for scrubbing
        });

        // Initialize at Hero position
        gsap.set(flipCard.current, {
            x: () => {
                const hRect = heroPlaceholder.current.getBoundingClientRect();
                const cRect = container.current.getBoundingClientRect();
                return hRect.left - cRect.left;
            },
            y: () => {
                const hRect = heroPlaceholder.current.getBoundingClientRect();
                const cRect = container.current.getBoundingClientRect();
                return hRect.top - cRect.top;
            },
            width: () => heroPlaceholder.current.offsetWidth,
            height: () => heroPlaceholder.current.offsetHeight,
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
            opacity: 0 // hidden initially since we are in onLeaveBack state
        });

        // Ensure starting static image is visible before scroll starts
        gsap.set(heroPlaceholder.current.firstChild, { opacity: 1 });

        // We also need a scrollTrigger to ensure the initial position is updated on resize
        ScrollTrigger.addEventListener("refreshInit", () => {
            gsap.set(flipCard.current, {
                x: () => {
                    const hRect = heroPlaceholder.current.getBoundingClientRect();
                    const cRect = container.current.getBoundingClientRect();
                    return hRect.left - cRect.left;
                },
                y: () => {
                    const hRect = heroPlaceholder.current.getBoundingClientRect();
                    const cRect = container.current.getBoundingClientRect();
                    return hRect.top - cRect.top;
                },
                width: () => heroPlaceholder.current.offsetWidth,
                height: () => heroPlaceholder.current.offsetHeight,
            });
        });

    }, { scope: container });

    return (
        <div className="hero-services-wrapper" ref={container}>
            {/* 3D Flip Card overlays both components */}
            <div className="flip-card-3d" ref={flipCard}>
                <div className="flip-card-front">
                    <img
                        src={heroImage}
                        alt="Hero Front"
                    />
                </div>
                <div className="flip-card-back">
                    <img
                        src={servicesImage}
                        alt="Services Back"
                    />
                </div>
            </div>

            {/* Render subcomponents and pass them refs for their placeholders */}
            <Hero heroPlaceholderRef={heroPlaceholder} />
            <Services servicesPlaceholderRef={servicesPlaceholder} />
        </div>
    );
};

export default HeroServices;
