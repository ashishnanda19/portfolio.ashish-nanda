import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Figure {
  id: number;
  // Position of the hover hotspot as % of container
  left: string;
  top: string;
  // Where the quote bubble appears relative to hotspot
  bubbleDir: 'top' | 'bottom' | 'left' | 'right';
  label: string;
  quote: string;
  emoji: string;
}

const figures: Figure[] = [
  {
    id: 1,
    left: '18%',
    top: '28%',
    bubbleDir: 'right',
    label: 'DISCIPLINE & DRIVE',
    quote: 'sudo rm -rf distractions/ && git commit -m "stayed focused"',
    emoji: '🏎️',
  },
  {
    id: 2,
    left: '46%',
    top: '22%',
    bubbleDir: 'bottom',
    label: 'VISION & CLARITY',
    quote: "I don't always write clean code, but when I do… I forget to comment it.",
    emoji: '😤',
  },
  {
    id: 3,
    left: '30%',
    top: '68%',
    bubbleDir: 'top',
    label: 'GROWTH',
    quote: 'npm install --save-dev sanity\n⚠️  Package not found.',
    emoji: '😭',
  },
  {
    id: 4,
    left: '61%',
    top: '58%',
    bubbleDir: 'top',
    label: 'TIMELESS ELEGANCE',
    quote: "Deployed to prod on a Friday. See you on the other side. Or never.",
    emoji: '💀',
  },
  {
    id: 5,
    left: '81%',
    top: '35%',
    bubbleDir: 'left',
    label: 'QUIET CONFIDENCE',
    quote: "Googling 'how to center a div' for the 847th time. Quietly.",
    emoji: '🤫',
  },
];

const bubbleOffset: Record<Figure['bubbleDir'], React.CSSProperties> = {
  top:    { bottom: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)' },
  bottom: { top:    'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)' },
  left:   { right:  'calc(100% + 14px)', top:  '50%', transform: 'translateY(-50%)' },
  right:  { left:   'calc(100% + 14px)', top:  '50%', transform: 'translateY(-50%)' },
};

// Small caret pointing from bubble back toward the hotspot
const Caret = ({ dir }: { dir: Figure['bubbleDir'] }) => {
  const base = 'absolute w-0 h-0 border-[7px] border-transparent';
  const styles: Record<Figure['bubbleDir'], string> = {
    top:    `${base} border-t-gray-900/90 top-full left-1/2 -translate-x-1/2`,
    bottom: `${base} border-b-gray-900/90 bottom-full left-1/2 -translate-x-1/2`,
    left:   `${base} border-l-gray-900/90 left-full top-1/2 -translate-y-1/2`,
    right:  `${base} border-r-gray-900/90 right-full top-1/2 -translate-y-1/2`,
  };
  return <div className={styles[dir]} />;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InteractiveBackground: React.FC<{ theme: string }> = ({ theme: _theme }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#111111]">
      {/* Static wallpaper — same in light and dark */}
      <img
        src="/background.png"
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{ opacity: 0.9 }}
      />

      {/* Subtle vignette — same in both modes */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.5) 100%)',
        }}
      />

      {/* Interactive figure hotspots */}
      {figures.map((fig) => (
        <div
          key={fig.id}
          className="absolute z-20"
          style={{ left: fig.left, top: fig.top, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setHoveredId(fig.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Pulsing ring hotspot */}
          <div className="relative flex items-center justify-center w-10 h-10 cursor-pointer">
            {/* Outer pulse ring */}
            <motion.div
              animate={hoveredId === fig.id
                ? { scale: 1.6, opacity: 0 }
                : { scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={hoveredId === fig.id
                ? { duration: 0.3 }
                : { repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-white/50"
            />
            {/* Inner dot */}
            <motion.div
              animate={{ scale: hoveredId === fig.id ? 1.3 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`w-3 h-3 rounded-full border-2 border-white/80 ${
                hoveredId === fig.id ? 'bg-white' : 'bg-white/30'
              } shadow-[0_0_8px_rgba(255,255,255,0.6)]`}
            />
          </div>

          {/* Quote bubble */}
          <AnimatePresence>
            {hoveredId === fig.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                className="absolute pointer-events-none z-30"
                style={bubbleOffset[fig.bubbleDir]}
              >
                <div className="relative bg-gray-900/90 backdrop-blur-md text-white rounded-xl shadow-2xl border border-white/10 p-4"
                  style={{ width: 240 }}>
                  <Caret dir={fig.bubbleDir} />

                  {/* Label row */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg leading-none">{fig.emoji}</span>
                    <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                      {fig.label}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line font-mono">
                    "{fig.quote}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default InteractiveBackground;
