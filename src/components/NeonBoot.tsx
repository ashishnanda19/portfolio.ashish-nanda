import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, Terminal, ArrowRight } from 'lucide-react';

interface NeonBootProps {
  onBoot: () => void;
}

const TYPED_LINES = [
  { text: '> initializing AshishOS v4.7...', delay: 0 },
  { text: '> loading kernel modules ............. OK', delay: 350 },
  { text: '> mounting /coffee  /chaos  /code ..... OK', delay: 700 },
  { text: '> compiling personality.ts ............ OK', delay: 1050 },
  { text: '> bypassing imposter syndrome ......... OK', delay: 1400 },
  { text: '> ready.', delay: 1800 },
];

export default function NeonBoot({ onBoot }: NeonBootProps) {
  const [phase, setPhase] = useState<'landing' | 'booting' | 'done'>('landing');
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (phase !== 'booting') return;
    TYPED_LINES.forEach((line, i) => {
      setTimeout(() => setTypedCount(i + 1), line.delay);
    });
    const total = TYPED_LINES[TYPED_LINES.length - 1].delay + 650;
    const t = setTimeout(() => setPhase('done'), total);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'done') return;
    const t = setTimeout(onBoot, 400);
    return () => clearTimeout(t);
  }, [phase, onBoot]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[99999] overflow-hidden bg-[#080c16] text-slate-200"
        >
          {/* Subtle dot-grid */}
          <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

          {/* Very subtle ambient glow — top-left only */}
          <div
            className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.22), transparent 60%)' }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.14), transparent 60%)' }}
          />

          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6">

            {/* LANDING phase */}
            {phase === 'landing' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center max-w-2xl"
              >
                {/* Logo mark */}
                <div className="mb-8 w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-400/25 flex items-center justify-center shadow-[0_0_32px_rgba(99,102,241,0.2)]">
                  <Terminal size={24} className="text-indigo-300" />
                </div>

                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight neon-gradient-text mb-4">
                  AshishOS
                </h1>

                <p className="text-slate-400 text-base sm:text-lg max-w-lg mb-2">
                  A portfolio built as an operating system. Full-stack engineer,
                  competitive programmer, research intern.
                </p>
                <p className="text-slate-600 text-sm mb-10">
                  Boot it up — it&apos;s worth the 2 seconds.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                  <button
                    onClick={() => setPhase('booting')}
                    className="neon-btn group text-sm"
                  >
                    <Power size={15} />
                    Boot AshishOS
                    <ArrowRight size={14} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => setPhase('booting')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-300 border border-white/[0.06] hover:border-white/[0.14] transition-colors"
                  >
                    skip intro
                  </button>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-8 text-center">
                  {[
                    { v: '9.22', l: 'CGPA · MUJ' },
                    { v: '400+', l: 'LeetCode' },
                    { v: '∞', l: 'Chai consumed' },
                  ].map((s) => (
                    <div key={s.l} className="flex flex-col gap-1">
                      <span className="text-xl font-bold text-slate-200 font-mono">{s.v}</span>
                      <span className="text-xs text-slate-600">{s.l}</span>
                    </div>
                  ))}
                </div>

                <p className="absolute bottom-6 text-[11px] text-slate-700 tracking-[0.3em] uppercase">
                  press the button — it&apos;s not a trap
                </p>
              </motion.div>
            )}

            {/* BOOTING phase */}
            {phase === 'booting' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-xl"
              >
                <div className="font-mono text-sm text-slate-500 space-y-2 mb-8">
                  {TYPED_LINES.slice(0, typedCount).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={i === typedCount - 1 ? 'text-slate-200' : 'text-slate-500'}
                    >
                      {line.text}
                      {i === typedCount - 1 && <span className="blink ml-1 text-indigo-400">▌</span>}
                    </motion.div>
                  ))}
                </div>

                <div className="w-full h-[2px] rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-indigo-500 boot-loader-bar shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                </div>
                <p className="mt-3 text-[11px] text-slate-700 tracking-[0.3em] uppercase text-center">
                  Loading desktop environment
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
