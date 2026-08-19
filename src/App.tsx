import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Code, FileText, Search, X, ChevronDown, ExternalLink } from 'lucide-react';

interface ExperienceItem {
  title: string;
  role: string;
  dates: string;
  location: string;
  image?: string;
  emoji?: string;
  description: string;
  tech: string[];
  metrics?: { label: string; value: string }[];
}

interface ProjectItem {
  slug: string;
  name: string;
  desc: string;
  tech: string[];
  github: string;
  live: string;
  status: 'live' | 'building' | 'not_started';
  bgColor?: string;
  accent?: string;
  image?: string;
  emoji?: string;
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const RESUME_URL = 'https://drive.google.com/file/d/1Sq69vpiR5Dg5fN66w-nQwEi_hUS-8lcg/view?usp=sharing';

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Indian Institute of Technology (BHU)',
    role: 'Research Intern',
    dates: 'Dec 2025 — Present',
    location: 'Remote',
    image: '/IIT-BHU_Logo.svg',
    description: `Developing a Mathematical Model for Integrating Net Zero Practices in MSMEs to support sustainable development goals.
Building data pipelines and analytical frameworks for sustainability metrics.
Conducting literature reviews and writing academic research documentation.`,
    tech: ['Research', 'Mathematical Modeling', 'Sustainability', 'Data Analysis'],
    metrics: [
      { label: 'Scope', value: 'MSME' },
      { label: 'Goal', value: 'Net Zero' },
      { label: 'Status', value: 'Ongoing' },
      { label: 'Type', value: 'Research' },
    ],
  },
  {
    title: 'Google Developer Groups',
    role: 'Technical Member',
    dates: 'Sept 2023 — Oct 2025',
    location: 'Jaipur, IN',
    image: '/gdg.png',
    description: `Organized technical workshops, hackathons, and coding sessions for the developer community.
Led hands-on sessions on web development and cloud technologies.
Mentored junior developers and helped grow the local tech ecosystem.`,
    tech: ['Community', 'Mentoring', 'Web Dev', 'Cloud', 'Workshops'],
    metrics: [
      { label: 'Duration', value: '2 yrs' },
      { label: 'Events', value: '10+' },
      { label: 'Type', value: 'Tech Lead' },
      { label: 'Reach', value: 'City' },
    ],
  },
];

const EDUCATION: ExperienceItem[] = [
  {
    title: 'Manipal University Jaipur',
    role: 'B.Tech in Computer Science',
    dates: '2023 — 2027',
    location: 'Jaipur, IN',
    image: '/muj.png',
    description: 'CGPA: 9.22/10',
    tech: [],
    metrics: [],
  }
];

