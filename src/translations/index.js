const translations = {
    id: {
        // Navbar
        nav: {
            home: 'Beranda',
            about: 'Tentang',
            projects: 'Proyek',
            contact: 'Kontak',
        },
        // Hero Section
        hero: {
            greeting: 'Halo, Saya',
            role: 'Seorang',
            jobTitle: 'Security Researcher & Bug Hunter',
            typewriterText: 'Saya dapat membantu mencari celah keamanan pada aplikasi website anda.',
            viewProjects: 'Lihat Program',
            contactMe: 'Kontak Saya',
            online: 'Online',
        },
        // About Section
        about: {
            title: 'Tentang',
            titleHighlight: 'Saya',
            subtitle: 'Security Researcher.',
            description1: 'Saya adalah seorang Security Researcher yang memiliki ketertarikan besar pada bidang offensive security, analisis kerentanan, dan eksploitasi sistem. Saya terbiasa melakukan analisis terhadap sistem dan aplikasi untuk menemukan celah keamanan serta memahami bagaimana sebuah serangan dapat terjadi secara nyata.',
            description2: 'Saya memiliki pengalaman praktik melalui CTF challenges, penetration testing lab, dan simulasi skenario dunia nyata. Fokus utama saya meliputi web exploitation, privilege escalation, serta analisis security misconfiguration pada lingkungan berbasis Linux dan teknologi web modern.',
            yearsExp: 'Tahun Pengalaman',
            projectsDone: 'Proyek Selesai',
            happyClients: 'POC Valid',
            downloadBtn: 'Unduh Program',
            aboutMe: 'About Me',
        },
        // Projects Section
        projects: {
            title: 'Projek',
            titleHighlight: 'Terpilih',
            subtitle: 'Beberapa Proof Of Concept Dalam Melakukan Capture The Flag.',
            viewProject: 'Lihat Proyek',
            githubBtn: 'Github Repository',
            project1Desc: 'POC dalam mencari celah keamanan.',
            project2Desc: 'POC Vulnhub pada tantangan Double-1.',
            project3Desc: 'POC Vulnhub pada tantangan IA-Tornado.',
            project4Desc: 'POC Vulnhub pada tantangan Basic Pentesting',
        },
        // Contact Section
        contact: {
            title: 'Mari',
            titleHighlight: 'Terhubung',
            subtitle: 'Saya selalu terbuka untuk proyek baru atau sekadar obrolan. Kirimkan sinyal Anda.',
            systemStatus: 'SYSTEM STATUS: ONLINE',
            emailMe: 'Email Me',
            chatWhatsApp: 'Chat WhatsApp',
            establishing: 'ESTABLISHING UPLINK...',
            formTitle: 'INITIATE DATA TRANSMISSION',
            senderLabel: 'ID Pengirim / Nama',
            emailLabel: 'Frekuensi Email',
            messagePlaceholder: 'Data Transmisi Pesan',
            submitBtn: 'INISIASI TRANSMISI',
            demoAlert: 'Ini hanya demo clone. Formulir tidak benar-benar dikirim.',
        },
        // Skills Section
        skills: {
            title: 'Security & Pentest Tools',
            subtitle: 'Kali Linux Arsenal',
        },
    },
    en: {
        // Navbar
        nav: {
            home: 'Home',
            about: 'About',
            projects: 'Projects',
            contact: 'Contact',
        },
        // Hero Section
        hero: {
            greeting: 'Hello, I am',
            role: 'A',
            jobTitle: 'Security Researcher & Bug Hunter',
            typewriterText: 'I can help you find security holes in your website application.',
            viewProjects: 'View Projects',
            contactMe: 'Contact Me',
            online: 'Online',
        },
        // About Section
        about: {
            title: 'About',
            titleHighlight: 'Me',
            subtitle: 'Security Researcher.',
            description1: 'I am a Security Researcher with a great interest in offensive security, vulnerability analysis, and system exploitation. I am experienced in analyzing systems and applications to find security vulnerabilities and understand how attacks can occur in real-world scenarios.',
            description2: 'I have practical experience through CTF challenges, penetration testing labs, and real-world scenario simulations. My main focus includes web exploitation, privilege escalation, and security misconfiguration analysis in Linux-based environments and modern web technologies.',
            yearsExp: 'Years of Experience',
            projectsDone: 'Projects Completed',
            happyClients: 'Valid POC',
            downloadBtn: 'Download Program',
            aboutMe: 'About Me',
        },
        // Projects Section
        projects: {
            title: 'Selected',
            titleHighlight: 'Projects',
            subtitle: 'Some Proof Of Concept In Capture The Flag Challenges.',
            viewProject: 'View Project',
            githubBtn: 'Github Repository',
            project1Desc: 'POC in finding security vulnerabilities.',
            project2Desc: 'Vulnhubs POC on the Double-1 challenge.',
            project3Desc: 'Vulnhub POC on the IA-Tornado challenge.',
            project4Desc: 'Vulnhub POC on Basic Pentesting challenge.',
        },
        // Contact Section
        contact: {
            title: "Let's",
            titleHighlight: 'Connect',
            subtitle: 'I am always open to new projects or just a chat. Send your signal.',
            systemStatus: 'SYSTEM STATUS: ONLINE',
            emailMe: 'Email Me',
            chatWhatsApp: 'Chat WhatsApp',
            establishing: 'ESTABLISHING UPLINK...',
            formTitle: 'INITIATE DATA TRANSMISSION',
            senderLabel: 'Sender ID / Name',
            emailLabel: 'Email Frequency',
            messagePlaceholder: 'Message Data Transmission',
            submitBtn: 'INITIATE TRANSMISSION',
            demoAlert: 'This is just a demo clone. The form is not actually submitted.',
        },
        // Skills Section
        skills: {
            title: 'Security & Pentest Tools',
            subtitle: 'Kali Linux Arsenal',
        },
    },
};

export const useTranslation = (language) => {
    return translations[language] || translations.id;
};

export default translations;
