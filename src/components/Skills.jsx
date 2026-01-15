import React from 'react';
import {
    Radar, Shield, Network, Bug, Key, Lock, Wifi, Terminal,
    Database, Search, Globe, Fingerprint, Eye, Skull, Crosshair, Binary,
    Server, FileCode
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const skills = [
    { name: 'Nmap', icon: Radar, color: 'text-cyan-400', desc: 'Network Scanner' },
    { name: 'Metasploit', icon: Skull, color: 'text-red-500', desc: 'Exploitation' },
    { name: 'Wireshark', icon: Network, color: 'text-blue-400', desc: 'Packet Analysis' },
    { name: 'Burp Suite', icon: Bug, color: 'text-orange-500', desc: 'Web Pentest' },
    { name: 'Aircrack-ng', icon: Wifi, color: 'text-green-400', desc: 'Wireless Attack' },
    { name: 'John the Ripper', icon: Key, color: 'text-yellow-500', desc: 'Password Crack' },
    { name: 'Hydra', icon: Lock, color: 'text-purple-500', desc: 'Brute Force' },
    { name: 'SQLmap', icon: Database, color: 'text-red-400', desc: 'SQL Injection' },
    { name: 'Nikto', icon: Search, color: 'text-teal-400', desc: 'Web Scanner' },
    { name: 'Hashcat', icon: Binary, color: 'text-pink-500', desc: 'Hash Cracking' },
    { name: 'Maltego', icon: Globe, color: 'text-indigo-400', desc: 'OSINT Recon' },
    { name: 'OWASP ZAP', icon: Shield, color: 'text-green-500', desc: 'Web App Sec' },
    { name: 'BeEF', icon: Crosshair, color: 'text-red-600', desc: 'Browser Exploit' },
    { name: 'Recon-ng', icon: Eye, color: 'text-cyan-500', desc: 'Reconnaissance' },
    { name: 'Gobuster', icon: FileCode, color: 'text-orange-400', desc: 'Dir Bruteforce' },
    { name: 'Netcat', icon: Terminal, color: 'text-gray-400', desc: 'Network Utility' },
    { name: 'Dirb', icon: Server, color: 'text-blue-500', desc: 'Dir Scanner' },
    { name: 'SET', icon: Fingerprint, color: 'text-rose-500', desc: 'Social Engineer' },
];

const Skills = () => {
    const { ref, isVisible } = useScrollAnimation();
    const { language } = useLanguage();
    const t = useTranslation(language);

    return (
        <section className="w-full pb-20">
            <div ref={ref} className="max-w-6xl mx-auto px-4">
                <div className={`text-center mb-10 flex flex-col items-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h3 className="text-2xl font-bold text-white mb-2">{t.skills.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{t.skills.subtitle}</p>
                    <div className="h-1 w-20 mx-auto rounded-full mb-4 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className={`group p-4 bg-[#1a1a1a]/50 border border-white/5 rounded-xl transition-all duration-500 flex flex-col items-center justify-center space-y-3 cursor-default hover:bg-red-500/10 hover:border-red-500/30 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <div className={`p-3 rounded-lg bg-black/40 group-hover:scale-110 transition-transform duration-300 ${skill.color}`}>
                                <skill.icon className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <span className="text-gray-200 font-semibold text-sm group-hover:text-red-400 transition-colors">{skill.name}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{skill.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
