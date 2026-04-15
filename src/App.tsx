import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import {
  Terminal, User, Code, Gamepad2, Globe, X, Minus, Maximize2, Minimize2,
  Github, Linkedin, BookOpen, Search, Wifi, Battery, Play, RotateCcw,
  Aperture, Download, Mail, Music, UserPlus, Star, FolderDot,
  GitBranch, XCircle, AlertTriangle, Bell, Send, Pause, Instagram, Twitter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import InteractiveBackground from './InteractiveBackground';


type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeContext.Provider');
  }
  return ctx;
};

interface WindowState {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface AppIcon {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconSrc?: string; // Path to macOS icon image
  color: string;
}

// --- Content Components ---

const AboutContent = () => {
  const [activeTab, setActiveTab] = useState('about');

  const sidebarItems = [
    { id: 'about', icon: User, label: 'About Me' },
    { id: 'honors', icon: Star, label: 'Honors & Awards' },
    { id: 'projects', icon: FolderDot, label: 'Projects' }
  ];

  return (
    <div className="flex h-full w-full bg-[#fcfcfc] dark:bg-[#1c1c1e] text-gray-800 dark:text-gray-200 font-sans">
      {/* Finder Sidebar */}
      <div className="w-48 bg-[#f5f5f7] dark:bg-[#2c2c2e]/80 border-r border-gray-200 dark:border-white/10 flex flex-col pt-4 backdrop-blur-md z-10 shrink-0">
        <div className="px-4 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Favorites</div>
        <nav className="flex-1 px-2 space-y-0.5">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors ${activeTab === item.id
                ? 'bg-blue-500 text-white font-medium shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
            >
              <item.icon size={16} className={activeTab === item.id ? 'text-white' : 'text-blue-500'} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-y-auto">
        {/* Finder Toolbar Header */}
        <div className="sticky top-0 z-20 h-12 bg-[#fcfcfc]/90 dark:bg-[#1c1c1e]/90 backdrop-blur-md border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Back / Forward Controls */}
            <div className="flex items-center gap-1 opacity-50">
              <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-not-allowed">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-not-allowed">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>

            {/* Breadcrumb Path */}
            <div className="flex text-sm font-semibold items-center gap-1.5 text-gray-700 dark:text-gray-300">
              <span>AshishOS</span>
              <span className="text-gray-400 dark:text-gray-600">›</span>
              <span>Home</span>
              <span className="text-gray-400 dark:text-gray-600">›</span>
              <span className="text-gray-900 dark:text-white flex items-center gap-1.5">
                <span className="opacity-50 text-[10px]">
                  {sidebarItems.find(i => i.id === activeTab)?.icon && React.createElement(sidebarItems.find(i => i.id === activeTab)!.icon, { size: 12 })}
                </span>
                {sidebarItems.find(i => i.id === activeTab)?.label}
              </span>
            </div>
          </div>

          {/* Dummy Search bar */}
          <div className="w-48 h-7 bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-md flex items-center px-2 shadow-inner">
            <Search size={12} className="text-gray-400 mr-2" />
            <span className="text-xs text-gray-400">Search</span>
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex flex-col items-center text-center mb-12">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mb-6 shadow-2xl flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-800 overflow-hidden relative">
                    <span className="z-10 w-full h-full">
                      <img src="/portimage.png" alt="Ashish Kumar Nanda" className="w-full h-full object-cover" />
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-3 tracking-tight text-gray-900 dark:text-white">
                    Ashish Kumar Nanda
                  </h1>

                  <p className="text-blue-500 font-semibold text-base md:text-lg lg:text-xl mt-1">
                    Research Intern @ IIT(BHU) | CS @ MUJ ‘27
                  </p>
                </div>

                <section className="bg-white dark:bg-[#2c2c2e] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                  <h2 className="text-2xl font-bold border-b border-gray-100 dark:border-white/10 pb-4 mb-6 flex items-center gap-3">
                    <span className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">👋</span> About Me
                  </h2>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300 text-lg">
                    I am a Computer Science graduate from Manipal University with a CGPA of 9.22/10.
                    Currently working as a{' '}
                    <span className="font-semibold text-green-600 dark:text-green-400">Research Intern at IIT (BHU)</span>.
                    I specialize in building full-stack applications, scalable backend systems, and integrating
                    AI models into production. If you need someone who can write code and hit high notes, I'm
                    your person.
                  </p>
                </section>
              </motion.div>
            )}

            {activeTab === 'honors' && (
              <motion.div
                key="honors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto"
              >
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: "Finalist - International Innovation Challenge (IIC)", bg: "bg-blue-500/10", hover: "group-hover:bg-blue-500/20", text: "text-blue-500" },
                    { title: "National Semifinalist - Flipkart GRiD 7.0", bg: "bg-purple-500/10", hover: "group-hover:bg-purple-500/20", text: "text-purple-500" },
                    { title: "5x Dean’s List of Excellence", bg: "bg-green-500/10", hover: "group-hover:bg-green-500/20", text: "text-green-500" },
                    { title: "LeetCode – Solved over 400 problems with a peak contest rating of 1,704 (Top 12.96%).", bg: "bg-orange-500/10", hover: "group-hover:bg-orange-500/20", text: "text-orange-500" },
                    { title: "CodeChef – 2 star on CodeChef with a max contest rating of 1450.", bg: "bg-indigo-500/10", hover: "group-hover:bg-indigo-500/20", text: "text-indigo-500" }
                  ].map((honor, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-5 bg-white dark:bg-[#2c2c2e] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow cursor-default group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${honor.bg} ${honor.hover} transition-colors`}>
                          <Star className={honor.text} size={20} />
                        </div>
                        <span className="font-medium text-lg">{honor.title}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto text-center py-20"
              >
                <FolderDot size={64} className="mx-auto text-blue-500 opacity-50 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Projects Directory</h3>
                <p className="text-gray-500">To view my full interactive portfolio of projects, please launch the Safari App from the Dock.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const fileData: Record<string, string> = {
  'developer.js':
    `/// developer.js
const developer = {
  name: "Ashish Kumar Nanda",
  role: "Full Stack Developer",
  languages: ["C++", "Python", "Java", "JavaScript"],
  frameworks: ["React", "Node.js", "Express.js", "TailwindCSS"],
  tools: ["Docker", "Jenkins", "AWS", "Redis", "MongoDB"]
};`,
  'skills.js':
    `/// skills.js
const skills = [
    "C++", "Python", "Java", "SQL", "JavaScript",
    "React.js", "Node.js", "Express.js",
    "MongoDB", "AWS", "Docker","Jenkins", "Redis",
    "CI/CD", "Git", "GitHub", "Linux", "MySQL"
];`,
  'experience.js': `/// experience.js
const experience = [
  {
    "company": "Indian Institute of Technology (BHU)",
    "role": "Research Intern",
    "duration": "Present",
    "impact": "Mathematical Model for Integrating Net Zero Practices in MSMEs"
  },
  {
    "company": "Google Developer Groups",
    "role": "Technical Member",
    "duration": "Sept 2023 - Oct 2025",
    "impact": "Organized technical workshops and coding sessions."
  }
];`,
  'education.yaml': `[
university: Manipal University Jaipur
degree: B.Tech CSE (IoT)
duration: 2023 - 2027
cgpa: 9.22/10
focus: Full Stack, Scalable Systems`
};

const SkillsExperienceContent = () => {
  const [activeFile, setActiveFile] = useState('skills.js');
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedContent('');
    const fullText = fileData[activeFile];
    let index = 0;

    // Smooth typing effect
    const interval = setInterval(() => {
      setDisplayedContent(prev => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15); // Adjust typing speed here

    return () => clearInterval(interval);
  }, [activeFile]);

  return (
    <div className="flex h-full w-full bg-[#1e1e1e] text-[#cccccc] font-sans selection:bg-[#264f78]">

      {/* VS Code Activity Bar (Far Left) */}
      <div className="w-12 bg-[#333333] flex flex-col items-center py-4 space-y-6 border-r border-[#252526] shrink-0">
        <div className="opacity-100 cursor-pointer border-l-2 border-blue-500 pl-[-2px]"><Code size={24} className="text-white" /></div>
        <div className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity"><Search size={22} /></div>
        <div className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity"><Github size={22} /></div>
      </div>

      {/* VS Code Explorer Sidebar */}
      <div className="w-60 bg-[#252526] border-r border-black/20 flex flex-col shrink-0 flex-shrink-0">
        <div className="px-4 py-3 text-xs font-semibold tracking-wider text-[#cccccc] uppercase flex items-center justify-between">
          Explorer
          <span className="cursor-pointer opacity-50 hover:opacity-100">...</span>
        </div>

        <div className="flex flex-col mt-2">
          <div className="px-2 py-1 flex items-center text-sm font-bold tracking-wide text-[#cccccc] cursor-pointer hover:bg-[#2a2d2e]">
            <span className="mr-1">∨</span> PORTFOLIO
          </div>
          <div className="flex flex-col mt-1">
            {Object.keys(fileData).map(file => (
              <div
                key={file}
                onClick={() => setActiveFile(file)}
                className={`flex items-center gap-2 pl-6 pr-4 py-1.5 text-sm cursor-pointer border-l-2 transition-colors ${activeFile === file
                  ? 'bg-[#37373d] text-white border-[#007acc]'
                  : 'text-[#cccccc] hover:bg-[#2a2d2e] border-transparent hover:text-white'
                  }`}
              >
                {file.endsWith('.js') && <div className="w-3 h-3 rounded-full bg-yellow-400 shrink-0 select-none text-[8px] flex items-center justify-center text-black font-bold">JS</div>}
                {file.endsWith('.json') && <div className="w-3 h-3 rounded-full bg-green-500 shrink-0 select-none text-[8px] flex items-center justify-center text-white font-bold">{`{}`}</div>}
                {file.endsWith('.yaml') && <div className="w-3 h-3 rounded-full bg-purple-500 shrink-0 select-none text-[8px] flex items-center justify-center text-white font-bold">Y</div>}
                {file}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0">

        {/* Editor Tabs */}
        <div className="flex bg-[#252526] overflow-x-auto scrollbar-hide border-b border-[#1e1e1e]">
          {Object.keys(fileData).map(file => (
            <div
              key={file}
              onClick={() => setActiveFile(file)}
              className={`flex items-center gap-2 px-4 py-2 text-sm cursor-pointer min-w-max border-r border-[#1e1e1e] ${activeFile === file
                ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500'
                : 'bg-[#2d2d2d] text-gray-400 border-t-2 border-t-transparent hover:bg-[#2b2b2b]'
                }`}
            >
              {file.endsWith('.js') && <span className="text-yellow-400 text-xs font-bold">JS</span>}
              {file.endsWith('.json') && <span className="text-green-500 text-xs font-bold">{`{}`}</span>}
              {file.endsWith('.yaml') && <span className="text-purple-500 text-xs font-bold">Y!</span>}
              {file}
              {activeFile === file && <X size={14} className="ml-2 opacity-50 hover:opacity-100 rounded hover:bg-white/10" />}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto relative font-mono text-sm leading-relaxed p-4">

          <div className="flex">
            {/* Line Numbers */}
            <div className="flex flex-col text-right pr-4 text-[#858585] select-none border-r border-white/5 mr-4 opacity-50">
              {displayedContent.split('\n').map((_, i) => (
                <span key={i} className="min-w-[1.5rem]">{i + 1}</span>
              ))}
            </div>

            {/* Code */}
            <div className="flex-1 relative pb-20">
              <pre className="m-0 bg-transparent p-0 text-left whitespace-pre">
                <code dangerouslySetInnerHTML={{
                  __html: displayedContent
                    // 1. Strings (we match quotes and inner content)
                    .replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, '<span class="text-[#ce9178]">"$&"</span>')
                    .replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '<span class="text-[#ce9178]">' + "'$&'" + '</span>')
                    // 2. Keywords (only match if not inside a span tag)
                    .replace(/\b(const|let|var|function|return|import|export)\b(?![^<]*>|[^<>]*<\/span>)/g, '<span class="text-[#c586c0]">$&</span>')
                    // 3. Booleans/Null
                    .replace(/\b(true|false|null|undefined)\b(?![^<]*>|[^<>]*<\/span>)/g, '<span class="text-[#569cd6]">$&</span>')
                    // 4. Object Keys
                    .replace(/([a-zA-Z_]\w*):(?![^<]*>|[^<>]*<\/span>)/g, '<span class="text-[#9cdcfe]">$1</span>:')
                    // Clean up double quotes generated by regex token replacement
                    .replace(/>""/g, '>"')
                    .replace(/""</g, '"<')
                    .replace(/>''/g, ">'")
                    .replace(/''</g, "'<")
                }} />
                {isTyping && <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2.5 h-4 bg-gray-400 ml-1 translate-y-1"
                />}
              </pre>
            </div>
          </div>
        </div>

        {/* VS Code Status Bar */}
        <div className="bg-[#007acc] text-white h-6 flex items-center px-4 py-1 text-xs justify-between select-none">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><GitBranch size={12} /> main*</span>
            <span className="flex items-center gap-1"><XCircle size={12} /> 0 <AlertTriangle size={12} className="ml-1" /> 0</span>
          </div>
          <div className="flex items-center gap-4 opacity-90">
            <span>Ln {displayedContent.split('\n').length}, Col {displayedContent.length % 50}</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span>{activeFile.endsWith('.js') ? 'JavaScript' : activeFile.endsWith('.json') ? 'JSON' : 'YAML'}</span>
            <span className="flex items-center gap-1"><Bell size={12} /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrowserContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'overview', title: 'Profile', url: 'portfolio.ashish-nanda.dev' },
    { id: 'transcoder', title: 'Video Transcoder', url: 'github.com/ashishnanda19/video-transcoder' },
    { id: 'invosync', title: 'InvoSync', url: 'github.com/ashishnanda19/InvoSync' },
    { id: 'safetrail', title: 'SafeTrail', url: 'github.com/ashishnanda19/Safe_Trail' }
  ];

  const handleTabChange = (tabId: string) => {
    setIsLoading(true);
    setActiveTab(tabId);
    setTimeout(() => setIsLoading(false), 800);
  };

  useGSAP(() => {
    if (activeTab === 'overview' && !isLoading) {
      const cards = gsap.utils.toArray('.gsap-card');
      cards.forEach((card: any) => {
        gsap.fromTo(card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=50',
              scroller: containerRef.current
            }
          }
        );
      });
    }
  }, { scope: containerRef, dependencies: [activeTab, isLoading] });

  const activeUrl = tabs.find(t => t.id === activeTab)?.url || '';

  return (
    <div className="flex flex-col h-full bg-[var(--bg-elevated)] text-[var(--text-color)] font-sans relative">
      {/* Safari Top Bar */}
      <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] border-b border-gray-300 dark:border-black/50 flex flex-col pt-2 select-none z-20">

        {/* Top Controls & Address Bar */}
        <div className="flex items-center px-4 pb-2 gap-4">
          <div className="flex items-center gap-2 opacity-40">
            <button className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded cursor-not-allowed">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded cursor-not-allowed">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>

          <div className="flex-1 max-w-2xl mx-auto flex items-center justify-center relative">
            <div className="w-full bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/5 rounded-md px-3 py-1.5 flex items-center shadow-inner group">
              <Globe size={14} className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{activeUrl}</span>
              <RotateCcw size={12} className="text-gray-400 absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-gray-600 dark:hover:text-white" onClick={() => handleTabChange(activeTab)} />
            </div>
          </div>

          <div className="w-[52px]" /> {/* Spacer for centering */}
        </div>

        {/* Safari Tabs */}
        <div className="flex items-end px-2 gap-0.5 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-1.5 min-w-[120px] max-w-[200px] border border-b-0 rounded-t-lg text-xs flex items-center gap-2 cursor-pointer transition-colors relative ${activeTab === tab.id
                ? 'bg-white dark:bg-[#1c1c1e] text-black dark:text-white border-gray-300 dark:border-black/50 z-10 before:content-[""] before:absolute before:-bottom-[1px] before:left-0 before:right-0 before:h-[2px] before:bg-white dark:before:bg-[#1c1c1e]'
                : 'bg-transparent text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 border-transparent'
                }`}
            >
              <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                {tab.id === 'overview' ? <Globe size={8} className="text-gray-500" /> : <Code size={8} className="text-gray-500" />}
              </div>
              <span className="truncate">{tab.title}</span>
              {activeTab === tab.id && (
                <button className="ml-auto p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-sm opacity-50 hover:opacity-100">
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
          <button className="ml-1 mb-1 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded text-gray-500"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14" /></svg></button>
        </div>

        {/* Loading Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent z-30">
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ width: "0%", opacity: 1 }}
                animate={{ width: "80%", opacity: 1 }}
                exit={{ width: "100%", opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Safari Page Content */}
      <div className="flex-1 overflow-auto bg-white dark:bg-[#1c1c1e]" ref={containerRef}>
        <AnimatePresence mode="wait">
          {!isLoading ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-8 h-full"
            >
              {activeTab === 'overview' ? (
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="text-center pt-8 pb-4">
                    <img src="/portimage.png" alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg border-2 border-white dark:border-gray-800" />
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">My Profile</h1>
                  </div>

                  {/* Research & Socials (gsap-card class for staggered scroll anim) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="gsap-card bg-gray-50 dark:bg-[#2c2c2e] p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-colors shadow-sm">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BookOpen className="text-blue-500" size={20} /> Research Intern
                      </h2>
                      <h3 className="font-bold text-gray-800 dark:text-gray-200">Indian Institute of Technology (BHU)</h3>
                      <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mt-1">Dec 2025 • Present</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">Mathematical Model for Integrating Net Zero Practices in MSMEs.</p>
                    </div>

                    <div className="gsap-card bg-gray-50 dark:bg-[#2c2c2e] p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-purple-500/30 transition-colors shadow-sm">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Globe className="text-purple-500" size={20} /> Social Links
                      </h2>
                      <div className="grid grid-cols-2 gap-3">
                        <a href="https://www.linkedin.com/in/ashishnanda19/" target="_blank" rel="noreferrer" className="flex items-center p-3 bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-100 dark:border-white/5 hover:border-blue-500 transition-colors gap-3"><Linkedin size={18} className="text-blue-700" /> <span className="text-sm font-medium">LinkedIn</span></a>
                        <a href="https://github.com/ashishnanda19" target="_blank" rel="noreferrer" className="flex items-center p-3 bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-100 dark:border-white/5 hover:border-gray-500 transition-colors gap-3"><Github size={18} className="text-gray-900 dark:text-gray-100" /> <span className="text-sm font-medium">GitHub</span></a>
                        <a href="https://www.instagram.com/ashish19nanda/" target="_blank" rel="noreferrer" className="flex items-center p-3 bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-100 dark:border-white/5 hover:border-pink-500 transition-colors gap-3"><Instagram size={18} className="text-pink-600" /> <span className="text-sm font-medium">Instagram</span></a>
                        <a href="https://x.com/ashish19n" target="_blank" rel="noreferrer" className="flex items-center p-3 bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-100 dark:border-white/5 hover:border-blue-400 transition-colors gap-3"><Twitter size={18} className="text-blue-400" /> <span className="text-sm font-medium">X (Twitter)</span></a>
                      </div>
                    </div>
                  </div>

                  {/* Projects Grid */}
                  <div className="gsap-card">
                    <h2 className="text-2xl font-bold mb-6 mt-4">Featured Projects</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {tabs.filter(t => t.id !== 'overview').map((project) => (
                        <motion.div
                          key={project.id}
                          onClick={() => handleTabChange(project.id)}
                          whileHover={{ scale: 1.03, y: -5 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className="bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/5 rounded-xl p-5 cursor-pointer hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] transition-colors duration-300 group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <FolderDot className="text-blue-500 mb-3" size={24} />
                          <h3 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors">{project.title}</h3>
                          <p className="text-xs text-gray-500 truncate">{project.url}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto py-12 text-center h-full flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    className="w-full bg-gray-50 dark:bg-[#2c2c2e] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="bg-gray-200 dark:bg-black/40 px-4 py-2 border-b border-gray-300 dark:border-white/10 flex justify-between items-center text-xs text-gray-500 font-mono">
                      <span>README.md</span>
                      <a href={`https://${activeUrl}`} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-1">Open in GitHub <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg></a>
                    </div>
                    <div className="p-8 text-left prose dark:prose-invert max-w-none">
                      <h1 className="text-4xl font-extrabold tracking-tight mb-4">{tabs.find(t => t.id === activeTab)?.title}</h1>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {activeTab === 'transcoder' && ['Node.js', 'Express.js', 'AWS', 'Redis', 'MongoDB', 'Docker', 'ffmpeg'].map(t => <span key={t} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded">{t}</span>)}
                        {activeTab === 'invosync' && ['React.js', 'Vite', 'Flask', 'Python', 'Tesseract OCR', 'RapidFuzz', 'Pandas', 'TailwindCSS'].map(t => <span key={t} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded">{t}</span>)}
                        {activeTab === 'safetrail' && ['Node.js', 'Express.js', 'Socket.IO', 'PostgreSQL (PostGIS)', 'Redis', 'BullMQ'].map(t => <span key={t} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold rounded">{t}</span>)}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed dark:mix-blend-plus-lighter">
                        {activeTab === 'transcoder' && "An infinite-scale distributed video transcoder that processes video content and streams securely."}
                        {activeTab === 'invosync' && "An AI-powered B2B SaaS that automates invoice-to-receipt matching with 98% accuracy."}
                        {activeTab === 'safetrail' && "A cross-platform mobile SOS application explicitly designed to enhance safety for women and girls."}
                      </p>
                      <div className="mt-8 p-4 bg-gray-100 dark:bg-black/30 rounded-lg font-mono text-sm border border-gray-200 dark:border-white/5">
                        <span className="text-gray-400">$</span> git clone https://{activeUrl}.git<br />
                        <span className="text-gray-400">$</span> cd {activeTab}<br />
                        <span className="text-gray-400">$</span> npm install
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="w-full h-full bg-white dark:bg-[#1c1c1e]" key="loading" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MailContent = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSent(true);

      const to = 'ashish.nanda1902@gmail.com';
      const mailSubject = subject || 'Message from AshishOS Mail';
      const bodyLines = [
        `From: ${name || 'Anonymous'}`,
        `Email: ${email || 'not provided'}`,
        '',
        message || '',
      ];
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
        mailSubject
      )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      window.location.href = mailto;
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-elevated)] text-[var(--text-color)] relative overflow-hidden">

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {isSending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[var(--bg-elevated)]/60 backdrop-blur-md flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ x: -200, y: 200, scale: 0.5, rotate: -45 }}
              animate={{
                x: [-200, 0, 400],
                y: [200, -50, -400],
                scale: [0.5, 1.2, 0.5],
                rotate: [-45, 0, 45]
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="text-blue-500 drop-shadow-[0_10px_20px_rgba(59,130,246,0.5)]"
            >
              <Send size={100} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mail chrome */}
      <div className="bg-[var(--chrome-bg)] border-b border-[var(--border-subtle)] px-4 py-2 flex items-center gap-3 text-sm relative z-10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="ml-3 font-semibold">Inbox</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="px-3 py-1 rounded-md bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors flex items-center gap-1">
            <Mail size={14} /> New Message
          </button>
          <div className="flex items-center bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-lg px-2 py-1 text-xs text-[var(--text-muted)]">
            <Search size={12} className="mr-1 text-[var(--icon-muted)]" />
            Search
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside className="w-56 border-r border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-3 text-xs">
          <div className="mb-4">
            <p className="uppercase text-[10px] tracking-wide text-[var(--text-muted)] mb-1">FAVOURITES</p>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium">
              <span>Inbox</span>
              <span className="text-[10px] bg-blue-500 text-white rounded-full px-1.5">1</span>
            </button>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] mt-1">
              <span>Sent</span>
            </button>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)] mt-1">
              <span>Archive</span>
            </button>
          </div>
          <div>
            <p className="uppercase text-[10px] tracking-wide text-[var(--text-muted)] mb-1">MAILBOXES</p>
            <p className="px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)]">All Inboxes</p>
            <p className="px-2 py-1.5 rounded-md hover:bg-[var(--bg-subtle)]">AshishOS</p>
          </div>
        </aside>

        {/* Message list */}
        <section className="w-72 border-r border-[var(--card-border)] bg-[var(--bg-subtle)] overflow-auto text-sm">
          <div className="px-3 py-2 border-b border-[var(--card-border)] text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
            Today
          </div>
          <div className="px-3 py-3 space-y-3">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--card-border)] px-3 py-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">AshishOS</span>
                <span className="text-[10px] text-[var(--text-muted)]">Now</span>
              </div>
              <p className="text-xs font-medium mt-1">New message for Ashish</p>
              <p className="text-[11px] text-[var(--text-muted)] truncate">
                Use the composer on the right to send me a message for roles, collaborations, or questions.
              </p>
            </div>
          </div>
        </section>

        {/* Message / composer */}
        <main className="flex-1 bg-[var(--bg-elevated)] p-6 overflow-auto">
          <div className="max-w-2xl mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-sm">
            <div className="border-b border-[var(--card-border)] px-5 py-3 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">New Message</p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  This will open your default mail app with the details you fill in.
                </p>
              </div>
              {sent && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/40">
                  Ready to send
                </span>
              )}
            </div>

            <form className="px-5 py-4 space-y-3 text-sm" onSubmit={handleSubmit}>
              <div className="flex items-center gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                  To
                </label>
                <div className="flex-1 text-[13px]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-blue-400 border border-blue-500/30">
                    {theme === 'dark' ? 'ashish.nanda1902@gmail.com' : 'Ashish Kumar Nanda'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 text-sm rounded-md bg-[var(--bg-input)] border border-[var(--border-strong)] px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/60"
                  placeholder="Who is reaching out?"
                  disabled={isSending}
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-sm rounded-md bg-[var(--bg-input)] border border-[var(--border-strong)] px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/60"
                  placeholder="For follow-ups"
                  disabled={isSending}
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 text-sm rounded-md bg-[var(--bg-input)] border border-[var(--border-strong)] px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/60"
                  placeholder="Role, collaboration, question..."
                  disabled={isSending}
                />
              </div>

              <div className="flex items-start gap-3">
                <label className="w-16 text-[11px] text-[var(--text-muted)] uppercase tracking-wide mt-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="flex-1 text-sm rounded-md bg-[var(--bg-input)] border border-[var(--border-strong)] px-2 py-1.5 outline-none resize-none focus:ring-2 focus:ring-blue-500/60"
                  placeholder="Write your message as if you were emailing me directly."
                  disabled={isSending}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-[var(--text-muted)]">
                  Clicking **Send** opens your mail client with everything pre‑filled.
                </p>
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500 text-white text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  <Mail size={14} />
                  {isSending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

const PhotoBooth = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setError('');
      } catch (err) {
        setError('Camera access denied or unavailable.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current) {
      // Trigger flash animation
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 300);

      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      const newPhoto = canvas.toDataURL('image/png');
      setPhotos(prev => [newPhoto, ...prev]);
    }
  };

  return (
    <div className="h-full bg-[#1c1c1e] flex flex-col items-center p-6 overflow-y-auto relative">
      {/* Light Flash Overlay */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {error ? (
        <div className="text-red-400 text-center flex-1 flex flex-col justify-center">
          <p>{error}</p>
          <p className="text-sm text-gray-500 mt-2">Please allow camera permissions.</p>
        </div>
      ) : (
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Main Viewfinder */}
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />

            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />

            {/* Viewfinder crosshairs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-white/50" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-white/50" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-white/50" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-white/50" />
            </div>
          </div>

          {/* Shutter Button */}
          <div className="mt-8 mb-10 flex justify-center">
            <button
              onClick={takePhoto}
              className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform flex items-center justify-center active:scale-95 group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-black/10 group-active:bg-gray-200 transition-colors"></div>
            </button>
          </div>

          {/* Film Roll Gallery */}
          {photos.length > 0 && (
            <div className="w-full">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2">Recent Captures ({photos.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <AnimatePresence>
                  {photos.map((p, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.4}
                      whileDrag={{ scale: 1.1, zIndex: 10, rotate: index % 2 === 0 ? 5 : -5, cursor: 'grabbing' }}
                      whileHover={{ scale: 1.05 }}
                      key={index}
                      className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-white p-2 shadow-md hover:shadow-xl transition-all cursor-grab"
                      onClick={() => setSelectedPhoto(p)}
                    >
                      <img src={p} alt={`Capture ${index}`} className="w-full h-full object-cover transform scale-x-[-1] transition-transform group-hover:scale-110" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enlarged Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-8 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-full"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedPhoto} alt="Enlarged" className="w-full h-auto max-h-[80vh] rounded-lg shadow-2xl transform scale-x-[-1]" />
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors flex items-center gap-2"
                >
                  <X size={16} /> Close
                </button>
                <a
                  href={selectedPhoto}
                  download="ashishos-photobooth.png"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30"
                >
                  <Download size={16} /> Save Image
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SpotifyContent = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Helper function to extract playlist ID from URL
  const extractPlaylistId = (url: string): string => {
    // Try to match playlist ID in URL
    const match = url.match(/playlist\/([a-zA-Z0-9]{22})/);
    if (match && match[1]) {
      return match[1];
    }
    // If URL format is different, try alternative patterns
    const altMatch = url.match(/\/([a-zA-Z0-9]{22})(?:\?|$)/);
    if (altMatch && altMatch[1]) {
      return altMatch[1];
    }
    // If it's already just an ID (22 characters), return as is
    if (url.length === 22 && /^[a-zA-Z0-9]+$/.test(url)) {
      return url;
    }
    // Fallback: return empty string to show error
    console.error('Could not extract playlist ID from:', url);
    return '';
  };

  // Playlists with Spotify URLs - IDs will be extracted automatically
  const playlists = [
    {
      id: 'coding-focus',
      name: 'Chandani & Chai',
      description: 'Chandani & Chai',
      spotifyUrl: 'https://open.spotify.com/playlist/59jMJYSo97Dy5JTXuaAQrK?si=rsrKZ4SpSWSjT-Zse-3n6A&pi=4_pUzpe5SsO-6',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop'
    },
    {
      id: 'chill-vibes',
      name: 'Clouded Coffeehouse',
      description: 'Clouded Coffeehouse',
      spotifyUrl: 'https://open.spotify.com/playlist/5Q59GgXHjOzY5vjeUBStbb?si=_sTg0OsuTCmoczXybYs4aQ',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
    },
    {
      id: 'workout',
      name: 'Drip & Drop',
      description: 'Drip & Drop',
      spotifyUrl: 'https://open.spotify.com/playlist/477IgA9QgtRaxQ7s6LiFLR?si=QGMogWbpShWIzhEp-F-38w&pi=XnaY64pRTKq0V',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop'
    },
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Spotify chrome */}
      <div className="bg-[#121212] border-b border-gray-800 p-3 flex items-center space-x-3 shadow-sm z-10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-[#242424] rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 flex items-center">
          <Music size={14} className="mr-3 text-gray-500" />
          open.spotify.com/user/ashishnanda19
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gradient-to-b from-[#1e1e1e] to-black">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

          {/* Profile Section - Spotify Style */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 pb-8">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl flex-shrink-0 ring-4 ring-black/50">
              <img
                src="/portimage.png"
                alt="Ashish Kumar Nanda"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Profile</p>
              <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-none tracking-tight">Ashish Kumar Nanda</h1>
              <p className="text-gray-400 mb-6 text-sm">@ashishnanda19</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href="https://open.spotify.com/user/31l75eh4gpxsbgm4w4ocm23mtqem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-white rounded-full text-sm font-bold hover:bg-[#1ed760] hover:scale-105 transition-all shadow-lg"
                >
                  <UserPlus size={18} />
                  Send Friend Request
                </a>
                <a
                  href="https://open.spotify.com/user/31l75eh4gpxsbgm4w4ocm23mtqem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white/30 text-white rounded-full text-sm font-bold hover:border-white hover:scale-105 transition-all"
                >
                  View on Spotify
                </a>
              </div>
            </div>
          </div>

          {/* Playlists Section - Spotify Style */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Public Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className={`bg-[#181818] hover:bg-[#282828] rounded-lg p-4 transition-all duration-200 cursor-pointer group ${selectedPlaylist === playlist.id ? 'bg-[#282828] ring-1 ring-white/10' : ''}`}
                  onClick={() => setSelectedPlaylist(playlist.id === selectedPlaylist ? null : playlist.id)}
                >
                  <div className="relative aspect-square mb-4 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                    {imageErrors[playlist.id] ? (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <span className="text-white text-5xl font-bold">{playlist.name.charAt(0)}</span>
                      </div>
                    ) : (
                      <img
                        src={playlist.image}
                        alt={playlist.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${selectedPlaylist === playlist.id ? 'scale-110 blur-[2px] brightness-75' : 'group-hover:scale-105'}`}
                        onError={() => setImageErrors(prev => ({ ...prev, [playlist.id]: true }))}
                      />
                    )}

                    {/* Animated Mock Equalizer when playing */}
                    {selectedPlaylist === playlist.id && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="flex items-end justify-center gap-1 h-12 w-16">
                          <motion.div animate={{ height: [8, 24, 12, 32, 16] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-2 bg-[#1DB954] rounded-t-sm" />
                          <motion.div animate={{ height: [16, 40, 20, 24, 12] }} transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }} className="w-2 bg-[#1DB954] rounded-t-sm" />
                          <motion.div animate={{ height: [24, 12, 32, 16, 28] }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }} className="w-2 bg-[#1DB954] rounded-t-sm" />
                          <motion.div animate={{ height: [12, 32, 16, 40, 20] }} transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }} className="w-2 bg-[#1DB954] rounded-t-sm" />
                        </div>
                        <span className="text-white text-xs font-bold tracking-widest uppercase drop-shadow-md">Playing</span>
                      </div>
                    )}

                    <div className={`absolute bottom-2 right-2 transition-opacity duration-300 ${selectedPlaylist === playlist.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                        {selectedPlaylist === playlist.id ? (
                          <Pause size={24} className="text-black" fill="black" />
                        ) : (
                          <Play size={24} className="text-black ml-0.5" fill="black" />
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className={`font-bold mb-1 truncate transition-colors ${selectedPlaylist === playlist.id ? 'text-[#1DB954]' : 'text-white'}`}>{playlist.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Spotify Player - Spotify Style */}
          {selectedPlaylist && (() => {
            const playlist = playlists.find(p => p.id === selectedPlaylist);
            if (!playlist) return null;

            const playlistId = extractPlaylistId(playlist.spotifyUrl);

            if (!playlistId) {
              return (
                <div className="bg-[#181818] rounded-lg p-8">
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-6">Unable to load playlist. Please check the playlist URL.</p>
                    <a
                      href={playlist.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-white rounded-full text-sm font-bold hover:bg-[#1ed760] transition-colors"
                    >
                      Open in Spotify
                    </a>
                  </div>
                </div>
              );
            }

            return (
              <div className="bg-[#181818] rounded-lg p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {playlist.name}
                  </h2>
                </div>
                <div className="bg-[#000000] rounded-lg p-4 shadow-2xl">
                  <iframe
                    style={{ borderRadius: '12px', minHeight: '352px' }}
                    src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Spotify playlist: ${playlist.name}`}
                    className="w-full"
                  ></iframe>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  Click "Open in Spotify" in the player to add me as a friend and follow my playlists!
                </p>
              </div>
            );
          })()}

          {/* Instructions - Spotify Style */}
          {!selectedPlaylist && (
            <div className="bg-[#181818] rounded-lg p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1DB954]/20 flex items-center justify-center flex-shrink-0">
                  <Music size={24} className="text-[#1DB954]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-lg">How to Connect</h3>
                  <ol className="text-sm text-gray-400 space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center text-xs font-bold">1</span>
                      <span>Click on any playlist above to start listening</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center text-xs font-bold">2</span>
                      <span>Click "Open in Spotify" in the player to view on Spotify</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center text-xs font-bold">3</span>
                      <span>Send me a friend request using the button above</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1DB954]/20 text-[#1DB954] flex items-center justify-center text-xs font-bold">4</span>
                      <span>Follow my playlists to stay updated with my music taste!</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const SystemPreferencesContent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={
        theme === 'dark'
          ? 'h-full overflow-y-auto p-8 font-sans bg-(--card-bg) text-(--text-color)'
          : 'h-full overflow-y-auto p-8 font-sans bg-white text-gray-900'
      }
    >
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">System Preferences</h1>
      <p className="text-xs text-gray-500 mb-6">Customize how AshishOS looks and feels.</p>
      <h2 className="text-sm font-semibold mb-3">Appearance</h2>
      <p className="text-sm text-(--text-muted) mb-4">
        Choose between light and dark appearance for AshishOS.
      </p>
      <div className="flex gap-4 sm:gap-6 flex-col sm:flex-row">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex-1 min-w-0 rounded-2xl border p-4 text-left transition-all cursor-pointer ${theme === 'light'
            ? 'border-blue-500 bg-slate-900 text-white shadow-md ring-2 ring-blue-500/60'
            : 'border-(--card-border) bg-slate-900 text-white opacity-80 hover:opacity-100'
            }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Light</span>
            {theme === 'light' && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                ✓
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Default macOS-style light appearance. Current design is preserved.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex-1 min-w-0 rounded-2xl border p-4 text-left transition-all cursor-pointer ${theme === 'dark'
            ? 'border-blue-500 bg-slate-900 text-white shadow-md ring-2 ring-blue-500/60'
            : 'border-(--card-border) bg-slate-900 text-white opacity-80 hover:opacity-100'
            }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Dark</span>
            {theme === 'dark' && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                ✓
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            A macOS-like dark appearance with dimmed surfaces and light text.
          </p>
        </button>
      </div>
    </div>
  );
};

const TerminalContent = () => {
  const [history, setHistory] = useState<{ text: string, type: 'input' | 'output' | 'system' }[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence commands to simulate via typing
  const bootSequence = useMemo(() => [
    { cmd: 'whoami', output: 'ashish_nanda' },
    { cmd: 'date', output: new Date().toString() },
    { cmd: './welcome.sh', output: 'Welcome to AshishOS v1.0.0\nType "help" to see available commands.' }
  ], []);

  useEffect(() => {
    let isMounted = true;
    let cancelTyping = false;

    const boot = async () => {
      if (!isMounted) return;
      setIsBooting(true);

      // Add initial system message
      setHistory([{ text: 'AshishOS [Version 1.0.0]\n(c) Ashish Kumar Nanda. All rights reserved.', type: 'system' }]);

      await new Promise(r => setTimeout(r, 800)); // Initial delay

      for (const step of bootSequence) {
        if (cancelTyping) break;

        // Simulate typing the command
        let currentCmd = '';
        for (const char of step.cmd) {
          if (cancelTyping) break;
          currentCmd += char;
          setHistory(prev => {
            const newHist = [...prev];
            // Update or add the current typing line
            if (newHist.length > 0 && newHist[newHist.length - 1].type === 'input' && !newHist[newHist.length - 1].text.includes('\n')) {
              newHist[newHist.length - 1] = { text: `ashish@macbook ~ % ${currentCmd}`, type: 'input' };
            } else {
              newHist.push({ text: `ashish@macbook ~ % ${currentCmd}`, type: 'input' });
            }
            return newHist;
          });
          await new Promise(r => setTimeout(r, 50)); // Typing speed
        }

        await new Promise(r => setTimeout(r, 300)); // Delay between typing and output

        if (cancelTyping) break;

        // Add the output
        setHistory(prev => [...prev, { text: step.output, type: 'output' }]);
        await new Promise(r => setTimeout(r, 600)); // Delay before next command
      }

      if (isMounted) {
        setIsBooting(false);
        inputRef.current?.focus();
      }
    };

    boot();

    return () => {
      isMounted = false;
      cancelTyping = true;
    };
  }, [bootSequence]);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, input]);

  // Handle clicking anywhere to focus input
  const handleContainerClick = () => {
    if (!isBooting) {
      inputRef.current?.focus();
    }
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isBooting) {
      const cmd = input.trim().toLowerCase();

      if (cmd === 'clear') {
        setHistory([]);
        setInput("");
        return;
      }

      const newHistory = [...history, { text: `ashish@macbook ~ % ${input}`, type: 'input' as const }];

      let output = '';

      switch (cmd) {
        case 'help':
          output = `  about     - Ashish's Biography\n  skills    - Technology Stack & Skills\n  projects  - Featured Development Work\n  leetcode  - View LeetCode Stats\n  github    - View GitHub Profile\n  contact   - Get in Touch\n  clear     - Clear terminal history`;
          break;
        case 'about':
          output = `Ashish Kumar Nanda | CS Undergrad | Full Stack Developer\n\nThird year CS student at Manipal University Jaipur who codes by day and plays guitar by night.\nI build full-stack web apps, grind LeetCode for fun, and occasionally debug with emotional support from my music.`;
          break;
        case 'projects':
          output = `1. [Distributed Video Transcoding Platform]\n   Engineered an AWS-based pipeline with Redis queues and multi-resolution generation.\n\n2. [InvoSync]\n   Automated invoice-PO reconciliation platform with OCR data extraction (98%+ accuracy).\n\n3. [SafeTrail]\n   Scalable backend safety platform with real-time tracking and ML-based threat analysis.`;
          break;
        case 'skills':
          output = `> Languages: C++, Python, Java, C, SQL, HTML, CSS, JavaScript\n> Frameworks: React, Node.js, Express.js, Tailwind CSS\n> Cloud/Sys: AWS, Redis, Docker, CI/CD\n> Tools: Git, GitHub, Postman, Vite, MongoDB, REST APIs`;
          break;
        case 'github':
          output = `GitHub Profile exploring open-source contributions & systems programming.\n Link: https://github.com/ashishnanda19`;
          break;
        case 'leetcode':
          output = `LeetCode Stats:\n- Over 400 problems solved\n- Peak contest rating: 1704 (Top 12.96%)\n Link: https://www.leetcode.com/ashishnanda19`;
          break;
        case 'codechef':
          output = `2 star on CodeChef with a max contest rating of 1450.\n Link: https://www.codechef.com/users/ashishnanda19`;
          break;
        case 'contact':
          output = `Let's connect or collaborate!\n Email: ashish.nanda1902@gmail.com\n LinkedIn: https://www.linkedin.com/in/ashishnanda19/\n Twitter: https://x.com/ashish19n\n(Or open the Mail app to send me a fast, direct message!)`;
          break;
        case 'socials':
          output = `GitHub: https://github.com/ashishnanda19\n LinkedIn:  https://www.linkedin.com/in/ashishnanda19/\n LeetCode:  https://www.leetcode.com/ashishnanda19\n 
          CodeChef:  https://www.codechef.com/users/ashishnanda19\n
          Instagram: https://www.instagram.com/ashish19nanda`;
          break;
        case '':
          break; // Empty enter just prints prompt
        default:
          output = `zsh: command not found: ${cmd}`;
      }

      if (output) {
        newHistory.push({ text: output, type: 'output' });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  // Helper to render text with very basic link highlighting for socials
  const renderTerminalText = (text: string, type: string) => {
    if (type === 'system') {
      return <div className="text-gray-400 mb-4">{text}</div>;
    }

    // Linkify basic URLs
    const parts = text.split(/(https?:\/\/[^\s]+)/g);

    return (
      <div className={`mb-1 ${type === 'input' ? 'text-gray-200 font-bold' : 'text-[#33ff33]'} whitespace-pre-wrap leading-relaxed`}>
        {parts.map((part, i) =>
          part.startsWith('http') ?
            <a key={i} href={part} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">{part}</a> :
            part
        )}
      </div>
    );
  };

  return (
    <div
      className="bg-[#1e1e1e] text-[#33ff33] font-mono p-4 pb-12 h-full overflow-auto text-[13px] tracking-wide cursor-text shadow-inner"
      onClick={handleContainerClick}
    >
      <div className="max-w-4xl opacity-90">
        {history.map((item, i) => (
          <React.Fragment key={i}>
            {renderTerminalText(item.text, item.type)}
          </React.Fragment>
        ))}

        {!isBooting && (
          <div className="flex items-center mt-1">
            <span className="mr-2 text-gray-200 font-bold">ashish@macbook ~ %</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent outline-none flex-1 text-[#33ff33] font-bold caret-transparent"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              {/* Custom block cursor mirroring the input length to always stay at the end */}
              <div
                className="absolute top-0 bottom-0 left-0 pointer-events-none flex items-center"
              >
                <span className="text-transparent whitespace-pre">{input}</span>
                <span className="w-2 h-4 bg-gray-400 opacity-80 animate-pulse ml-[1px]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};

const SnakeGame = () => {
  const GRID_SIZE = 20;
  const SPEED = 100;

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const moveSnake = setInterval(() => {
      setSnake(prev => {
        const newHead = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE || prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          if (score > highScore) setHighScore(score);
          return prev;
        }
        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(moveSnake);
  }, [isPlaying, gameOver, dir, food, score, highScore]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      if (!isPlaying && e.key === 'Enter') {
        startGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp': if (dir.y !== 1) setDir({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (dir.y !== -1) setDir({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (dir.x !== 1) setDir({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (dir.x !== -1) setDir({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dir, isPlaying]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setDir({ x: 0, y: -1 });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#0a0a0c] text-white p-4 relative overflow-hidden font-mono selection:bg-transparent">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black pointer-events-none" />

      {/* CRT Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-40 mix-blend-overlay"></div>

      {/* Header HUD */}
      <div className="w-full max-w-[400px] flex justify-between items-end mb-4 px-2 z-10">
        <div className="flex flex-col">
          <span className="text-[10px] text-green-500/70 uppercase tracking-widest mb-1">P1 Score</span>
          <span className="text-2xl text-green-400 font-bold drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] leading-none">{score.toString().padStart(4, '0')}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-pink-500/70 uppercase tracking-widest mb-1">Hi-Score</span>
          <span className="text-xl text-pink-500 font-bold drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] leading-none">{highScore.toString().padStart(4, '0')}</span>
        </div>
      </div>

      {/* Game Board container */}
      <div className="relative bg-[#050505] border-2 border-green-500/30 rounded-lg p-1 shadow-[0_0_30px_rgba(74,222,128,0.15)] z-10 w-full max-w-[400px] aspect-square">
        {/* Grid background lines */}
        <div className="absolute inset-1 bg-[linear-gradient(to_right,#0f2e14_1px,transparent_1px),linear-gradient(to_bottom,#0f2e14_1px,transparent_1px)] bg-[size:5%_5%] opacity-30 pointer-events-none" />

        <div className="relative w-full h-full"
          style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = snake.some((s, idx) => idx !== 0 && s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div key={i} className="relative w-full h-full flex items-center justify-center p-[1px]">
                {isHead && (
                  <div className="w-full h-full bg-green-400 rounded-sm shadow-[0_0_10px_rgba(74,222,128,0.8)] z-10" />
                )}
                {isBody && (
                  <div className="w-full h-full bg-green-600/80 rounded-sm shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                )}
                {isFood && (
                  <div className="w-full h-full bg-pink-500 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.9)] animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Overlay Screens */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30 backdrop-blur-[2px] rounded-lg border border-white/10">
            <h2 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-green-600 tracking-tighter drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]">
              {gameOver ? 'GAME OVER' : 'NEON SNAKE'}
            </h2>
            {gameOver && (
              <p className="text-pink-500 mb-8 font-bold animate-pulse drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]">FINAL SCORE: {score}</p>
            )}
            {!gameOver && (
              <p className="text-green-500/60 mb-8 text-xs tracking-widest uppercase">Insert Coin to Play</p>
            )}

            <button
              onClick={startGame}
              className="group relative px-6 py-3 font-bold text-black uppercase tracking-widest bg-green-500 hover:bg-green-400 transition-all rounded hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              <span className="flex items-center gap-2 relative z-10">
                {gameOver ? <RotateCcw size={16} strokeWidth={3} /> : <Gamepad2 size={16} />}
                {gameOver ? 'Try Again [ENTER]' : 'Start Game'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Arcade Cabinet Instructions / Decor */}
      <div className="mt-8 flex gap-6 text-[10px] text-green-500/50 uppercase tracking-widest z-10">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 border border-green-500/30 rounded flex items-center justify-center">↑</span>
          <span className="w-4 h-4 border border-green-500/30 rounded flex items-center justify-center">↓</span>
          <span className="w-4 h-4 border border-green-500/30 rounded flex items-center justify-center">←</span>
          <span className="w-4 h-4 border border-green-500/30 rounded flex items-center justify-center">→</span>
          <span className="ml-1">MOVE</span>
        </div>
      </div>
    </div>
  );
};

// --- Menu Bar Component ---

type MenuSeparator = {
  type: "separator";
};

type MenuActionItem = {
  type?: undefined;
  label: string;
  action?: () => void;
  shortcut?: string;
};

type MenuItem = MenuSeparator | MenuActionItem;

type TopBarProps = {
  title: string;
  activeMenu: string | null;
  setActiveMenu: (m: string | null) => void;
  onOpenSystemPreferences: () => void;
  onNewWindow: () => void;
  onCloseAllWindows: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onEnterFullScreen: () => void;
  onActualSize: () => void;
};

const TopBar = ({
  title,
  activeMenu,
  setActiveMenu,
  onOpenSystemPreferences,
  onNewWindow,
  onCloseAllWindows,
  onUndo,
  onRedo,
  onEnterFullScreen,
  onActualSize
}: TopBarProps) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menus: Record<string, MenuItem[]> = {
    "": [
      { label: "About This Portfolio", action: () => alert("Ashish's Portfolio") },
      { label: "System Preferences...", action: () => onOpenSystemPreferences() },
      { type: "separator" },
      { label: "Sleep", action: () => alert("Zzz...") },
      { label: "Restart", action: () => window.location.reload() },
      { label: "Shut Down", action: () => window.close() },
    ],

    File: [
      { label: "New Window", shortcut: "⌘N", action: () => onNewWindow() },
      { label: "Close Window", shortcut: "⌘W", action: () => onCloseAllWindows() },
      { type: "separator" },
      { label: "Download Resume", action: () => window.open("https://drive.google.com/file/d/15WXrrq561L2D8in8baT1LVJNn3sdP-m6/view?usp=sharing", "_blank") },
    ],

    Edit: [
      { label: "Undo", shortcut: "⌘Z", action: () => onUndo() },
      { label: "Redo", shortcut: "⇧⌘Z", action: () => onRedo() },
      { type: "separator" },
      { label: "Cut", shortcut: "⌘X" },
      { label: "Copy", shortcut: "⌘C" },
      { label: "Paste", shortcut: "⌘V" },
    ],

    View: [
      { label: "Enter Full Screen", shortcut: "^⌘F", action: () => onEnterFullScreen() },
      { label: "Actual Size", shortcut: "⌘0", action: () => onActualSize() },
    ],

    Help: [
      { label: "Portfolio Help", action: () => alert("Mail me at ashish.nanda1902@gmail.com if you find any bug!") },
      { label: "View Source Code", action: () => window.open("https://github.com/ashishnanda19", "_blank") },
    ],
  };

  return (
    <div
      className="h-8 w-full bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 text-white text-sm fixed top-0 z-50 shadow-sm border-b border-white/5 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center space-x-4 h-full">
        {Object.entries(menus).map(([key, items]) => (
          <div key={key} className="relative h-full flex items-center">
            <span
              className={`cursor-default px-2.5 py-1 rounded transition-colors font-medium ${activeMenu === key ? "bg-white/20" : "hover:bg-white/10"
                } ${key === "" ? "text-base font-bold pb-1.5" : "text-xs"}`}
              onClick={() => setActiveMenu(activeMenu === key ? null : key)}
            >
              {key}
            </span>

            {activeMenu === key && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white/90 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 py-1.5 z-50 text-black animate-in fade-in slide-in-from-top-1 duration-100">
                {items.map((item, idx) =>
                  item.type === "separator" ? (
                    <div key={idx} className="h-[1px] bg-black/10 my-1 mx-2" />
                  ) : (
                    <div
                      key={idx}
                      className="px-4 py-1.5 hover:bg-blue-500 hover:text-white flex justify-between items-center cursor-default group"
                      onClick={() => {
                        item.action?.();
                        setActiveMenu(null);
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span className="text-gray-400 group-hover:text-white/80 text-xs">
                          {item.shortcut}
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
        {title && <span className="font-bold text-xs ml-2 opacity-80 hidden sm:block">{title}</span>}
      </div>

      <div className="flex items-center space-x-4 text-xs font-medium text-white/90">
        <div className="hidden sm:flex items-center space-x-3 opacity-80">
          <Battery size={16} /> <Wifi size={16} /> <Search size={16} />
        </div>
        <span>
          {date.toLocaleString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

// macOS-style Mail Icon Component - Blue gradient with white envelope
const MailIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" className="drop-shadow-md">
    <defs>
      <linearGradient id="mailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#007AFF" />
        <stop offset="50%" stopColor="#00B8FF" />
        <stop offset="100%" stopColor="#00D4FF" />
      </linearGradient>
    </defs>
    {/* Rounded square background with blue-to-cyan vertical gradient */}
    <rect width="512" height="512" rx="102" fill="url(#mailGradient)" />

    {/* White envelope - clean minimalist design, horizontal orientation */}
    <g transform="translate(256, 256)">
      {/* Main envelope body - horizontal rectangle */}
      <rect x="-170" y="-60" width="340" height="150" fill="#FFFFFF" rx="8" />

      {/* Envelope flap - V shape formed by two diagonal lines meeting at bottom center */}
      <path
        d="M -170 -60 L 0 60 L 170 -60"
        fill="#FFFFFF"
        stroke="none"
      />

      {/* Subtle curved line running horizontally across lower half */}
      <path
        d="M -150 50 Q 0 40 150 50"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </g>
  </svg>
);

// macOS-style System Settings Icon Component - Metallic gear with 3D effect
const SettingsIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" className="drop-shadow-md">
    <defs>
      {/* Metallic silver/gray gradient - light source from top-left */}
      <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8F8F8" />
        <stop offset="20%" stopColor="#E8E8E8" />
        <stop offset="40%" stopColor="#D0D0D0" />
        <stop offset="60%" stopColor="#B8B8B8" />
        <stop offset="80%" stopColor="#A0A0A0" />
        <stop offset="100%" stopColor="#8E8E8E" />
      </linearGradient>
      {/* Top-left highlight for 3D metallic effect */}
      <radialGradient id="gearHighlight" cx="25%" cy="25%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      {/* Shadow gradient */}
      <radialGradient id="gearShadow" cx="60%" cy="70%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Rounded square background - solid black */}
    <rect width="512" height="512" rx="102" fill="#000000" />

    {/* Gear with metallic 3D appearance */}
    <g transform="translate(256, 256)">
      {/* Outer gear with distinct sharp triangular teeth around circumference */}
      <path
        d="M 0 -195
           L 8 -195 L 12 -215 L 16 -195 L 24 -195
           L 22 -182 L 30 -178 L 24 -165 L 34 -152 L 22 -148
           L 24 -135 L 16 -135 L 12 -115 L 8 -135 L 0 -135
           L -8 -135 L -12 -115 L -16 -135 L -24 -135
           L -22 -148 L -34 -152 L -24 -165 L -30 -178 L -22 -182
           L -24 -195 L -16 -195 L -12 -215 L -8 -195 L 0 -195 Z"
        fill="url(#gearGradient)"
        stroke="#AAAAAA"
        strokeWidth="1"
      />

      {/* Inner rings with smaller teeth */}
      <circle cx="0" cy="0" r="152" fill="url(#gearGradient)" stroke="#AAAAAA" strokeWidth="2" />
      <circle cx="0" cy="0" r="132" fill="url(#gearGradient)" stroke="#AAAAAA" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="112" fill="none" stroke="#AAAAAA" strokeWidth="1" opacity="0.6" />

      {/* Three thick Y-shaped spokes connecting hub to outermost gear */}
      {/* Top spoke */}
      <path
        d="M 0 -112 L 0 -152 
           M -22 -112 L 22 -112"
        stroke="#AAAAAA"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom left spoke */}
      <path
        d="M -79 -79 L -108 -108
           M -79 -58 L -58 -79"
        stroke="#AAAAAA"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom right spoke */}
      <path
        d="M 79 -79 L 108 -108
           M 79 -58 L 58 -79"
        stroke="#AAAAAA"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />

      {/* Solid smooth circular hub */}
      <circle cx="0" cy="0" r="58" fill="url(#gearGradient)" stroke="#AAAAAA" strokeWidth="2" />
      <circle cx="0" cy="0" r="42" fill="#D0D0D0" opacity="0.25" />

      {/* 3D highlight from top-left light source */}
      <ellipse cx="-40" cy="-40" rx="190" ry="190" fill="url(#gearHighlight)" opacity="0.7" />
    </g>

    {/* Soft shadow beneath gear for depth */}
    <ellipse cx="280" cy="290" rx="175" ry="55" fill="url(#gearShadow)" opacity="0.35" />
  </svg>
);

// --- Main App Component ---

const App = () => {
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [isMobile, setIsMobile] = useState(false); // Mobile state check
  const [closedWindowsHistory, setClosedWindowsHistory] = useState<WindowState[]>([]); // For undo/redo
  const [redoStack, setRedoStack] = useState<WindowState[]>([]); // For redo
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bouncingApp, setBouncingApp] = useState<string | null>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; initialLeft: number; initialTop: number } | null>(null);

  useEffect(() => {
    // Apply theme class to body for global styling
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [theme]);

  useEffect(() => {
    // Check screen size on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common tablet/mobile breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Icon component with error handling
  const IconWithFallback = ({ app, size }: { app: AppIcon; size: number }) => {
    const [imageError, setImageError] = useState(false);

    if (app.iconSrc && !imageError) {
      return (
        <img
          src={app.iconSrc}
          alt={app.name}
          className="object-contain drop-shadow-md"
          style={{
            width: size,
            height: size,
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block',
            flexShrink: 0,
            objectFit: 'contain'
          }}
          loading="eager"
          draggable={false}
          onError={() => {
            setImageError(true);
          }}
          onLoad={() => {
            console.log(`Icon loaded: ${app.iconSrc}`);
          }}
        />
      );
    }
    return <>{app.icon}</>;
  };

  // Helper function to render app icon (image or fallback React icon)
  const renderAppIcon = (app: AppIcon, size: number = 28) => {
    return <IconWithFallback app={app} size={size} />;
  };

  const appIcons: AppIcon[] = [
    {
      id: 'finder',
      name: 'Finder',
      icon: <User size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/finder.png',
      color: 'bg-transparent'
    },
    {
      id: 'safari',
      name: 'Safari',
      icon: <Globe size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/safari.png',
      color: 'bg-transparent'
    },
    {
      id: 'vscode',
      name: 'Code',
      icon: <Code size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/vscode.png',
      color: 'bg-transparent'
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: <Terminal size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/terminal.png',
      color: 'bg-transparent'
    },
    {
      id: 'camera',
      name: 'Camera',
      icon: <Aperture size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/photobooth.png',
      color: 'bg-transparent'
    },
    {
      id: 'arcade',
      name: 'Arcade',
      icon: <Gamepad2 size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/game-center.png',
      color: 'bg-transparent'
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: <MailIcon size={28} />,
      iconSrc: '/icons/mail.png',
      color: 'bg-transparent'
    },
    {
      id: 'settings',
      name: 'System Preferences',
      icon: <SettingsIcon size={28} />,
      iconSrc: '/icons/system-preferences.png',
      color: 'bg-transparent'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      icon: <Music size={28} className="text-white drop-shadow-md" />,
      iconSrc: '/icons/spotify.png',
      color: 'bg-transparent'
    },
  ];

  const [windows, setWindows] = useState<WindowState[]>([]);

  // Initialize first window after appIcons is defined
  useEffect(() => {
    const finderApp = appIcons.find(a => a.id === 'finder');
    if (finderApp && windows.length === 0) {
      setWindows([{
        id: 'finder',
        title: 'Ashish Kumar Nanda',
        icon: renderAppIcon(finderApp, 18),
        component: <AboutContent />,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 1,
        position: { x: 50, y: 50 },
        size: { width: 800, height: 600 }
      }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optimized Drag Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      e.preventDefault();
      const { id, startX, startY, initialLeft, initialTop } = dragRef.current;
      setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x: initialLeft + (e.clientX - startX), y: Math.max(32, initialTop + (e.clientY - startY)) } } : w));
    };
    const handleMouseUp = () => {
      dragRef.current = null;
      setDraggedWindow(null);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); };
  }, []);

  const openApp = (appId: string) => {
    const existingWindow = windows.find(w => w.id === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 } : w));
        setActiveWindow(appId);
        setZIndexCounter(prev => prev + 1);
      } else if (activeWindow === appId) {
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: true } : w));
        setActiveWindow(null);
      } else {
        setActiveWindow(appId);
        setZIndexCounter(prev => prev + 1);
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, zIndex: zIndexCounter + 1 } : w));
      }
    } else {
      setBouncingApp(appId);
      setTimeout(() => setBouncingApp(null), 1200);

      const appData = appIcons.find(a => a.id === appId);
      let content, title = appData?.name || 'App', size = { width: 800, height: 600 };
      switch (appId) {
        case 'finder': content = <AboutContent />; title = 'Ashish Kumar Nanda'; break;
        case 'safari': content = <BrowserContent />; title = 'Safari'; size = { width: 950, height: 680 }; break;
        case 'mail': content = <MailContent />; title = 'Mail'; size = { width: 980, height: 640 }; break;
        case 'vscode': content = <SkillsExperienceContent />; title = 'VS Code'; break;
        case 'terminal': content = <TerminalContent />; title = 'Terminal'; size = { width: 600, height: 400 }; break;
        case 'camera': content = <PhotoBooth />; title = 'Photo Booth'; size = { width: 500, height: 600 }; break;
        case 'arcade': content = <SnakeGame />; title = 'Arcade'; size = { width: 440, height: 520 }; break;
        case 'settings': content = <SystemPreferencesContent />; title = 'System Preferences'; size = { width: 700, height: 450 }; break;
        case 'spotify': content = <SpotifyContent />; title = 'Spotify'; size = { width: 1000, height: 750 }; break;
        default: content = <div>Content not found</div>;
      }
      setWindows(prev => [...prev, { id: appId, title, icon: appData ? renderAppIcon(appData, 18) : undefined, component: content, isOpen: true, isMinimized: false, isMaximized: false, zIndex: zIndexCounter + 1, position: { x: 80 + (windows.length * 30), y: 80 + (windows.length * 30) }, size }]);
      setZIndexCounter(prev => prev + 1);
      setActiveWindow(appId);
    }
  };

  const closeWindow = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const windowToClose = windows.find(w => w.id === id);
    if (windowToClose) {
      // Add to closed windows history for undo
      setClosedWindowsHistory(prev => [windowToClose, ...prev]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
    }
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };
  const minimizeWindow = (id: string, e?: React.MouseEvent) => { e?.stopPropagation(); setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w)); setActiveWindow(null); };
  const maximizeWindow = (id: string, e?: React.MouseEvent) => { e?.stopPropagation(); setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)); };
  const focusWindow = (id: string) => { if (activeWindow !== id) { setZIndexCounter(prev => prev + 1); setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zIndexCounter + 1 } : w)); setActiveWindow(id); } };
  const startDrag = (e: React.MouseEvent, id: string) => { if (isMobile || windows.find(w => w.id === id)?.isMaximized) return; focusWindow(id); setDraggedWindow(id); const wObj = windows.find(w => w.id === id); if (wObj) dragRef.current = { id, startX: e.clientX, startY: e.clientY, initialLeft: wObj.position.x, initialTop: wObj.position.y }; };

  const getDockIconPos = (appId: string) => {
    const index = appIcons.findIndex(a => a.id === appId);
    if (index === -1) return '50%';
    const total = appIcons.length;
    return `calc(50vw + ${(index - (total - 1) / 2) * 76}px)`;
  };

  // Menu action handlers
  const handleNewWindow = () => {
    openApp('finder');
  };

  const handleCloseAllWindows = () => {
    // Save all windows to history for undo
    setClosedWindowsHistory(prev => [...windows, ...prev]);
    setRedoStack([]);
    setWindows([]);
    setActiveWindow(null);
  };

  const handleUndo = () => {
    if (closedWindowsHistory.length > 0) {
      const windowToRestore = closedWindowsHistory[0];
      // Remove from history
      setClosedWindowsHistory(prev => prev.slice(1));
      // Add to redo stack
      setRedoStack(prev => [windowToRestore, ...prev]);
      // Restore the window with updated z-index
      setZIndexCounter(prev => prev + 1);
      const restoredWindow = { ...windowToRestore, zIndex: zIndexCounter + 1 };
      setWindows(prev => [...prev, restoredWindow]);
      setActiveWindow(windowToRestore.id);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const windowToClose = redoStack[0];
      // Remove from redo stack
      setRedoStack(prev => prev.slice(1));
      // Add back to closed history
      setClosedWindowsHistory(prev => [windowToClose, ...prev]);
      // Close the window
      setWindows(prev => prev.filter(w => w.id !== windowToClose.id));
      if (activeWindow === windowToClose.id) setActiveWindow(null);
    }
  };

  const handleEnterFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    }
  };

  const handleActualSize = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  // Mobile blocker removed.
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className="h-screen w-screen overflow-hidden font-sans select-none relative bg-[var(--bg-color)] text-[var(--text-color)] app-root"
        onClick={() => {
          setActiveWindow(null);
          setActiveMenu(null);
        }}
      >
        {isFullscreen && (
          <div className="absolute top-10 right-6 z-50 bg-black/70 text-white px-3 py-1 rounded text-xs">
            Fullscreen mode
          </div>
        )}

        {/* Interactive Background */}
        <InteractiveBackground theme={theme} />


        {/* Top Menu Bar */}
        <TopBar
          title={activeWindow ? windows.find(w => w.id === activeWindow)?.title || '' : 'Finder'}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          onOpenSystemPreferences={() => openApp('settings')}
          onNewWindow={handleNewWindow}
          onCloseAllWindows={handleCloseAllWindows}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onEnterFullScreen={handleEnterFullScreen}
          onActualSize={handleActualSize}
        />

        {/* Desktop Area */}
        <div className="relative w-full h-full pt-8 pb-24 z-10 pointer-events-none">

          {/* Desktop Icons */}
          <div className="absolute right-4 top-12 flex flex-col items-end gap-6 p-2 z-0 pointer-events-auto">
            <div className="group flex flex-col items-center cursor-pointer w-20" onDoubleClick={() => openApp('safari')}>
              <div className="w-16 h-16 rounded-xl shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                {(() => {
                  const safariApp = appIcons.find(a => a.id === 'safari');
                  return safariApp ? renderAppIcon(safariApp, 56) : <Globe className="text-white/90 w-6 h-6" />;
                })()}
              </div>
              <span className="text-white text-xs mt-1 font-medium bg-black/20 px-2 py-0.5 rounded-md shadow-sm backdrop-blur-sm">Projects</span>
            </div>
            <div className="group flex flex-col items-center cursor-pointer w-20" onDoubleClick={() => window.open("https://drive.google.com/file/d/15WXrrq561L2D8in8baT1LVJNn3sdP-m6/view?usp=sharing", "_blank")}>
              <div className="w-16 h-16 rounded-xl shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                {(() => {
                  const vscodeApp = appIcons.find(a => a.id === 'vscode');
                  return vscodeApp ? renderAppIcon(vscodeApp, 56) : <Code className="text-white/90 w-6 h-6" />;
                })()}
              </div>
              <span className="text-white text-xs mt-1 font-medium bg-black/20 px-2 py-0.5 rounded-md shadow-sm backdrop-blur-sm">Resume</span>
            </div>
          </div>

          {/* Windows */}
          <AnimatePresence>
            {windows.map((win) => {
              const isDragging = draggedWindow === win.id;

              // We don't render minimized windows via AnimatePresence to keep them technically "open" in the DOM for state preservation, 
              // but we'll handle their visual scale down to the dock via the inline style transform

              return (
                <motion.div
                  key={win.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: win.isMinimized ? 0 : 1,
                    scale: win.isMinimized ? 0.2 : 1,
                    y: win.isMinimized ? window.innerHeight : 0
                  }}
                  exit={{ opacity: 0, scale: 0.2, y: window.innerHeight / 2 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 0.8
                  }}
                  className={`absolute flex flex-col rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/10 backdrop-blur-xl bg-white/95 dark:bg-[var(--bg-elevated)]/95 ${isDragging ? '' : 'transition-[top,left,width,height] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]'}`}
                  style={{
                    width: (win.isMaximized || isMobile) ? '100vw' : win.size.width,
                    height: (win.isMaximized || isMobile) ? (isMobile ? 'calc(100vh - 110px)' : 'calc(100vh - 32px)') : win.size.height,
                    transformOrigin: `${getDockIconPos(win.id)} bottom`,
                    top: (win.isMaximized || isMobile) ? 32 : win.position.y,
                    left: (win.isMaximized || isMobile) ? 0 : win.position.x,
                    zIndex: win.zIndex,
                    pointerEvents: win.isMinimized ? 'none' : 'auto'
                  }}
                  onMouseDown={() => focusWindow(win.id)}
                >
                  <div className="h-10 bg-white/40 dark:bg-black/40 border-b border-black/5 dark:border-white/5 flex items-center px-4 justify-between select-none backdrop-blur-md" onMouseDown={(e) => startDrag(e, win.id)} onDoubleClick={(e) => maximizeWindow(win.id, e)}>
                    <div className="flex space-x-2.5 group">
                      <button onClick={(e) => closeWindow(win.id, e)} className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:bg-[#ff5f57]/80 flex items-center justify-center transition-colors"><X size={8} className="text-red-900 opacity-0 group-hover:opacity-100" /></button>
                      <button onClick={(e) => minimizeWindow(win.id, e)} className="w-3.5 h-3.5 rounded-full bg-[#febc2e] border border-[#d89e24] hover:bg-[#febc2e]/80 flex items-center justify-center transition-colors"><Minus size={10} className="text-yellow-900 opacity-0 group-hover:opacity-100" /></button>
                      <button onClick={(e) => maximizeWindow(win.id, e)} className="w-3.5 h-3.5 rounded-full bg-[#28c840] border border-[#1aab29] hover:bg-[#28c840]/80 flex items-center justify-center transition-colors">{win.isMaximized ? <Minimize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" /> : <Maximize2 size={8} className="text-green-900 opacity-0 group-hover:opacity-100" />}</button>
                    </div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">{win.icon && <span className="text-gray-400">{win.icon}</span>} {win.title}</div>
                    <div className="w-14"></div>
                  </div>
                  <div className="flex-1 overflow-hidden relative bg-transparent">{win.component}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Dock */}
        <div className="fixed bottom-4 left-0 w-full flex justify-center z-[10000]">
          <div className="flex items-end space-x-3 px-4 pb-3 pt-3 bg-white/10 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-300">
            {appIcons.map((app) => {
              const isOpen = windows.some(w => w.id === app.id && !w.isMinimized);
              const isRunning = windows.some(w => w.id === app.id);
              return (
                <div key={app.id} className="group relative flex flex-col items-center">
                  <div className="absolute -top-14 bg-gray-800/90 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-lg pointer-events-none mb-2 z-50">{app.name}</div>
                  <motion.button
                    onClick={() => openApp(app.id)}
                    whileHover={{ scale: 1.2, y: -10 }}
                    whileTap={{ scale: 0.9 }}
                    animate={bouncingApp === app.id ? { y: [0, -30, 0, -15, 0, -5, 0] } : { y: 0 }}
                    transition={bouncingApp === app.id ? { duration: 1, times: [0, 0.25, 0.5, 0.7, 0.85, 0.95, 1], ease: "easeOut" } : {}}
                    className={`${app.color} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg transition-shadow duration-200 ease-out ring-1 ring-white/20 dark:ring-white/10 overflow-hidden relative ${isOpen ? 'after:content-[""] after:absolute after:inset-0 after:bg-white/10' : ''}`}
                  >
                    {renderAppIcon(app, 50)}
                  </motion.button>
                  <div className={`w-1 h-1 rounded-full bg-black dark:bg-white mt-2 transition-all duration-300 ${isRunning ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;