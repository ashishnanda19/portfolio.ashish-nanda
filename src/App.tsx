import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  motion, AnimatePresence, MotionConfig,
  useScroll, useTransform, useSpring, useInView,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import {
  Github, Linkedin, Mail, Twitter, Instagram, Download,
  X, ArrowUpRight, ArrowUp, Plus, Terminal, Code2, Database,
  Cloud, Layers, Server, FileText, Globe, Search, Volume2, VolumeX,
  Copy, CornerDownLeft, Music,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const ACCENT = '#c5f74f';
const INK = '#0b0b09';
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IO: [number, number, number, number] = [0.76, 0, 0.24, 1];
const REDUCED = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const TOUCH = typeof window !== 'undefined'
  && window.matchMedia('(pointer: coarse)').matches;
const SMALL = typeof window !== 'undefined' && window.innerWidth < 640;
const RESUME_URL = 'https://drive.google.com/file/d/1Sq69vpiR5Dg5fN66w-nQwEi_hUS-8lcg/view?usp=sharing';

// ─────────────────────────────────────────────────────────────
// SOUND ENGINE
// ─────────────────────────────────────────────────────────────
let _actx: AudioContext | null = null;
const getCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!_actx) {
    const Ctx = window.AudioContext
      || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctx) _actx = new Ctx();
  }
  return _actx;
};
let MUTED = typeof localStorage !== 'undefined' && localStorage.getItem('sfx') === 'off';
const setMuted = (m: boolean) => {
  MUTED = m;
  try { localStorage.setItem('sfx', m ? 'off' : 'on'); } catch { /* ignore */ }
};
const tone = (freq: number, gain: number, dur: number, type: OscillatorType = 'sine') => {
  if (MUTED) return;
  try {
    const ctx = getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur);
  } catch { /* ignore */ }
};
const sfx = {
  hover: () => tone(700, 0.03, 0.06),
  click: () => tone(440, 0.05, 0.12, 'triangle'),
  note: (n: number) => tone(n, 0.05, 0.18, 'sine'),
};
const PENTA = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3, 659.3, 783.9, 880.0];

// ─────────────────────────────────────────────────────────────
// SMOOTH SCROLL (Lenis + GSAP ScrollTrigger)
// ─────────────────────────────────────────────────────────────
let _lenis: Lenis | null = null;

const useSmoothScroll = () => {
  useEffect(() => {
    if (REDUCED) return;
    const lenis = new Lenis({ lerp: 0.09 });
    _lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      _lenis = null;
    };
  }, []);
};

const scrollToId = (id: string) => {
  const el = document.getElementById(id.toLowerCase());
  if (!el) return;
  if (_lenis) _lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

const scrollToTop = () => {
  if (_lenis) _lenis.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const NAV = ['About', 'Experience', 'Education', 'Skills', 'Projects', 'Awards', 'Contact'];

const SOCIALS = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/ashishnanda19' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/ashishnanda19/' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/ashish19n' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/ashish19nanda/' },
  { name: 'Email', icon: Mail, url: 'mailto:ashish.nanda1902@gmail.com' },
];

const EXPERIENCE = [
  {
    company: 'Indian Institute of Technology (BHU)',
    role: 'Research Intern',
    period: 'Dec 2025 — Present',
    desc: 'Developing a Mathematical Model for Integrating Net Zero Practices in MSMEs to support sustainable development goals.',
    tags: ['Research', 'Mathematical Modeling', 'Sustainability'],
  },
  {
    company: 'Google Developer Groups',
    role: 'Technical Member',
    period: 'Sept 2023 — Oct 2025',
    desc: 'Organized technical workshops, hackathons, and coding sessions. Led hands-on sessions on web dev and cloud technologies.',
    tags: ['Community', 'Mentoring', 'Workshops'],
  },
];

const SKILL_GROUPS = [
  { cat: 'Languages', icon: Code2, skills: ['C++', 'Java', 'Python', 'JavaScript', 'SQL'] },
  { cat: 'Frontend', icon: Layers, skills: ['React', 'Tailwind CSS', 'HTML'] },
  { cat: 'Backend & APIs', icon: Server, skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'] },
  { cat: 'Databases', icon: Database, skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'ChromaDB'] },
  { cat: 'AI/ML & GenAI', icon: Terminal, skills: ['LangChain', 'LangGraph', 'Hugging Face', 'NumPy', 'Pandas'] },
  { cat: 'Cloud & Tools', icon: Cloud, skills: ['AWS', 'Docker', 'Jenkins', 'CI/CD', 'Git', 'GitHub', 'Supabase'] },
];
const ALL_SKILLS = SKILL_GROUPS.flatMap(g => g.skills);

const PROJECTS = [
  {
    num: '01',
    name: 'Distributed Video Transcoder',
    desc: 'Infinite-scale distributed video transcoding pipeline. AWS-based queuing with Redis, multi-resolution output, and secure streaming architecture.',
    tech: ['Node.js', 'AWS', 'Redis', 'MongoDB', 'Docker', 'ffmpeg'],
    github: 'https://github.com/ashishnanda19/video-transcoder',
    color: '#7dd3fc',
    icon: Server,
    domain: 'Distributed Systems',
  },
  {
    num: '02',
    name: 'SafeTrail',
    desc: 'Cross-platform SOS platform with real-time location tracking, ML-based threat analysis, and instant emergency response for personal safety.',
    tech: ['Node.js', 'Socket.IO', 'PostgreSQL', 'PostGIS', 'Redis', 'BullMQ'],
    github: 'https://github.com/ashishnanda19/Safe_Trail',
    color: '#c4b5fd',
    icon: Globe,
    domain: 'Real-time Systems',
  },
  {
    num: '03',
    name: 'HyperRAG-X',
    desc: 'Enterprise-grade hybrid RAG platform with multi-agent orchestration and tripartite storage — Vector (Qdrant), Graph (NetworkX), and Memory cache — powered by Groq + LLaMA for near-instant verifiable knowledge synthesis.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'Qdrant', 'NetworkX', 'Groq', 'Supabase', 'React'],
    github: 'https://github.com/ashishnanda19/HyperRAG-X',
    color: '#fcd34d',
    icon: Server,
    domain: 'AI Infrastructure',
  },
  {
    num: '04',
    name: 'InvoSync',
    desc: 'AI-powered B2B SaaS automating invoice-to-receipt matching with 98%+ accuracy via OCR and fuzzy-matching reconciliation.',
    tech: ['React.js', 'Flask', 'Python', 'Tesseract OCR', 'RapidFuzz', 'Pandas'],
    github: 'https://github.com/ashishnanda19/InvoSync',
    color: '#6ee7b9',
    icon: FileText,
    domain: 'AI Automation',
  },
  {
    num: '05',
    name: 'Music Mindscape',
    desc: 'Spotify listening habits visualized as an interactive force-directed mind map. Tracks auto-cluster into nine musical zones, with an AI mode powered by Gemini 2.5 Flash that re-clusters using musical knowledge.',
    tech: ['React', 'TypeScript', 'D3-Force', 'Spotify OAuth', 'Gemini 2.5', 'Supabase'],
    github: 'https://github.com/ashishnanda19/music-mindscape',
    color: '#f9a8d4',
    icon: Globe,
    domain: 'Data Visualization',
  },
];

const AWARDS = [
  { text: 'Finalist — International Innovation Challenge (IIC)', badge: 'IIC' },
  { text: 'National Semifinalist — Flipkart GRiD 7.0', badge: 'GRID' },
  { text: "5× Dean's List of Excellence", badge: '5×' },
  { text: 'LeetCode — 600+ solved · Peak 1,808 rating (Top 7.71%)', badge: 'LC' },
  { text: 'CodeChef — 2 Star · Max rating 1,540', badge: 'CC' },
];

// ─────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────

/**
 * Scroll-position based in-view detection. Deliberately avoids
 * IntersectionObserver so a reveal can never be left permanently
 * hidden — position is re-checked on scroll and on a slow interval.
 */
const useRevealOnScroll = <T extends HTMLElement>(threshold = 0.96) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (!el) return false;
      if (el.getBoundingClientRect().top < window.innerHeight * threshold) {
        setInView(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const onScroll = () => { if (check()) cleanup(); };
    const iv = setInterval(() => { if (check()) cleanup(); }, 900);
    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(iv);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return cleanup;
  }, [threshold]);
  return { ref, inView };
};

/** Line-mask reveal — text slides up from an overflow-hidden clip */
const MaskText = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => {
  const { ref, inView } = useRevealOnScroll<HTMLSpanElement>();
  return (
    <span ref={ref} className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '110%' }}
        animate={{ y: inView ? '0%' : '110%' }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
};

/** Char-by-char masked reveal; each letter plays a pentatonic note on hover */
const RevealChars = ({ text, ready, baseDelay = 0, musical = true }: {
  text: string; ready: boolean; baseDelay?: number; musical?: boolean;
}) => (
  <>
    {text.split('').map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <motion.span
          className="inline-block will-change-transform"
          initial={{ y: '115%', rotate: 5 }}
          animate={ready ? { y: '0%', rotate: 0 } : { y: '115%', rotate: 5 }}
          transition={{ duration: 1, ease: EASE, delay: baseDelay + i * 0.045 }}
        >
          <motion.span
            className="inline-block"
            onHoverStart={() => { if (musical && ch !== ' ') sfx.note(PENTA[i % PENTA.length]); }}
            whileHover={{ y: -12, color: ACCENT }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </motion.span>
      </span>
    ))}
  </>
);

