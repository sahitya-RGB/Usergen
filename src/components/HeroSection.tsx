import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, Gamepad2, Sparkles, Hash } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onScrollToGenerator: () => void;
}

const PREVIEW_OG_NAMES = ['Vinzu', 'q7x', 'Zyrox', '98j', 'Xevin', 'Azyr', 'v2n', 'Sahyx', 'Kyzen', 'z3r', 'Vynix', 'Qevro', 'axr', 'Axen', 'Vyro'];

export default function HeroSection({ onScrollToGenerator }: HeroSectionProps) {
  const [activeName, setActiveName] = useState('Zyrox');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through some preview OG usernames in the terminal mockup
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % PREVIEW_OG_NAMES.length;
        setActiveName(PREVIEW_OG_NAMES[next]);
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-16 md:pt-28 pb-20">
      {/* Background radial glowing effects */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-cyan-400 tracking-wider mb-8">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          RESERVED ALGORITHMS ONLINE // READY
        </div>

        {/* Title */}
        <h1 className="mx-auto mt-2 max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
          Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-display">Rare</span> <br className="hidden sm:inline"/>digital identity.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400">
          The premium engine for OG hunters, professional gamers, and brand architects. Instant, unique, and optimized combinations verified live.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            id="hero-cta-btn"
            onClick={onScrollToGenerator}
            className="group relative flex w-full sm:flex-1 items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Generator</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            id="hero-secondary-btn"
            onClick={onScrollToGenerator}
            className="flex w-full sm:w-auto items-center justify-center space-x-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 text-sm font-bold text-slate-300 transition hover:border-purple-500/30"
          >
            <Hash className="h-4 w-4 text-purple-400" />
            <span>OG Simulator</span>
          </button>
        </div>

        {/* Interactive mock terminal preview */}
        <div className="mx-auto mt-20 max-w-2xl text-left">
          <div className="relative rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/[0.03] p-1 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">USERGEN_DAEMON_v2.4</div>
              <div className="h-3 w-3 opacity-0" />
            </div>

            <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 space-y-4">
              <div className="flex items-center text-slate-500">
                <span className="text-cyan-400 mr-2">❯</span>
                <span>initialize --pattern og_rare_combinations</span>
              </div>
              <div className="text-slate-400 text-xs sm:text-sm pl-4">
                [info] Searching entropy index for short, non-overlapping phonetic roots...
              </div>
              <div className="flex items-center text-slate-500">
                <span className="text-cyan-400 mr-2">❯</span>
                <span>generate --count 1 --theme cyber_star</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 border border-white/15 rounded-xl py-3 px-4.5">
                <span className="text-[10px] sm:text-xs text-cyan-400 font-extrabold uppercase tracking-wider">RESULT:</span>
                <span className="text-sm sm:text-base text-white font-black tracking-widest bg-slate-950 px-3 py-1 rounded border border-white/5 animate-pulse">
                  {activeName}
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Available
                </span>
              </div>
              <div className="text-[11px] text-slate-500 pl-4 italic leading-relaxed">
                Phonetics: Perfect consonant-vowel layout. High brand utility index: 9.8/10
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