const PROJECTS: ProjectItem[] = [
  {
    slug: 'video-transcoder',
    name: 'Distributed Video Transcoder',
    desc: 'Infinite-scale distributed video transcoding pipeline. AWS-based queuing with Redis, multi-resolution output, and secure streaming architecture.',
    tech: ['node', 'aws', 'redis', 'mongodb', 'docker'],
    github: 'https://github.com/ashishnanda19/video-transcoder',
    live: '',
    status: 'live' as const,
    //bgColor: 'from-sky-950 to-slate-900',
    //accent: '#7dd3fc',
    image: '/VidFlow.jpeg',
    emoji: '⚡',
  },
  {
    slug: 'safetrail',
    name: 'SafeTrail',
    desc: 'Cross-platform SOS platform with real-time location tracking, ML-based threat analysis, and emergency response.',
    tech: ['node', 'socket.io', 'postgresql', 'redis'],
    github: 'https://github.com/ashishnanda19/Safe_Trail',
    live: '',
    status: 'live' as const,
    //bgColor: 'white',
    //accent: '#c4b5fd',
    image: '/SafeTrail.png',
    emoji: '🛡️',
  },
  {
    slug: 'hyperrag-x',
    name: 'HyperRAG-X',
    desc: 'Enterprise-grade hybrid RAG platform with multi-agent orchestration and tripartite storage powered by Groq + LLaMA.',
    tech: ['python', 'fastapi', 'langgraph', 'qdrant'],
    github: 'https://github.com/ashishnanda19/HyperRAG-X',
    live: '',
    status: 'live' as const,
    //bgColor: 'from-amber-950 to-slate-900',
    //accent: '#fcd34d',
    image: '/HyperRag-X.jpg',
    emoji: '🤖',
  },
  {
    slug: 'invosync',
    name: 'InvoSync',
    desc: 'AI-powered B2B SaaS automating invoice-to-receipt matching with 98%+ accuracy via OCR and fuzzy-matching.',
    tech: ['react', 'flask', 'python', 'ocr'],
    github: 'https://github.com/ashishnanda19/InvoSync',
    live: '',
    status: 'live' as const,
    //bgColor: 'from-emerald-950 to-slate-900',
    //accent: '#6ee7b9',
    image: '/InvoSync.png',
    emoji: '📊',
  },
  {
    slug: 'music-mindscape',
    name: 'Music Mindscape',
    desc: 'Spotify listening habits visualized as an interactive force-directed mind map with AI-powered re-clustering.',
    tech: ['react', 'typescript', 'd3', 'spotify'],
    github: 'https://github.com/ashishnanda19/music-mindscape',
    live: '',
    status: 'live' as const,
    //bgColor: 'from-pink-950 to-slate-900',
    //accent: '#f9a8d4',
    emoji: '🎵',
  },
];

