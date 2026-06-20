import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Github, Linkedin, Mail, Twitter, Instagram, Download,
  Menu, X, ChevronDown, Terminal, Code2, Database, Cloud,
  Layers, ArrowUpRight, Server,
  FileText, Globe
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// SOUND ENGINE  (Web Audio API — unlocked on first click)
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

// Pentatonic scale for musical name hover
const PENTA = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3, 659.3, 783.9, 880.0];

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
    name: 'InvoSync',
    desc: 'AI-powered B2B SaaS automating invoice-to-receipt matching with 98%+ accuracy via OCR and fuzzy-matching reconciliation.',
    tech: ['React.js', 'Flask', 'Python', 'Tesseract OCR', 'RapidFuzz', 'Pandas'],
    github: 'https://github.com/ashishnanda19/InvoSync',
    color: '#34d399',
    icon: FileText,
  },
  {
    num: '03',
    name: 'SafeTrail',
    desc: 'Cross-platform SOS platform with real-time location tracking, ML-based threat analysis, and instant emergency response for personal safety.',
    tech: ['Node.js', 'Socket.IO', 'PostgreSQL', 'PostGIS', 'Redis', 'BullMQ'],
    github: 'https://github.com/ashishnanda19/Safe_Trail',
    color: '#a78bfa',
    icon: Globe,
  },
  {
    num: '04',
    name: 'HyperRAG-X',
    desc: 'Enterprise-grade hybrid RAG platform with multi-agent orchestration and a tripartite storage architecture, Vector (Qdrant), Graph (NetworkX), and Memory cache, powered by Groq + LLaMA for near-instant verifiable knowledge synthesis.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Qdrant', 'NetworkX', 'Groq', 'Supabase', 'React', 'Playwright'],
    github: 'https://github.com/ashishnanda19/HyperRAG-X',
    color: '#f59e0b',
    icon: Server,
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
  const [pos, setPos]       = useState({ x: -200, y: -200 });
  const [big, setBig]       = useState(false);
  const [clicked, setClicked] = useState(false);
  const touch = useRef(false);

  useEffect(() => {
    touch.current = window.matchMedia('(pointer: coarse)').matches;
    if (touch.current) return;
    const mv  = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => setBig(!!(e.target as HTMLElement).closest('a,button,[data-cursor]'));
    const dn  = () => { setClicked(true); sfx.click(); };
    const up  = () => setClicked(false);
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
// MUSICAL NAME  — each letter plays a pentatonic note on hover
// ─────────────────────────────────────────────────────────────
const MusicalName = ({ name }: { name: string }) => {
  const [lit, setLit] = useState<number | null>(null);
  return (
    <span className="select-none">
      {name.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: ch === ' ' ? 'inline' : 'inline-block', cursor: 'default' }}
          onHoverStart={() => { if (ch !== ' ') { setLit(i); sfx.note(PENTA[i % PENTA.length]); } }}
          onHoverEnd={() => setLit(null)}
          animate={{ color: lit === i ? '#4ade80' : '#ffffff', y: lit === i ? -6 : 0 }}
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
  const [idx, setIdx]   = useState(0);
  const [text, setText] = useState('');
  const [del, setDel]   = useState(false);
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
    <span className="font-mono text-[#4ade80]">
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-[#4ade80] ml-[2px] align-middle animate-pulse" />
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// PARTICLE CANVAS BACKGROUND
// ─────────────────────────────────────────────────────────────
const Particles = () => {
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
      pts.forEach((a, i) => {
        pts.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(74,222,128,${0.07 * (1 - d / 130)})`;
            ctx.lineWidth = .8;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        });
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(74,222,128,0.18)';
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, []);
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
            className="px-4 py-1.5 border border-white/10 rounded-full text-sm text-white/60 hover:text-white hover:border-[#4ade80]/40 hover:bg-[#4ade80]/5 transition-all cursor-default select-none"
          >
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// (TiltCard removed — editorial layout no longer uses 3D tilt)

// ─────────────────────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────────────────────
const SECTION_ORDER = ['about', 'experience', 'education', 'skills', 'projects', 'awards', 'contact'];

const Section = ({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) => {
  const idx = id ? SECTION_ORDER.indexOf(id) : -1;
  const glowRight = idx % 2 === 0;
  return (
    <section id={id} className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}>
      {/* Per-section green glow */}
      <div
        className="absolute pointer-events-none rounded-full blur-[180px]"
        style={{
          width: '700px', height: '700px',
          top: '50%', transform: 'translateY(-50%)',
          [glowRight ? 'right' : 'left']: '-200px',
          background: 'radial-gradient(circle, rgba(74,222,128,0.07), transparent 70%)',
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </section>
  );
};


// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────
const Navbar = () => {
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
        className={`fixed top-0 inset-x-0 z-50 h-14 flex items-center transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); sfx.click(); }}
            className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-[#4ade80] flex items-center justify-center font-black text-black text-sm shadow-[0_0_16px_rgba(74,222,128,0.5)] group-hover:shadow-[0_0_24px_rgba(74,222,128,0.7)] transition-shadow">AN</span>
            <span className="hidden sm:block text-white font-semibold text-sm tracking-wide">Ashish Nanda</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map(l => (
              <button key={l} onClick={() => go(l)} onMouseEnter={sfx.hover}
                className="px-3.5 py-1.5 text-sm text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05] font-mono tracking-wide">
                {l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href="https://drive.google.com/file/d/1Yp1aWurR-TzRDN0AdTkzjhdf7ag_iWXL/view?usp=sharing" target="_blank" rel="noreferrer"
               onMouseEnter={sfx.hover} onClick={sfx.click}
               className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-[#4ade80] hover:bg-[#86efac] text-black text-sm font-bold rounded-lg transition-colors shadow-[0_0_16px_rgba(74,222,128,0.35)]">
              <Download size={13} /> Resume
            </a>
            <button onClick={() => setOpen(true)} onMouseEnter={sfx.hover}
              className="md:hidden p-2 text-white/60 hover:text-white"><Menu size={20} /></button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/97 backdrop-blur-xl flex flex-col">
            <div className="flex justify-between items-center px-6 h-14">
              <span className="w-8 h-8 rounded-lg bg-[#4ade80] flex items-center justify-center font-black text-black text-sm">AN</span>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white"><X size={22} /></button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV.map((l, i) => (
                <motion.button key={l} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }} onClick={() => go(l)}
                  className="text-3xl font-bold text-white/60 hover:text-white transition-colors font-mono">
                  <span className="text-[#4ade80] text-lg mr-3 font-mono">0{i + 1}.</span>{l}
                </motion.button>
              ))}
              <a href="https://drive.google.com/file/d/1Yp1aWurR-TzRDN0AdTkzjhdf7ag_iWXL/view?usp=sharing"
                 target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-2 px-6 py-3 bg-[#4ade80] text-black font-bold rounded-xl">
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
  const yText    = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opText   = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particle bg */}
      <div className="absolute inset-0 z-0"><Particles /></div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#4ade80]/4 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div style={{ y: yText, opacity: opText }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-56px)] py-20">

          {/* ── LEFT TEXT ── */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-7 order-2 lg:order-1">

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-[#4ade80] opacity-60" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-[#4ade80]" />
              </span>
              <span className="text-[#4ade80] text-xs font-mono tracking-widest uppercase">Open to opportunities</span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="text-white/40 font-mono text-sm mb-3 tracking-widest">CS @ MUJ '27 — Research Intern @ IIT(BHU)</p>
              <h1 className="text-[3.2rem] sm:text-[4.5rem] lg:text-[5.2rem] font-black leading-[0.95] tracking-tight">
                <MusicalName name="ASHISH" /><br />
                <MusicalName name="KUMAR" /><br />
                <MusicalName name="NANDA" />
              </h1>
              <p className="text-white/25 text-xs font-mono mt-2 tracking-widest">↑ hover letters to play music</p>
            </motion.div>

            <motion.div variants={fadeUp} className="text-lg sm:text-xl font-semibold text-white/80 h-8">
              <Typewriter words={['Full Stack Developer', 'Backend Engineer', 'Problem Solver', 'Research Intern @ IIT(BHU)']} />
            </motion.div>

            <motion.p variants={fadeUp} className="text-white/50 text-base leading-relaxed max-w-md">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 hover:border-white/30 text-white font-semibold text-sm rounded-xl transition-all hover:bg-white/[0.04]">
                View Work <ArrowUpRight size={14} />
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-1.5 pt-1">
              {SOCIALS.map(s => (
                <motion.a key={s.name} href={s.url} target="_blank" rel="noreferrer" title={s.name}
                  whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}
                  onHoverStart={sfx.hover}
                  className="p-2.5 text-white/30 hover:text-[#4ade80] transition-colors rounded-lg hover:bg-[#4ade80]/[0.06]">
                  <s.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT IMAGE ── */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* Rotating ring */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-10px] rounded-full border-[2px] border-dashed border-[#4ade80]/25" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-22px] rounded-full border border-purple-500/15" />

              {/* Image */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden ring-2 ring-[#4ade80]/20 shadow-[0_0_80px_rgba(74,222,128,0.12)]">
                <img src="/portimage.png" alt="Ashish Kumar Nanda" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); sfx.click(); }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em]">scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// ABOUT  — Editorial magazine layout
// ─────────────────────────────────────────────────────────────
const About = () => (
  <Section id="about">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

      {/* Section label */}
      <motion.p variants={fadeUp} className="text-[#4ade80] font-mono text-xs tracking-[0.25em] uppercase mb-16">
        01 — About
      </motion.p>

      {/* Pull-quote headline */}
      <motion.h2 variants={fadeUp}
        className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-16 max-w-5xl">
        I build systems that<br />
        <span className="text-white/20">scale, ship, and</span>{' '}
        <span className="italic text-[#4ade80]">matter.</span>
      </motion.h2>

      {/* Two-column bio */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 mb-16">
        <motion.div variants={fadeUp} className="border-l-2 border-[#4ade80]/30 pl-7">
          <p className="text-white/65 text-base leading-[1.9]">
            Final-year CSE student at <span className="text-white font-medium">Manipal University Jaipur</span>{' '}
            and Research Intern at <span className="text-white font-medium">IIT (BHU)</span>, building
            mathematical models for net-zero integration in MSMEs.
          </p>
          <p className="text-white/40 text-sm leading-[1.9] mt-5">
            My work spans distributed systems architecture, AI-powered automation, and production-grade
            backend infrastructure — shipped across three products with real users. Backend-first, comfortable
            across the entire stack. When not building: guitarist and Google Developer Groups Technical Member.
          </p>
        </motion.div>

        {/* Bare stat numbers — SWE-role specific */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-px bg-white/[0.05]">
          {[
            { val: '10+', label: 'Systems in production', color: '#4ade80' },
            { val: '5×', label: "Dean's List", color: '#a78bfa' },
            { val: 'IIT', label: 'BHU Research Intern', color: '#fb923c' },
            { val: "'27", label: 'B.Tech CSE · MUJ', color: '#38bdf8' },
          ].map(s => (
            <div key={s.label} className="bg-[#030303] p-7 flex flex-col justify-between">
              <div className="text-4xl font-black tracking-tight" style={{ color: s.color }}>{s.val}</div>
              <div className="text-white/30 text-xs font-mono uppercase tracking-widest mt-3">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Currently bar */}
      <motion.div variants={fadeUp}
        className="flex flex-wrap items-center gap-4 pt-8 border-t border-white/[0.06]">
        <span className="flex items-center gap-2 text-xs font-mono text-white/30 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80] animate-pulse" />
          Currently
        </span>
        <span className="text-sm text-white/55">Research Intern · IIT (BHU)</span>
        <span className="text-white/15">·</span>
        <span className="text-sm text-white/55">Technical Member · Google Developer Groups</span>
        <span className="text-white/15">·</span>
        <span className="text-sm text-white/55">Open to SWE roles</span>
      </motion.div>

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// EXPERIENCE  — Editorial horizontal strips
// ─────────────────────────────────────────────────────────────
const Experience = () => (
  <Section id="experience">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

      <motion.p variants={fadeUp} className="text-[#4ade80] font-mono text-xs tracking-[0.25em] uppercase mb-16">
        02 — Experience
      </motion.p>

      {/* Experience strips */}
      {EXPERIENCE.map((e, i) => (
        <motion.div key={i} variants={fadeUp}
          className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 sm:gap-12 py-10 border-t border-white/[0.06] hover:border-white/[0.12] transition-colors">
          {/* Left: period + company */}
          <div className="flex sm:flex-col justify-between sm:justify-start gap-2 sm:gap-0">
            <span className="text-white/25 text-xs font-mono tabular-nums leading-relaxed">{e.period}</span>
            <span className="text-white/50 text-sm font-mono sm:mt-2 text-right sm:text-left">{e.company}</span>
          </div>
          {/* Right: role + desc + tags */}
          <div>
            <h3 className="text-white font-black text-2xl sm:text-3xl tracking-tight mb-4
              group-hover:text-[#4ade80] transition-colors duration-300">{e.role}</h3>
            <p className="text-white/45 text-sm leading-[1.8] mb-5 max-w-xl">{e.desc}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {e.tags.map(t => (
                <span key={t} className="text-xs font-mono text-white/30 uppercase tracking-wider">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Closing border */}
      <div className="border-t border-white/[0.06]" />

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// EDUCATION  — Standalone typographic feature section
// ─────────────────────────────────────────────────────────────
const Education = () => (
  <Section id="education">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

      <motion.p variants={fadeUp} className="text-[#4ade80] font-mono text-xs tracking-[0.25em] uppercase mb-16">
        03 — Education
      </motion.p>

      {/* Year watermark + institution name */}
      <div className="relative mb-16">
        {/* Ghost year range as background element */}
        <motion.div variants={fadeIn}
          className="absolute -top-4 right-0 font-black text-[clamp(3rem,10vw,7rem)] leading-none
            tracking-tighter select-none pointer-events-none tabular-nums text-right"
          style={{ color: 'rgba(255,255,255,0.05)' }}>
          2023—2027
        </motion.div>

        <motion.h2 variants={fadeUp}
          className="relative text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.04] mb-4">
          Manipal<br />
          <span className="text-white/30">University</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/30 text-sm font-mono tracking-widest uppercase">
          Jaipur, Rajasthan · India
        </motion.p>
      </div>

      {/* Degree + metrics row */}
      <motion.div variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 sm:gap-20 items-end
          pb-10 border-b border-white/[0.08]">
        <div>
          <p className="text-white/50 text-base leading-relaxed mb-1">
            Bachelor of Technology
          </p>
          <p className="text-white font-semibold text-xl">
            Computer Science &amp; Engineering <span className="text-white/30 font-normal">(IoT)</span>
          </p>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-[#4ade80] font-black text-5xl tracking-tight">9.22</span>
          <span className="text-white/30 text-base font-mono">/ 10 CGPA</span>
        </div>
      </motion.div>

      {/* Highlights strip */}
      <motion.div variants={fadeIn}
        className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.04] mt-px">
        {[
          { label: 'Duration', val: '2023 – 2027' },
          { label: 'Distinction', val: "5× Dean's List" },
          { label: 'Community', val: 'GDG Technical' },
          { label: 'Standing', val: 'Top of class' },
        ].map(item => (
          <div key={item.label} className="bg-[#030303] px-6 py-5">
            <div className="text-white/20 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">{item.label}</div>
            <div className="text-white/70 text-sm font-medium">{item.val}</div>
          </div>
        ))}
      </motion.div>

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// SKILLS  — Typographic column layout
// ─────────────────────────────────────────────────────────────
const SkillItem = ({ skill, color, idx }: { skill: string; color: string; idx: number }) => {
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
        style={{ color: hovered ? color : 'rgba(255,255,255,0.4)' }}>{skill}</span>
    </motion.div>
  );
};

const Skills = () => (
  <Section id="skills">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>

      <motion.p variants={fadeUp} className="text-[#4ade80] font-mono text-xs tracking-[0.25em] uppercase mb-16">
        04 — Skills
      </motion.p>

      <motion.h2 variants={fadeUp}
        className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
        Tech I work with
      </motion.h2>
      <motion.p variants={fadeUp} className="text-white/25 text-xs font-mono mb-14">
        hover any skill to hear it
      </motion.p>

      {/* 5-column typographic skill grid */}
      <motion.div variants={fadeIn}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/[0.05] mb-16">
        {SKILL_GROUPS.map((g) => (
          <div key={g.cat} className="bg-[#030303] p-6">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.06]">
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

      {/* Single marquee accent row */}
      <motion.div variants={fadeIn} className="opacity-30">
        <Marquee items={[...ROW1, ...ROW2]} />
      </motion.div>

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// PROJECTS  — Editorial numbered strips
// ─────────────────────────────────────────────────────────────
const Projects = () => (
  <Section id="projects">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>

      <motion.p variants={fadeUp} className="text-[#4ade80] font-mono text-xs tracking-[0.25em] uppercase mb-16">
        05 — Projects
      </motion.p>

      {PROJECTS.map((p) => (
        <motion.div key={p.num} variants={fadeUp}
          className="group grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-6 sm:gap-12 py-12 border-t border-white/[0.06] hover:border-white/[0.14] transition-colors relative overflow-hidden">

          {/* Faded ghost number — left column on desktop, absolute on mobile */}
          <div className="hidden sm:flex items-start pt-1">
            <span className="font-black text-6xl leading-none tabular-nums select-none transition-colors duration-300"
              style={{ color: `${p.color}18` }}
              onMouseEnter={() => {}}>
              {p.num}
            </span>
          </div>

          {/* Content */}
          <div>
            {/* Mobile ghost number */}
            <span className="sm:hidden font-black text-5xl leading-none tabular-nums select-none block mb-3"
              style={{ color: `${p.color}20` }}>{p.num}</span>

            <h3 className="text-white font-black text-3xl sm:text-4xl tracking-tight leading-none mb-4
              group-hover:text-[#4ade80] transition-colors duration-300">{p.name}</h3>

            <p className="text-white/40 text-sm leading-[1.8] mb-6 max-w-2xl">{p.desc}</p>

            {/* Tech — inline monospace, no pills */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
              {p.tech.map(t => (
                <span key={t} className="text-xs font-mono text-white/25">{t}</span>
              ))}
            </div>

            {/* GitHub link — minimal text */}
            <a href={p.github} target="_blank" rel="noreferrer"
              onMouseEnter={sfx.hover} onClick={sfx.click}
              className="inline-flex items-center gap-1.5 text-sm font-mono transition-colors duration-200"
              style={{ color: `${p.color}60` }}
              onMouseOver={e => (e.currentTarget.style.color = p.color)}
              onMouseOut={e => (e.currentTarget.style.color = `${p.color}60`)}>
              <Github size={13} /> View source <ArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>
      ))}

      {/* Closing border + more link */}
      <div className="border-t border-white/[0.06] pt-8">
        <a href="https://github.com/ashishnanda19" target="_blank" rel="noreferrer"
          onMouseEnter={sfx.hover}
          className="inline-flex items-center gap-2 text-xs font-mono text-white/25 hover:text-white/60 transition-colors group">
          More work on GitHub <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// AWARDS  — Numbered editorial list
// ─────────────────────────────────────────────────────────────
const Awards = () => (
  <Section id="awards">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>

      <motion.p variants={fadeUp} className="text-[#4ade80] font-mono text-xs tracking-[0.25em] uppercase mb-16">
        06 — Awards
      </motion.p>

      <motion.h2 variants={fadeUp}
        className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-16">
        Recognition
      </motion.h2>

      {/* Award strips */}
      {AWARDS.map((a, i) => (
        <motion.div key={i} variants={fadeUp}
          onMouseEnter={sfx.hover}
          className="group grid grid-cols-[48px_1fr_auto] sm:grid-cols-[64px_1fr_auto] items-start gap-4 sm:gap-8
            py-6 border-t border-white/[0.06] hover:border-white/[0.14] transition-colors cursor-default">

          {/* Faded index */}
          <span className="font-black text-2xl sm:text-3xl tabular-nums select-none leading-none pt-0.5
            transition-colors duration-300 group-hover:text-white/20"
            style={{ color: 'rgba(255,255,255,0.06)' }}>
            {String(i + 1).padStart(2, '0')}
          </span>

          {/* Award text */}
          <span className="text-white/50 group-hover:text-white text-sm sm:text-base font-medium
            transition-colors duration-200 leading-relaxed pt-0.5">
            {a.text}
          </span>

          {/* Badge */}
          <span className="font-black text-[10px] font-mono px-2 py-1 rounded mt-0.5 flex-shrink-0"
            style={{ color: a.color, background: `${a.color}12`, border: `1px solid ${a.color}20` }}>
            {a.badge}
          </span>
        </motion.div>
      ))}

      {/* Closing border */}
      <div className="border-t border-white/[0.06]" />

      {/* Coding profiles — clean strip */}
      <motion.div variants={fadeUp} className="mt-14">
        <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
          Competitive Programming
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.05]">
          {[
            { name: 'LeetCode', url: 'https://leetcode.com/ashishnanda19', rating: '1,743', rank: 'Top 10.78%', solved: '500+ solved', color: '#fb923c' },
            { name: 'CodeChef', url: 'https://codechef.com/users/ashishnanda19', rating: '1,468', rank: '2 Star', solved: 'Max rating', color: '#38bdf8' },
            { name: 'GitHub',   url: 'https://github.com/ashishnanda19', rating: 'Open', rank: 'Source', solved: 'ashishnanda19', color: '#94a3b8' },
          ].map(cp => (
            <a key={cp.name} href={cp.url} target="_blank" rel="noreferrer" onMouseEnter={sfx.hover}
              className="group bg-[#030303] p-6 flex flex-col gap-1 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: cp.color }}>{cp.name}</span>
                <ArrowUpRight size={12} className="text-white/15 group-hover:text-white/40 transition-colors" />
              </div>
              <div className="font-black text-2xl text-white">{cp.rating}</div>
              <div className="text-white/30 text-xs font-mono">{cp.rank}</div>
              <div className="text-white/20 text-[10px] font-mono mt-1">{cp.solved}</div>
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
    {/* Gradient glow behind */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-96 h-96 bg-[#4ade80]/5 rounded-full blur-[100px]" />
    </div>
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <motion.div variants={fadeUp} className="max-w-2xl mx-auto text-center relative">
        <p className="text-[#4ade80] font-mono text-xs tracking-[0.25em] uppercase mb-4">07 — Contact</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">Let's Build<br />Something Together</h2>
        <p className="text-white/45 text-base leading-relaxed mb-10">
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
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:border-white/15 transition-all group">
              <s.icon size={16} className="text-white/40 group-hover:text-[#4ade80] transition-colors" />
              <span className="text-white/50 group-hover:text-white text-sm font-mono transition-colors">{s.name}</span>
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
  <footer className="py-8 px-6 border-t border-white/[0.05]">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="text-white/20 text-xs font-mono">
        Built by <span className="text-white/40">Ashish Kumar Nanda</span>
      </div>
      <div className="text-white/20 text-xs font-mono">© 2025</div>
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
// APP
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// CHATBOT — knowledge base
// ─────────────────────────────────────────────────────────────
const BOT_KB: [RegExp, string][] = [
  [/hi|hello|hey|sup|yo|meow/i, "Hey there! 👋 I'm AshBot, Ashish's AI assistant.\nAsk me about his projects, skills, awards, or how to reach him!"],
  [/about|who|yourself|intro|tell me/i, "Ashish is a Backend Engineer & third-year CSE student at Manipal University Jaipur, currently a Research Intern at IIT (BHU).\n\nHe ships distributed systems, AI-powered products, and production-grade infrastructure. 5× Dean's List · Open to SWE roles."],
  [/skill|tech|stack|language|framework|tool|database|cloud|devops/i, "Here's Ashish's full stack ⚡\n\n▸ Languages   C++, Python, Java, JS, SQL\n▸ Frameworks  React, Node.js, Express, Flask\n▸ Databases   MongoDB, PostgreSQL, Redis\n▸ Cloud       AWS, Docker, Jenkins, CI/CD\n▸ Tools       Git, Socket.IO, BullMQ, REST APIs"],
  [/project|built|build|made|created|shipped/i, "Ashish has shipped 5 production systems:\n\n01 Distributed Video Transcoder\n   AWS · Redis · Docker · ffmpeg\n\n02 InvoSync — AI invoice SaaS\n   98%+ OCR accuracy · Flask · React\n\n03 SafeTrail — SOS platform\n   Socket.IO · PostGIS · BullMQ\n\n04 HyperRAG-X — Enterprise RAG\n   LangGraph · Qdrant · Groq · FastAPI\n\n05 Music Mindscape — Spotify map\n   D3-Force · Gemini 2.5 · Supabase"],
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
// BOT SVG ICON — cat-ears + robot face
// ─────────────────────────────────────────────────────────────
const BotIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cat ears */}
    <path d="M8 14 L5 5 L14 11 Z" fill="currentColor" fillOpacity="0.9"/>
    <path d="M28 14 L31 5 L22 11 Z" fill="currentColor" fillOpacity="0.9"/>
    {/* Inner ear shine */}
    <path d="M8.5 13 L6.5 7 L12 11 Z" fill="currentColor" fillOpacity="0.25"/>
    <path d="M27.5 13 L29.5 7 L24 11 Z" fill="currentColor" fillOpacity="0.25"/>
    {/* Head */}
    <rect x="5" y="12" width="26" height="20" rx="5" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.4"/>
    {/* Eyes — glowing rectangles */}
    <rect x="9" y="17" width="7" height="6" rx="1.5" fill="currentColor" fillOpacity="0.2"/>
    <rect x="20" y="17" width="7" height="6" rx="1.5" fill="currentColor" fillOpacity="0.2"/>
    <rect x="10" y="18" width="5" height="4" rx="1" fill="currentColor"/>
    <rect x="21" y="18" width="5" height="4" rx="1" fill="currentColor"/>
    {/* Mouth smile */}
    <path d="M13 27 Q18 30.5 23 27" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    {/* Antenna */}
    <line x1="18" y1="12" x2="18" y2="6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="18" cy="4.5" r="2" fill="currentColor"/>
    <circle cx="18" cy="4.5" r="1" fill="currentColor" fillOpacity="0.3"/>
    {/* Side bolts */}
    <circle cx="8" cy="28" r="1.2" fill="currentColor" fillOpacity="0.35"/>
    <circle cx="28" cy="28" r="1.2" fill="currentColor" fillOpacity="0.35"/>
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
      {/* ── Toggle button ──────────────────────────────── */}
      <div className="fixed bottom-6 left-6 z-50">
        {/* Pulse ring */}
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
          {/* Inner shine */}
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

      {/* ── Chat window ────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-[92px] left-6 z-50 w-[320px] sm:w-[355px] flex flex-col rounded-2xl overflow-hidden"
            style={{
              maxHeight: '480px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(74,222,128,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
              background: '#0b0b0b',
            }}
          >
            {/* Gradient top accent line */}
            <div className="h-[2px] flex-shrink-0" style={{ background: 'linear-gradient(90deg, #4ade80, #86efac 40%, #a78bfa 70%, transparent)' }} />

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 relative"
              style={{ background: 'linear-gradient(135deg, rgba(74,222,128,0.06) 0%, transparent 60%)' }}>
              {/* Avatar with scan line */}
              <div className="relative w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(74,222,128,0.12), rgba(74,222,128,0.04))', border: '1px solid rgba(74,222,128,0.25)' }}>
                <BotIcon size={22} className="text-[#4ade80] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                {/* Scan line */}
                <motion.div
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: 'linear' }}
                  className="absolute left-0 right-0 h-[2px] pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(74,222,128,0.6), transparent)' }}
                />
                {/* Online dot */}
                <div className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#4ade80] border border-[#0b0b0b]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm tracking-tight">AshBot</span>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-md text-[#4ade80] border border-[#4ade80]/25"
                    style={{ background: 'rgba(74,222,128,0.08)' }}>AI</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#4ade80] block flex-shrink-0"
                  />
                  <span className="text-white/35 text-[10px] font-mono">Online · knows everything about Ashish</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px flex-shrink-0" style={{ background: 'linear-gradient(90deg, rgba(74,222,128,0.15), rgba(255,255,255,0.04), transparent)' }} />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 min-h-0"
              style={{ scrollbarWidth: 'none' }}>
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
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '0 12px 12px 12px',
                      padding: '8px 12px',
                      color: 'rgba(255,255,255,0.72)',
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

              {/* Typing */}
              {typing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-end">
                  <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                    <BotIcon size={13} className="text-[#4ade80]" />
                  </div>
                  <div className="px-3 py-2.5 flex gap-1.5 items-center"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0 12px 12px 12px' }}>
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

            {/* Chips */}
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

            {/* Divider */}
            <div className="h-px mx-3 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)' }} />

            {/* Input */}
            <div className="flex gap-2 px-3 py-3 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask me anything…"
                className="flex-1 text-[11px] text-white outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  color: 'white',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
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

export default function App() {
  // Unlock audio context on first interaction
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
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden cursor-none">
      {/* Fixed ambient background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Global dot grid */}
        <div className="dot-grid absolute inset-0 opacity-60" />

        {/* Aurora accent line at very top */}
        <div className="aurora-band absolute top-0 inset-x-0 h-[1.5px]" />

        {/* Green ambient orbs */}
        <div className="absolute -top-64 -right-48 w-[900px] h-[900px] bg-[#4ade80]/8 rounded-full blur-[220px]" />
        <div className="absolute top-[20%] -left-64 w-[750px] h-[750px] bg-[#22c55e]/6 rounded-full blur-[200px]" />
        <div className="absolute top-[55%] -right-32 w-[650px] h-[650px] bg-[#4ade80]/5 rounded-full blur-[180px]" />
        <div className="absolute -bottom-48 left-[15%] w-[800px] h-[800px] bg-[#16a34a]/6 rounded-full blur-[200px]" />
        {/* Faint center depth glow */}
        <div className="absolute top-[40%] left-[35%] w-[500px] h-[500px] bg-[#4ade80]/3 rounded-full blur-[160px]" />
      </div>

      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <About />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <Experience />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <Education />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <Skills />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <Projects />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <Awards />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <Contact />
      </main>

      <Footer />
      <CatBot />
      <ScrollTop />
    </div>
  );
}
