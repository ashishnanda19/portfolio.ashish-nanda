import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const SURPRISES = [
  { emoji: '🚀', text: "you found the secret. now go touch grass." },
  { emoji: '🐛', text: "it's not a bug, it's an undocumented feature." },
  { emoji: '☕', text: "loading personality... please insert chai." },
  { emoji: '🦄', text: "rare easter egg unlocked. ship it!" },
  { emoji: '🧠', text: "200 IQ move. now hire me." },
  { emoji: '💀', text: "this code worked on my machine, I swear." },
];

export default function EasterEggs() {
  const [, setKeys] = useState<string[]>([]);
  const [showKonami, setShowKonami] = useState(false);
  const [surprise, setSurprise] = useState<typeof SURPRISES[0] | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // ignore when typing in inputs
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      setKeys(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.length === KONAMI.length && next.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
          setShowKonami(true);
          setTimeout(() => setShowKonami(false), 6000);
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Random surprise on long idle
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const s = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
        setSurprise(s);
        setTimeout(() => setSurprise(null), 5000);
      }, 45000);
    };
    reset();
    ['mousemove', 'keydown', 'click'].forEach(evt => window.addEventListener(evt, reset, { passive: true }));
    return () => {
      clearTimeout(timer);
      ['mousemove', 'keydown', 'click'].forEach(evt => window.removeEventListener(evt, reset));
    };
  }, []);

  return (
    <>
      {/* Konami rainbow takeover */}
      <AnimatePresence>
        {showKonami && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed inset-0 z-[99998] pointer-events-none flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              animate={{ rotate: [0, 4, -4, 0] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              className="relative px-10 py-8 rounded-3xl border border-indigo-400/30 bg-[#0c1120]/95 backdrop-blur-xl text-center max-w-md shadow-[0_8px_48px_rgba(99,102,241,0.35)]"
            >
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-3xl font-extrabold neon-gradient-text mb-2">CHEAT CODE ACTIVATED</h2>
              <p className="text-slate-400">
                +30 lives. +9000 power. You also unlocked the secret that I love chai.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle surprise toast */}
      <AnimatePresence>
        {surprise && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-32 right-6 z-[99997] pointer-events-none"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0c1120]/95 backdrop-blur-xl border border-indigo-400/25 shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-w-xs">
              <span className="text-2xl">{surprise.emoji}</span>
              <span className="text-sm text-slate-200">{surprise.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