/** Magnetic wrapper — element gravitates toward the cursor */
const Magnetic = ({ children, strength = 0.3, className = '' }: {
  children: React.ReactNode; strength?: number; className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const move = (e: React.MouseEvent) => {
    if (TOUCH) return;
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
};

/** Animated count-up when scrolled into view */
const Counter = ({ to, decimals = 0, prefix = '', suffix = '', className = '', style }: {
  to: number; decimals?: number; prefix?: string; suffix?: string;
  className?: string; style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (REDUCED) {
      const t = setTimeout(() => setV(to), 0);
      return () => clearTimeout(t);
    }
    const t0 = performance.now();
    const dur = 1400;
    let id: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to]);
  const out = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US');
  return <span ref={ref} className={className} style={style}>{prefix}{out}{suffix}</span>;
};

/** CSS-driven infinite marquee (pauses on hover) */
const MarqueeStrip = ({ items, reverse = false, dur = 36, className = '', itemClass = '' }: {
  items: string[]; reverse?: boolean; dur?: number; className?: string; itemClass?: string;
}) => (
  <div className={`marquee ${className}`}>
    <div
      className={`marquee-track ${reverse ? 'reverse' : ''}`}
      style={{ '--dur': `${dur}s` } as React.CSSProperties}
    >
      {[0, 1].map(k => (
        <div key={k} className="flex shrink-0 items-center whitespace-nowrap">
          {items.map((it, i) => (
            <span key={i} className={`flex items-center whitespace-nowrap ${itemClass}`}>
              {it}
              <span className="mx-5 sm:mx-8 text-[0.5em]" style={{ color: ACCENT }}>✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/** Section shell */
const Section = ({ id, children, className = '' }: {
  id?: string; children: React.ReactNode; className?: string;
}) => (
  <section id={id} className={`relative py-16 sm:py-24 px-5 sm:px-8 lg:px-12 ${className}`}>
    <div className="max-w-[1400px] mx-auto">{children}</div>
  </section>
);

/** Editorial section header: (index) LABEL ——— + huge masked title */
const SectionHead = ({ index, label, title }: {
  index: string; label: string; title: string[];
}) => {
  const { ref, inView } = useRevealOnScroll<HTMLDivElement>();
  return (
    <div className="mb-8 sm:mb-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-center gap-4 mb-4 sm:mb-6"
      >
        <span className="font-mono text-xs" style={{ color: ACCENT }}>({index})</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-40)' }}>{label}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="flex-1 h-px origin-left"
          style={{ background: 'var(--border-08)' }}
        />
      </motion.div>
      <h2
        className="font-display font-semibold uppercase leading-[0.95] tracking-tight"
        style={{ fontSize: 'clamp(2.4rem, 7vw, 6.2rem)', color: 'var(--text)' }}
      >
        {title.map((l, i) => <MaskText key={i} delay={i * 0.09}>{l}</MaskText>)}
      </h2>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────────────────────
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[80] origin-left"
      style={{ scaleX, background: ACCENT }}
    />
  );
};

// ─────────────────────────────────────────────────────────────
// CUSTOM CURSOR — dot + trailing ring, grows into a label pill
// ─────────────────────────────────────────────────────────────
const Cursor = () => {
  const x = useSpring(-100, { stiffness: 350, damping: 35, mass: 0.5 });
  const y = useSpring(-100, { stiffness: 350, damping: 35, mass: 0.5 });
  const dx = useSpring(-100, { stiffness: 900, damping: 50 });
  const dy = useSpring(-100, { stiffness: 900, damping: 50 });
  const [big, setBig] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (TOUCH) return;
    const mv = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      dx.set(e.clientX); dy.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setBig(!!t.closest('a,button,[data-cursor]'));
      setLabel(t.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') ?? null);
    };
    const dn = () => { setPressed(true); sfx.click(); };
    const up = () => setPressed(false);
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
  }, [x, y, dx, dy]);

  if (TOUCH) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full"
        style={{
          x, y,
          translateX: '-50%', translateY: '-50%',
          mixBlendMode: label ? 'normal' : 'difference',
        }}
        animate={{
          width: label ? 88 : big ? 56 : 36,
          height: label ? 88 : big ? 56 : 36,
          scale: pressed ? 0.8 : 1,
          backgroundColor: label ? ACCENT : 'rgba(197,247,79,0)',
          borderColor: label ? 'rgba(197,247,79,0)' : 'rgba(197,247,79,0.7)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <span
          className="border rounded-full absolute inset-0"
          style={{ borderColor: label ? 'transparent' : 'rgba(197,247,79,0.65)' }}
        />
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-mono text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ color: INK }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{ x: dx, y: dy, translateX: '-50%', translateY: '-50%', background: ACCENT, opacity: label ? 0 : 1 }}
      />
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// PRELOADER — greeting cycle + eased counter + curtain exit
// ─────────────────────────────────────────────────────────────
const GREETINGS = ['Hello', 'नमस्ते', 'Hola', 'Bonjour', 'こんにちは', 'Ciao', 'Olá', 'Hallo'];

const Preloader = ({ onDone }: { onDone: () => void }) => {
  const [n, setN] = useState(0);
  const [g, setG] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const t0 = performance.now();
    const dur = REDUCED ? 400 : 2100;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else if (!done.current) { done.current = true; setTimeout(onDone, 300); }
    };
    raf = requestAnimationFrame(tick);
    const gi = setInterval(() => setG(i => (i + 1) % GREETINGS.length), 230);
    // hard fallback: never let a stalled rAF (backgrounded tab, etc.) trap the site on the preloader
    const failsafe = setTimeout(() => {
      if (!done.current) { done.current = true; onDone(); }
    }, dur + 1600);
    return () => { cancelAnimationFrame(raf); clearInterval(gi); clearTimeout(failsafe); };
  }, [onDone]);

  return (
    <motion.div
      key="preloader"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: EASE_IO }}
      className="fixed inset-0 z-[9998] flex items-center justify-center select-none"
      style={{ background: 'var(--surface)' }}
    >
      {/* curved lip that trails the curtain as it exits */}
      <div
        className="absolute top-full left-0 w-full h-[12vh]"
        style={{ background: 'var(--surface)', borderRadius: '0 0 50% 50% / 0 0 100% 100%' }}
      />
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={g}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15 }}
            className="font-display text-3xl sm:text-5xl font-medium"
            style={{ color: 'var(--text)' }}
          >
            {GREETINGS[g]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12 font-display font-semibold leading-none tabular-nums"
        style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', color: 'var(--text-15)' }}
      >
        {n}
      </div>
      <div className="absolute bottom-8 left-6 sm:left-12 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-30)' }}>
        Portfolio © 2026 — Ashish Nanda
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// CLOCK (IST)
// ─────────────────────────────────────────────────────────────
const Clock = ({ className = '' }: { className?: string }) => {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-US', {
      hour12: false, timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit',
    }));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`font-mono text-[11px] tracking-[0.15em] tabular-nums ${className}`} style={{ color: 'var(--text-40)' }}>
      JAIPUR, IN — {t} IST
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// NAV — minimal bar + fullscreen overlay menu
// ─────────────────────────────────────────────────────────────
const Nav = ({ onPalette, soundOn, toggleSound }: {
  onPalette: () => void; soundOn: boolean; toggleSound: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    if (open) _lenis?.stop(); else _lenis?.start();
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    sfx.click();
    setTimeout(() => scrollToId(id), 350);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="fixed top-0 inset-x-0 z-[100] transition-all duration-500"
        style={scrolled && !open ? {
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-05)',
        } : {}}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 lg:px-12 h-16 sm:h-[72px]">
          <Magnetic strength={0.25}>
            <button
              onClick={() => { window.scrollTo({ top: 0 }); _lenis?.scrollTo(0, { duration: 1.4 }); sfx.click(); }}
              onMouseEnter={sfx.hover}
              className="font-display font-semibold text-lg tracking-tight flex items-baseline gap-1"
              style={{ color: 'var(--text)' }}
            >
              ashish<span style={{ color: ACCENT }}>.</span>
              <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: 'var(--text-30)' }}>©26</span>
            </button>
          </Magnetic>

          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <Clock />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={RESUME_URL} target="_blank" rel="noreferrer"
              onMouseEnter={sfx.hover} onClick={sfx.click}
              className="hidden md:inline-flex u-line font-mono text-[11px] uppercase tracking-[0.2em] items-center gap-1.5"
              style={{ color: 'var(--text-55)' }}
            >
              <Download size={11} /> Resume
            </a>
            <button
              onClick={() => { toggleSound(); }}
              onMouseEnter={sfx.hover}
              title={soundOn ? 'Mute sounds' : 'Unmute sounds'}
              className="p-2 rounded-full border transition-colors duration-300"
              style={{ borderColor: 'var(--border-12)', color: soundOn ? ACCENT : 'var(--text-40)' }}
            >
              {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>
            <button
              onClick={() => { onPalette(); sfx.click(); }}
              onMouseEnter={sfx.hover}
              title="Command palette (⌘K)"
              className="flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-2 rounded-full border transition-colors duration-300"
              style={{ borderColor: 'var(--border-12)', color: 'var(--text-40)' }}
            >
              <Search size={12} />
              <span className="hidden sm:inline tracking-[0.1em]">⌘K</span>
            </button>
            <Magnetic strength={0.3}>
              <button
                onClick={() => { setOpen(o => !o); sfx.click(); }}
                onMouseEnter={sfx.hover}
                className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] px-4 py-2 rounded-full border transition-colors duration-300"
                style={{
                  color: open ? INK : 'var(--text)',
                  background: open ? ACCENT : 'transparent',
                  borderColor: open ? ACCENT : 'var(--border-15)',
                }}
              >
                <span className="relative w-3.5 h-2 flex flex-col justify-between">
                  <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0 }} className="block h-[1.5px] w-full" style={{ background: 'currentColor' }} />
                  <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }} className="block h-[1.5px] w-full" style={{ background: 'currentColor' }} />
                </span>
                {open ? 'Close' : 'Menu'}
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: EASE_IO }}
            className="fixed inset-0 z-[90] flex flex-col"
            style={{ background: 'var(--surface)' }}
          >
            <div className="noise absolute inset-0 opacity-[0.05] pointer-events-none" />
            <div className="flex-1 flex flex-col lg:flex-row max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-10 gap-10 overflow-y-auto">

              <nav className="flex-1 flex flex-col justify-center gap-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: 'var(--text-30)' }}>Navigation</p>
                {NAV.map((l, i) => (
                  <span key={l} className="block overflow-hidden">
                    <motion.button
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%', transition: { duration: 0.3, delay: 0 } }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                      onClick={() => go(l)}
                      onMouseEnter={sfx.hover}
                      className="group flex items-baseline gap-4 sm:gap-6 text-left"
                    >
                      <span className="font-mono text-xs sm:text-sm" style={{ color: ACCENT }}>0{i + 1}</span>
                      <span
                        className="font-display font-semibold uppercase leading-[1.05] tracking-tight transition-all duration-300 group-hover:translate-x-3"
                        style={{ fontSize: 'clamp(2.2rem, 6.5vh, 4.2rem)', color: 'var(--text)' }}
                        onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = ACCENT; }}
                        onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                      >
                        {l}
                      </span>
                    </motion.button>
                  </span>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="lg:w-80 flex flex-col justify-end gap-8 shrink-0"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--text-30)' }}>Socials</p>
                  <div className="flex flex-col gap-2">
                    {SOCIALS.map(s => (
                      <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
                        onMouseEnter={sfx.hover}
                        className="u-line self-start font-medium text-base flex items-center gap-2"
                        style={{ color: 'var(--text-55)' }}>
                        {s.name} <ArrowUpRight size={13} style={{ color: 'var(--text-25)' }} />
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--text-30)' }}>Get in touch</p>
                  <a href="mailto:ashish.nanda1902@gmail.com" onMouseEnter={sfx.hover}
                    className="u-line font-display text-lg font-medium" style={{ color: 'var(--text)' }}>
                    ashish.nanda1902@gmail.com
                  </a>
                </div>
                <Clock />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────────────────────────
const Typewriter = ({ words }: { words: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const cur = words[idx % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (paused) t = setTimeout(() => { setPaused(false); setDel(true); }, 2400);
    else if (!del) {
      if (text.length < cur.length) t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 70);
      else t = setTimeout(() => setPaused(true), 0);
    } else {
      if (text.length > 0) t = setTimeout(() => setText(s => s.slice(0, -1)), 32);
      else t = setTimeout(() => { setDel(false); setIdx(i => i + 1); }, 0);
    }
    return () => clearTimeout(t);
  }, [text, del, paused, idx, words]);

  return (
    <span className="font-mono" style={{ color: ACCENT }}>
      {text}
      <span className="inline-block w-[2px] h-[1em] ml-[3px] align-middle animate-pulse" style={{ background: ACCENT }} />
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// ROTATING BADGE — circular text, replaces the classic portrait
// ─────────────────────────────────────────────────────────────
const RotatingBadge = () => (
  <Magnetic strength={0.3}>
    <button
      onClick={() => { scrollToId('contact'); sfx.click(); }}
      onMouseEnter={sfx.hover}
      data-cursor-label="HIRE"
      className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center"
      aria-label="Open to work — go to contact"
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        animate={REDUCED ? {} : { rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path id="badge-circ" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
        </defs>
        <text
          style={{ fontSize: '9.5px', letterSpacing: '3.4px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
          fill="var(--text-55)"
        >
          <textPath href="#badge-circ" startOffset="0">OPEN TO WORK — SWE 2027 —</textPath>
        </text>
      </motion.svg>
      <span
        className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
        style={{ background: ACCENT, color: INK }}
      >
        <ArrowUpRight size={20} />
      </span>
    </button>
  </Magnetic>
);

// ─────────────────────────────────────────────────────────────
// HERO 3D — WebGL particle wave (GPU shader, mouse-reactive)
// ─────────────────────────────────────────────────────────────
const WAVE_VERT = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uClick;
uniform float uClickTime;
uniform float uPixelRatio;
varying float vElev;
varying float vDepth;
void main() {
  vec3 p = position;
  float t = uTime * 0.62;
  float e = sin(p.x * 0.5 + t) * 0.55
          + sin(p.z * 0.75 + t * 1.25) * 0.4
          + sin((p.x + p.z) * 0.3 + t * 0.65) * 0.5;
  // cursor swell — gently breathing
  float md = distance(p.xz, vec2(uMouse.x * 13.0, -uMouse.y * 6.0 - 4.0));
  e += smoothstep(5.5, 0.0, md) * (1.0 + sin(uTime * 2.6) * 0.25) * 1.25;
  // click / tap shockwave — expanding damped ring
  float ct = uTime - uClickTime;
  float cd = distance(p.xz, uClick);
  float ring = sin(cd * 2.4 - ct * 6.5) * exp(-cd * 0.28) * exp(-ct * 1.1) * step(0.001, ct);
  e += ring * 1.7;
  p.y += e;
  vElev = e;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.5 + max(e, 0.0) * 1.2) * uPixelRatio * (34.0 / vDepth);
}`;

const WAVE_FRAG = /* glsl */ `
varying float vElev;
varying float vDepth;
void main() {
  float a = smoothstep(0.5, 0.05, length(gl_PointCoord - 0.5));
  vec3 bone = vec3(0.42, 0.415, 0.395);
  vec3 lime = vec3(0.773, 0.969, 0.310);
  vec3 col = mix(bone, lime, smoothstep(0.15, 1.5, vElev));
  float fade = smoothstep(30.0, 9.0, vDepth);
  gl_FragColor = vec4(col, a * fade * 0.72);
}`;

const ParticleWave = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pendingClick = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const norm = (e: PointerEvent) => ({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
    const mv = (e: PointerEvent) => { mouse.current = norm(e); };
    const dn = (e: PointerEvent) => {
      // only ripple for taps/clicks inside the hero viewport
      if (window.scrollY < window.innerHeight) pendingClick.current = norm(e);
    };
    window.addEventListener('pointermove', mv, { passive: true });
    window.addEventListener('pointerdown', dn, { passive: true });
    return () => {
      window.removeEventListener('pointermove', mv);
      window.removeEventListener('pointerdown', dn);
    };
  }, []);

  const { positions, uniforms } = useMemo(() => {
    const small = SMALL;
    const nx = small ? 90 : 150;
    const nz = small ? 42 : 64;
    const pos = new Float32Array(nx * nz * 3);
    let i = 0;
    for (let ix = 0; ix < nx; ix++) {
      for (let iz = 0; iz < nz; iz++) {
        pos[i++] = (ix / (nx - 1) - 0.5) * 36;
        pos[i++] = 0;
        pos[i++] = (iz / (nz - 1) - 0.5) * 24 - 5;
      }
    }
    return {
      positions: pos,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uClick: { value: new THREE.Vector2(0, 0) },
        uClickTime: { value: -100 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
    };
  }, []);

  useFrame((state) => {
    if (matRef.current) {
      const uniforms = matRef.current.uniforms;
      if (!REDUCED) uniforms.uTime.value = state.clock.elapsedTime;
      const u = uniforms.uMouse.value as THREE.Vector2;
      u.x += (mouse.current.x - u.x) * 0.05;
      u.y += (mouse.current.y - u.y) * 0.05;
      if (pendingClick.current) {
        (uniforms.uClick.value as THREE.Vector2).set(
          pendingClick.current.x * 13, -pendingClick.current.y * 6 - 4,
        );
        uniforms.uClickTime.value = state.clock.elapsedTime;
        pendingClick.current = null;
      }
    }
    state.camera.position.x += (mouse.current.x * 1.1 - state.camera.position.x) * 0.03;
    state.camera.position.y += (3.4 - mouse.current.y * 0.6 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, -3);
  });

  return (
    <points position={[0, -1.6, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={WAVE_VERT}
        fragmentShader={WAVE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const canWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
};

const HeroCanvas = () => {
  // stop rendering once the hero is scrolled out of view
  const [active, setActive] = useState(true);
  useEffect(() => {
    const h = () => setActive(window.scrollY < window.innerHeight * 1.1);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 3.4, 11], fov: 50 }}
      dpr={[1, SMALL ? 1.5 : 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <ParticleWave />
    </Canvas>
  );
};

// ─────────────────────────────────────────────────────────────
// HERO — single-viewport, cinematic entry
// ─────────────────────────────────────────────────────────────
const Hero = ({ ready }: { ready: boolean }) => {
  const [gl] = useState(canWebGL);
  // subtle parallax depth on the centered content
  const px = useSpring(0, { stiffness: 55, damping: 18, mass: 0.6 });
  const py = useSpring(0, { stiffness: 55, damping: 18, mass: 0.6 });
  const rx = useSpring(0, { stiffness: 60, damping: 16, mass: 0.5 });
  const ry = useSpring(0, { stiffness: 60, damping: 16, mass: 0.5 });
  useEffect(() => {
    if (TOUCH) return;
    const h = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      px.set(nx * -16);
      py.set(ny * -10);
      ry.set(nx * 12);
      rx.set(ny * -9);
    };
    window.addEventListener('pointermove', h, { passive: true });
    return () => window.removeEventListener('pointermove', h);
  }, [px, py, rx, ry]);

  return (
  <section id="hero" className="hero-vh relative overflow-hidden flex flex-col">
    {/* drifting ambient gradients */}
    <div className="hero-blob one" aria-hidden />
    <div className="hero-blob two" aria-hidden />

    {/* 3D particle wave */}
    {gl && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 0.9 }}
        className="absolute inset-0 z-0"
      >
        <HeroCanvas />
      </motion.div>
    )}

    {/* legibility: linear frame fade + radial safe-zone behind the headline */}
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, rgba(11,11,9,0.6), transparent 28%, transparent 70%, #0b0b09 100%)' }}
      aria-hidden
    />
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ background: 'radial-gradient(58% 40% at 50% 47%, rgba(11,11,9,0.82), rgba(11,11,9,0.4) 55%, transparent 78%)' }}
      aria-hidden
    />

    {/* centered composition */}
    <motion.div style={{ x: px, y: py }} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 pt-16">

      <motion.p
        initial={{ opacity: 0, y: 12, letterSpacing: '0.65em' }}
        animate={ready ? { opacity: 1, y: 0, letterSpacing: '0.35em' } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        className="font-mono text-[10px] sm:text-xs uppercase mb-5 sm:mb-7"
        style={{ color: ACCENT }}
      >
        Software Engineer — Jaipur, India
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 1.1, y: 40 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.3, ease: EASE, delay: 0.45 }}
        className="relative px-2"
        style={{ perspective: 1100 }}
      >
        <motion.h1
          className="font-display font-semibold uppercase tracking-tight leading-[0.95]"
          style={{
            fontSize: 'min(14vw, 16vh)',
            color: 'var(--text)',
            rotateX: rx,
            rotateY: ry,
            transformStyle: 'preserve-3d',
            textShadow: [
              '0 1px 0 #3d402f', '0 2px 0 #363928', '0 3px 0 #2f3223',
              '0 4px 0 #282b1e', '0 5px 0 #212418', '0 6px 0 #1a1d13',
              '0 12px 28px rgba(0,0,0,0.6)', '0 28px 70px rgba(0,0,0,0.55)',
            ].join(', '),
          }}
          aria-label="Ashish Nanda"
        >
          <span className="inline-block whitespace-nowrap">
            <RevealChars text="ASHISH" ready={ready} baseDelay={0.55} />
          </span>
          <span className="inline-block w-[0.3em]" />
          <span className="inline-block whitespace-nowrap">
            <RevealChars text="NANDA" ready={ready} baseDelay={0.8} />
            <motion.span
              initial={{ scale: 0 }} animate={ready ? { scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 1.35 }}
              className="inline-block"
              style={{ color: ACCENT }}
            >.</motion.span>
          </span>
        </motion.h1>

        {/* one-time light sheen sweep across the name */}
        <span className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <motion.span
            initial={{ x: '-180%', skewX: -18, opacity: 0 }}
            animate={ready ? { x: '280%', skewX: -18, opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: 1.9 }}
            className="absolute inset-y-0 left-0 w-1/2 block"
            style={{ background: 'linear-gradient(100deg, transparent, rgba(235,232,224,0.12), transparent)' }}
          />
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
        className="mt-6 sm:mt-8 text-base sm:text-xl font-medium h-8"
      >
        <Typewriter words={['Full Stack Developer', 'Backend Engineer', 'Problem Solver', 'Research Intern @ IIT (BHU)']} />
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
        className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <Magnetic strength={0.25}>
          <a href={RESUME_URL} target="_blank" rel="noreferrer"
            onMouseEnter={sfx.hover} onClick={sfx.click}
            className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm rounded-full"
            style={{ background: ACCENT, color: INK, boxShadow: '0 0 44px rgba(197,247,79,0.22)' }}>
            <Download size={14} /> Resume
          </a>
        </Magnetic>
        <Magnetic strength={0.25}>
          <button
            onClick={() => { scrollToId('projects'); sfx.click(); }}
            onMouseEnter={sfx.hover}
            className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm rounded-full border transition-colors duration-300"
            style={{ borderColor: 'var(--border-15)', color: 'var(--text)' }}>
            View Work <ArrowUpRight size={14} />
          </button>
        </Magnetic>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.3 }}
        className="hidden md:block mt-8 font-mono text-[10px] uppercase tracking-[0.25em]"
        style={{ color: 'var(--text-25)' }}
      >
        Press <kbd className="px-1.5 py-0.5 rounded border mx-1" style={{ borderColor: 'var(--border-08)', color: 'var(--text-40)' }}>⌘K</kbd> for quick actions
      </motion.p>
    </motion.div>

    {/* rotating badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={ready ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: 1.9 }}
      className="hidden lg:block absolute right-10 bottom-24 z-10"
    >
      <RotatingBadge />
    </motion.div>

    {/* bottom bar — locked inside the viewport */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: 1.7 }}
      className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-10 h-16 shrink-0"
      style={{ borderTop: '1px solid var(--border-07)' }}
    >
      <div className="flex items-center gap-0.5 pl-16 sm:pl-0">
        {SOCIALS.map(s => (
          <motion.a key={s.name} href={s.url} target="_blank" rel="noreferrer" title={s.name}
            whileHover={{ y: -3, color: ACCENT }} whileTap={{ scale: 0.9 }}
            onHoverStart={sfx.hover}
            className="p-2"
            style={{ color: 'var(--text-40)' }}>
            <s.icon size={15} />
          </motion.a>
        ))}
      </div>

      <button
        onClick={() => { scrollToId('about'); sfx.click(); }}
        onMouseEnter={sfx.hover}
        className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2.5"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-30)' }}>Scroll</span>
        <span className="relative w-10 h-px overflow-hidden" style={{ background: 'var(--border-08)' }}>
          <motion.span
            animate={REDUCED ? {} : { x: ['-100%', '100%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-1/2"
            style={{ background: ACCENT }}
          />
        </span>
      </button>

      <div className="flex items-center gap-2.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute h-full w-full rounded-full opacity-60" style={{ background: ACCENT }} />
          <span className="relative rounded-full h-1.5 w-1.5" style={{ background: ACCENT }} />
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em]" style={{ color: 'var(--text-40)' }}>
          Open to SWE roles
        </span>
      </div>
    </motion.div>
  </section>
  );
};

// ─────────────────────────────────────────────────────────────
// SKILLS TICKER — marquee strip between hero and about
// ─────────────────────────────────────────────────────────────
const SkillsTicker = () => (
  <div
    className="py-5 sm:py-6"
    style={{ borderTop: '1px solid var(--border-07)', borderBottom: '1px solid var(--border-07)' }}
  >
    <MarqueeStrip
      items={['Full-Stack Engineering', 'Backend & APIs', 'GenAI & AI/ML', 'Distributed Systems', 'Open Source']}
      dur={30}
      itemClass="font-display font-medium uppercase text-lg sm:text-2xl tracking-tight"
    />
  </div>
);

// ─────────────────────────────────────────────────────────────
// ABOUT — scroll-scrub statement + stats
// ─────────────────────────────────────────────────────────────
const STATEMENT = "I design and build backend systems that scale — from distributed video pipelines to AI platforms with real users. Backend-first, full-stack capable, obsessed with the details.";

const About = () => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (REDUCED) return;
    gsap.to('.about-word', {
      opacity: 1,
      ease: 'none',
      stagger: 0.4,
      scrollTrigger: {
        trigger: scope.current,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 0.6,
      },
    });
  }, { scope });

  return (
    <Section id="about">
      <SectionHead index="01" label="About" title={['Systems that', 'matter']} />

      <div ref={scope}>
        <p
          className="font-display font-medium leading-[1.25] tracking-tight max-w-5xl mb-10 sm:mb-14"
          style={{ fontSize: 'clamp(1.5rem, 3.6vw, 3rem)', color: 'var(--text)' }}
        >
          {STATEMENT.split(' ').map((w, i) => (
            <span key={i} className="about-word inline-block mr-[0.28em]" style={{ opacity: REDUCED ? 1 : 0.3 }}>
              {w}
            </span>
          ))}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}
          className="pl-6 sm:pl-8 space-y-5"
          style={{ borderLeft: `2px solid ${ACCENT}40` }}
        >
          <p className="text-base leading-[1.9]" style={{ color: 'var(--text-70)' }}>
            Final-year CSE student at <span className="font-semibold" style={{ color: 'var(--text)' }}>Manipal University Jaipur</span>{' '}
            and Research Intern at <span className="font-semibold" style={{ color: 'var(--text)' }}>IIT (BHU)</span>,
            building mathematical models for net-zero integration in MSMEs.
          </p>
          <p className="text-sm leading-[1.9]" style={{ color: 'var(--text-45)' }}>
            My work spans distributed systems architecture, AI-powered automation, and production-grade
            backend infrastructure — shipped across multiple products with real users. When not building:
            guitarist and Google Developer Groups Technical Member.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: 'var(--text-30)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
              Currently
            </span>
            <span className="text-sm" style={{ color: 'var(--text-55)' }}>Research Intern · IIT (BHU)</span>
            <span style={{ color: 'var(--text-15)' }}>/</span>
            <span className="text-sm" style={{ color: 'var(--text-55)' }}>GDG Technical Member</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'var(--border-07)', border: '1px solid var(--border-07)' }}
        >
          {[
            { render: <Counter to={10} suffix="+" />, label: 'Systems in production' },
            { render: <Counter to={5} suffix="×" />, label: "Dean's List of Excellence" },
            { render: <Counter to={9.22} decimals={2} />, label: 'CGPA / 10 · B.Tech CSE' },
            { render: <Counter to={1808} />, label: 'Peak LeetCode rating' },
          ].map((s, i) => (
            <div key={i} className="p-6 sm:p-8 flex flex-col justify-between gap-6" style={{ background: 'var(--surface)' }}>
              <div className="font-display font-semibold text-4xl sm:text-5xl tracking-tight" style={{ color: i % 3 === 0 ? ACCENT : 'var(--text)' }}>
                {s.render}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed" style={{ color: 'var(--text-30)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

// ─────────────────────────────────────────────────────────────
// EXPERIENCE — hover-fill sweep rows
// ─────────────────────────────────────────────────────────────
const Experience = () => (
  <Section id="experience">
    <SectionHead index="02" label="Experience" title={["Where I've", 'been']} />

    <div style={{ borderBottom: '1px solid var(--border-08)' }}>
      {EXPERIENCE.map((e, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
          onMouseEnter={sfx.hover}
          className="sweep-row group cursor-default"
          style={{ borderTop: '1px solid var(--border-08)' }}
          data-cursor
        >
          <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr_auto] gap-4 sm:gap-10 items-start px-4 sm:px-8 py-9 sm:py-12">
            <div className="flex sm:flex-col justify-between sm:justify-start gap-1">
              <span className="sw-dim font-mono text-[11px] tabular-nums" style={{ color: 'var(--text-30)' }}>{e.period}</span>
              <span className="sw-mid font-mono text-xs sm:mt-2" style={{ color: 'var(--text-45)' }}>{e.company}</span>
            </div>
            <div>
              <h3 className="sw-strong font-display font-semibold text-2xl sm:text-4xl tracking-tight mb-3" style={{ color: 'var(--text)' }}>
                {e.role}
              </h3>
              <p className="sw-mid text-sm leading-[1.8] max-w-xl mb-4" style={{ color: 'var(--text-45)' }}>{e.desc}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {e.tags.map(t => (
                  <span key={t} className="sw-dim font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-30)' }}>{t}</span>
                ))}
              </div>
            </div>
            <ArrowUpRight
              className="sw-arrow hidden sm:block mt-2"
              size={28}
              style={{ color: INK, opacity: 0, transform: 'translate(-8px, 8px)' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────────────
const Education = () => (
  <Section id="education">
    <SectionHead index="03" label="Education" title={['The', 'foundation']} />

    <div className="relative mb-8">
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute -top-2 right-0 font-mono text-sm sm:text-base tracking-[0.3em] tabular-nums select-none pointer-events-none"
        style={{ color: ACCENT }}
      >
        2023 — 2027
      </motion.div>

      <h3 className="relative font-display font-semibold tracking-tight leading-[1] mb-3" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', color: 'var(--text)' }}>
        <MaskText>Manipal</MaskText>
        <MaskText delay={0.08}><span style={{ color: 'var(--text-55)' }}>University Jaipur</span></MaskText>
      </h3>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
        className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-30)' }}
      >
        Jaipur, Rajasthan · India
      </motion.p>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}
      className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 sm:gap-20 items-end pb-10"
      style={{ borderBottom: '1px solid var(--border-08)' }}
    >
      <div>
        <p className="text-base mb-1" style={{ color: 'var(--text-45)' }}>Bachelor of Technology</p>
        <p className="font-display font-semibold text-xl sm:text-2xl" style={{ color: 'var(--text)' }}>
          Computer Science &amp; Engineering <span className="font-normal" style={{ color: 'var(--text-30)' }}>(IoT)</span>
        </p>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="font-display font-semibold text-5xl sm:text-6xl tracking-tight" style={{ color: ACCENT }}>
          <Counter to={9.22} decimals={2} />
        </span>
        <span className="font-mono text-sm" style={{ color: 'var(--text-30)' }}>/ 10 CGPA</span>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-px rounded-b-2xl overflow-hidden"
      style={{ background: 'var(--border-07)' }}
    >
      {[
        { label: 'Duration', val: '2023 — 2027' },
        { label: 'Distinction', val: "5× Dean's List" },
        { label: 'Community', val: 'GDG Technical' },
        { label: 'Standing', val: 'Top of class' },
      ].map(item => (
        <div key={item.label} className="px-5 sm:px-6 py-5" style={{ background: 'var(--surface)' }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--text-20)' }}>{item.label}</div>
          <div className="text-sm font-medium" style={{ color: 'var(--text-70)' }}>{item.val}</div>
        </div>
      ))}
    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// SKILLS — accordion categories + giant marquee wall
// ─────────────────────────────────────────────────────────────
const Skills = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="skills">
      <SectionHead index="04" label="Skills" title={['Tools of', 'the trade']} />

      <div className="mb-10 sm:mb-14" style={{ borderBottom: '1px solid var(--border-08)' }}>
        {SKILL_GROUPS.map((g, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={g.cat}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              style={{ borderTop: '1px solid var(--border-08)' }}
            >
              <button
                onClick={() => { setOpen(isOpen ? null : i); sfx.click(); }}
                onMouseEnter={sfx.hover}
                className="w-full flex items-center justify-between gap-4 py-6 sm:py-8 text-left group"
                data-cursor
              >
                <div className="flex items-baseline gap-4 sm:gap-8 min-w-0">
                  <span className="font-mono text-xs shrink-0" style={{ color: 'var(--text-25)' }}>0{i + 1}</span>
                  <span
                    className="font-display font-semibold uppercase tracking-tight text-2xl sm:text-4xl transition-colors duration-300 truncate"
                    style={{ color: isOpen ? ACCENT : 'var(--text)' }}
                  >
                    {g.cat}
                  </span>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <span className="font-mono text-[11px] hidden sm:block" style={{ color: 'var(--text-30)' }}>
                    {g.skills.length} tools
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-colors duration-300"
                    style={{
                      borderColor: isOpen ? ACCENT : 'var(--border-12)',
                      color: isOpen ? ACCENT : 'var(--text-45)',
                    }}
                  >
                    <Plus size={16} />
                  </motion.span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE_IO }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2.5 pb-8 sm:pb-10 pl-0 sm:pl-16">
                      {g.skills.map((sk, j) => (
                        <motion.span
                          key={sk}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: EASE, delay: 0.08 + j * 0.045 }}
                          onMouseEnter={() => sfx.note(PENTA[j % PENTA.length])}
                          whileHover={{ y: -4, borderColor: ACCENT, color: ACCENT }}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border font-mono text-xs sm:text-sm cursor-default select-none"
                          style={{ borderColor: 'var(--border-12)', color: 'var(--text-55)' }}
                          data-cursor
                        >
                          {sk}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
        className="space-y-3 -mx-5 sm:-mx-8 lg:-mx-12"
      >
        <MarqueeStrip
          items={ALL_SKILLS.slice(0, 15)}
          dur={44}
          itemClass="font-display font-semibold uppercase text-3xl sm:text-5xl tracking-tight"
        />
        <MarqueeStrip
          items={ALL_SKILLS.slice(15)}
          reverse
          dur={40}
          itemClass="font-display font-semibold uppercase text-3xl sm:text-5xl tracking-tight"
        />
      </motion.div>
    </Section>
  );
};

// ─────────────────────────────────────────────────────────────
// PROJECTS — sticky stacking cards
// ─────────────────────────────────────────────────────────────
const ProjectCard = ({ p, i, progress, range, targetScale }: {
  p: typeof PROJECTS[number]; i: number;
  progress: MotionValue<number>; range: [number, number]; targetScale: number;
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="sticky top-0 h-screen flex items-center justify-center px-2 sm:px-0">
      <motion.div
        style={{ scale, top: `calc(-4vh + ${i * (SMALL ? 12 : 26)}px)` }}
        className="relative w-full max-w-6xl rounded-3xl sm:rounded-[28px] overflow-hidden origin-top"
      >
        <div
          className="relative border rounded-3xl sm:rounded-[28px] p-6 sm:p-10 lg:p-14 max-h-[84vh] overflow-y-auto overscroll-contain"
          style={{
            background: `linear-gradient(135deg, var(--surface-2) 0%, var(--surface) 60%)`,
            borderColor: 'var(--border-08)',
            boxShadow: '0 -20px 60px rgba(0,0,0,0.45)',
          }}
        >
          {/* per-project tint */}
          <div className="absolute top-0 right-0 w-[50%] h-[60%] pointer-events-none rounded-full blur-[120px] opacity-[0.07]"
            style={{ background: p.color }} />

          <div className="flex items-start justify-between mb-6 sm:mb-10">
            <span className="font-display font-semibold leading-none tabular-nums select-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', color: `${p.color}26` }}>
              {p.num}
            </span>
            <div className="flex items-center gap-3 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border"
                style={{ color: p.color, borderColor: `${p.color}30`, background: `${p.color}0d` }}>
                {p.domain}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-14 items-start">
            <div>
              <a href={p.github} target="_blank" rel="noreferrer" onClick={sfx.click}
                data-cursor-label="VIEW" onMouseEnter={sfx.hover} className="block group">
                <h3 className="font-display font-semibold tracking-tight leading-[1] mb-5 transition-colors duration-300"
                  style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.6rem)', color: 'var(--text)' }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = p.color; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}>
                  {p.name}
                </h3>
              </a>
              <p className="text-sm sm:text-[15px] leading-[1.8] mb-7 max-w-xl" style={{ color: 'var(--text-55)' }}>
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {p.tech.map(t => (
                  <span key={t} className="font-mono text-[10px] sm:text-[11px] px-3 py-1.5 rounded-full border"
                    style={{ color: 'var(--text-45)', borderColor: 'var(--border-08)' }}>
                    {t}
                  </span>
                ))}
              </div>
              <Magnetic strength={0.25}>
                <a href={p.github} target="_blank" rel="noreferrer"
                  onMouseEnter={sfx.hover} onClick={sfx.click}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300"
                  style={{ borderColor: `${p.color}40`, color: p.color }}>
                  <Github size={13} /> View source <ArrowUpRight size={12} />
                </a>
              </Magnetic>
            </div>

            {/* terminal mock */}
            <div className="hidden lg:block rounded-2xl overflow-hidden border font-mono text-xs"
              style={{ borderColor: 'var(--border-08)', background: 'rgba(0,0,0,0.35)' }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border-07)' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3" style={{ color: 'var(--text-25)' }}>{slug}.sh</span>
              </div>
              <div className="p-5 space-y-3 leading-relaxed">
                <p><span style={{ color: ACCENT }}>$</span> <span style={{ color: 'var(--text-55)' }}>project --info</span></p>
                <p style={{ color: 'var(--text-40)' }}>domain: <span style={{ color: p.color }}>{p.domain.toLowerCase()}</span></p>
                <p><span style={{ color: ACCENT }}>$</span> <span style={{ color: 'var(--text-55)' }}>stack --list</span></p>
                <p className="break-words" style={{ color: 'var(--text-40)' }}>[{p.tech.slice(0, 5).map(t => `"${t}"`).join(', ')}]</p>
                <p><span style={{ color: ACCENT }}>$</span> <span style={{ color: 'var(--text-55)' }}>status</span></p>
                <p style={{ color: 'var(--text-40)' }}>
                  <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: '#28c840' }} />
                  shipped · production
                </p>
                <p className="animate-pulse" style={{ color: ACCENT }}>█</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  return (
    <section id="projects" className="relative py-16 sm:py-24">
      <div className="px-5 sm:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <SectionHead index="05" label="Projects" title={['Selected', 'works']} />
      </div>

      <div ref={container} className="relative px-3 sm:px-8 lg:px-12">
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.num}
            p={p}
            i={i}
            progress={scrollYProgress}
            range={[i / PROJECTS.length, 1]}
            targetScale={1 - (PROJECTS.length - 1 - i) * 0.045}
          />
        ))}
      </div>

      <div className="px-5 sm:px-8 lg:px-12 max-w-[1400px] mx-auto pt-10">
        <a href="https://github.com/ashishnanda19" target="_blank" rel="noreferrer"
          onMouseEnter={sfx.hover}
          className="u-line inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]"
          style={{ color: 'var(--text-40)' }}>
          More work on GitHub <ArrowUpRight size={12} />
        </a>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// AWARDS
// ─────────────────────────────────────────────────────────────
const Awards = () => (
  <Section id="awards">
    <SectionHead index="06" label="Awards" title={['Proof of', 'work']} />

    <div className="mb-16" style={{ borderBottom: '1px solid var(--border-08)' }}>
      {AWARDS.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
          onMouseEnter={sfx.hover}
          className="sweep-row cursor-default"
          style={{ borderTop: '1px solid var(--border-08)' }}
          data-cursor
        >
          <div className="grid grid-cols-[44px_1fr_auto] sm:grid-cols-[80px_1fr_auto] items-center gap-4 sm:gap-8 px-4 sm:px-8 py-6 sm:py-7">
            <span className="sw-dim font-display font-semibold text-2xl sm:text-4xl tabular-nums select-none leading-none"
              style={{ color: 'var(--text-15)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="sw-strong text-sm sm:text-lg font-medium leading-snug" style={{ color: 'var(--text-70)' }}>
              {a.text}
            </span>
            <span className="sw-badge font-mono font-bold text-[10px] px-2.5 py-1 rounded-full border shrink-0"
              style={{ color: ACCENT, background: 'rgba(197,247,79,0.07)', borderColor: 'rgba(197,247,79,0.25)' }}>
              {a.badge}
            </span>
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: 'var(--text-25)' }}>
        Competitive programming
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: 'var(--border-07)', border: '1px solid var(--border-07)' }}>
        {[
          { name: 'LeetCode', url: 'https://leetcode.com/ashishnanda19', num: 1808, rank: 'Top 7.71%', sub: '600+ solved' },
          { name: 'CodeChef', url: 'https://codechef.com/users/ashishnanda19', num: 1540, rank: '2 Star', sub: 'Max rating' },
          { name: 'GitHub', url: 'https://github.com/ashishnanda19', num: null, rank: 'Open source', sub: '@ashishnanda19' },
        ].map(cp => (
          <a key={cp.name} href={cp.url} target="_blank" rel="noreferrer" onMouseEnter={sfx.hover}
            className="group p-6 sm:p-8 flex flex-col gap-1 transition-colors duration-300"
            style={{ background: 'var(--surface)' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: ACCENT }}>{cp.name}</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--text-25)' }} />
            </div>
            <div className="font-display font-semibold text-3xl sm:text-4xl" style={{ color: 'var(--text)' }}>
              {cp.num !== null ? <Counter to={cp.num} /> : '∞'}
            </div>
            <div className="font-mono text-xs mt-1" style={{ color: 'var(--text-40)' }}>{cp.rank}</div>
            <div className="font-mono text-[10px]" style={{ color: 'var(--text-25)' }}>{cp.sub}</div>
          </a>
        ))}
      </div>
    </motion.div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────
const Contact = () => (
  <Section id="contact" className="overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[36rem] h-[36rem] rounded-full blur-[140px]" style={{ background: 'rgba(197,247,79,0.05)' }} />
    </div>

    <div className="relative text-center py-8 sm:py-16">
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="font-mono text-xs uppercase tracking-[0.3em] mb-10" style={{ color: ACCENT }}
      >
        (07) — Contact
      </motion.p>

      <h2 className="font-display font-semibold uppercase tracking-tight leading-[0.95] mb-12"
        style={{ fontSize: 'clamp(2.8rem, 9vw, 8.5rem)', color: 'var(--text)' }}>
        <MaskText>Let's build</MaskText>
        <MaskText delay={0.1}><span style={{ color: 'var(--text-30)' }}>something</span></MaskText>
        <MaskText delay={0.2}>great<span style={{ color: ACCENT }}>.</span></MaskText>
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        className="flex justify-center mb-12"
      >
        <Magnetic strength={0.35}>
          <a href="mailto:ashish.nanda1902@gmail.com"
            onMouseEnter={sfx.hover} onClick={sfx.click}
            data-cursor-label="HELLO"
            className="flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full font-display font-semibold text-base sm:text-lg transition-shadow duration-500"
            style={{ background: ACCENT, color: INK, boxShadow: '0 0 60px rgba(197,247,79,0.25)' }}>
            Say hello
            <ArrowUpRight size={20} className="mt-1" />
          </a>
        </Magnetic>
      </motion.div>

      <motion.a
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
        href="mailto:ashish.nanda1902@gmail.com"
        onMouseEnter={sfx.hover}
        className="u-line font-mono text-sm sm:text-base inline-block mb-12"
        style={{ color: 'var(--text-55)' }}
      >
        ashish.nanda1902@gmail.com
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-wrap justify-center gap-2.5"
      >
        {SOCIALS.map(s => (
          <motion.a key={s.name} href={s.url} target="_blank" rel="noreferrer"
            whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }} onHoverStart={sfx.hover}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border font-mono text-xs transition-colors duration-300"
            style={{ borderColor: 'var(--border-08)', color: 'var(--text-55)' }}
            onMouseOver={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${ACCENT}55`; el.style.color = ACCENT; }}
            onMouseOut={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border-08)'; el.style.color = 'var(--text-55)'; }}>
            <s.icon size={13} /> {s.name}
          </motion.a>
        ))}
      </motion.div>
    </div>
  </Section>
);

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="relative overflow-hidden pt-10" style={{ borderTop: '1px solid var(--border-05)' }}>
    <MarqueeStrip
      items={['Ashish Nanda', 'Software Engineer', 'Ashish Nanda', 'Backend · Full-Stack · AI']}
      dur={38}
      className="opacity-80 mb-8"
      itemClass="font-display font-semibold uppercase tracking-tight leading-none text-[clamp(3rem,10vw,9rem)] text-[color:var(--text-15)]"
    />
    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-8 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
      <div className="font-mono text-[11px]" style={{ color: 'var(--text-25)' }}>
        © 2026 — Designed &amp; built by <span style={{ color: 'var(--text-45)' }}>Ashish Kumar Nanda</span>
      </div>
      <SysHud />
      <Clock />
      <button
        onClick={() => { scrollToTop(); sfx.click(); }}
        onMouseEnter={sfx.hover}
        className="u-line font-mono text-[11px] uppercase tracking-[0.2em] flex items-center gap-1.5"
        style={{ color: 'var(--text-40)' }}
      >
        Back to top <ArrowUp size={11} />
      </button>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────
