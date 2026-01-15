import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import '../styles/card.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const Typewriter = ({ text, delay = 100 }) => {
    const [displayText, setDisplayText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        setDisplayText('');
        indexRef.current = 0;

        const interval = setInterval(() => {
            if (indexRef.current < text.length) {
                setDisplayText(text.substring(0, indexRef.current + 1));
                indexRef.current++;
            } else {
                clearInterval(interval);
            }
        }, delay);
        return () => clearInterval(interval);
    }, [text, delay]);

    return <span>{displayText}<span className="animate-pulse text-teal-400">|</span></span>;
};

// Interactive 3D Photo Card with cursor-following light effect
const InteractivePhotoCard = ({ t }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Motion values for mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Light effect position (in percentages)
    const lightX = useMotionValue(50);
    const lightY = useMotionValue(50);

    // Spring configuration for smoother 3D tilt
    const springConfig = { damping: 30, stiffness: 180, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

    // Smoother spring for light position
    const smoothLightX = useSpring(lightX, { damping: 25, stiffness: 150 });
    const smoothLightY = useSpring(lightY, { damping: 25, stiffness: 150 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalized values for rotation (-0.5 to 0.5)
        const normalizedX = (e.clientX - centerX) / rect.width;
        const normalizedY = (e.clientY - centerY) / rect.height;

        mouseX.set(normalizedX);
        mouseY.set(normalizedY);

        // Light position (0 to 100%)
        const percentX = ((e.clientX - rect.left) / rect.width) * 100;
        const percentY = ((e.clientY - rect.top) / rect.height) * 100;
        lightX.set(percentX);
        lightY.set(percentY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
        lightX.set(50);
        lightY.set(50);
    };

    return (
        <div className="relative" style={{ perspective: '1200px' }}>
            {/* Outer Glow - extends beyond card */}
            <motion.div
                className="absolute -inset-8 rounded-[3rem] pointer-events-none blur-3xl transition-opacity duration-500"
                style={{
                    background: useTransform(
                        [smoothLightX, smoothLightY],
                        ([x, y]) => `radial-gradient(circle 400px at ${x}% ${y}%, rgba(255,250,220,0.35) 0%, rgba(255,235,180,0.15) 40%, transparent 70%)`
                    ),
                    opacity: isHovered ? 1 : 0
                }}
            />

            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative w-full max-w-sm cursor-pointer"
            >
                {/* Main Card */}
                <div className="relative bg-[#0a0a0f] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">

                    {/* Photo Container */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <img
                            src="/avatar.jpg"
                            alt="Anjas Malik"
                            className="w-full h-full object-cover transition-transform duration-700"
                            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent"></div>

                        {/* Dynamic Light Effect - follows cursor (sunlight glow) */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                            style={{
                                background: useTransform(
                                    [smoothLightX, smoothLightY],
                                    ([x, y]) => `radial-gradient(circle 300px at ${x}% ${y}%, rgba(255,250,230,0.4) 0%, rgba(255,245,200,0.15) 40%, transparent 70%)`
                                ),
                                opacity: isHovered ? 1 : 0
                            }}
                        />

                        {/* Secondary Glow - soft warm ambient */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                            style={{
                                background: useTransform(
                                    [smoothLightX, smoothLightY],
                                    ([x, y]) => `radial-gradient(circle 450px at ${x}% ${y}%, rgba(255,255,240,0.08) 0%, transparent 60%)`
                                ),
                                opacity: isHovered ? 0.8 : 0
                            }}
                        />

                        {/* Name Overlay */}
                        <div className="absolute top-6 left-0 right-0 text-center z-10" style={{ transform: 'translateZ(40px)' }}>
                            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg tracking-wide">
                                Anjas Malik
                            </h2>
                            <p className="text-gray-300/80 text-sm font-medium mt-1 tracking-widest uppercase">
                                {t.hero.jobTitle}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xl rounded-2xl p-3 border border-white/10 flex items-center justify-between shadow-lg" style={{ transform: 'translateZ(30px)' }}>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img src="/avatar.jpg" alt="Avatar Mini" className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></span>
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">@anjasmalik_</div>
                                <div className="text-green-400 text-xs font-medium">{t.hero.online}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                        >
                            {t.hero.contactMe}
                        </button>
                    </div>
                </div>

                {/* Dynamic Shadow */}
                <div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-indigo-500/20 blur-2xl rounded-full transition-all duration-300"
                    style={{ opacity: isHovered ? 0.8 : 0.3 }}
                ></div>
            </motion.div>

            {/* Floating particles effect */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-teal-500/20 blur-2xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-500/15 blur-2xl rounded-full animate-pulse delay-300"></div>
        </div>
    );
};

const Hero = () => {
    const { ref: sectionRef, isVisible } = useScrollAnimation();
    const { language } = useLanguage();
    const t = useTranslation(language);

    return (
        <section ref={sectionRef} id="home" className="relative w-full min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-20 overflow-visible">
            <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Content */}
                <div className={`flex flex-col items-start text-left transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-300 uppercase bg-teal-500/10 rounded-full border border-teal-500/20 animate-fade-up delay-100">
                        {t.hero.greeting}
                    </div>

                    <div className="mb-6 text-white tracking-tight relative">
                        <div className="absolute -inset-10 bg-teal-500/20 blur-[100px] rounded-full pointer-events-none opacity-50"></div>
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] animate-fade-up delay-200 mb-2 tracking-tighter">
                            Anjas <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-500">Malik</span>
                        </h1>
                        <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] animate-fade-up delay-300 text-gray-300">
                        </h1>
                    </div>

                    <h2 className="text-2xl md:text-3xl text-gray-400 mb-8 font-light flex flex-wrap gap-2 animate-fade-up delay-400 items-baseline">
                        <span>{t.hero.role}</span>
                        <span className="text-white font-semibold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-teal-400/50">{t.hero.jobTitle}</span>
                    </h2>

                    <div className="flex items-center gap-6 mb-10 animate-fade-up delay-500">
                        <a href="https://github.com/malik027" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-teal-400 hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#0077b5] hover:bg-white/10 hover:border-[#0077b5]/30 transition-all duration-300 hover:-translate-y-1">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="https://instagram.com/@anjasmalik_" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#E1306C] hover:bg-white/10 hover:border-[#E1306C]/30 transition-all duration-300 hover:-translate-y-1">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="mb-10 text-lg max-w-lg text-gray-300 leading-relaxed font-light min-h-[3rem]">
                        <Typewriter text={t.hero.typewriterText} />
                    </div>

                    <div className="flex flex-wrap gap-4 animate-fade-up delay-500">
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3.5 bg-teal-500 text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center">
                                {t.hero.viewProjects}
                                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </span>
                        </button>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-3.5 border border-white/10 bg-white/5 rounded-full text-gray-300 font-medium hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300"
                        >
                            {t.hero.contactMe}
                        </button>
                    </div>
                </div>

                {/* Right Content - Interactive Photo Card */}
                <div className={`flex justify-center md:justify-end transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <InteractivePhotoCard t={t} />
                </div>

            </div>
        </section>
    );
};

export default Hero;
