import React from 'react';
import { Flame, Star, Award, TrendingUp, Sparkles, Copy, Heart } from 'lucide-react';
import { Username } from '../types';
import { TRENDING_USERNAMES } from '../utils/generator';

interface TrendingLeaderboardProps {
  onCopyIndividual: (text: string) => void;
}

const POPULAR_CATEGORIES = [
  { name: 'OG / Ultra Short', count: 18453, growth: '+24%' },
  { name: 'Brandable SaaS Roots', count: 14210, growth: '+12%' },
  { name: 'Gaming / Clans', count: 28945, growth: '+18%' },
  { name: 'Aesthetic / Cozy', count: 22100, growth: '+29%' }
];

const LEADERBOARD_COPIED = [
  { text: 'Zyrox', style: 'GAMING', copies: 3820, trend: 'HOT' },
  { text: 'Azyr', style: 'OG_RARE', copies: 2490, trend: 'HIGH' },
  { text: 'q7x', style: 'OG_3CH', copies: 1980, trend: 'STEADY' },
  { text: 'Kyzen', style: 'BRANDABLE', copies: 1420, trend: 'RISING' }
];

export default function TrendingLeaderboard({ onCopyIndividual }: TrendingLeaderboardProps) {
  return (
    <section id="leaderboard-analytics-widget" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Background radial effects */}
      <div className="absolute top-1/2 right-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[90px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* LEADERBOARD PANEL COLUMN */}
        <div className="md:col-span-6 space-y-6">
          <div className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            {/* Window control details */}
            <div className="flex gap-1.5 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></span>
            </div>

            <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
              <TrendingUp className="h-4.5 w-4.5 text-cyan-400" />
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white font-display">
                Global Copied Leaderboards
              </h3>
            </div>

            <div className="mt-6 space-y-3.5">
              {LEADERBOARD_COPIED.map((user, idx) => (
                <div
                  key={user.text}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/[0.02] hover:bg-white/[0.08] transition duration-200"
                >
                  <div className="flex items-center space-x-3.5">
                    {/* Rank indicator badge */}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border border-white/10 text-[10px] font-mono font-bold text-cyan-400">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="font-mono text-xs font-black text-white">{user.text}</span>
                        <span className="text-[8px] font-mono font-bold text-slate-500 uppercase">
                          {user.style}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {user.copies.toLocaleString()} copies this week
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider ${
                        user.trend === 'HOT'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : user.trend === 'HIGH'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      }`}
                    >
                      {user.trend}
                    </span>
                    <button
                      onClick={() => onCopyIndividual(user.text)}
                      className="rounded bg-slate-950 p-1.5 text-slate-400 hover:text-white border border-white/5 transition"
                      title="Quick Copy"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRENDING SECTION PANEL */}
        <div className="md:col-span-6 space-y-6">
          <div className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            {/* Window control details */}
            <div className="flex gap-1.5 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500/20 border border-purple-500/50"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/20 border border-cyan-500/50"></span>
            </div>

            <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
              <Flame className="h-4.5 w-4.5 text-purple-400 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white font-display">
                Live Trending Styles Feed
              </h3>
            </div>

            {/* Trending Items Grid layout */}
            <div className="mt-6 grid grid-cols-2 gap-3.5">
              {TRENDING_USERNAMES.map((item) => (
                <div
                  key={item.text}
                  className="rounded-xl border border-white/5 bg-[#050505]/40 p-3.5 hover:border-purple-500/40 transition group duration-200"
                >
                  <div className="flex items-baseline justify-between border-b border-white/[0.04] pb-1.5">
                    <span className="font-mono text-xs font-black text-white group-hover:text-purple-400 transition lowercase font-display">
                      @{item.text.toLowerCase()}
                    </span>
                    <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      {item.style}
                    </span>
                  </div>

                  {/* Display tags */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {item.tags.map(t => (
                      <span
                        key={t}
                        className="rounded bg-white/5 px-1 py-0.5 text-[8px] font-mono font-semibold text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Digital meaning line on hover */}
                  <p className="mt-2.5 text-[9px] text-slate-500 leading-normal line-clamp-1 group-hover:line-clamp-none transition-all">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>

            {/* Categories Yield indexes */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-display">
                Trending Category Indexes
              </h4>
              <div className="mt-3.5 grid grid-cols-2 gap-3">
                {POPULAR_CATEGORIES.map(cat => (
                  <div key={cat.name} className="bg-[#050505]/30 rounded-lg p-2.5 border border-white/[0.04] hover:bg-white/5 transition duration-200">
                    <span className="text-[10px] font-semibold text-slate-300 block truncate">
                      {cat.name}
                    </span>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="font-mono text-xs text-white font-bold">
                        {cat.count.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-emerald-400 font-extrabold font-mono">{cat.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
