import React from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InteractiveBackground: React.FC<{ theme: string }> = ({ theme: _theme }) => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#080c16]">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      {/* Ambient gradient blobs — barely visible, adds depth */}
      <motion.div
        className="absolute -top-48 -left-48 w-[52rem] h-[52rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18), transparent 60%)' }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-48 -right-48 w-[48rem] h-[48rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.12), transparent 60%)' }}
        animate={{ x: [0, -30, 20, 0], y: [0, -15, 25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(8,12,22,0.65) 100%)',
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