// SCROLL TOP FAB
// ─────────────────────────────────────────────────────────────
const ScrollTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => { scrollToTop(); sfx.click(); }}
          onMouseEnter={sfx.hover}
          className="fixed bottom-6 right-6 z-[70] w-11 h-11 rounded-full flex items-center justify-center border backdrop-blur-md"
          style={{ borderColor: 'var(--border-12)', background: 'var(--nav-bg)', color: 'var(--text)' }}
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────────────────────
// CHATBOT — AshBot
// ─────────────────────────────────────────────────────────────
const BOT_KB: [RegExp, string][] = [
  [/hi|hello|hey|sup|yo|meow/i, "Hey there! 👋 I'm AshBot, Ashish's AI assistant.\nAsk me about his projects, skills, awards, or how to reach him!"],
  [/about|who|yourself|intro|tell me/i, "Ashish is a Backend Engineer & final-year CSE student at Manipal University Jaipur, currently a Research Intern at IIT (BHU).\n\nHe ships distributed systems, AI-powered products, and production-grade infrastructure. 5× Dean's List · Open to SWE roles."],
  [/skill|tech|stack|language|framework|frontend|backend|tool|database|cloud|devops|ai|ml|genai/i, "Here's Ashish's full stack ⚡\n\n▸ Languages      C++, Java, Python, JS, SQL\n▸ Frontend       React, Tailwind CSS, HTML\n▸ Backend/APIs   Node.js, Express, FastAPI, REST\n▸ Databases      MongoDB, MySQL, PostgreSQL, Redis, ChromaDB\n▸ AI/ML & GenAI  LangChain, LangGraph, Hugging Face, NumPy, Pandas\n▸ Cloud & Tools  AWS, Docker, Jenkins, CI/CD, Git, Supabase"],
  [/project|built|build|made|created|shipped/i, "Ashish has shipped 5 production systems:\n\n01 Distributed Video Transcoder\n   AWS · Redis · Docker · ffmpeg\n\n02 SafeTrail — SOS platform\n   Socket.IO · PostGIS · BullMQ\n\n03 HyperRAG-X — Enterprise RAG\n   LangGraph · Qdrant · Groq · FastAPI\n\n04 InvoSync — AI invoice SaaS\n   98%+ OCR accuracy · Flask · React\n\n05 Music Mindscape — Spotify map\n   D3-Force · Gemini 2.5 · Supabase"],
  [/award|achiev|honor|win|leetcode|codechef|grid|iic|dean/i, "Achievements 🏆\n\n▸ IIC Finalist (International Innovation Challenge)\n▸ Flipkart GRiD 7.0 National Semifinalist\n▸ 5× Dean's List of Excellence\n▸ LeetCode — 600+ solved · Peak 1,808 rating\n▸ CodeChef — 2 Star · Max 1,540"],
  [/educ|univer|college|muj|manipal|degree|cgpa|gpa/i, "Education 📚\n\nB.Tech CSE (IoT) — Manipal University Jaipur\n2023 – 2027 · CGPA 9.22/10\n5× Dean's List · GDG Technical Member"],
  [/experi|intern|iit|bhu|gdg|google developer/i, "Experience 💼\n\n🔬 Research Intern @ IIT (BHU)\n   Dec 2025 – Present\n   Net-zero models for MSMEs\n\n👥 Technical Member @ GDG\n   Sept 2023 – Oct 2025\n   Workshops · Hackathons · Cloud"],
  [/contact|reach|email|hire|connect|linkedin|github/i, "Reach Ashish here:\n\n📧 ashish.nanda1902@gmail.com\n🐙 github.com/ashishnanda19\n💼 linkedin.com/in/ashishnanda19\n🐦 x.com/ashish19n"],
  [/help|what can|what do/i, "You can ask me about:\n\n• about     → Who is Ashish?\n• skills    → Tech stack\n• projects  → What he built\n• awards    → His wins\n• education → Academic background\n• experience → Work history\n• contact   → How to reach him"],
];
const getResponse = (q: string) => {
  for (const [re, ans] of BOT_KB) if (re.test(q)) return ans;
  return "I didn't catch that! Try asking about Ashish's projects, skills, awards, or type 'help' to see all topics. 🤖";
};

const BotIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="5" y="6" width="26" height="24" rx="8" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.4" />
    <rect x="8" y="11" width="8" height="11" rx="4" fill="currentColor" fillOpacity="0.15" />
    <rect x="9.5" y="12.5" width="5" height="8" rx="2.5" fill="currentColor" />
    <rect x="20" y="11" width="8" height="11" rx="4" fill="currentColor" fillOpacity="0.15" />
    <rect x="21.5" y="12.5" width="5" height="8" rx="2.5" fill="currentColor" />
    <rect x="10.5" y="13.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.4" />
    <rect x="22.5" y="13.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.4" />
    <path d="M12 26 Q18 30 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <rect x="1" y="13" width="4" height="8" rx="2" fill="currentColor" fillOpacity="0.35" />
    <rect x="31" y="13" width="4" height="8" rx="2" fill="currentColor" fillOpacity="0.35" />
  </svg>
);

type Msg = { role: 'bot' | 'user'; text: string; id: number };
let _msgId = 0;

const AshBot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{
    role: 'bot', id: _msgId++,
    text: "Hi! I'm AshBot 🤖\nAshish's AI assistant. Ask me anything about him, or tap a chip below!",
  }]);
  const [input, setInput] = useState('');
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
      <div className="fixed bottom-6 left-6 z-[70]">
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'rgba(197,247,79,0.35)' }}
          />
        )}
        <motion.button
          onClick={() => { setOpen(o => !o); sfx.click(); }}
          onMouseEnter={sfx.hover}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.91 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #a3d838 100%)`, boxShadow: '0 0 28px rgba(197,247,79,0.4)' }}
        >
          <AnimatePresence mode="wait">
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} className="relative z-10" style={{ color: INK }}><X size={20} strokeWidth={3} /></motion.span>
              : <motion.div key="bot" initial={{ rotate: 15, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -15, opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }} className="relative z-10" style={{ color: INK }}>
                <BotIcon size={28} />
              </motion.div>}
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
            className="fixed bottom-[92px] left-4 right-4 sm:left-6 sm:right-auto sm:w-[355px] z-[70] flex flex-col rounded-2xl overflow-hidden"
            style={{ maxHeight: '480px', boxShadow: 'var(--chat-shadow)', background: 'var(--chat-bg)' }}
          >
            <div className="h-[2px] flex-shrink-0" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}66 60%, transparent)` }} />

            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--accent-glow) 0%, transparent 60%)' }}>
              <div className="relative w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--accent-glow), transparent)', border: '1px solid rgba(197,247,79,0.25)' }}>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: ACCENT }}>
                  <BotIcon size={22} />
                </span>
                <motion.div
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: 'linear' }}
                  className="absolute left-0 right-0 h-[2px] pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(197,247,79,0.6), transparent)` }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--text)' }}>AshBot</span>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-md border"
                    style={{ color: ACCENT, borderColor: 'rgba(197,247,79,0.25)', background: 'rgba(197,247,79,0.08)' }}>AI</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full block flex-shrink-0"
                    style={{ background: ACCENT }}
                  />
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-30)' }}>Online · knows everything about Ashish</span>
                </div>
              </div>
            </div>

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
                      style={{ background: 'rgba(197,247,79,0.1)', border: '1px solid rgba(197,247,79,0.2)', color: ACCENT }}>
                      <BotIcon size={13} />
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
                      background: `linear-gradient(135deg, ${ACCENT}, #a3d838)`,
                      borderRadius: '12px 0 12px 12px',
                      padding: '8px 12px',
                      color: INK,
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(197,247,79,0.25)',
                    }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 items-end">
                  <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(197,247,79,0.1)', border: '1px solid rgba(197,247,79,0.2)', color: ACCENT }}>
                    <BotIcon size={13} />
                  </div>
                  <div className="px-3 py-2.5 flex gap-1.5 items-center"
                    style={{ background: 'var(--chat-msg-bg)', border: '1px solid var(--chat-msg-border)', borderRadius: '0 12px 12px 12px' }}>
                    {[0, 1, 2].map(i => (
                      <motion.span key={i}
                        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                        className="block w-1.5 h-1.5 rounded-full"
                        style={{ background: ACCENT }}
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
                  className="text-[10px] font-mono px-2.5 py-1 rounded-lg capitalize"
                  style={{ color: 'rgba(197,247,79,0.75)', border: '1px solid rgba(197,247,79,0.2)', background: 'rgba(197,247,79,0.05)' }}
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
                className="flex-1 text-[11px] outline-none"
                style={{
                  background: 'var(--chat-input-bg)',
                  border: '1px solid var(--chat-input-border)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  color: 'var(--chat-input-color)',
                }}
                onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(197,247,79,0.4)'; }}
                onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--chat-input-border)'; }}
              />
              <motion.button
                onClick={() => send()}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${ACCENT}, #a3d838)`, color: INK, boxShadow: '0 4px 12px rgba(197,247,79,0.3)' }}
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
// CURSOR SPOTLIGHT — ambient glow that follows the pointer
// ─────────────────────────────────────────────────────────────
const Spotlight = () => {
  useEffect(() => {
    if (TOUCH) return;
    const h = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', h, { passive: true });
    return () => window.removeEventListener('pointermove', h);
  }, []);
  if (TOUCH) return null;
  return <div className="spotlight fixed inset-0 z-[1] pointer-events-none" aria-hidden />;
};

// ─────────────────────────────────────────────────────────────
// SCROLLSPY RAIL — section dots, desktop only
// ─────────────────────────────────────────────────────────────
const ScrollRail = () => {
  const [active, setActive] = useState('');
  useEffect(() => {
    const ids = NAV.map(n => n.toLowerCase());
    const h = () => {
      let cur = '';
      const mid = window.innerHeight * 0.4;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) cur = id;
      }
      setActive(cur);
    };
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className="hidden xl:flex fixed right-7 top-1/2 -translate-y-1/2 z-[65] flex-col gap-3.5 items-end" aria-label="Section navigation">
      {NAV.map(l => {
        const id = l.toLowerCase();
        const on = active === id;
        return (
          <button
            key={l}
            onClick={() => { scrollToId(id); sfx.click(); }}
            onMouseEnter={sfx.hover}
            className="group flex items-center gap-2.5 py-0.5"
            aria-label={`Go to ${l}`}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: on ? ACCENT : 'var(--text-40)' }}
            >
              {l}
            </span>
            <span
              className="rounded-full transition-all duration-500"
              style={{ width: on ? 24 : 6, height: 6, background: on ? ACCENT : 'var(--text-25)' }}
            />
          </button>
        );
      })}
    </nav>
  );
};

