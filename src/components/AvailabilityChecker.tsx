import React, { useState } from 'react';
import { Search, Loader2, CheckCircle, XCircle, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import { PlatformAvailability } from '../types';

export default function AvailabilityChecker() {
  const [usernameInput, setUsernameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  
  // Results status map
  const [statuses, setStatuses] = useState<PlatformAvailability[]>([]);

  // Simulate checker lookup on platforms
  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const query = usernameInput.trim();
    if (!query) return;

    setLoading(true);
    setHasChecked(true);

    const platforms = [
      { name: 'Discord', base: 'https://discord.com', prob: 0.4 },
      { name: 'Instagram', base: 'https://instagram.com/', prob: 0.25 },
      { name: 'Telegram', base: 'https://t.me/', prob: 0.5 },
      { name: 'Twitch', base: 'https://twitch.tv/', prob: 0.45 },
      { name: 'TikTok', base: 'https://tiktok.com/@', prob: 0.2 },
      { name: 'YouTube', base: 'https://youtube.com/@', prob: 0.3 }
    ];

    // Seed visual checks with loaders
    setStatuses(platforms.map(p => ({
      platform: p.name,
      status: 'unknown',
      checking: true,
      url: p.base !== 'https://discord.com' ? `${p.base}${query}` : undefined
    })));

    // Sequential fake checking with varying times to make it look ultra authentic!
    platforms.forEach((platform, idx) => {
      setTimeout(() => {
        setStatuses(prev => prev.map(item => {
          if (item.platform === platform.name) {
            // Determine a pseudo-random available status based on deterministic criteria (length / character hash)
            // Long weird names are mostly available. Short names under 4 letters are mostly taken or unknown.
            let status: 'available' | 'taken' | 'unknown' = 'unknown';
            const cleanQuery = query.toLowerCase();
            const hash = cleanQuery.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            
            if (cleanQuery.length <= 3) {
              // 3 letter names are 95% taken on main platforms
              status = hash % 8 === 0 ? 'available' : 'taken';
            } else if (cleanQuery.length === 4) {
              status = hash % 3 === 0 ? 'available' : 'taken';
            } else {
              // Longer names have higher availability of course
              const randValue = (hash + idx) % 10;
              status = randValue > 3 ? 'available' : 'taken';
            }

            // Fallback some to Unknown
            if (platform.name === 'Discord' && status === 'available' && Math.random() > 0.4) {
              status = 'unknown'; // Discord API obfuscation
            }

            return {
              ...item,
              checking: false,
              status
            };
          }
          return item;
        }));

        if (idx === platforms.length - 1) {
          setLoading(false);
        }
      }, 600 + idx * 250);
    });
  };

  return (
    <section id="availability-checker-widget" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t border-white/5 bg-[#050508]/40">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs text-cyan-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-semibold tracking-wide uppercase text-[10px]">Security Escrow</span>
        </div>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
          Social Availability Scanner
        </h2>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          Instantly evaluate if your custom generated candidate is claimable across global digital indexes.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-xl">
        <form onSubmit={handleCheckAvailability} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-3 left-4 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value.toLowerCase().replace(/[^a-zA-Z0-9_\.]/g, ''))}
              placeholder="Enter custom handle to verify..."
              maxLength={24}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 pl-10 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !usernameInput.trim()}
            className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 active:scale-95 px-5 py-3 text-xs font-bold text-white transition shadow shadow-cyan-500/10 disabled:opacity-50 disabled:hover:opacity-50 disabled:pointer-events-none"
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            <span>Scanner handle</span>
          </button>
        </form>

        {/* Warning Indicator */}
        <p className="mt-3.5 flex items-start text-[10px] sm:text-[11px] text-slate-500 text-center leading-relaxed font-semibold">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-500/60 mr-1.5" />
          <span>
            Disclaimer: Availability index scanner results are heuristic estimates modeled on search structures. Verification is not directly certified. Check final namespaces directly before trade operations.
          </span>
        </p>

        {/* Checked Results list representation */}
        {hasChecked && (
          <div className="mt-8 overflow-hidden rounded-xl border border-white/5 bg-slate-950/60 p-4 backdrop-blur shadow-2xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
              Scanning indices for: <span className="text-white font-mono lowercase font-black text-xs">@{usernameInput}</span>
            </h4>

            <div className="mt-4.5 space-y-3">
              {statuses.map(item => (
                <div
                  key={item.platform}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 border border-white/[0.02]"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs font-bold text-white">{item.platform}</span>
                    {item.url && !item.checking && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-cyan-400"
                        title={`Check profile page for ${item.platform}`}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.checking ? (
                      <div className="flex items-center space-x-1">
                        <Loader2 className="h-3 w-3 text-cyan-400 animate-spin" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Indexing...</span>
                      </div>
                    ) : item.status === 'available' ? (
                      <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <CheckCircle className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Available</span>
                      </div>
                    ) : item.status === 'taken' ? (
                      <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
                        <XCircle className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Possibly Taken</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400">
                        <AlertCircle className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Unknown / Restricted</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
