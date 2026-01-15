import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const Projects = () => {
    const { ref, isVisible } = useScrollAnimation();
    const { language } = useLanguage();
    const t = useTranslation(language);

    const projects = [
        {
            title: 'Bug Bounty Toolkit',
            desc: t.projects.project1Desc,
            tags: ['React', 'Tailwind', 'Css'],
            image: '/bugbountytool.png',
            link: 'https://bug-bounty-toolkit.vercel.app/',
            featured: true,
        },
        {
            title: 'Vulnhub : Double-1',
            desc: t.projects.project2Desc,
            tags: ['Recon', 'Scan', 'Exploit'],
            image: '/double-1.png',
            link: 'https://github.com/malik027/Double-1',
            featured: false,
        },
        {
            title: 'Vulnhub : IA-Tornado',
            desc: t.projects.project3Desc,
            tags: ['Recon', 'Scan', 'Exploit'],
            image: '/ia-tornado.png',
            link: 'https://github.com/malik027/IA-Tornado',
            featured: true,
        },
        {
            title: 'Vulnhub : Basic Pentesting',
            desc: t.projects.project4Desc,
            tags: ['Recon', 'Scan', 'Exploit'],
            image: '/basic-pentesting2.png',
            link: 'https://github.com/malik027/Basic-Pentesting-2',
            featured: false,
        },
    ];

    return (
        <section id="projects" className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 text-white">

            <div ref={ref} className={`text-center mb-16 relative z-20 px-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h3 className="text-4xl md:text-5xl font-bold mb-4">
                    <span>{t.projects.title}</span> <span className="text-teal-400"> {t.projects.titleHighlight}</span>
                </h3>
                <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
                    {t.projects.subtitle}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 w-full relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-6">

                    {/* Custom Mapping for Grid Layout to match original */}
                    {/* Item 0: Featured Large (2x2) */}
                    <div className={`relative group rounded-3xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm shadow-xl transition-all duration-700 hover:border-teal-500/30 hover:shadow-teal-500/10 md:col-span-2 md:row-span-2 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                        <ProjectCard project={projects[0]} t={t} />
                    </div>

                    {/* Item 1: Small (1x1) */}
                    <div className={`relative group rounded-3xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm shadow-xl transition-all duration-700 hover:border-teal-500/30 hover:shadow-teal-500/10 md:col-span-1 md:row-span-1 delay-100 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                        <ProjectCard project={projects[1]} t={t} />
                    </div>

                    {/* Item 2: Tall (1x2) */}
                    <div className={`relative group rounded-3xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm shadow-xl transition-all duration-700 hover:border-teal-500/30 hover:shadow-teal-500/10 md:col-span-1 md:row-span-2 delay-200 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                        <ProjectCard project={projects[2]} t={t} />
                    </div>

                    {/* Item 3: Small (1x1) */}
                    <div className={`relative group rounded-3xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm shadow-xl transition-all duration-700 hover:border-teal-500/30 hover:shadow-teal-500/10 md:col-span-1 md:row-span-1 delay-300 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                        <ProjectCard project={projects[3]} t={t} />
                    </div>

                </div>

                <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <button className="px-8 py-3 rounded-full border border-gray-700 text-gray-300 hover:bg-teal-500/10 hover:text-teal-400 hover:border-teal-500/50 transition-all duration-300 transform hover:scale-105">
                        <span>{t.projects.githubBtn}</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, t }) => (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
        <div className="w-full h-full bg-gray-900/50 relative overflow-hidden">
            <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 grayscale blur-[1px] scale-100 opacity-90 group-hover:grayscale-0 group-hover:blur-0 group-hover:scale-110 group-hover:opacity-100"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent opacity-80 group-hover:opacity-60 transition-all duration-500"></div>
        </div>

        <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 transform translate-y-4 group-hover:translate-y-0">
                <h4 className={`font-bold text-white mb-2 leading-tight ${project.featured ? 'text-2xl' : 'text-lg'}`}>
                    {project.title}
                </h4>
                <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                    {project.desc}
                </p>
                {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 backdrop-blur-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <div className="flex items-center text-sm font-medium text-teal-400 drop-shadow-lg">
                    <span>{t.projects.viewProject}</span>
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                </div>
            </div>
        </div>
    </a>
);

export default Projects;