// ─────────────────────────────────────────────────────────────
// SYSTEM HUD — live fps / scroll / viewport readout
// ─────────────────────────────────────────────────────────────
const SysHud = () => {
  const [fps, setFps] = useState(0);
  const [pct, setPct] = useState(0);
  const [vp, setVp] = useState('');

  useEffect(() => {
    let frames = 0;
    let alive = true;
    let raf: number;
    const loop = () => { frames++; if (alive) raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const id = setInterval(() => { setFps(frames * 2); frames = 0; }, 500);
    const sc = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
    };
    const rs = () => setVp(`${window.innerWidth}×${window.innerHeight}`);
    sc(); rs();
    window.addEventListener('scroll', sc, { passive: true });
    window.addEventListener('resize', rs);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearInterval(id);
      window.removeEventListener('scroll', sc);
      window.removeEventListener('resize', rs);
    };
  }, []);

  return (
    <span className="font-mono text-[10px] tracking-[0.15em] tabular-nums flex items-center gap-3" style={{ color: 'var(--text-30)' }}>
      <span style={{ color: fps >= 50 ? ACCENT : 'var(--text-40)' }}>{fps > 0 ? fps : '--'} FPS</span>
      <span>SCROLL {pct}%</span>
      <span className="hidden sm:inline">{vp}</span>
    </span>
  );
};

