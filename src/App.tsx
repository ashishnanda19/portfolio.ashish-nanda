import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Github, Linkedin, Mail, Twitter, Instagram, Download,
  Menu, X, ChevronDown, Terminal, Code2, Database, Cloud,
  Layers, ArrowUpRight, Server, FileText, Globe, Sun, Moon,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// SOUND ENGINE
// ─────────────────────────────────────────────────────────────
let _ctx: AudioContext | null = null;
const getCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!_ctx) _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return _ctx;
};
const tone = (freq: number, gain: number, dur: number, type: OscillatorType = 'sine') => {
  try {
    const ctx = getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur);
  } catch { /* ignore */ }
};
const sfx = {
  hover:  () => tone(700,  0.035, 0.06),
  click:  () => tone(440,  0.06,  0.12, 'triangle'),
  note:   (n: number) => tone(n, 0.05, 0.18, 'sine'),
  whoosh: () => {
    const ctx = getCtx(); if (!ctx) return;
    try {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination); osc.type = 'sine';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.22);
      g.gain.setValueAtTime(0.03, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.22);
    } catch { /* ignore */ }
  },
};

const PENTA = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3, 659.3, 783.9, 880.0];

// ─────────────────────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────────────────────
const ThemeCtx = createContext(false);

const useTheme = () => {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark'; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);
  return { dark, toggle: () => setDark(d => !d) };
};

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const NAV = ['About', 'Experience', 'Education', 'Skills', 'Projects', 'Awards', 'Contact'];

