import React, { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { language, toggleLanguage } = useLanguage();
    const t = useTranslation(language);

    const navItems = [
        { name: t.nav.home, id: 'home' },
        { name: t.nav.about, id: 'about' },
        { name: t.nav.projects, id: 'projects' },
        { name: t.nav.contact, id: 'contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Determine active section
            const sectionIds = ['home', 'about', 'projects', 'contact'];
            const sections = sectionIds.map(id => document.getElementById(id));
            const scrollPosition = window.scrollY + 150; // Offset
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Check if at bottom of page - activate contact
            if (window.scrollY + windowHeight >= documentHeight - 50) {
                setActiveSection('contact');
                return;
            }

            // Find which section is currently in view
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 ${isScrolled ? 'bg-[#0B0B0C]/80 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                <div
                    onClick={() => scrollToSection('home')}
                    className="text-2xl font-bold text-gray-100 cursor-pointer tracking-tighter hover:text-teal-400 transition-colors"
                >
                    Malik<span className="text-teal-500">.</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-8">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative text-sm font-medium transition-all duration-300 ${activeSection === item.id ? 'text-teal-400' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                    {activeSection === item.id && (
                                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="h-4 w-[1px] bg-gray-700/50"></div>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center text-gray-400 hover:text-white transition text-sm font-medium px-3 py-1.5 rounded-full border border-white/10 hover:border-teal-500/30 hover:bg-teal-500/10"
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        {language === 'id' ? 'ID' : 'EN'}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center text-gray-400 hover:text-white transition text-sm font-medium px-2 py-1 rounded-full border border-white/10"
                    >
                        <Globe className="w-4 h-4 mr-1" />
                        {language === 'id' ? 'ID' : 'EN'}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-200 hover:text-teal-400 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-[#0B0B0C]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="flex flex-col py-4 px-6 space-y-4">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className={`text-base font-medium block w-full text-left ${activeSection === item.id ? 'text-teal-400' : 'text-gray-300 hover:text-white'}`}
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