// ─────────────────────────────────────────────────────────────
// COMMAND PALETTE — ⌘K / "/" quick actions
// ─────────────────────────────────────────────────────────────
type PaletteAction = {
  id: string;
  label: string;
  hint: string;
  group: 'Navigate' | 'Actions' | 'Links';
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  run: () => void;
};
const PALETTE_GROUPS = ['Navigate', 'Actions', 'Links'] as const;

const CommandPalette = ({ open, setOpen, soundOn, toggleSound }: {
  open: boolean; setOpen: (v: boolean) => void; soundOn: boolean; toggleSound: () => void;
}) => {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => { setOpen(false); setQ(''); setSel(0); };

  const actions: PaletteAction[] = [
    ...NAV.map((l, i) => ({
      id: `nav-${l}`, label: `Go to ${l}`, hint: `0${i + 1}`, group: 'Navigate' as const, icon: ArrowUpRight,
      run: () => { close(); setTimeout(() => scrollToId(l), 250); },
    })),
    {
      id: 'resume', label: 'Download resume', hint: 'PDF', group: 'Actions', icon: Download,
      run: () => { window.open(RESUME_URL, '_blank'); close(); },
    },
    {
      id: 'email', label: 'Copy email address', hint: copied ? 'Copied ✓' : '⏎', group: 'Actions', icon: Copy,
      run: () => {
        navigator.clipboard?.writeText('ashish.nanda1902@gmail.com');
        setCopied(true);
        sfx.click();
        setTimeout(() => { setCopied(false); close(); }, 900);
      },
    },
    {
      id: 'sound', label: soundOn ? 'Mute sound effects' : 'Unmute sound effects', hint: soundOn ? 'ON' : 'OFF',
      group: 'Actions', icon: soundOn ? Volume2 : VolumeX,
      run: () => toggleSound(),
    },
    {
      id: 'riff', label: 'Play a pentatonic riff', hint: 'guitar', group: 'Actions', icon: Music,
      run: () => { [0, 2, 4, 6, 8, 9].forEach((n, i) => setTimeout(() => sfx.note(PENTA[n]), i * 110)); },
    },
    {
      id: 'top', label: 'Back to top', hint: 'Home', group: 'Actions', icon: ArrowUp,
      run: () => { close(); scrollToTop(); },
    },
    ...SOCIALS.filter(s => s.name !== 'Email').map(s => ({
      id: `soc-${s.name}`, label: `Open ${s.name}`, hint: '↗', group: 'Links' as const, icon: s.icon,
      run: () => { window.open(s.url, '_blank'); close(); },
    })),
  ];

  // subsequence fuzzy match
  const needle = q.toLowerCase().replace(/\s+/g, '');
  const filtered = needle
    ? actions.filter(a => {
        let i = 0;
        for (const c of a.label.toLowerCase()) { if (c === needle[i]) i++; if (i === needle.length) return true; }
        return i === needle.length;
      })
    : actions;

  useEffect(() => {
    if (!open) {
      _lenis?.start();
      return;
    }
    _lenis?.stop();
    const t = setTimeout(() => {
      setQ(''); setSel(0);
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(t);
  }, [open]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, filtered.length - 1)); sfx.hover(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); sfx.hover(); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[sel]?.run(); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  };


  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          style={{ background: 'rgba(6,6,5,0.6)', backdropFilter: 'blur(8px)' }}
          onMouseDown={e => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="w-full max-w-xl rounded-2xl overflow-hidden border"
            style={{ background: 'var(--surface-2)', borderColor: 'var(--border-12)', boxShadow: '0 32px 90px rgba(0,0,0,0.8), 0 0 0 1px rgba(197,247,79,0.08)' }}
          >
            <div className="flex items-center gap-3 px-4 sm:px-5 py-4" style={{ borderBottom: '1px solid var(--border-07)' }}>
              <Search size={15} style={{ color: ACCENT }} />
              <input
                ref={inputRef}
                value={q}
                onChange={e => { setQ(e.target.value); setSel(0); }}
                onKeyDown={onKey}
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--text)' }}
              />
              <kbd className="font-mono text-[9px] px-1.5 py-0.5 rounded border" style={{ color: 'var(--text-30)', borderColor: 'var(--border-08)' }}>ESC</kbd>
            </div>

            <div className="max-h-[46vh] overflow-y-auto py-2" style={{ scrollbarWidth: 'thin' }}>
              {filtered.length === 0 && (
                <p className="px-5 py-6 font-mono text-xs" style={{ color: 'var(--text-30)' }}>
                  No matches — try "projects" or "resume"
                </p>
              )}
              {PALETTE_GROUPS.map(g => {
                const items = filtered.filter(a => a.group === g);
                if (items.length === 0) return null;
                return (
                  <div key={g} className="mb-1">
                    <p className="px-5 pt-2 pb-1.5 font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-25)' }}>{g}</p>
                    {items.map(a => {
                      const idx = filtered.indexOf(a);
                      const on = idx === sel;
                      return (
                        <button
                          key={a.id}
                          onClick={() => a.run()}
                          onMouseEnter={() => setSel(idx)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors duration-150"
                          style={{ background: on ? 'rgba(197,247,79,0.08)' : 'transparent' }}
                        >
                          <span className="w-0.5 self-stretch rounded-full" style={{ background: on ? ACCENT : 'transparent' }} />
                          <span className="shrink-0 flex" style={{ color: on ? ACCENT : 'var(--text-40)' }}>
                            <a.icon size={14} />
                          </span>
                          <span className="flex-1 text-sm" style={{ color: on ? 'var(--text)' : 'var(--text-55)' }}>{a.label}</span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: on ? ACCENT : 'var(--text-25)' }}>{a.hint}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 px-5 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em]"
              style={{ borderTop: '1px solid var(--border-07)', color: 'var(--text-25)' }}>
              <span className="flex items-center gap-1">↑↓ navigate</span>
              <span className="flex items-center gap-1"><CornerDownLeft size={9} /> select</span>
              <span className="ml-auto" style={{ color: 'var(--text-30)' }}>ashish.os v2.0</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => !MUTED);
  useSmoothScroll();

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setMuted(!next);
    if (next) sfx.click();
  };

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) document.body.classList.add('has-cursor');
    const unlock = () => { getCtx(); };
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    const keys = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.matches?.('input, textarea, [contenteditable]');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(o => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', keys);
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', keys);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <div className="min-h-screen overflow-x-clip" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        {/* film grain */}
        <div className="noise fixed inset-0 z-[60] pointer-events-none opacity-[0.045]" />

        <Spotlight />
        <ProgressBar />
        <Cursor />
        <Nav
          onPalette={() => setPaletteOpen(true)}
          soundOn={soundOn}
          toggleSound={toggleSound}
        />
        <ScrollRail />
        <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} soundOn={soundOn} toggleSound={toggleSound} />

        <main>
          <Hero ready={loaded} />
          <SkillsTicker />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Awards />
          <Contact />
        </main>

        <Footer />
        <AshBot />
        <ScrollTop />
      </div>
    </MotionConfig>
  );
}
