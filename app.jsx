import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  ExternalLink, 
  MapPin, 
  User,
  Calendar,
  Award,
  Sun,
  Moon,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Smartphone
} from 'lucide-react';

// --- Custom Hooks ---

const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return [ref, isVisible];
};

const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayedText;
};

// --- Components ---

const RevealWrapper = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-8 md:mb-12 border-b border-slate-300 dark:border-gray-800 pb-4">
    <div className="flex items-center gap-3 text-emerald-500 dark:text-emerald-400 mb-2">
      <Icon size={28} className="animate-pulse" />
      <h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">{title}</h2>
    </div>
    <p className="text-slate-500 dark:text-gray-400 font-mono text-xs md:text-sm ml-10">/* {subtitle} */</p>
  </div>
);

// --- Main App Component ---

export default function App() {
  const typingText = useTypingEffect("> Full Stack Developer, Entrepreneur, Marketier, Innovationist_", 50);
  const [isDark, setIsDark] = useState(true);

  // Data Arrays
  const experiences = [
    {
      company: "PanAvest International and Partners",
      role: "Web Developer / Marketing / Designer",
      date: "Aug 2025 - Present",
      location: "Hybrid",
      description: "Building web and app products across the PanAvest ecosystem, while driving strategy, marketing initiatives, and design implementations.",
      tags: ["Web Apps", "Mobile Apps", "Design"]
    },
    {
      company: "MYO Global Organization",
      role: "Web Developer / Marketing / Designer",
      date: "Aug 2025 - Present",
      location: "Hybrid",
      description: "Leading digital strategy, web architecture, and design for global outreach operations.",
      tags: ["Digital Strategy", "Web Dev"]
    },
    {
      company: "NyansaKasa",
      role: "Web Developer / Marketing / Designer",
      date: "Aug 2025 - Present",
      location: "Hybrid",
      description: "Managing digital presence, developing web platforms, and executing strategic marketing.",
      tags: ["Web Dev", "Marketing"]
    },
    {
      company: "Gennaio Naturals",
      role: "Partner",
      date: "Apr 2024 - Present",
      location: "New York, USA (Hybrid)",
      description: "Managing the digital brand presence, e-commerce web platform, and overall business partnership.",
      tags: ["E-commerce", "Partnership"]
    },
    {
      company: "Hayame",
      role: "Founder",
      date: "Jan 2023 - Present",
      location: "Ghana (Remote)",
      description: "Online car rental, sale, and logistics service. Leading digital strategy and technical operations.",
      tags: ["Leadership", "Digital Strategy"]
    },
    {
      company: "Leti Arts",
      role: "Lead Web Manager",
      date: "Jan 2023 - Present",
      location: "Greater Accra, Ghana (Hybrid)",
      description: "Overseeing web architecture and digital presence for a premier African game development studio.",
      tags: ["Front-End", "UI/UX"]
    },
    {
      company: "CEM New York INC",
      role: "Media Manager",
      date: "Mar 2024 - Present",
      location: "New York, USA (Hybrid)",
      description: "Managing digital media operations, content strategy, and online platform presence.",
      tags: ["Media Management", "Strategy"]
    },
    {
      company: "Ashesi University",
      role: "Teaching Assistant",
      date: "Jun 2025",
      location: "Ghana",
      description: "Supported Lawyer Emmanuel (Kobby) Amoah (Editor-in-Chief of Ashesi Law Journal) in planning and executing a TEDx event for the Department of Law.",
      tags: ["Event Planning", "Coordination"]
    },
    {
      company: "Infinix Mobile",
      role: "Event Organizer",
      date: "May 2023 - May 2025",
      location: "Ghana",
      description: "Organized and managed corporate events, promotional activities, and tech showcases.",
      tags: ["Event Management", "Marketing"]
    },
    {
      company: "Transsion Holdings",
      role: "Software Quality Assurance Analyst",
      date: "Nov 2023 - Jan 2025",
      location: "Ghana (Remote)",
      description: "Ensuring high-quality software delivery through rigorous testing and quality assurance protocols.",
      tags: ["QA Testing", "Analysis"]
    },
    {
      company: "GDSC NUS",
      role: "Guest Speaker",
      date: "Mar 2024",
      location: "Ghana (On-site)",
      description: "Speaker at GDSC GCTU’s college tech week, sharing insights on web technologies.",
      tags: ["Public Speaking", "Tech Advocacy"]
    },
    {
      company: "Game Developers Conference",
      role: "Volunteer",
      date: "Mar 2024",
      location: "San Francisco, USA (On-site)",
      description: "Assisted in operations and coordination at the premier global game development conference.",
      tags: ["Volunteering", "Gaming"]
    },
    {
      company: "GCTU",
      role: "Organizer",
      date: "Jan 2023 - Oct 2023",
      location: "Accra, Ghana",
      description: "Association of Computing Students Campus Organizer.",
      tags: ["Student Leadership"]
    }
  ];

  const education = [
    {
      institution: "University of Professional Studies, Accra (UPSA)",
      degree: "MBA in Information Systems",
      date: "2025 - 2027 (Expected)",
      details: "Advancing expertise in business technology leadership, strategic IT management, and enterprise systems.",
      courses: "Strategic IT, Enterprise Architecture, Data Governance (In Progress)",
      status: "Current"
    },
    {
      institution: "Ghana Communication Technology University (GCTU)",
      degree: "B.Sc Information Technology",
      date: "Completed 2023",
      details: "Second-Class Upper. Organizer for the Association of Computing Students.",
      courses: "Systems Fundamentals, Business Info Systems, App Development, Database Admin."
    },
    {
      institution: "NIIT Ghana",
      degree: "Certification in Python & Computer Programming",
      date: "Certified",
      details: "Advanced software programming concepts and Python development fundamentals.",
      courses: "Python, Logic, Programming"
    },
    {
      institution: "IPMC GHANA",
      degree: "Amazon Web Services Certification",
      date: "Certified",
      details: "Cloud computing and AWS infrastructure management.",
      courses: "Cloud Architecture, AWS Services"
    },
    {
      institution: "SkillFront",
      degree: "ISO 9001 Quality Management Systems Associate",
      date: "Issued Mar 2026",
      details: "Public credential listed on LinkedIn covering quality management systems and process standards.",
      courses: "Quality Management Systems, Process Standards"
    },
    {
      institution: "Internet Society",
      degree: "Member",
      date: "Issued Mar 2026",
      details: "Active professional membership listed on LinkedIn.",
      courses: "Internet Governance, Digital Community"
    },
    {
      institution: "Institute of ICT Professionals, Ghana (IIPGH)",
      degree: "Professional Member",
      date: "Issued Mar 2026",
      details: "Professional ICT membership listed on LinkedIn.",
      courses: "ICT Practice, Professional Development"
    },
    {
      institution: "International Association of Engineers (IAENG)",
      degree: "Member",
      date: "Issued Jan 2026",
      details: "Engineering membership listed on LinkedIn.",
      courses: "Engineering Network, Professional Community"
    },
    {
      institution: "Oda Senior High School",
      degree: "General Arts",
      date: "Completed 2019",
      details: "Position Held: Compound Overseer.",
      courses: "Foundational Arts & Humanities"
    }
  ];

  const projects = [
    { name: "Hayame", link: "https://www.hayamegh.com", status: "Live", desc: "Online car rental, sale, and logistics service platform." },
    { name: "PanAvest KDS Web", link: "https://panavestkds.com", status: "Live", desc: "Web learning platform for courses, assessments, e-books, and verifiable certificates." },
    { name: "PanAvest KDS iOS App", link: "https://apps.apple.com/us/app/panavest-kds/id6755534884", status: "Live", desc: "Mobile iOS version of PanAvest KDS, published on the App Store and built with React and Capacitor." },
    { name: "Jano Hospital", link: "https://www.janoms.com", status: "Live", desc: "Medical management system and digital front door for Jano Hospital." },
    { name: "Gida Ruddy", link: "https://gida-ruddy.vercel.app/", status: "In Dev", desc: "Personal project pushing modern front-end boundaries." },
    { name: "CEM New York", link: "https://cemnewyork.com/", status: "Live", desc: "Robust web architecture for Charismatic Evangelistic Ministry NY." },
    { name: "Leti Arts", link: "https://www.letiarts.com/", status: "Live", desc: "Corporate website for premier African game development studio." },
    { name: "Destiny Helpers HS", link: "https://destinyhelpershs.org/", status: "Live", desc: "Web platform for human services organization." },
    { name: "Gennaio Naturals", link: "https://gennaionaturals.com/", status: "Live", desc: "E-commerce platform for natural products." },
    { name: "Charismatic Holdings LLC", link: "https://charismaticholdingsllc.com/", status: "Live", desc: "Corporate business portfolio platform." }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/kennedy-abubakar-919834189" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/kennedy_abubakar/?hl=en" },
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/p/Kennedyabubakar-61560112862267/" },
  ];

  return (
    <div className={`${isDark ? 'dark' : ''} transition-colors duration-500`}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#060c16] text-slate-800 dark:text-gray-300 font-sans relative selection:bg-emerald-500/30 selection:text-emerald-700 dark:selection:text-emerald-200 transition-colors duration-500">
        
        {/* Toggle Theme Button */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-3 rounded-full glass-panel hover:scale-110 transition-transform text-emerald-600 dark:text-emerald-400"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Background Complex Animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); opacity: 0.45; }
            33% { transform: translate3d(0, -36px, 0) rotate(12deg) scale(1.12); opacity: 0.78; }
            66% { transform: translate3d(0, 24px, 0) rotate(-11deg) scale(0.92); opacity: 0.6; }
            100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); opacity: 0.45; }
          }
          @keyframes hueShift {
            0% { filter: blur(88px) saturate(1.35) hue-rotate(0deg); }
            50% { filter: blur(102px) saturate(1.6) hue-rotate(22deg); }
            100% { filter: blur(88px) saturate(1.35) hue-rotate(0deg); }
          }
          .bg-scene {
            position: fixed;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
          }
          .bg-shape {
            position: absolute;
            border-radius: 50%;
            mix-blend-mode: multiply;
            will-change: transform, filter, opacity;
            animation: float 20s infinite ease-in-out, hueShift 16s infinite linear;
          }
          .orb-1 {
            background: radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.95), rgba(45, 212, 191, 0.45) 45%, rgba(16, 185, 129, 0) 72%);
          }
          .orb-2 {
            background: radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.95), rgba(99, 102, 241, 0.45) 45%, rgba(14, 165, 233, 0) 70%);
          }
          .orb-3 {
            background: radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.95), rgba(168, 85, 247, 0.5) 45%, rgba(236, 72, 153, 0) 72%);
          }
          .bg-grid {
            position: absolute;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background-image: linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: 1;
            transition: all 0.5s ease;
          }
          .dark .bg-grid {
            background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          }
          .dark .bg-shape {
            mix-blend-mode: screen;
            animation: float 16s infinite ease-in-out, hueShift 12s infinite linear;
          }
          .dark .orb-1 {
            background: radial-gradient(circle at 30% 30%, rgba(52, 211, 153, 1), rgba(45, 212, 191, 0.6) 45%, rgba(52, 211, 153, 0) 72%);
          }
          .dark .orb-2 {
            background: radial-gradient(circle at 30% 30%, rgba(34, 211, 238, 1), rgba(129, 140, 248, 0.6) 45%, rgba(34, 211, 238, 0) 70%);
          }
          .dark .orb-3 {
            background: radial-gradient(circle at 30% 30%, rgba(244, 114, 182, 1), rgba(167, 139, 250, 0.62) 45%, rgba(244, 114, 182, 0) 72%);
          }
          .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
          }
          .dark .glass-panel {
            background: rgba(20, 30, 45, 0.6);
            border: 1px solid rgba(148, 163, 184, 0.15);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.55);
          }
          .credential-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.7rem 1.15rem;
            border-radius: 9999px;
            border: 1px solid rgba(8, 145, 178, 0.28);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(236, 253, 245, 0.92));
            color: #0f172a;
            font-family: 'Fira Code', 'Courier New', Courier, monospace;
            font-size: 0.92rem;
            font-weight: 700;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(34, 211, 238, 0.12);
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.45), 0 0 28px rgba(6, 182, 212, 0.18);
            backdrop-filter: blur(14px);
          }
          .dark .credential-badge {
            border-color: rgba(52, 211, 153, 0.58);
            background: linear-gradient(135deg, rgba(7, 18, 32, 0.96), rgba(11, 31, 44, 0.92));
            color: #ecfeff;
            text-shadow: 0 0 14px rgba(167, 243, 208, 0.34);
            box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.22), 0 0 32px rgba(16, 185, 129, 0.24), 0 14px 30px rgba(2, 6, 23, 0.45);
          }
          @media (min-width: 768px) {
            .credential-badge {
              font-size: 1rem;
            }
          }
          .code-text { font-family: 'Fira Code', 'Courier New', Courier, monospace; }
        `}} />

        {/* Animated Orbs */}
        <div className="bg-scene" aria-hidden="true">
          <div className="bg-shape orb-1 w-[420px] h-[420px] md:w-[640px] md:h-[640px] top-[-90px] left-[-130px] md:top-[-150px] md:left-[-230px]" style={{ animationDelay: '0s, 0s' }}></div>
          <div className="bg-shape orb-2 w-[340px] h-[340px] md:w-[540px] md:h-[540px] top-[28%] md:top-[38%] right-[-70px] md:right-[-130px]" style={{ animationDelay: '-5s, -2s' }}></div>
          <div className="bg-shape orb-3 w-[420px] h-[420px] md:w-[720px] md:h-[720px] bottom-[-170px] md:bottom-[-260px] left-[8%] md:left-[18%]" style={{ animationDelay: '-10s, -4s' }}></div>
          <div className="bg-grid"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
          
          {/* --- Hero Section --- */}
          <section className="relative min-h-[75vh] flex flex-col justify-center mb-16 md:mb-24 pt-10 overflow-hidden">
            <RevealWrapper>
              <div className="relative z-10">
                <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs md:text-sm mb-6">
                  System.out.println("Hello, World!");
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 md:mb-6 leading-tight">
                  Kennedy <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 dark:from-emerald-400 dark:via-cyan-400 dark:to-indigo-400">
                    (Wusunanwa) Abubakar
                  </span>
                </h1>
                <div className="mb-6">
                  <span className="credential-badge">
                    BSc IT, MIIPGH, MIAENG
                  </span>
                </div>
                <div className="h-16 md:h-10 mb-6">
                  <p className="text-lg md:text-2xl font-mono text-slate-600 dark:text-gray-400 code-text">
                    <span className="text-emerald-600 dark:text-emerald-400">{typingText}</span>
                    <span className="animate-pulse text-slate-900 dark:text-white">|</span>
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {socialLinks.map((social, idx) => (
                    <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 rounded-full glass-panel hover:text-emerald-500 hover:border-emerald-500/50 transition-all group">
                      <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#projects" className="px-6 py-3 rounded-lg bg-emerald-500 text-white dark:text-black font-bold hover:bg-emerald-400 shadow-lg hover:shadow-emerald-500/25 transition-all flex justify-center items-center gap-2">
                    <Code2 size={20} /> View Deployments
                  </a>
                  <a href="mailto:kennedyabu85@gmail.com" className="px-6 py-3 rounded-lg border border-slate-300 dark:border-gray-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex justify-center items-center gap-2 bg-white/50 dark:bg-transparent">
                    <Mail size={20} /> Contact.exe
                  </a>
                </div>
              </div>
            </RevealWrapper>
          </section>

          {/* --- Personal Info (Code Editor Style) --- */}
          <section className="mb-24 md:mb-32">
            <RevealWrapper>
              <SectionHeader icon={Terminal} title="personal_info.json" subtitle="Data objects initialized" />
              
              {/* The IDE is styled dark in both light/dark modes for the true developer aesthetic */}
              <div className="bg-[#0f1419] border border-gray-800 rounded-xl overflow-hidden group shadow-2xl transition-colors duration-500">
                <div className="bg-[#0a0d12] px-4 py-3 border-b border-gray-800 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="mx-auto text-xs text-gray-500 font-mono flex items-center gap-2">
                    <User size={12} /> developer_profile.js
                  </div>
                </div>
                
                <div className="p-4 md:p-8 overflow-x-auto code-text text-xs md:text-sm lg:text-base leading-relaxed text-gray-300">
                  <div className="min-w-[500px]">
                    <p><span className="text-fuchsia-400">const</span> <span className="text-blue-400">developer</span> <span className="text-cyan-400">=</span> <span className="text-yellow-300">{`{`}</span></p>
                    
                    <div className="pl-4 md:pl-8">
                      <p><span className="text-cyan-200">name</span>: <span className="text-emerald-400">"Kennedy (Wusunanwa) Abubakar"</span>,</p>
                      <p><span className="text-cyan-200">credentials</span>: <span className="text-emerald-400">"BSc IT, MIIPGH, MIAENG"</span>,</p>
                      <p><span className="text-cyan-200">headline</span>: <span className="text-emerald-400">"Full stack developer, entrepreneur, marketier, innovationist"</span>,</p>
                      <p><span className="text-cyan-200">nationality</span>: <span className="text-emerald-400">"Ghanaian"</span>,</p>
                      <p><span className="text-cyan-200">contact</span>: <span className="text-yellow-300">{`{`}</span></p>
                      <div className="pl-4 md:pl-8">
                        <p><span className="text-cyan-200">email</span>: <span className="text-emerald-400">"kennedyabu85@gmail.com"</span>,</p>
                        <p><span className="text-cyan-200">phone</span>: <span className="text-emerald-400">"+233 20 233 7612"</span>,</p>
                        <p><span className="text-cyan-200">location</span>: <span className="text-emerald-400">"Accra, Greater Accra Region, Ghana"</span></p>
                      </div>
                      <p><span className="text-yellow-300">{`}`}</span>,</p>
                      <p><span className="text-cyan-200">skills</span>: <span className="text-purple-400">[</span></p>
                      <div className="pl-4 md:pl-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
                        <p><span className="text-emerald-400">"Front-End Web Development"</span>,</p>
                        <p><span className="text-emerald-400">"Mobile App Development"</span>,</p>
                        <p><span className="text-emerald-400">"Desktop App Development"</span>,</p>
                        <p><span className="text-emerald-400">"Digital Strategy"</span>,</p>
                        <p><span className="text-emerald-400">"Cross-Platform Development"</span>,</p>
                        <p><span className="text-emerald-400">"WordPress Development"</span>,</p>
                        <p><span className="text-emerald-400">"Graphic Design"</span>,</p>
                        <p><span className="text-emerald-400">"Entrepreneurship"</span></p>
                      </div>
                      <p><span className="text-purple-400">]</span>,</p>
                      <p><span className="text-cyan-200">memberships</span>: <span className="text-purple-400">[</span><span className="text-emerald-400">"IAENG"</span>, <span className="text-emerald-400">"Internet Society"</span>, <span className="text-emerald-400">"IIPGH"</span><span className="text-purple-400">]</span>,</p>
                      <p><span className="text-cyan-200">hobbies</span>: <span className="text-purple-400">[</span><span className="text-emerald-400">"Fitness"</span>, <span className="text-emerald-400">"Car Customization"</span>, <span className="text-emerald-400">"Tech"</span><span className="text-purple-400">]</span></p>
                    </div>
                    
                    <p><span className="text-yellow-300">{`}`}</span><span className="text-gray-500">;</span></p>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          </section>

          {/* --- Experience Section --- */}
          <section className="mb-24 md:mb-32">
            <RevealWrapper>
              <SectionHeader icon={Briefcase} title="Experience" subtitle="Professional history and roles" />
              
              <div className="relative border-l border-slate-300 dark:border-gray-800 ml-4 md:ml-0">
                {experiences.map((exp, index) => (
                  <RevealWrapper key={index} delay={(index % 4) * 100}>
                    <div className="mb-8 md:mb-12 pl-6 md:pl-8 relative group">
                      <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded-full -left-[6px] md:-left-[8.5px] top-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-150 transition-transform duration-300"></div>
                      
                      <div className="glass-panel p-5 md:p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 group-hover:border-emerald-500/30">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 md:mb-4 gap-2">
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">{exp.role}</h3>
                            <div className="text-cyan-600 dark:text-cyan-400 font-mono text-xs md:text-sm mt-1">{exp.company}</div>
                          </div>
                          <div className="flex flex-wrap lg:flex-col lg:items-end text-xs text-slate-500 dark:text-gray-400 font-mono gap-2 mt-2 lg:mt-0">
                            <span className="flex items-center gap-1 bg-slate-200 dark:bg-gray-900/50 px-2 py-1 rounded"><Calendar size={12}/> {exp.date}</span>
                            <span className="flex items-center gap-1"><MapPin size={12}/> {exp.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] md:text-xs font-mono px-2 md:px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </RevealWrapper>
          </section>

          {/* --- Education Section --- */}
          <section className="mb-24 md:mb-32">
            <RevealWrapper>
              <SectionHeader icon={GraduationCap} title="Education & Certifications" subtitle="Academic background" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {education.map((edu, index) => (
                  <RevealWrapper key={index} delay={index * 150}>
                    <div className={`glass-panel p-5 md:p-6 rounded-xl h-full flex flex-col transition-all duration-300 relative overflow-hidden group ${edu.status === 'Current' ? 'border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:border-indigo-400/50' : 'hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'}`}>
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${edu.status === 'Current' ? 'from-indigo-500 to-fuchsia-500' : 'from-cyan-500 to-indigo-500'}`}></div>
                      
                      <Award className={`${edu.status === 'Current' ? 'text-indigo-600 dark:text-indigo-400' : 'text-cyan-600 dark:text-cyan-400'} mb-4`} size={24} />
                      <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">{edu.degree}</h3>
                      <h4 className={`text-xs md:text-sm font-mono mb-3 ${edu.status === 'Current' ? 'text-indigo-700 dark:text-indigo-300' : 'text-cyan-700 dark:text-cyan-300'}`}>{edu.institution}</h4>
                      
                      <p className="text-slate-600 dark:text-gray-400 text-xs md:text-sm mb-4 flex-grow">{edu.details}</p>
                      
                      <div className="mt-auto border-t border-slate-200 dark:border-gray-800 pt-3 md:pt-4">
                        <p className="text-[10px] md:text-xs text-slate-500 dark:text-gray-500 font-mono leading-relaxed">
                          <span className="text-slate-700 dark:text-gray-300">Concepts:</span> {edu.courses}
                        </p>
                        <div className={`mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] md:text-xs font-mono ${edu.status === 'Current' ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20' : 'bg-slate-200 dark:bg-gray-900 text-slate-600 dark:text-gray-400'}`}>
                          {edu.status === 'Current' && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                          )}
                          {edu.date}
                        </div>
                      </div>
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </RevealWrapper>
          </section>

          {/* --- Projects Section --- */}
          <section id="projects" className="mb-20">
            <RevealWrapper>
              <SectionHeader icon={Code2} title="Deployments" subtitle="Managed and developed projects" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {projects.map((project, index) => (
                  <RevealWrapper key={index} delay={(index % 3) * 100}>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass-panel p-5 md:p-6 rounded-xl flex flex-col group hover:bg-white/90 dark:hover:bg-gray-800/50 hover:border-emerald-500/50 transition-all duration-300 block relative overflow-hidden h-full"
                    >
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/30 dark:group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
                      
                      <div className="flex justify-between items-start mb-3 md:mb-4">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                          {project.name}
                        </h3>
                        <ExternalLink size={18} className="text-slate-400 dark:text-gray-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                      
                      <p className="text-slate-600 dark:text-gray-400 text-xs md:text-sm mb-6 flex-grow">{project.desc}</p>
                      
                      <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono mt-auto pt-4 border-t border-slate-200 dark:border-gray-800/50">
                        <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-emerald-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                        <span className={project.status === 'Live' ? 'text-emerald-600 dark:text-emerald-400' : 'text-yellow-600 dark:text-yellow-400'}>{project.status}</span>
                        <span className="text-slate-500 dark:text-gray-600 ml-auto border-b border-transparent group-hover:border-emerald-500 transition-colors">
                          View Project
                        </span>
                      </div>
                    </a>
                  </RevealWrapper>
                ))}
              </div>
            </RevealWrapper>
          </section>

          {/* --- Footer --- */}
          <footer className="border-t border-slate-300 dark:border-gray-800 py-8 md:py-12 text-center font-mono text-xs md:text-sm text-slate-500 dark:text-gray-500 relative z-10">
            <RevealWrapper>
              <p className="mb-4 text-slate-600 dark:text-gray-400">System.exit(0); // Developed by Kennedy (Wusunanwa) Abubakar</p>
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
                {socialLinks.map((social, idx) => (
                  <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    <social.icon size={16} /> <span className="hidden sm:inline">{social.name}</span>
                  </a>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-4">
                <a href="mailto:kennedyabu85@gmail.com" className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <Mail size={16} /> Email
                </a>
                <span className="text-slate-300 dark:text-gray-700">|</span>
                <span className="flex items-center gap-2">
                  <Smartphone size={16} /> +233 20 233 7612
                </span>
              </div>
            </RevealWrapper>
          </footer>

        </div>
      </div>
    </div>
  );
}
