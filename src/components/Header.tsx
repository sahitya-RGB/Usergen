import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Download, ShieldCheck, Heart } from 'lucide-react';
import { FavoriteCollection } from '../types';

interface HeaderProps {
  favoriteCollections: FavoriteCollection[];
  onOpenFavorites: () => void;
  generatedCount: number;
}

export default function Header({ favoriteCollections, onOpenFavorites, generatedCount }: HeaderProps) {
  const [pwaInstallable, setPwaInstallable] = useState(false);
  const [installNotification, setInstallNotification] = useState(false);
  const [displayCount, setDisplayCount] = useState(148762);

  // Simulate increments on global generated usernames to make it feel alive!
  useEffect(() => {
    const baseCount = 142000 + Math.floor((Date.now() - 1718000000000) / 100000);
    setDisplayCount(baseCount + generatedCount);

    const interval = setInterval(() => {
      setDisplayCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, [generatedCount]);

  // Handle fake custom PWA installation experience
  const handlePwaInstall = () => {
    setInstallNotification(true);
    setTimeout(() => {
      setInstallNotification(false);
    }, 4000);
  };

  const totalFavorites = favoriteCollections.reduce((acc, col) => acc + col.usernames.length, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
            U
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            UserGen<span className="text-cyan-400">.</span>
          </span>
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-mono tracking-wide text-cyan-400 uppercase">
            Beta
          </span>
        </div>

        {/* Live Counters */}
        <div className="hidden md:flex items-center space-x-6 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
            </span>
            <span className="font-semibold text-cyan-400">SYSTEMS ONLINE: {displayCount.toLocaleString()} GENERATED</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* PWA Install */}
          <button
            id="install-pwa-btn"
            onClick={handlePwaInstall}
            className="group relative hidden sm:flex items-center space-x-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-500/50 hover:bg-cyan-500/10"
          >
            <Download className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Install App</span>
          </button>

          {/* Favorites Button */}
          <button
            id="favorites-drawer-trigger"
            onClick={onOpenFavorites}
            className="group relative flex items-center space-x-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-xs font-semibold text-purple-300 transition hover:border-purple-500/50 hover:bg-purple-500/15"
          >
            <Star className="h-3.5 w-3.5 text-purple-400 group-hover:fill-purple-400 transition" />
            <span>Favorites</span>
            {totalFavorites > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-purple-500 px-1 text-[9px] font-bold text-white leading-none">
                {totalFavorites}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Embedded PWA Alert Notification */}
      {installNotification && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm rounded-xl border border-white/10 bg-slate-900 p-4 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start space-x-3">
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Standalone App Ready</h4>
              <p className="mt-1 text-xs text-slate-400">
                UserGen has been added to your local device queue! Click "Add to Home Screen" when prompted by your browser for offline generation.
              </p>
              <div className="mt-3 flex items-center space-x-2 text-[10px] text-blue-400 font-semibold uppercase">
                <span>Fast Startup Enabled</span>
                <span>•</span>
                <span>Optimized Caching</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