const SKILLS = [
  { name: 'React', icon: 'react' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Python', icon: 'python' },
  { name: 'FastAPI', icon: 'fastapi' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Redis', icon: 'redis' },
  { name: 'AWS', icon: 'amazonaws' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'LangChain', icon: 'langchain' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'C++', icon: 'cplusplus' },
  { name: 'Java', icon: 'openjdk' },
  { name: 'SQL', icon: 'mysql' },
  { name: 'HuggingFace', icon: 'huggingface' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Express', icon: 'express' },
  { name: 'HTML', icon: 'html5' },
  { name: 'NumPy', icon: 'numpy' },
  { name: 'Pandas', icon: 'pandas' },
  { name: 'Jenkins', icon: 'jenkins' },
  { name: 'Linux', icon: 'linux' },
];

const HIGHLIGHTS = [
  { id: 'iic', title: 'Finalist — International Innovation Challenge (IIC)', badge: 'IIC 2024', image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80&w=400' },
  { id: 'grid', title: 'National Semifinalist — Flipkart GRiD 7.0', badge: 'Flipkart', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400' },
  { id: 'deans', title: '5× Dean\'s List of Excellence at Manipal University Jaipur', badge: 'Dean\'s List', image: '/muj.png' },
  { id: 'leetcode', title: 'LeetCode Peak Rating 1,808 — Top 7.71% Globally', badge: 'LeetCode', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400' },
  { id: 'codechef', title: 'CodeChef 2 Star — Max Rating 1,540', badge: 'CodeChef', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400' },
  { id: 'gdg', title: 'Technical Member — Google Developer Groups (GDG)', badge: 'GDG', image: '/gdg.png' },
  { id: 'iit', title: 'Research Intern at IIT (BHU) — Varanasi', badge: 'IIT(BHU)', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400' },
];

// ─────────────────────────────────────────────────────────────
// CLOCK (IST)
// ─────────────────────────────────────────────────────────────
const Clock = () => {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-US', {
      hour12: false, timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit',
    }));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-[11px] tabular-nums text-zinc-500">{t}</span>;
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 32;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }
};

// ─────────────────────────────────────────────────────────────
// COMMAND PALETTE
// ─────────────────────────────────────────────────────────────
const CommandPalette = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const actions = [
    { label: 'Experience', action: () => scrollToSection('experience') },
    { label: 'Education', action: () => scrollToSection('education') },
    { label: 'Projects', action: () => scrollToSection('projects') },
    { label: 'GitHub Activity', action: () => scrollToSection('github') },
    { label: 'Skills & Tech', action: () => scrollToSection('skills') },
    { label: 'Awards', action: () => scrollToSection('awards') },
    { label: 'Highlights', action: () => scrollToSection('highlights') },
    { label: 'View Resume', action: () => window.open(RESUME_URL, '_blank') },
    { label: 'Send Email', action: () => window.location.href = 'mailto:ashish.nanda1902@gmail.com' },
    { label: 'GitHub Profile', action: () => window.open('https://github.com/ashishnanda19', '_blank') },
    { label: 'Copy URL', action: () => navigator.clipboard.writeText(window.location.href) },
  ];
  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    inputRef.current?.focus();
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.97, y: -8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, y: -8 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-md bg-[#1c1c1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07]">
          <Search size={14} className="text-zinc-500 shrink-0" />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search sections, actions..."
            className="flex-1 bg-transparent font-mono text-sm text-white placeholder-zinc-600 outline-none" />
          <button onClick={onClose} className="text-zinc-600 hover:text-zinc-400 transition-colors"><X size={14} /></button>
        </div>
        <div className="max-h-60 overflow-y-auto p-2">
          {filtered.map((a, i) => (
            <button key={i} onClick={() => { a.action?.(); onClose(); }}
              className="w-full flex items-center px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left cursor-pointer">
              <span className="font-mono text-[13px] text-zinc-400">{a.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.07]">
          <span className="font-mono text-[10px] text-zinc-600">↑↓ navigate · ↵ select</span>
          <span className="font-mono text-[10px] text-zinc-600">esc to close</span>
        </div>
      </motion.div>
    </motion.div>
  );
};



// ─────────────────────────────────────────────────────────────
// EXPERIENCE ACCORDION ITEM
// ─────────────────────────────────────────────────────────────
const ExpItem = ({ item }: { item: ExperienceItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="group">
      <div className="flex items-center gap-3 py-3 cursor-pointer hover:bg-white/[0.02] px-2 rounded-lg -mx-2 transition-colors"
        onClick={() => setOpen(o => !o)}>
        <div className="w-10 h-10 shrink-0 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-base emoji-icon overflow-hidden">
          {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> : item.emoji || '💼'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-white leading-tight">{item.title}</div>
          <div className="text-[12px] text-zinc-500 font-mono mt-0.5">{item.role}</div>
        </div>
        <div className="text-right shrink-0 hidden sm:block">
          <div className="text-[12px] font-mono text-zinc-400 font-medium">{item.dates}</div>
          <div className="text-[11px] font-mono text-zinc-600">{item.location}</div>
        </div>
        <ChevronDown size={14} className={`shrink-0 text-zinc-600 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      <div className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.33,1,0.68,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className={`ml-12 pl-1 pb-4 transition-all duration-400 ${open ? 'opacity-100' : 'opacity-0'}`}>
            {item.metrics && (
              <div className="grid grid-cols-4 gap-3 mb-4 pt-3">
                {item.metrics.map(m => (
                  <div key={m.label}>
                    <p className="text-[15px] font-bold text-white">{m.value}</p>
                    <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            )}
            <ul className="space-y-2 mb-3">
              {item.description.split('\n').filter(l => l.trim()).map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-zinc-400 font-mono leading-relaxed">
                  <span className="text-zinc-600 mt-[3px] shrink-0">•</span>
                  {pt.trim()}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {item.tech.map(t => (
                <span key={t} className="px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-white/[0.04] mx-0" />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// PROJECT CARD (matching screenshots style)
// ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project }: { project: ProjectItem }) => {
  const [hovered, setHovered] = useState(false);
  const statusMap = {
    live: { dot: 'bg-emerald-400', label: 'Live' },
    building: { dot: 'bg-orange-400', label: 'Building' },
    not_started: { dot: 'bg-zinc-600', label: 'Not Started' },
  };
  const st = statusMap[project.status];

  return (
    <div className="flex flex-col cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.open(project.github, '_blank')}>
      {/* Card preview */}
      <div className={`relative w-full rounded-xl border border-white/[0.08] overflow-hidden bg-gradient-to-br ${project.bgColor || 'from-zinc-900 to-black'} transition-all duration-300 transform group-hover:-translate-y-1.5 group-hover:shadow-2xl ${hovered ? 'border-white/[0.15]' : ''}`}
        style={{ aspectRatio: '1.45' }}>
        {/* macOS-style dots */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: project.accent ? `${project.accent}90` : 'rgba(255,255,255,0.2)' }} />
        </div>
        {/* Pin icon top right */}
        {project.status === 'live' && (
          <div className="absolute top-3 right-3 z-10 w-5 h-5 rounded border border-white/10 bg-white/5 flex items-center justify-center">
            <span className="text-[8px] text-zinc-600">📌</span>
          </div>
        )}
        {/* Center content */}
        {project.image ? (
          <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-90 group-hover:rounded-xl avatar" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pt-4">
            <span className="text-5xl emoji-icon">{project.emoji || '⚡'}</span>
            <div className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: project.accent || '#a1a1aa' }}>
              {project.tech[0]}
            </div>
            <div className="flex flex-wrap justify-center gap-1 px-4">
              {project.tech.slice(0, 3).map(t => (
                <span key={t} className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-zinc-500 bg-black/20">{t}</span>
              ))}
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Info below */}
      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[15px] text-white">{project.name}</h3>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/[0.07] bg-white/[0.03]">
            <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">{st.label}</span>
          </div>
        </div>
        <p className="text-[12px] text-zinc-500 leading-relaxed line-clamp-2 font-mono">{project.desc}</p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.05]">
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.tech.slice(0, 4).map(t => (
              <img key={t} src={`https://cdn.simpleicons.org/${t}/71717a`} alt={t} className="w-3.5 h-3.5 opacity-50"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            ))}
          </div>
          <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors">
            View Project <ExternalLink size={10} />
          </span>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// GITHUB ACTIVITY (heatmap — gray scale matching screenshots)
// ─────────────────────────────────────────────────────────────
type ContribDay = { date: string; count: number };

const GithubActivity = () => {
  const [weeks, setWeeks] = useState<ContribDay[][]>([]);
  const [total, setTotal] = useState(0);
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<{ count: number; date: string; x: number; y: number } | null>(null);

  const buildEmptyWeeks = () => {
    const today = new Date();
    return Array.from({ length: 53 }, (_, wi) =>
      Array.from({ length: 7 }, (_, di) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (52 - wi) * 7 - (6 - di));
        return { date: d.toISOString().slice(0, 10), count: 0 };
      })
    );
  };

  useEffect(() => {
    const cached = localStorage.getItem('gh_contrib_v2_ashish19');
    if (cached) {
      try { const p = JSON.parse(cached); setWeeks(p.weeks); setTotal(p.total); setMonths(p.months || []); setLoading(false); } catch { /* ignore */ }
    }
    fetch('https://github-contributions-api.jogruber.de/v4/ashishnanda19?y=last')
      .then(r => r.json())
      .then((data: { contributions: { date: string; count: number }[]; total: { lastYear: number } }) => {
        const contribs = data.contributions || [];
        // group into weeks of 7
        const ws: ContribDay[][] = [];
        for (let i = 0; i < contribs.length; i += 7) {
          ws.push(contribs.slice(i, i + 7).map(d => ({ date: d.date, count: d.count })));
        }
        // Extract month labels (one per ~4 weeks)
        const mLabels: string[] = [];
        ws.forEach((week, wi) => {
          if (week[0]) {
            const d = new Date(week[0].date);
            const m = d.toLocaleString('en-US', { month: 'short' });
            if (wi === 0 || mLabels[mLabels.length - 1] !== m) mLabels.push(m);
            else mLabels.push('');
          }
        });
        const t = data.total?.lastYear || contribs.reduce((s, d) => s + d.count, 0);
        setWeeks(ws); setTotal(t); setMonths(mLabels); setLoading(false);
        localStorage.setItem('gh_contrib_v2_ashish19', JSON.stringify({ weeks: ws, total: t, months: mLabels }));
      }).catch(() => setLoading(false));
  }, []);

  // Matching screenshot — gradient from dark gray to lighter (greenish at high count)
  const cellColor = (count: number) => {
    if (count === 0) return '#1a1a18';
    if (count <= 2) return '#2d3018';
    if (count <= 5) return '#404d1e';
    if (count <= 9) return '#5a6e28';
    return '#7a9835';
  };

  const displayWeeks = loading || weeks.length === 0 ? buildEmptyWeeks() : weeks;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[16px] font-semibold text-white">GitHub Activity</h2>
        <span className="font-mono text-[11px] text-zinc-500">{loading ? '...' : `${total.toLocaleString()} Github activities in the last year`}</span>
      </div>
      <div className="bg-[#111110] border border-white/[0.06] rounded-xl p-4 relative">
        <div className="overflow-x-auto">
          {/* Month labels */}
          <div className="flex gap-[3px] mb-1 min-w-max">
            <div className="w-[18px]" />
            {months.map((m, i) => (
              <div key={i} className="w-[13px] font-mono text-[9px] text-zinc-600 truncate" style={{ minWidth: 13 }}>{m}</div>
            ))}
          </div>
          <div className="flex gap-[3px] min-w-max">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] w-[18px] shrink-0">
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                <div key={i} className="h-[13px] font-mono text-[8px] text-zinc-700 flex items-center">{d}</div>
              ))}
            </div>
            {displayWeeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div key={di}
                    className="w-[13px] h-[13px] rounded-[2px] cursor-pointer transition-all hover:ring-1 hover:ring-white/20"
                    style={{ background: cellColor(day.count) }}
                    onMouseEnter={e => {
                      const r = e.currentTarget.getBoundingClientRect();
                      setTooltip({ count: day.count, date: day.date, x: r.left + r.width / 2, y: r.top - 8 });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 font-mono text-[10px] text-zinc-600">
          <span>Less active</span>
          <div className="flex gap-1">
            {['#1a1a18', '#2d3018', '#404d1e', '#5a6e28', '#7a9835'].map((c, i) => (
              <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ background: c }} />
            ))}
          </div>
          <span>More active</span>
        </div>
      </div>
      {tooltip && (
        <div className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className="bg-[#1c1c1a] border border-white/10 text-zinc-300 text-[10px] font-mono px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap">
            <span className="text-white font-bold">{tooltip.count}</span> contributions · {new Date(tooltip.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// SKILLS (matching screenshot pill style)
// ─────────────────────────────────────────────────────────────
const SkillsGrid = () => (
  <div>
    <h2 className="text-[16px] font-semibold text-white mb-4">Skills & Technologies</h2>
    <div className="flex flex-wrap gap-2">
      {SKILLS.map(skill => (
        <div key={skill.name}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#111110] border border-white/[0.07] rounded-full transition-all hover:border-white/[0.15] hover:bg-white/[0.03]">
          <img src={`https://cdn.simpleicons.org/${skill.icon}/a1a1aa`} alt={skill.name}
            className="w-3.5 h-3.5"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <span className="text-[12px] font-mono text-zinc-400">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// AWARDS SECTION
// ─────────────────────────────────────────────────────────────
const AwardsSection = () => {
  const awards = [
    { text: 'Finalist — International Innovation Challenge (IIC)', badge: 'IIC' },
    { text: 'National Semifinalist — Flipkart GRiD 7.0', badge: 'GRID' },
    { text: '5× Dean\'s List of Excellence', badge: '5×' },
    { text: 'LeetCode — 600+ solved · Peak 1,808 rating (Top 7.71%)', badge: 'LC' },
    { text: 'CodeChef — 2 Star · Max rating 1,540', badge: 'CC' },
  ];
  return (
    <div id="awards" className="scroll-mt-24">
      <h2 className="text-[16px] font-semibold text-white mb-4">Awards & Recognition</h2>
      <div className="flex flex-col">
        {awards.map((a, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] hover:bg-white/[0.02] -mx-2 px-2 rounded transition-colors group">
            <span className="text-[13px] text-zinc-400 group-hover:text-zinc-200 transition-colors">{a.text}</span>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-green-500/30 text-green-400/70 bg-green-500/5 shrink-0 ml-3">
              {a.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// HIGHLIGHTS SCROLL STRIP
// ─────────────────────────────────────────────────────────────
const HighlightsStrip = () => {
  const doubled = [...HIGHLIGHTS, ...HIGHLIGHTS];
  return (
    <div id="highlights" className="scroll-mt-24">
      <h2 className="text-[16px] font-semibold text-white mb-4">Highlights</h2>
      <div className="relative overflow-hidden -mx-6 px-6">
        <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#0b0b09] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#0b0b09] to-transparent z-10 pointer-events-none" />
        <div className="highlights-track flex gap-4 w-max">
          {doubled.map((h, i) => (
            <div key={i} className="w-[240px] shrink-0 bg-[#111110] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-all group">
              <div className="w-full aspect-video bg-[#1a1a18] rounded-lg mb-3 flex items-center justify-center border border-white/[0.04] overflow-hidden">
                {h.image ? (
                  <img src={h.image} alt={h.title} className="w-full h-full object-cover grayscale opacity-70 hover:opacity-100 transition-opacity avatar" />
                ) : (
                  <span className="text-2xl">🏆</span>
                )}
              </div>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-white/[0.08] text-zinc-600 uppercase tracking-widest">
                {h.badge}
              </span>
              <p className="text-[13px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors mt-2 leading-snug line-clamp-2">
                {h.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [palOpen, setPalOpen] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setPalOpen(o => !o); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0b0b09] text-[#e8e6de] relative overflow-x-hidden selection:bg-white/20">

      {/* Command Palette */}
      <AnimatePresence>
        {palOpen && <CommandPalette onClose={() => setPalOpen(false)} />}
      </AnimatePresence>



      {/* Single centered column — everything inside */}
      <div style={{ maxWidth: 780, margin: '0 auto', backgroundColor: '#0b0b09', borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)', minHeight: '100vh', position: 'relative' }}>

      {/* Banner — within the centered column */}
      <div style={{ width: '100%', height: 220, position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <img src="/banner.jpg" alt="banner" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.82 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #0b0b09 100%)' }} />
        <div style={{ position: 'absolute', bottom: 12, right: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock />
          <span className="font-mono" style={{ fontSize: 11, color: '#52525b' }}>·</span>
          <span className="font-mono" style={{ fontSize: 11, color: '#52525b' }}>Jaipur, IN</span>
        </div>
      </div>

      {/* Profile + content */}
      <div style={{ padding: '0 24px' }}>

        {/* Profile section */}
        <div className="border-b border-white/[0.06] pb-8">
          {/* Avatar row + controls */}
          <div className="flex items-start justify-between -mt-10 mb-5 relative z-10">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full border-2 border-[#0b0b09] bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-xl overflow-hidden">
              <img src="/portimage.png" alt="Ashish Nanda" className="w-full h-full object-cover" />
            </div>
            {/* Controls */}
            <div className="flex items-center gap-2 pt-12">
              <button onClick={() => setPalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1a1a18] border border-white/[0.08] rounded-lg font-mono text-[11px] text-zinc-500 hover:text-zinc-300 hover:border-white/15 transition-all shadow-sm">
                <span>⌘</span><span>K</span>
              </button>
              <button onClick={() => document.documentElement.classList.toggle('theme-light')}
                className="w-8 h-8 bg-[#1a1a18] border border-white/[0.08] rounded-lg flex items-center justify-center hover:border-white/15 transition-all shadow-sm group">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Name + bio */}
          <div className="mb-1 flex items-baseline gap-5">
            <h1 className="text-[26px] font-bold text-white tracking-tight">Ashish Nanda</h1>
            <span className="font-mono text-[14px] text-zinc-600">22</span>
          </div>

          <div className="flex flex-col gap-3.5 mb-6 text-[15px] text-zinc-400 leading-relaxed">
            <p>Engineer. I love building, breaking, and shipping things.</p>
            <p>Backend, distributed systems, and AI infrastructure excite me. I believe actions speak louder than words, so I put my code where my mouth is.</p>
            <p>Currently a <span className="text-white font-medium">Research Intern at IIT (BHU)</span>, open to SWE roles (2027).</p>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 mb-8">
            <a href="mailto:ashish.nanda1902@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-[#1a1a18] border border-white/[0.08] rounded-lg font-mono text-[12px] text-zinc-300 hover:border-white/20 hover:text-white transition-all shadow-sm">
              <Mail size={13} />
              Send an email
            </a>
            <a href={RESUME_URL} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1a1a18] border border-white/[0.08] rounded-lg font-mono text-[12px] text-zinc-300 hover:border-white/20 hover:text-white transition-all shadow-sm">
              <FileText size={13} />
              Resume
            </a>
          </div>

          {/* Socials */}
          <div className="mb-3">
            <span className="text-[14px] text-zinc-400">Here are my <span className="text-white font-medium">socials</span></span>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'GitHub', icon: Github, url: 'https://github.com/ashishnanda19' },
              { name: 'Twitter', icon: Twitter, url: 'https://x.com/ashish19n' },
              { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/ashishnanda19/' },
              { name: 'LeetCode', icon: Code, url: 'https://leetcode.com/u/ashishnanda19/' },
            ].map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-[#161615] border border-white/5 rounded-md text-[13px] text-zinc-300 hover:text-white hover:border-white/10 transition-all shadow-sm">
                <s.icon size={14} className="text-zinc-500" />
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Content sections */}
        <div className="flex flex-col gap-3 py-10 pb-24">

          {/* EXPERIENCES */}
          <div id="experience" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-white">Experiences</h2>
            </div>
            <div>
              {EXPERIENCE.map((item, i) => <ExpItem key={i} item={item} />)}
            </div>
            <div className="flex justify-center mt-5">
              {/* <button className="font-mono text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors flex items-center gap-1">
                View All <ExternalLink size={10} />
              </button> */}
            </div>
          </div>

          {/* EDUCATION */}
          <div id="education" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-white">Education</h2>
            </div>
            <div>
              {EDUCATION.map((item, i) => <ExpItem key={i} item={item} />)}
            </div>
          </div>

          {/* PROJECTS */}
          <div id="projects" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[16px] font-semibold text-white">Projects</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PROJECTS.slice(0, 4).map(p => <ProjectCard key={p.slug} project={p} />)}
            </div>
            {PROJECTS.length > 4 && (
              <div className="flex justify-center mt-6">
                <a href="https://github.com/ashishnanda19" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors border border-white/[0.07] rounded-lg px-5 py-2 hover:border-white/15">
                  View All <ExternalLink size={11} />
                </a>
              </div>
            )}
          </div>

          {/* GITHUB ACTIVITY */}
          <div id="github" className="scroll-mt-24">
            <GithubActivity />
          </div>

          {/* SKILLS */}
          <div id="skills" className="scroll-mt-24">
            <SkillsGrid />
          </div>

          {/* AWARDS */}
          <AwardsSection />

          {/* HIGHLIGHTS */}
          <HighlightsStrip />

          {/* FOOTER */}
          <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[13px] font-bold text-white">Ashish Nanda</p>
              <p className="font-mono text-[11px] text-zinc-600 mt-0.5">Portfolio © 2026</p>
            </div>
            <div className="flex gap-3">
              {[
                { icon: Github, url: 'https://github.com/ashishnanda19' },
                { icon: Linkedin, url: 'https://www.linkedin.com/in/ashishnanda19/' },
                { icon: Twitter, url: 'https://x.com/ashish19n' },
                { icon: Mail, url: 'mailto:ashish.nanda1902@gmail.com' },
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer"
                  className="text-zinc-700 hover:text-zinc-400 transition-colors">
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>{/* end px-4 sm:px-6 */}
    </div>{/* end max-w-[680px] mx-auto */ }
    </div >
  );
}