const SOCIALS = [
  { name: 'GitHub',    icon: Github,    url: 'https://github.com/ashishnanda19' },
  { name: 'LinkedIn',  icon: Linkedin,  url: 'https://www.linkedin.com/in/ashishnanda19/' },
  { name: 'Twitter',   icon: Twitter,   url: 'https://x.com/ashish19n' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/ashish19nanda/' },
  { name: 'Email',     icon: Mail,      url: 'mailto:ashish.nanda1902@gmail.com' },
];

const EXPERIENCE = [
  {
    company: 'Indian Institute of Technology (BHU)',
    role: 'Research Intern',
    period: 'Dec 2025 – Present',
    desc: 'Developing a Mathematical Model for Integrating Net Zero Practices in MSMEs to support sustainable development goals.',
    tags: ['Research', 'Mathematical Modeling', 'Sustainability'],
    accent: 'green',
  },
  {
    company: 'Google Developer Groups',
    role: 'Technical Member',
    period: 'Sept 2023 – Oct 2025',
    desc: 'Organized technical workshops, hackathons, and coding sessions. Led hands-on sessions on web dev and cloud technologies.',
    tags: ['Community', 'Mentoring', 'Workshops'],
    accent: 'cyan',
  },
];

const ALL_SKILLS = [
  'C++', 'Python', 'Java', 'JavaScript', 'SQL', 'React.js', 'Node.js',
  'Express.js', 'Flask', 'TailwindCSS', 'MongoDB', 'PostgreSQL', 'Redis',
  'MySQL', 'AWS', 'Docker', 'Jenkins', 'CI/CD', 'Linux', 'Git',
  'Socket.IO', 'REST APIs', 'BullMQ', 'Postman',
];
const ROW1 = ALL_SKILLS.slice(0, 12);
const ROW2 = ALL_SKILLS.slice(12);

const SKILL_GROUPS = [
  { cat: 'Languages',      icon: Code2,    color: '#38bdf8', skills: ['C++', 'Python', 'Java', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  { cat: 'Frameworks',     icon: Layers,   color: '#a78bfa', skills: ['React.js', 'Node.js', 'Express.js', 'Flask', 'TailwindCSS'] },
  { cat: 'Databases',      icon: Database, color: '#34d399', skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'] },
  { cat: 'Cloud & DevOps', icon: Cloud,    color: '#fb923c', skills: ['AWS', 'Docker', 'Jenkins', 'CI/CD', 'Linux'] },
  { cat: 'Tools',          icon: Terminal, color: '#f472b6', skills: ['Git', 'GitHub', 'Postman', 'REST APIs', 'Socket.IO', 'BullMQ'] },
];

const PROJECTS = [
  {
    num: '01',
    name: 'Distributed Video Transcoder',
    desc: 'Infinite-scale distributed video transcoding pipeline. AWS-based queuing with Redis, multi-resolution output, and secure streaming architecture.',
    tech: ['Node.js', 'AWS', 'Redis', 'MongoDB', 'Docker', 'ffmpeg'],
    github: 'https://github.com/ashishnanda19/video-transcoder',
    color: '#38bdf8',
    icon: Server,
  },
  {
    num: '02',
    name: 'SafeTrail',
    desc: 'Cross-platform SOS platform with real-time location tracking, ML-based threat analysis, and instant emergency response for personal safety.',
    tech: ['Node.js', 'Socket.IO', 'PostgreSQL', 'PostGIS', 'Redis', 'BullMQ'],
    github: 'https://github.com/ashishnanda19/Safe_Trail',
    color: '#a78bfa',
    icon: Globe,
  },
  {
    num: '03',
    name: 'HyperRAG-X',
    desc: 'Enterprise-grade hybrid RAG platform with multi-agent orchestration and a tripartite storage architecture, Vector (Qdrant), Graph (NetworkX), and Memory cache, powered by Groq + LLaMA for near-instant verifiable knowledge synthesis.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Qdrant', 'NetworkX', 'Groq', 'Supabase', 'React', 'Playwright'],
    github: 'https://github.com/ashishnanda19/HyperRAG-X',
    color: '#f59e0b',
    icon: Server,
  },
  {
    num: '04',
    name: 'InvoSync',
    desc: 'AI-powered B2B SaaS automating invoice-to-receipt matching with 98%+ accuracy via OCR and fuzzy-matching reconciliation.',
    tech: ['React.js', 'Flask', 'Python', 'Tesseract OCR', 'RapidFuzz', 'Pandas'],
    github: 'https://github.com/ashishnanda19/InvoSync',
    color: '#34d399',
    icon: FileText,
  },
  {
    num: '05',
    name: 'Music Mindscape',
    desc: 'Spotify listening habits visualized as an interactive force-directed mind map. Tracks auto-cluster into nine musical zones by audio features, with an AI mode powered by Gemini 2.5 Flash that re-clusters using musical knowledge rather than raw numbers.',
    tech: ['React', 'TypeScript', 'D3-Force', 'Spotify OAuth', 'Gemini 2.5', 'Supabase', 'PostgreSQL', 'Vite'],
    github: 'https://github.com/ashishnanda19/music-mindscape',
    color: '#f472b6',
    icon: Globe,
  },
];

const AWARDS = [
  { text: 'Finalist – International Innovation Challenge (IIC)', badge: 'IIC', color: '#f59e0b' },
  { text: 'National Semifinalist – Flipkart GRiD 7.0', badge: 'GRID', color: '#a78bfa' },
  { text: "5× Dean's List of Excellence", badge: '5×', color: '#38bdf8' },
  { text: 'LeetCode – 500+ solved · Peak 1,743 rating (Top 10.78%)', badge: 'LC', color: '#f97316' },
  { text: 'CodeChef – 2 Star · Max rating 1468', badge: 'CC', color: '#34d399' },
];

// ─────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// ─────────────────────────────────────────────────────────────
// CUSTOM CURSOR  (desktop only)
// ─────────────────────────────────────────────────────────────
const Cursor = () => {
  const [pos, setPos]         = useState({ x: -200, y: -200 });
  const [big, setBig]         = useState(false);
  const [clicked, setClicked] = useState(false);
  const touch = useRef(false);

  useEffect(() => {
    touch.current = window.matchMedia('(pointer: coarse)').matches;
    if (touch.current) return;
    const mv   = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => setBig(!!(e.target as HTMLElement).closest('a,button,[data-cursor]'));
    const dn   = () => { setClicked(true); sfx.click(); };
    const up   = () => setClicked(false);
    window.addEventListener('mousemove', mv);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', dn);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', mv);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', dn);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <motion.div
        animate={{ x: pos.x - 18, y: pos.y - 18, scale: clicked ? 0.7 : big ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="fixed top-0 left-0 z-[9999] w-9 h-9 rounded-full border border-[#4ade80]/60 pointer-events-none mix-blend-difference"
      />
      <motion.div
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: 'spring', stiffness: 900, damping: 50 }}
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-[#4ade80] pointer-events-none"
      />
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// MUSICAL NAME
// ─────────────────────────────────────────────────────────────
const MusicalName = ({ name }: { name: string }) => {
  const dark = useContext(ThemeCtx);
  const [lit, setLit] = useState<number | null>(null);
  return (
    <span className="select-none">
      {name.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: ch === ' ' ? 'inline' : 'inline-block', cursor: 'default' }}
          onHoverStart={() => { if (ch !== ' ') { setLit(i); sfx.note(PENTA[i % PENTA.length]); } }}
          onHoverEnd={() => setLit(null)}
          animate={{ color: lit === i ? '#4ade80' : (dark ? '#ffffff' : '#0a0a0a'), y: lit === i ? -6 : 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────────────────────────
const Typewriter = ({ words }: { words: string[] }) => {
  const [idx, setIdx]       = useState(0);
  const [text, setText]     = useState('');
  const [del, setDel]       = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const cur = words[idx % words.length];
    if (paused) { const t = setTimeout(() => { setPaused(false); setDel(true); }, 2600); return () => clearTimeout(t); }
    if (!del) {
      if (text.length < cur.length) { const t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 75); return () => clearTimeout(t); }
      else setPaused(true);
    } else {
      if (text.length > 0) { const t = setTimeout(() => setText(t => t.slice(0, -1)), 35); return () => clearTimeout(t); }
      else { setDel(false); setIdx(i => i + 1); }
    }
  }, [text, del, paused, idx, words]);

  return (
    <span className="font-mono" style={{ color: 'var(--accent)' }}>
      {text}
      <span className="inline-block w-[2px] h-[1em] ml-[2px] align-middle animate-pulse" style={{ background: 'var(--accent)' }} />
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// PARTICLE CANVAS BACKGROUND
// ─────────────────────────────────────────────────────────────
const Particles = () => {
  const dark = useContext(ThemeCtx);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const lineAlpha = dark ? 0.07 : 0.05;
      const dotColor  = dark ? 'rgba(74,222,128,0.14)' : 'rgba(21,128,61,0.12)';
      pts.forEach((a, i) => {
        pts.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath();
            const alpha = lineAlpha * (1 - d / 130);
            ctx.strokeStyle = dark
              ? `rgba(74,222,128,${alpha})`
              : `rgba(21,128,61,${alpha})`;
            ctx.lineWidth = .8;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        });
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, [dark]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />;
};

// ─────────────────────────────────────────────────────────────
// MARQUEE STRIP
// ─────────────────────────────────────────────────────────────
const Marquee = ({ items, reverse }: { items: string[]; reverse?: boolean }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-2 group">
      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex gap-3 whitespace-nowrap group-hover:[animation-play-state:paused]"
      >
        {doubled.map((s, i) => (
          <span
            key={i}
            data-cursor
            onMouseEnter={() => { sfx.note(PENTA[i % PENTA.length]); }}
            className="px-4 py-1.5 rounded-full text-sm transition-all cursor-default select-none hover:border-[#4ade80]/40 hover:bg-[#4ade80]/5"
            style={{ border: '1px solid var(--border-08)', color: 'var(--text-45)' }}
          >
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────────────────────
const SECTION_ORDER = ['about', 'experience', 'education', 'skills', 'projects', 'awards', 'contact'];

const Section = ({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) => {
  const idx = id ? SECTION_ORDER.indexOf(id) : -1;
  const glowRight = idx % 2 === 0;
  return (
    <section id={id} className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}>
      <div
        className="absolute pointer-events-none rounded-full blur-[180px]"
        style={{
          width: '700px', height: '700px',
          top: '50%', transform: 'translateY(-50%)',
          [glowRight ? 'right' : 'left']: '-200px',
          background: 'radial-gradient(circle, var(--accent-glow), transparent 70%)',
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// THEME TOGGLE
// ─────────────────────────────────────────────────────────────
const ThemeToggle = ({ dark, toggle }: { dark: boolean; toggle: () => void }) => (
  <motion.button
    onClick={() => { toggle(); sfx.click(); }}
    onMouseEnter={sfx.hover}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.92 }}
    className="p-2 rounded-lg transition-colors"
    style={{ color: 'var(--text-45)', background: 'var(--sub-04)' }}
    title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {dark ? <Sun size={16} /> : <Moon size={16} />}
  </motion.button>
);

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────
const Navbar = ({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const go = (id: string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); sfx.click(); };

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className="fixed top-0 inset-x-0 z-50 h-14 flex items-center transition-all duration-300"
        style={scrolled ? {
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-07)',
        } : { background: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); sfx.click(); }}
            className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-[#4ade80] flex items-center justify-center font-black text-black text-sm shadow-[0_0_16px_rgba(74,222,128,0.5)] group-hover:shadow-[0_0_24px_rgba(74,222,128,0.7)] transition-shadow">AN</span>
            <span className="hidden sm:block font-semibold text-sm tracking-wide" style={{ color: 'var(--text)' }}>Ashish Nanda</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map(l => (
              <button key={l} onClick={() => go(l)} onMouseEnter={sfx.hover}
                className="px-3.5 py-1.5 text-sm transition-colors rounded-lg font-mono tracking-wide hover:bg-[#4ade80]/[0.07]"
                style={{ color: 'var(--text-45)' }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-45)'; }}>
                {l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle dark={dark} toggle={toggleTheme} />
            <a href="https://drive.google.com/file/d/1Yp1aWurR-TzRDN0AdTkzjhdf7ag_iWXL/view?usp=sharing"
               target="_blank" rel="noreferrer"
               onMouseEnter={sfx.hover} onClick={sfx.click}
               className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-[#4ade80] hover:bg-[#86efac] text-black text-sm font-bold rounded-lg transition-colors shadow-[0_0_16px_rgba(74,222,128,0.35)]">
              <Download size={13} /> Resume
            </a>
            <button onClick={() => setOpen(true)} onMouseEnter={sfx.hover}
              className="md:hidden p-2 transition-colors"
              style={{ color: 'var(--text-55)' }}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] backdrop-blur-xl flex flex-col"
            style={{ background: 'var(--mobile-menu)' }}>
            <div className="flex justify-between items-center px-6 h-14">
              <span className="w-8 h-8 rounded-lg bg-[#4ade80] flex items-center justify-center font-black text-black text-sm">AN</span>
              <div className="flex items-center gap-2">
                <ThemeToggle dark={dark} toggle={toggleTheme} />
                <button onClick={() => setOpen(false)} style={{ color: 'var(--text-55)' }}><X size={22} /></button>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV.map((l, i) => (
                <motion.button key={l} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }} onClick={() => go(l)}
                  className="text-3xl font-bold transition-colors font-mono"
                  style={{ color: 'var(--text-55)' }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-55)'; }}>
                  <span className="text-lg mr-3 font-mono" style={{ color: 'var(--accent)' }}>0{i + 1}.</span>{l}
                </motion.button>
              ))}
              <a href="https://drive.google.com/file/d/1Yp1aWurR-TzRDN0AdTkzjhdf7ag_iWXL/view?usp=sharing"
                 target="_blank" rel="noreferrer"
                 className="mt-4 flex items-center gap-2 px-6 py-3 bg-[#4ade80] text-black font-bold rounded-xl">
                <Download size={16} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText  = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0"><Particles /></div>
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none bg-[#4ade80]/4" />
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: `linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)`, backgroundSize: '48px 48px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div style={{ y: yText, opacity: opText }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-56px)] py-20">

          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-7 order-2 lg:order-1">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-[#4ade80] opacity-60" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-[#4ade80]" />
              </span>
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--accent)' }}>Open to opportunities</span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="font-mono text-sm mb-3 tracking-widest" style={{ color: 'var(--text-40)' }}>CS @ MUJ '27 — Research Intern @ IIT(BHU)</p>
              <h1 className="text-[3.2rem] sm:text-[4.5rem] lg:text-[5.2rem] font-black leading-[0.95] tracking-tight">
                <MusicalName name="ASHISH" /><br />
                <MusicalName name="KUMAR" /><br />
                <MusicalName name="NANDA" />
              </h1>
              <p className="text-xs font-mono mt-2 tracking-widest" style={{ color: 'var(--text-25)' }}>↑ hover letters to play music</p>
            </motion.div>

            <motion.div variants={fadeUp} className="text-lg sm:text-xl font-semibold h-8" style={{ color: 'var(--text-65)' }}>
              <Typewriter words={['Full Stack Developer', 'Backend Engineer', 'Problem Solver', 'Research Intern @ IIT(BHU)']} />
            </motion.div>

            <motion.p variants={fadeUp} className="text-base leading-relaxed max-w-md" style={{ color: 'var(--text-55)' }}>
              Building scalable systems, shipping fast, and writing code that doesn't wake you up at 3 AM.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
              <a href="https://drive.google.com/file/d/1Yp1aWurR-TzRDN0AdTkzjhdf7ag_iWXL/view?usp=sharing"
                 target="_blank" rel="noreferrer" onMouseEnter={sfx.hover} onClick={sfx.click}
                 className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#4ade80] hover:bg-[#86efac] text-black font-bold text-sm rounded-xl transition-all shadow-[0_0_24px_rgba(74,222,128,0.35)] hover:shadow-[0_0_40px_rgba(74,222,128,0.5)]">
                <Download size={14} /> Download Resume
              </a>
              <button onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); sfx.click(); }}
                onMouseEnter={sfx.hover}
                className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-xl transition-all"
                style={{ border: '1px solid var(--border-15)', color: 'var(--text)' }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = 'var(--sub-04)'; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                View Work <ArrowUpRight size={14} />
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-1.5 pt-1">
              {SOCIALS.map(s => (
                <motion.a key={s.name} href={s.url} target="_blank" rel="noreferrer" title={s.name}
                  whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}
                  onHoverStart={sfx.hover}
                  className="p-2.5 transition-colors rounded-lg hover:bg-[#4ade80]/[0.06] hover:text-[#4ade80]"
                  style={{ color: 'var(--text-30)' }}>
                  <s.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-10px] rounded-full border-[2px] border-dashed border-[#4ade80]/25" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-22px] rounded-full border border-purple-500/15" />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden ring-2 ring-[#4ade80]/20 shadow-[0_0_80px_rgba(74,222,128,0.12)]">
                <img src="/portimage.png" alt="Ashish Kumar Nanda" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); sfx.click(); }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors hover:opacity-60"
        style={{ color: 'var(--text-25)' }}>
        <span className="text-[9px] font-mono uppercase tracking-[0.25em]">scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────
const About = () => (
  <Section id="about">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

      <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] uppercase mb-16" style={{ color: 'var(--accent)' }}>
        01 — About
      </motion.p>

      <motion.h2 variants={fadeUp}
        className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-16 max-w-5xl"
        style={{ color: 'var(--text)' }}>
        I build systems that<br />
        <span style={{ color: 'var(--text-20)' }}>scale, ship, and</span>{' '}
        <span className="italic" style={{ color: 'var(--accent)' }}>matter.</span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 mb-16">
        <motion.div variants={fadeUp} className="border-l-2 border-[#4ade80]/30 pl-7">
          <p className="text-base leading-[1.9]" style={{ color: 'var(--text-65)' }}>
            Final-year CSE student at <span className="font-medium" style={{ color: 'var(--text)' }}>Manipal University Jaipur</span>{' '}
            and Research Intern at <span className="font-medium" style={{ color: 'var(--text)' }}>IIT (BHU)</span>, building
            mathematical models for net-zero integration in MSMEs.
          </p>
          <p className="text-sm leading-[1.9] mt-5" style={{ color: 'var(--text-40)' }}>
            My work spans distributed systems architecture, AI-powered automation, and production-grade
            backend infrastructure — shipped across three products with real users. Backend-first, comfortable
            across the entire stack. When not building: guitarist and Google Developer Groups Technical Member.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-px" style={{ background: 'var(--border-05)' }}>
          {[
            { val: '10+', label: 'Systems in production', color: '#4ade80' },
            { val: '5×',  label: "Dean's List",           color: '#a78bfa' },
            { val: 'IIT', label: 'BHU Research Intern',   color: '#fb923c' },
            { val: "'27", label: 'B.Tech CSE · MUJ',      color: '#38bdf8' },
          ].map(s => (
            <div key={s.label} className="p-7 flex flex-col justify-between" style={{ background: 'var(--surface)' }}>
              <div className="text-4xl font-black tracking-tight" style={{ color: s.color }}>{s.val}</div>
              <div className="text-xs font-mono uppercase tracking-widest mt-3" style={{ color: 'var(--text-30)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div variants={fadeUp}
        className="flex flex-wrap items-center gap-4 pt-8"
        style={{ borderTop: '1px solid var(--border-07)' }}>
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-30)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80] animate-pulse" />
          Currently
        </span>
        <span className="text-sm" style={{ color: 'var(--text-55)' }}>Research Intern · IIT (BHU)</span>
        <span style={{ color: 'var(--text-15)' }}>·</span>
        <span className="text-sm" style={{ color: 'var(--text-55)' }}>Technical Member · Google Developer Groups</span>
        <span style={{ color: 'var(--text-15)' }}>·</span>
        <span className="text-sm" style={{ color: 'var(--text-55)' }}>Open to SWE roles</span>
      </motion.div>

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────
const Experience = () => (
  <Section id="experience">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

      <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] uppercase mb-16" style={{ color: 'var(--accent)' }}>
        02 — Experience
      </motion.p>

      {EXPERIENCE.map((e, i) => (
        <motion.div key={i} variants={fadeUp}
          className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 sm:gap-12 py-10 transition-colors"
          style={{ borderTop: '1px solid var(--border-07)' }}>
          <div className="flex sm:flex-col justify-between sm:justify-start gap-2 sm:gap-0">
            <span className="text-xs font-mono tabular-nums leading-relaxed" style={{ color: 'var(--text-25)' }}>{e.period}</span>
            <span className="text-sm font-mono sm:mt-2 text-right sm:text-left" style={{ color: 'var(--text-50)' }}>{e.company}</span>
          </div>
          <div>
            <h3 className="font-black text-2xl sm:text-3xl tracking-tight mb-4 transition-colors duration-300 group-hover:text-[#4ade80]"
              style={{ color: 'var(--text)' }}>{e.role}</h3>
            <p className="text-sm leading-[1.8] mb-5 max-w-xl" style={{ color: 'var(--text-45)' }}>{e.desc}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {e.tags.map(t => (
                <span key={t} className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-30)' }}>{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      <div style={{ borderTop: '1px solid var(--border-07)' }} />
    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────────────
const Education = () => (
  <Section id="education">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

      <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] uppercase mb-16" style={{ color: 'var(--accent)' }}>
        03 — Education
      </motion.p>

      <div className="relative mb-16">
        <motion.div variants={fadeIn}
          className="absolute -top-4 right-0 font-black text-[clamp(3rem,10vw,7rem)] leading-none tracking-tighter select-none pointer-events-none tabular-nums text-right"
          style={{ color: 'var(--ghost)' }}>
          2023—2027
        </motion.div>

        <motion.h2 variants={fadeUp}
          className="relative text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] mb-4"
          style={{ color: 'var(--text)' }}>
          Manipal<br />
          <span style={{ color: 'var(--text-30)' }}>University</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-sm font-mono tracking-widest uppercase" style={{ color: 'var(--text-30)' }}>
          Jaipur, Rajasthan · India
        </motion.p>
      </div>

      <motion.div variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 sm:gap-20 items-end pb-10"
        style={{ borderBottom: '1px solid var(--border-08)' }}>
        <div>
          <p className="text-base leading-relaxed mb-1" style={{ color: 'var(--text-50)' }}>Bachelor of Technology</p>
          <p className="font-semibold text-xl" style={{ color: 'var(--text)' }}>
            Computer Science &amp; Engineering <span className="font-normal" style={{ color: 'var(--text-30)' }}>(IoT)</span>
          </p>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-black text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>9.22</span>
          <span className="text-base font-mono" style={{ color: 'var(--text-30)' }}>/ 10 CGPA</span>
        </div>
      </motion.div>

      <motion.div variants={fadeIn} className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-px" style={{ background: 'var(--border-05)' }}>
        {[
          { label: 'Duration',    val: '2023 – 2027' },
          { label: 'Distinction', val: "5× Dean's List" },
          { label: 'Community',   val: 'GDG Technical' },
          { label: 'Standing',    val: 'Top of class' },
        ].map(item => (
          <div key={item.label} className="px-6 py-5" style={{ background: 'var(--surface)' }}>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--text-20)' }}>{item.label}</div>
            <div className="text-sm font-medium" style={{ color: 'var(--text-65)' }}>{item.val}</div>
          </div>
        ))}
      </motion.div>

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────
const SkillItem = ({ skill, color, idx }: { skill: string; color: string; idx: number }) => {
  const dark = useContext(ThemeCtx);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="flex items-center gap-3 py-1.5 cursor-default select-none"
      onHoverStart={() => { setHovered(true); sfx.note(PENTA[idx % PENTA.length]); }}
      onHoverEnd={() => setHovered(false)}
      animate={{ x: hovered ? 8 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        style={{ originX: 0, color }}
        className="text-xs font-mono">→</motion.span>
      <span className="font-mono text-sm transition-colors duration-150"
        style={{ color: hovered ? color : (dark ? 'rgba(255,255,255,0.4)' : 'rgba(10,10,10,0.45)') }}>{skill}</span>
    </motion.div>
  );
};

const Skills = () => (
  <Section id="skills">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>

      <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] uppercase mb-16" style={{ color: 'var(--accent)' }}>
        04 — Skills
      </motion.p>

      <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight mb-2" style={{ color: 'var(--text)' }}>
        Tech I work with
      </motion.h2>
      <motion.p variants={fadeUp} className="text-xs font-mono mb-14" style={{ color: 'var(--text-25)' }}>
        hover any skill to hear it
      </motion.p>

      <motion.div variants={fadeIn}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px mb-16"
        style={{ background: 'var(--border-05)' }}>
        {SKILL_GROUPS.map((g) => (
          <div key={g.cat} className="p-6" style={{ background: 'var(--surface)' }}>
            <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: '1px solid var(--border-07)' }}>
              <g.icon size={12} style={{ color: g.color }} />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: g.color }}>{g.cat}</span>
            </div>
            <div className="space-y-0.5">
              {g.skills.map((sk, i) => (
                <SkillItem key={sk} skill={sk} color={g.color} idx={i} />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeIn} className="opacity-30">
        <Marquee items={[...ROW1, ...ROW2]} />
      </motion.div>

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────
const Projects = () => (
  <Section id="projects">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>

      <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] uppercase mb-16" style={{ color: 'var(--accent)' }}>
        05 — Projects
      </motion.p>

      {PROJECTS.map((p) => (
        <motion.div key={p.num} variants={fadeUp}
          className="group grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-6 sm:gap-12 py-12 transition-colors relative overflow-hidden"
          style={{ borderTop: '1px solid var(--border-07)' }}>

          <div className="hidden sm:flex items-start pt-1">
            <span className="font-black text-6xl leading-none tabular-nums select-none transition-colors duration-300"
              style={{ color: `${p.color}18` }}>
              {p.num}
            </span>
          </div>

          <div>
            <span className="sm:hidden font-black text-5xl leading-none tabular-nums select-none block mb-3"
              style={{ color: `${p.color}20` }}>{p.num}</span>

            <h3 className="font-black text-3xl sm:text-4xl tracking-tight leading-none mb-4 transition-colors duration-300 group-hover:text-[#4ade80]"
              style={{ color: 'var(--text)' }}>{p.name}</h3>

            <p className="text-sm leading-[1.8] mb-6 max-w-2xl" style={{ color: 'var(--text-40)' }}>{p.desc}</p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
              {p.tech.map(t => (
                <span key={t} className="text-xs font-mono" style={{ color: 'var(--text-25)' }}>{t}</span>
              ))}
            </div>

            <a href={p.github} target="_blank" rel="noreferrer"
              onMouseEnter={sfx.hover} onClick={sfx.click}
              className="inline-flex items-center gap-1.5 text-sm font-mono transition-colors duration-200"
              style={{ color: `${p.color}60` }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = p.color; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = `${p.color}60`; }}>
              <Github size={13} /> View source <ArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>
      ))}

      <div className="pt-8" style={{ borderTop: '1px solid var(--border-07)' }}>
        <a href="https://github.com/ashishnanda19" target="_blank" rel="noreferrer"
          onMouseEnter={sfx.hover}
          className="inline-flex items-center gap-2 text-xs font-mono transition-colors group hover:opacity-60"
          style={{ color: 'var(--text-25)' }}>
          More work on GitHub <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// AWARDS
// ─────────────────────────────────────────────────────────────
const Awards = () => (
  <Section id="awards">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

      <motion.p variants={fadeUp} className="font-mono text-xs tracking-[0.25em] uppercase mb-16" style={{ color: 'var(--accent)' }}>
        06 — Awards
      </motion.p>

      <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight mb-16" style={{ color: 'var(--text)' }}>
        Recognition
      </motion.h2>

      {AWARDS.map((a, i) => (
        <motion.div key={i} variants={fadeUp}
          onMouseEnter={sfx.hover}
          className="group grid grid-cols-[48px_1fr_auto] sm:grid-cols-[64px_1fr_auto] items-start gap-4 sm:gap-8 py-6 transition-colors cursor-default"
          style={{ borderTop: '1px solid var(--border-07)' }}>

          <span className="font-black text-2xl sm:text-3xl tabular-nums select-none leading-none pt-0.5 transition-colors duration-300"
            style={{ color: 'var(--text-10)' }}>
            {String(i + 1).padStart(2, '0')}
          </span>

          <span className="text-sm sm:text-base font-medium transition-colors duration-200 leading-relaxed pt-0.5"
            style={{ color: 'var(--text-50)' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-50)'; }}>
            {a.text}
          </span>

          <span className="font-black text-[10px] font-mono px-2 py-1 rounded mt-0.5 flex-shrink-0"
            style={{ color: a.color, background: `${a.color}12`, border: `1px solid ${a.color}20` }}>
            {a.badge}
          </span>
        </motion.div>
      ))}

      <div style={{ borderTop: '1px solid var(--border-07)' }} />

      <motion.div variants={fadeUp} className="mt-14">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-6" style={{ color: 'var(--text-20)' }}>
          Competitive Programming
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: 'var(--border-05)' }}>
          {[
            { name: 'LeetCode', url: 'https://leetcode.com/ashishnanda19',        rating: '1,743', rank: 'Top 10.78%', solved: '500+ solved',  color: '#fb923c' },
            { name: 'CodeChef', url: 'https://codechef.com/users/ashishnanda19', rating: '1,468', rank: '2 Star',      solved: 'Max rating',   color: '#38bdf8' },
            { name: 'GitHub',   url: 'https://github.com/ashishnanda19',          rating: 'Open',  rank: 'Source',     solved: 'ashishnanda19', color: '#94a3b8' },
          ].map(cp => (
            <a key={cp.name} href={cp.url} target="_blank" rel="noreferrer" onMouseEnter={sfx.hover}
              className="group p-6 flex flex-col gap-1 transition-colors"
              style={{ background: 'var(--surface)' }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = 'var(--sub-03)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: cp.color }}>{cp.name}</span>
                <ArrowUpRight size={12} style={{ color: 'var(--text-15)' }} />
              </div>
              <div className="font-black text-2xl" style={{ color: 'var(--text)' }}>{cp.rating}</div>
              <div className="text-xs font-mono" style={{ color: 'var(--text-30)' }}>{cp.rank}</div>
              <div className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-20)' }}>{cp.solved}</div>
            </a>
          ))}
        </div>
      </motion.div>

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────
const Contact = () => (
  <Section id="contact" className="relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-96 h-96 bg-[#4ade80]/5 rounded-full blur-[100px]" />
    </div>
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <motion.div variants={fadeUp} className="max-w-2xl mx-auto text-center relative">
        <p className="font-mono text-xs tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--accent)' }}>07 — Contact</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6" style={{ color: 'var(--text)' }}>
          Let's Build<br />Something Together
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-45)' }}>
          Looking for new roles, collaborations, or just want to talk tech? My inbox is always open.
        </p>
        <motion.a href="mailto:ashish.nanda1902@gmail.com"
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onHoverStart={sfx.hover}
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#4ade80] hover:bg-[#86efac] text-black font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_rgba(74,222,128,0.3)] hover:shadow-[0_0_60px_rgba(74,222,128,0.5)]">
          <Mail size={20} /> Say Hello
        </motion.a>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {SOCIALS.map(s => (
            <motion.a key={s.name} href={s.url} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.96 }} onHoverStart={sfx.hover}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all group"
              style={{ background: 'var(--sub-03)', border: '1px solid var(--border-08)' }}>
              <s.icon size={16} className="group-hover:text-[#4ade80] transition-colors" style={{ color: 'var(--text-40)' }} />
              <span className="text-sm font-mono transition-colors" style={{ color: 'var(--text-50)' }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-50)'; }}>
                {s.name}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// FOOTER + SCROLL TOP
// ─────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--border-05)' }}>
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="text-xs font-mono" style={{ color: 'var(--text-20)' }}>
        Built by <span style={{ color: 'var(--text-40)' }}>Ashish Kumar Nanda</span>
      </div>
      <div className="text-xs font-mono" style={{ color: 'var(--text-20)' }}>© 2025</div>
    </div>
  </footer>
);

const ScrollTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); sfx.click(); }}
          onMouseEnter={sfx.hover}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-[#4ade80] hover:bg-[#86efac] text-black rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-colors font-bold">
          <ChevronDown size={18} className="rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────────────────────
// QUOTE SPLASH
// ─────────────────────────────────────────────────────────────
const QuoteSplash = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    const onKey = () => onDone();
    window.addEventListener('keydown', onKey, { once: true });
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey); };
  }, [onDone]);

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      onClick={onDone}
      className="fixed inset-0 z-99999 flex items-center justify-center px-6 select-none"
      style={{ background: 'var(--bg)', cursor: 'pointer' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4ade80]/5 rounded-full blur-[200px]" />
      </div>
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 0.12, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-black leading-none mb-2 select-none"
          style={{ fontSize: 'clamp(5rem, 15vw, 8rem)', color: 'var(--accent)' }}>
          "
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-semibold leading-relaxed"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.75rem)', color: 'var(--text)' }}>
          If you're offered a seat on a rocket ship, don't ask what seat!
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mx-auto mt-7 mb-7 h-px w-12 origin-left"
          style={{ background: 'var(--accent)', opacity: 0.4 }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="font-mono text-sm tracking-[0.22em] uppercase"
          style={{ color: 'var(--accent)' }}>
          — Sheryl Sandberg
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-14 text-[10px] font-mono tracking-[0.25em] uppercase"
          style={{ color: 'var(--text-15)' }}>
          click anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// CHATBOT — knowledge base
// ─────────────────────────────────────────────────────────────
const BOT_KB: [RegExp, string][] = [
  [/hi|hello|hey|sup|yo|meow/i, "Hey there! 👋 I'm AshBot, Ashish's AI assistant.\nAsk me about his projects, skills, awards, or how to reach him!"],
  [/about|who|yourself|intro|tell me/i, "Ashish is a Backend Engineer & third-year CSE student at Manipal University Jaipur, currently a Research Intern at IIT (BHU).\n\nHe ships distributed systems, AI-powered products, and production-grade infrastructure. 5× Dean's List · Open to SWE roles."],
  [/skill|tech|stack|language|framework|tool|database|cloud|devops/i, "Here's Ashish's full stack ⚡\n\n▸ Languages   C++, Python, Java, JS, SQL\n▸ Frameworks  React, Node.js, Express, Flask\n▸ Databases   MongoDB, PostgreSQL, Redis\n▸ Cloud       AWS, Docker, Jenkins, CI/CD\n▸ Tools       Git, Socket.IO, BullMQ, REST APIs"],
  [/project|built|build|made|created|shipped/i, "Ashish has shipped 5 production systems:\n\n01 Distributed Video Transcoder\n   AWS · Redis · Docker · ffmpeg\n\n02 SafeTrail — SOS platform\n   Socket.IO · PostGIS · BullMQ\n\n03 HyperRAG-X — Enterprise RAG\n   LangGraph · Qdrant · Groq · FastAPI\n\n04 InvoSync — AI invoice SaaS\n   98%+ OCR accuracy · Flask · React\n\n05 Music Mindscape — Spotify map\n   D3-Force · Gemini 2.5 · Supabase"],
  [/award|achiev|honor|win|leetcode|codechef|grid|iic|dean/i, "Achievements 🏆\n\n▸ IIC Finalist (International Innovation Challenge)\n▸ Flipkart GRiD 7.0 National Semifinalist\n▸ 5× Dean's List of Excellence\n▸ LeetCode — 500+ solved · Peak 1,743 rating\n▸ CodeChef — 2 Star · Max 1468"],
  [/educ|univer|college|muj|manipal|degree|cgpa|gpa/i, "Education 📚\n\nB.Tech CSE (IoT) — Manipal University Jaipur\n2023 – 2027 · CGPA 9.22/10\n5× Dean's List · GDG Technical Member"],
  [/experi|intern|iit|bhu|gdg|google developer/i, "Experience 💼\n\n🔬 Research Intern @ IIT (BHU)\n   Dec 2025 – Present\n   Net-zero models for MSMEs\n\n👥 Technical Member @ GDG\n   Sept 2023 – Oct 2025\n   Workshops · Hackathons · Cloud"],
  [/contact|reach|email|hire|connect|linkedin|github/i, "Reach Ashish here:\n\n📧 ashish.nanda1902@gmail.com\n🐙 github.com/ashishnanda19\n💼 linkedin.com/in/ashishnanda19\n🐦 x.com/ashish19n"],
  [/help|what can|what do/i, "You can ask me about:\n\n• about     → Who is Ashish?\n• skills    → Tech stack\n• projects  → What he built\n• awards    → His wins\n• education → Academic background\n• experience → Work history\n• contact   → How to reach him"],
];
const getResponse = (q: string) => {
  for (const [re, ans] of BOT_KB) if (re.test(q)) return ans;
  return "I didn't catch that! Try asking about Ashish's projects, skills, awards, or type 'help' to see all topics. 🤖";
};

// ─────────────────────────────────────────────────────────────
// BOT ICON — Discord-bot style (rounded head, pill eyes, headphone panels)
// ─────────────────────────────────────────────────────────────
const BotIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Head — rounded rectangle, no ears */}
    <rect x="5" y="6" width="26" height="24" rx="8" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.4"/>
    {/* Left eye — tall pill */}
    <rect x="8" y="11" width="8" height="11" rx="4" fill="currentColor" fillOpacity="0.15"/>
    <rect x="9.5" y="12.5" width="5" height="8" rx="2.5" fill="currentColor"/>
    {/* Right eye — tall pill */}
    <rect x="20" y="11" width="8" height="11" rx="4" fill="currentColor" fillOpacity="0.15"/>
    <rect x="21.5" y="12.5" width="5" height="8" rx="2.5" fill="currentColor"/>
    {/* Eye glints */}
    <rect x="10.5" y="13.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.4"/>
    <rect x="22.5" y="13.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.4"/>
    {/* Smile */}
    <path d="M12 26 Q18 30 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Side panels — headphone / Discord bot style */}
    <rect x="1" y="13" width="4" height="8" rx="2" fill="currentColor" fillOpacity="0.35"/>
    <rect x="31" y="13" width="4" height="8" rx="2" fill="currentColor" fillOpacity="0.35"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// CHATBOT COMPONENT
// ─────────────────────────────────────────────────────────────
type Msg = { role: 'bot' | 'user'; text: string; id: number };
let _msgId = 0;

const CatBot = () => {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<Msg[]>([{
    role: 'bot', id: _msgId++,
    text: "Hi! I'm AshBot 🤖\nAshish's AI assistant. Ask me anything about him, or tap a chip below!",
  }]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput('');
    setMsgs(m => [...m, { role: 'user', text: q, id: _msgId++ }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role: 'bot', text: getResponse(q), id: _msgId++ }]);
    }, 650 + Math.random() * 400);
  };

  const chips = ['about', 'projects', 'skills', 'contact'];

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl bg-[#4ade80]/40 pointer-events-none"
          />
        )}
        <motion.button
          onClick={() => { setOpen(o => !o); sfx.click(); }}
          onMouseEnter={sfx.hover}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.91 }}
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_28px_rgba(74,222,128,0.5)] overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/[0.12] rounded-t-2xl pointer-events-none" />
          <AnimatePresence mode="wait">
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} className="text-black font-black text-lg relative z-10">✕</motion.span>
              : <motion.div key="bot" initial={{ rotate: 15, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -15, opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }} className="relative z-10">
                  <BotIcon size={28} className="text-black" />
                </motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-[92px] left-4 right-4 sm:left-6 sm:right-auto sm:w-[355px] z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{ maxHeight: '480px', boxShadow: 'var(--chat-shadow)', background: 'var(--chat-bg)' }}
          >
            <div className="h-[2px] flex-shrink-0" style={{ background: 'linear-gradient(90deg, #4ade80, #86efac 40%, #a78bfa 70%, transparent)' }} />

            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 relative"
              style={{ background: 'linear-gradient(135deg, var(--accent-glow) 0%, transparent 60%)' }}>
              <div className="relative w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--accent-glow), transparent)', border: '1px solid rgba(74,222,128,0.25)' }}>
                <BotIcon size={22} className="text-[#4ade80] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <motion.div
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: 'linear' }}
                  className="absolute left-0 right-0 h-[2px] pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(74,222,128,0.6), transparent)' }}
                />
                <div className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#4ade80]"
                  style={{ border: '1px solid var(--chat-bg)' }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--text)' }}>AshBot</span>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-md text-[#4ade80] border border-[#4ade80]/25"
                    style={{ background: 'rgba(74,222,128,0.08)' }}>AI</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#4ade80] block flex-shrink-0"
                  />
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-30)' }}>Online · knows everything about Ashish</span>
                </div>
              </div>
            </div>

            <div className="h-px flex-shrink-0"
              style={{ background: 'linear-gradient(90deg, var(--accent-glow), var(--border-05), transparent)' }} />

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 min-h-0" style={{ scrollbarWidth: 'none' }}>
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 items-end ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'bot' && (
                    <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mb-0.5"
                      style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                      <BotIcon size={13} className="text-[#4ade80]" />
                    </div>
                  )}
                  <div
                    className="max-w-[82%] text-[11px] leading-relaxed whitespace-pre-wrap"
                    style={m.role === 'bot' ? {
                      background: 'var(--chat-msg-bg)',
                      border: '1px solid var(--chat-msg-border)',
                      borderRadius: '0 12px 12px 12px',
                      padding: '8px 12px',
                      color: 'var(--chat-msg-color)',
                    } : {
                      background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                      borderRadius: '12px 0 12px 12px',
                      padding: '8px 12px',
                      color: '#000',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(74,222,128,0.25)',
                    }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 items-end">
                  <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                    <BotIcon size={13} className="text-[#4ade80]" />
                  </div>
                  <div className="px-3 py-2.5 flex gap-1.5 items-center"
                    style={{ background: 'var(--chat-msg-bg)', border: '1px solid var(--chat-msg-border)', borderRadius: '0 12px 12px 12px' }}>
                    {[0,1,2].map(i => (
                      <motion.span key={i}
                        animate={{ y: [0,-5,0], opacity: [0.4,1,0.4] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                        className="block w-1.5 h-1.5 rounded-full bg-[#4ade80]"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-3 pt-2 pb-1.5 flex gap-1.5 flex-wrap flex-shrink-0">
              {chips.map(c => (
                <motion.button key={c}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => send(c)}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-lg capitalize transition-all"
                  style={{ color: 'rgba(74,222,128,0.7)', border: '1px solid rgba(74,222,128,0.2)', background: 'rgba(74,222,128,0.05)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,222,128,0.12)'; (e.currentTarget as HTMLElement).style.color = '#4ade80'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,222,128,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(74,222,128,0.7)'; }}
                >{c}</motion.button>
              ))}
            </div>

            <div className="h-px mx-3 flex-shrink-0" style={{ background: 'var(--chat-divider)' }} />

            <div className="flex gap-2 px-3 py-3 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask me anything…"
                className="flex-1 text-[11px] outline-none transition-all"
                style={{
                  background: 'var(--chat-input-bg)',
                  border: '1px solid var(--chat-input-border)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  color: 'var(--chat-input-color)',
                }}
                onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,222,128,0.4)'; }}
                onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--chat-input-border)'; }}
              />
              <motion.button
                onClick={() => send()}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-black relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #4ade80, #22c55e)', boxShadow: '0 4px 12px rgba(74,222,128,0.3)' }}
              >
                <ArrowUpRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
export default function App() {
  const { dark, toggle } = useTheme();
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashDone = () => setSplashDone(true);

  useEffect(() => {
    const unlock = () => { getCtx(); };
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, []);

  return (
    <ThemeCtx.Provider value={dark}>
      <AnimatePresence>
        {!splashDone && <QuoteSplash onDone={handleSplashDone} />}
      </AnimatePresence>
      <div className="min-h-screen overflow-x-hidden cursor-none" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="dot-grid absolute inset-0 opacity-60" />
          <div className="aurora-band absolute top-0 inset-x-0 h-[1.5px]" />
          <div className="absolute -top-64 -right-48 w-[900px] h-[900px] bg-[#4ade80]/8 rounded-full blur-[220px]" />
          <div className="absolute top-[20%] -left-64 w-[750px] h-[750px] bg-[#22c55e]/6 rounded-full blur-[200px]" />
          <div className="absolute top-[55%] -right-32 w-[650px] h-[650px] bg-[#4ade80]/5 rounded-full blur-[180px]" />
          <div className="absolute -bottom-48 left-[15%] w-[800px] h-[800px] bg-[#16a34a]/6 rounded-full blur-[200px]" />
          <div className="absolute top-[40%] left-[35%] w-[500px] h-[500px] bg-[#4ade80]/3 rounded-full blur-[160px]" />
        </div>

        <Cursor />
        <Navbar dark={dark} toggleTheme={toggle} />

        <main>
          <Hero />
          <div className="h-px" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--border-07), transparent)' }} />
          <About />
          <div className="h-px" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--border-07), transparent)' }} />
          <Experience />
          <div className="h-px" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--border-07), transparent)' }} />
          <Education />
          <div className="h-px" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--border-07), transparent)' }} />
          <Skills />
          <div className="h-px" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--border-07), transparent)' }} />
          <Projects />
          <div className="h-px" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--border-07), transparent)' }} />
          <Awards />
          <div className="h-px" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--border-07), transparent)' }} />
          <Contact />
        </main>

        <Footer />
        <CatBot />
        <ScrollTop />
      </div>
    </ThemeCtx.Provider>
  );
}
