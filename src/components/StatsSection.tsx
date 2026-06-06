import React from 'react';
import { Cpu, Layers, Bookmark, Award } from 'lucide-react';
import { FavoriteCollection } from '../types';

interface StatsSectionProps {
  favoriteCollections: FavoriteCollection[];
  generatedCount: number;
}

export default function StatsSection({ favoriteCollections, generatedCount }: StatsSectionProps) {
  const totalSaved = favoriteCollections.reduce((acc, col) => acc + col.usernames.length, 0);

  return (
    <section className="border-y border-white/5 bg-[#050505]/40 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Bento Item 1 */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5 md:p-6 shadow-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.06]">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400">
                Engine Yield
              </span>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {(8240000).toLocaleString()}
              </span>
              <span className="text-[10px] md:text-xs text-cyan-400 font-bold uppercase font-mono">Pool</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Phonetic syllabic patterns indexed</p>
          </div>

          {/* Bento Item 2 */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5 md:p-6 shadow-xl transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06]">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400">
                Categories
              </span>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-2xl font-bold tracking-tight text-white md:text-3xl">14</span>
              <span className="text-[10px] md:text-xs text-purple-400 font-bold uppercase font-mono">Modes</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Preset branding & social categories</p>
          </div>

          {/* Bento Item 3 */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5 md:p-6 shadow-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.06]">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                <Bookmark className="h-5 w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400">
                Saved Names
              </span>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-2xl font-bold tracking-tight text-white md:text-3xl">{totalSaved}</span>
              <span className="text-[10px] md:text-xs text-cyan-400 font-bold uppercase font-mono">SAVED</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Persisted locally inside custom logs</p>
          </div>

          {/* Bento Item 4 */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-5 md:p-6 shadow-xl transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06]">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-slate-400">
                Session Output
              </span>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {generatedCount}
              </span>
              <span className="text-[10px] md:text-xs text-purple-400 font-bold uppercase font-mono">Gen</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">Usernames generated this session</p>
          </div>
        </div>
      </div>
    </section>
  );
}
