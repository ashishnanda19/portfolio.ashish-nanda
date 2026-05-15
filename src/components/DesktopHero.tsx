import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, MapPin } from 'lucide-react';

const ROLES = [
  'Full-Stack Developer',
  'Competitive Programmer',
  'AI / ML Engineer',
  'Research Intern @ IIT(BHU)',
  "CS @ MUJ '27",
  'Chai-Powered Engineer',
];

export default function DesktopHero({ onOpenAbout }: { onOpenAbout: () => void }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 52);
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 28);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, roleIdx]);

  const links = [
    { href: 'https://github.com/ashishnanda19', label: 'GitHub', icon: Github, border: 'hover:border-slate-400/60' },
    { href: 'https://www.linkedin.com/in/ashishnanda19', label: 'LinkedIn', icon: Linkedin, border: 'hover:border-indigo-400/60' },
    { href: 'https://leetcode.com/u/ashishnanda19/', label: 'LeetCode', icon: null, border: 'hover:border-amber-400/60', badge: 'LC' },
    { href: 'mailto:ashish.nanda1902@gmail.com', label: 'Mail', icon: Mail, border: 'hover:border-violet-400/60' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none z-[5]"
    >
      <div className="pointer-events-auto max-w-2xl w-full flex flex-col items-center gap-0">

        {/* Status pill */}
        <div className="mb-6 sm:mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-slate-400 border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm tracking-wide">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight neon-gradient-text leading-[1.08] mb-4 sm:mb-5">
          Ashish Kumar Nanda
        </h1>

        {/* Typewriter role */}
        <div className="h-8 sm:h-10 flex items-center justify-center gap-2 mb-6">
          <span className="text-indigo-400/70 font-mono text-base sm:text-lg select-none">&gt;</span>
          <span className="text-[#a5b4fc] font-mono text-base sm:text-lg font-medium">{typed}</span>
          <span className="blink text-indigo-400 font-mono text-lg">▌</span>
        </div>

        {/* Tagline */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mb-7 sm:mb-10">
          I build full-stack apps, ship scalable backends, and integrate AI into production.
          Currently researching at{' '}
          <span className="text-slate-200 font-medium">IIT (BHU)</span> and studying CS at{' '}
          <span className="text-slate-200 font-medium">Manipal University Jaipur</span>.
        </p>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-8 mb-7 sm:mb-10 w-full max-w-sm">
          {[
            { value: '400+', label: 'LeetCode problems' },
            { value: '1704', label: 'Peak contest rating' },
            { value: '15+', label: 'Projects shipped' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="text-lg sm:text-2xl font-bold text-slate-100 tabular-nums">{s.value}</span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 leading-tight">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mb-7 sm:mb-10" />

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <button onClick={onOpenAbout} className="neon-btn group">
            Explore Portfolio
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-100 border border-white/[0.08] ${link.border} transition-all duration-200 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm`}
            >
              {link.icon ? (
                <link.icon size={14} />
              ) : (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-gradient-to-br from-amber-400 to-orange-500 text-[8px] font-extrabold text-black leading-none">
                  {link.badge}
                </span>
              )}
              {link.label}
            </a>
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <MapPin size={11} />
          India · open to remote
        </div>

        {/* Hint */}
        <p className="mt-8 text-[11px] text-slate-700 tracking-widest uppercase">
          Click an app in the dock to explore
        </p>
      </div>
    </motion.div>
  );
}
