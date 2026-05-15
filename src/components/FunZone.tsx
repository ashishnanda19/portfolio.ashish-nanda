import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Code2, Zap, Heart, Skull, RefreshCw, Sparkles } from 'lucide-react';

const MEMES = [
  { id: 'works-on-my-machine', title: 'Works on my machine', caption: '— me, deploying to prod on a Friday', emoji: '🤡' },
  { id: 'stack-overflow', title: 'Stack Overflow: closed as duplicate', caption: 'Duplicate of a question with zero answers, last active 2011', emoji: '💀' },
  { id: 'git-push-force', title: 'git push --force', caption: "Narrator: that was, in fact, not his branch.", emoji: '🔥' },
  { id: 'recursion', title: 'To understand recursion', caption: 'you must first understand recursion.', emoji: '🌀' },
  { id: 'undefined', title: '"undefined" is not a function', caption: 'undefined sure looks like a function from here.', emoji: '🫠' },
  { id: 'finally-works', title: 'When the code finally compiles', caption: "I don't know what I changed. Don't touch it.", emoji: '🧙' },
];

const TRUTHS = [
  "I write code, drink chai, and call it a balanced lifestyle.",
  "My commit messages are 50% 'fix' and 50% 'final fix actually'.",
  "I've explained recursion to my rubber duck 47 times.",
  "Yes, I tried turning it off and on again. It worked.",
  "I will write the docs. Soon. Definitely. Probably.",
];

export default function FunZone() {
  const [truth, setTruth] = useState(TRUTHS[0]);
  const [clickCount, setClickCount] = useState(0);

  const newTruth = () => {
    const options = TRUTHS.filter(t => t !== truth);
    setTruth(options[Math.floor(Math.random() * options.length)]);
    setClickCount(c => c + 1);
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-[var(--bg-elevated)] text-[var(--text-color)]">
      <div className="p-8 max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-1">
            <Sparkles size={18} className="text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight">Fun Zone</h1>
          </div>
          <p className="text-sm text-slate-500">The unprofessional corner of an otherwise very professional portfolio.</p>
        </div>

        {/* Daily truth */}
        <motion.div
          key={clickCount}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-5 rounded-2xl bg-indigo-500/8 border border-indigo-400/15"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 uppercase tracking-widest font-medium">
              <Zap size={11} /> Daily dev truth
            </div>
            <button onClick={newTruth} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors">
              <RefreshCw size={11} /> next
            </button>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">{truth}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Coffee, label: 'Chai per day', value: '∞' },
            { icon: Code2, label: 'Bugs shipped', value: '0 *' },
            { icon: Heart, label: 'Side projects', value: '15+' },
            { icon: Skull, label: 'Hrs debugging', value: 'all' },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-indigo-400/25 transition-colors">
              <s.icon size={14} className="text-slate-600 mb-2" />
              <div className="text-lg font-bold font-mono text-slate-200">{s.value}</div>
              <div className="text-[11px] text-slate-600 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-700 mb-8">* numbers are a creative interpretation of reality</p>

        {/* Meme grid */}
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Dev memes that hit different</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {MEMES.map((meme, i) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -2 }}
              className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all cursor-default group"
            >
              <span className="text-4xl mb-3 inline-block group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">{meme.emoji}</span>
              <h3 className="font-semibold text-slate-200 mb-1">{meme.title}</h3>
              <p className="text-xs text-slate-500">{meme.caption}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 rounded-2xl border border-white/[0.06] text-center">
          <p className="text-sm text-slate-500">
            Made with ❤️, ☕ and an embarrassing number of{' '}
            <code className="px-1.5 py-0.5 rounded bg-white/[0.05] text-indigo-300 font-mono text-xs">console.log("here")</code>{' '}
            statements.
          </p>
        </div>
      </div>
    </div>
  );
}
