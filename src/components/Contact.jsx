import React, { useState } from 'react';
import { Mail, MessageCircle, Send, User, Wifi, Radio, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykkzpgo';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const { ref, isVisible } = useScrollAnimation();
    const { language } = useLanguage();
    const t = useTranslation(language);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                // Reset status after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const getButtonContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {language === 'id' ? 'MENGIRIM...' : 'SENDING...'}
                    </>
                );
            case 'success':
                return (
                    <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {language === 'id' ? 'TERKIRIM!' : 'SENT!'}
                    </>
                );
            case 'error':
                return (
                    <>
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {language === 'id' ? 'GAGAL, COBA LAGI' : 'FAILED, TRY AGAIN'}
                    </>
                );
            default:
                return (
                    <>
                        {t.contact.submitBtn}
                        <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                );
        }
    };

    const getButtonClass = () => {
        const baseClass = "group relative w-full py-4 rounded-xl font-bold overflow-hidden shadow-md transition-all duration-300 transform";
        switch (status) {
            case 'loading':
                return `${baseClass} bg-gray-500 text-white cursor-wait`;
            case 'success':
                return `${baseClass} bg-green-500 text-white`;
            case 'error':
                return `${baseClass} bg-red-500 text-white`;
            default:
                return `${baseClass} bg-rose-500 text-[#0a192f] hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:scale-95`;
        }
    };

    return (
        <section ref={ref} id="contact" className="relative w-full flex flex-col justify-center items-center py-20 overflow-hidden text-white">
            <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

            <div className={`max-w-5xl mx-auto px-4 text-center w-full relative z-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <h3 className="text-4xl font-bold mb-8">
                    <span>{t.contact.title}</span> <span className="text-teal-400"> {t.contact.titleHighlight}</span>
                </h3>
                <p className="text-gray-400 text-lg font-light mb-12 max-w-2xl mx-auto">
                    {t.contact.subtitle}
                </p>

                <div className="h-full relative rounded-3xl bg-[#1a1a1a]/60 backdrop-blur-md transition-all duration-300 overflow-hidden border border-rose-500/20 hover:border-rose-400/50 transform hover:scale-[1.01] hover:shadow-rose-500/10 shadow-xl text-left">
                    <div className="grid md:grid-cols-5 h-full">

                        {/* Left Column: Status & Info */}
                        <div className="md:col-span-2 bg-black/40 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(79,70,229,0.05)_50%,transparent_100%)] pointer-events-none"></div>

                            <div>
                                <div className="flex items-center space-x-2 mb-8">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                                    </span>
                                    <span className="text-rose-400 text-sm font-bold tracking-wider">{t.contact.systemStatus}</span>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <a href="mailto:anjasprimary@gmail.com" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300">
                                        <div className="p-3 rounded-lg bg-black/40 text-teal-400 mr-4 group-hover:scale-110 transition">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{t.contact.emailMe}</div>
                                            <div className="text-gray-200 group-hover:text-teal-300 transition font-semibold text-sm break-all">anjasprimary@gmail.com</div>
                                        </div>
                                    </a>

                                    <a href="https://wa.me/+6283181943815" target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300 cursor-pointer">
                                        <div className="p-3 rounded-lg bg-black/40 text-green-400 mr-4 group-hover:scale-110 transition">
                                            <MessageCircle className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{t.contact.chatWhatsApp}</div>
                                            <div className="text-gray-200 group-hover:text-green-300 transition font-semibold">+6283181943815</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="mt-10 flex items-center space-x-4 text-gray-600 opacity-50">
                                <Wifi className="w-5 h-5 animate-pulse" />
                                <Radio className="w-5 h-5 animate-pulse delay-300" />
                                <span className="text-xs tracking-widest font-mono">{t.contact.establishing}</span>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="md:col-span-3 p-8 md:p-10 relative">
                            <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                                <Send className="w-5 h-5 mr-3 text-rose-400" /> {t.contact.formTitle}
                            </h4>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative group">
                                    <User className="absolute left-0 bottom-3 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-indigo-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={status === 'loading'}
                                        className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-700 text-gray-200 outline-none focus:border-indigo-500 placeholder-transparent transition-all disabled:opacity-50"
                                        placeholder={t.contact.senderLabel}
                                    />
                                    <label className="absolute left-8 top-3 text-gray-500 text-sm transition-all group-focus-within:-top-3 group-focus-within:text-xs group-focus-within:text-indigo-400 pointer-events-none">{t.contact.senderLabel}</label>
                                </div>

                                <div className="relative group">
                                    <Mail className="absolute left-0 bottom-3 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-rose-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={status === 'loading'}
                                        className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-700 text-gray-200 outline-none focus:border-rose-500 placeholder-transparent transition-all disabled:opacity-50"
                                        placeholder={t.contact.emailLabel}
                                    />
                                    <label className="absolute left-8 top-3 text-gray-500 text-sm transition-all group-focus-within:-top-3 group-focus-within:text-xs group-focus-within:text-rose-400 pointer-events-none">{t.contact.emailLabel}</label>
                                </div>

                                <div className="relative group pt-4">
                                    <textarea
                                        rows="3"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        disabled={status === 'loading'}
                                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-gray-200 outline-none focus:border-teal-500/50 focus:bg-black/40 placeholder-gray-500 transition-all resize-none disabled:opacity-50"
                                        placeholder={t.contact.messagePlaceholder}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={getButtonClass()}
                                >
                                    {status === 'idle' && (
                                        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                    )}
                                    <span className="relative z-10 flex items-center justify-center tracking-wider">
                                        {getButtonContent()}
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
