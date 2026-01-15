import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

// Photo Card with mouse-following glow effect
const PhotoCard = ({ photoUrl = '/avatar.jpg' }) => {
    const cardRef = useRef(null);
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setGlowPosition({ x, y });
    };

    return (
        <div
            ref={cardRef}
            className="relative w-72 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Mouse-following glow effect */}
            <div
                className="absolute -inset-4 rounded-3xl blur-2xl transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(45, 212, 191, 0.4) 0%, rgba(45, 212, 191, 0.1) 40%, transparent 70%)`,
                    opacity: isHovering ? 1 : 0
                }}
            />

            {/* Card container */}
            <div className="relative bg-gradient-to-b from-[#1a2a2a] to-[#0d1414] rounded-3xl overflow-hidden border border-teal-500/20 shadow-2xl transition-all duration-300 hover:border-teal-400/40">

                {/* Internal glow following mouse */}
                <div
                    className="absolute inset-0 rounded-3xl transition-opacity duration-200 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
                        opacity: isHovering ? 1 : 0
                    }}
                />

                {/* Teal glow bar behind photo */}
                <div className="absolute top-[35%] left-0 right-0 h-2 bg-gradient-to-r from-transparent via-teal-400 to-transparent blur-sm z-10"></div>
                <div className="absolute top-[35%] left-[10%] right-[10%] h-1 bg-teal-400 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.8)] z-10"></div>

                {/* Photo */}
                <div className="relative pt-8 pb-4 px-4">
                    <img
                        src={photoUrl}
                        alt="Profile"
                        className="w-full h-auto object-cover rounded-lg relative z-20"
                    />
                </div>

                {/* Bottom section - avatar and status only */}
                <div className="px-4 pb-4">
                    <div className="flex items-center justify-center bg-[#1a1a1a]/60 rounded-full px-4 py-3 border border-white/5">
                        {/* Avatar and username */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-teal-500/30">
                                <img
                                    src={photoUrl}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-sm font-medium">@anjasmalik_</span>
                                <span className="text-green-400 text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
};

const About = () => {
    const { ref, isVisible } = useScrollAnimation();
    const { language } = useLanguage();
    const t = useTranslation(language);

    return (
        <section ref={ref} id="about" className="relative w-full flex flex-col justify-center items-center py-24 overflow-visible text-white">
            <div className={`max-w-6xl w-full mx-auto px-4 relative z-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="h-full relative rounded-3xl bg-[#1a1a1a]/80 backdrop-blur-md transition-all duration-300 overflow-hidden border border-indigo-500/30 hover:border-indigo-400/50 min-h-[600px] mb-12 shadow-2xl">

                    <div className="relative z-10 p-8 md:p-12 grid lg:grid-cols-[300px_1fr] gap-10 items-center">

                        {/* Left Column - Photo Card */}
                        <div className="hidden lg:flex justify-center items-center">
                            <PhotoCard photoUrl="/avatar.jpg" />
                        </div>

                        {/* Right Column - Content */}
                        <div className="flex flex-col justify-center text-left">
                            <div className="mb-6">
                                <h3 className="text-4xl font-bold mb-4 text-white">
                                    <span>{t.about.title}</span> <span className="text-indigo-400"> {t.about.titleHighlight}</span>
                                </h3>
                                <p className="text-gray-400 text-lg font-light border-l-2 border-indigo-500/70 pl-4 italic">
                                    {t.about.subtitle}
                                </p>
                            </div>

                            <div className="space-y-6 text-gray-300 font-light leading-relaxed text-lg mb-8">
                                <p>
                                    {t.about.description1}
                                    <br /><br />
                                    {t.about.description2}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 border-t border-b border-gray-800 py-6">
                                <div className="flex flex-col items-start">
                                    <span className="text-4xl md:text-5xl font-bold text-indigo-400 mb-1">2+</span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">{t.about.yearsExp}</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-4xl md:text-5xl font-bold text-indigo-400 mb-1">10+</span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">{t.about.projectsDone}</span>
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-4xl md:text-5xl font-bold text-indigo-400 mb-1">5+</span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">{t.about.happyClients}</span>
                                </div>
                            </div>

                            <div>
                                <a href="https://github.com/malik027" className="flex items-center w-fit px-8 py-3 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-100 hover:bg-teal-500/20 hover:border-teal-400/50 transition group cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-teal-500/20">
                                    <span>{t.about.downloadBtn}</span>
                                    <Download className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:text-teal-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
