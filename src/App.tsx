import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Star, Copy, Trash2, X, Download, Archive, Activity, ClipboardList, Info, AlertCircle
} from 'lucide-react';
import { FavoriteCollection, ActivityHistoryItem, Username } from './types';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import GeneratorEngine from './components/GeneratorEngine';
import AvailabilityChecker from './components/AvailabilityChecker';
import TrendingLeaderboard from './components/TrendingLeaderboard';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function App() {
  // Favorite collections state (loaded from local storage)
  const [favoriteCollections, setFavoriteCollections] = useState<FavoriteCollection[]>([]);

  // Action logs history state
  const [activityHistory, setActivityHistory] = useState<ActivityHistoryItem[]>([]);

  // Total generation counters inside session
  const [generatedCount, setGeneratedCount] = useState(0);

  // Layout Drawers toggles
  const [showFavoritesDrawer, setShowFavoritesDrawer] = useState(false);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);

  // Active list identifier inside Drawer
  const [activeDrawerColId, setActiveDrawerColId] = useState<string>('');

  // Copy toast states inside sidebar drawer
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Ref scroll anchors link
  const generatorRef = useRef<HTMLDivElement | null>(null);

  // 1. Initial Load hook from local storage
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('usergen_favorites_collections');
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites);
        setFavoriteCollections(parsed);
        if (parsed.length > 0) {
          setActiveDrawerColId(parsed[0].id);
        }
      } else {
        // Preset sample favorite collection to bootstrap
        const sampleCol: FavoriteCollection = {
          id: '1',
          name: 'My Rare Candidates',
          usernames: [
            { text: 'Zyrox', style: 'GAMING', length: 5, tags: ['Epic', 'Hot'], meaning: 'Futuristic obsidian star. Excellent for aggressive gamers.' },
            { text: 'q7x', style: 'OG', length: 3, tags: ['OG', 'Short'], meaning: 'Short alphanumeric matrix code name.' }
          ]
        };
        setFavoriteCollections([sampleCol]);
        setActiveDrawerColId('1');
      }

      const storedHistory = localStorage.getItem('usergen_activity_history_v2');
      if (storedHistory) {
        setActivityHistory(JSON.parse(storedHistory));
      }
    } catch (err) {
      console.error('Failed to read localStorage index:', err);
    }
  }, []);

  // 2. Persistent Save hook to local storage on changes
  useEffect(() => {
    if (favoriteCollections.length > 0) {
      localStorage.setItem('usergen_favorites_collections', JSON.stringify(favoriteCollections));
    }
  }, [favoriteCollections]);

  useEffect(() => {
    if (activityHistory.length > 0) {
      localStorage.setItem('usergen_activity_history_v2', JSON.stringify(activityHistory));
    }
  }, [activityHistory]);

  // Method to increment generation volumes
  const handleIncrementGenerated = (amount: number) => {
    setGeneratedCount(prev => prev + amount);
  };

  // Method to append history tracking items
  const handleAddHistory = (text: string, action: 'generated' | 'copied' | 'favorited', style?: string) => {
    const newItem: ActivityHistoryItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action,
      style
    };

    setActivityHistory(prev => {
      // Retain max 40 items inside log stack to avoid local storage exhaustion
      const updated = [newItem, ...prev];
      return updated.slice(0, 40);
    });
  };

  // Click handler to copy individual item
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    handleAddHistory(text, 'copied');
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Remove favorited item from specific collection
  const handleRemoveFavorite = (collectionId: string, text: string) => {
    setFavoriteCollections(prev => prev.map(col => {
      if (col.id === collectionId) {
        return {
          ...col,
          usernames: col.usernames.filter(u => u.text.toLowerCase() !== text.toLowerCase())
        };
      }
      return col;
    }));
  };

  // Clear specific bookmark lists completely
  const handleClearCollection = (collectionId: string) => {
    setFavoriteCollections(prev => prev.map(col => {
      if (col.id === collectionId) {
        return { ...col, usernames: [] };
      }
      return col;
    }));
  };

  // Scroll smoothly to interactive generators
  const handleScrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeCol = favoriteCollections.find(c => c.id === activeDrawerColId) || favoriteCollections[0];

  return (
    <div className="min-h-screen bg-[#030307] text-slate-100 font-sans tracking-normal selection:bg-purple-600/30 selection:text-purple-200 antialiased overflow-x-hidden">
      {/* Structural Headers */}
      <Header
        favoriteCollections={favoriteCollections}
        onOpenFavorites={() => setShowFavoritesDrawer(true)}
        generatedCount={generatedCount}
      />

      {/* Main Landing Page Panels */}
      <main className="relative z-10 pb-16">
        <HeroSection onScrollToGenerator={handleScrollToGenerator} />

        <StatsSection favoriteCollections={favoriteCollections} generatedCount={generatedCount} />

        <TrendingLeaderboard onCopyIndividual={handleCopyText} />

        {/* Generator Main Anchor Node */}
        <GeneratorEngine
          favoriteCollections={favoriteCollections}
          setFavoriteCollections={setFavoriteCollections}
          onAddHistory={handleAddHistory}
          onIncrementGenerated={handleIncrementGenerated}
          scrollToAnchorRef={generatorRef}
        />

        <AvailabilityChecker />

        {/* Dynamic Activity History Tracker Panel toggles directly in main page space */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/5 bg-[#0a0a0f] p-5">
            <button
              onClick={() => setShowHistoryPanel(!showHistoryPanel)}
              className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              <div className="flex items-center space-x-2">
                <Activity className="h-4.5 w-4.5 text-blue-500" />
                <span>Live Action Logs ({activityHistory.length} tracked)</span>
              </div>
              <span className="text-blue-400 hover:text-blue-300 transition text-[11px]">
                {showHistoryPanel ? 'Collapse Logs ▲' : 'Expand Logs ▼'}
              </span>
            </button>

            {showHistoryPanel && (
              <div className="mt-5 border-t border-white/5 pt-4">
                {activityHistory.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-4">No events logged yet. Spin the generator to log details.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-1">
                    {activityHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg bg-[#050508]/65 border border-white/5 p-2.5 text-xs"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[9px] text-slate-600">{item.timestamp}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[8px] font-bold uppercase ${
                              item.action === 'copied'
                                ? 'bg-amber-400/10 text-amber-400'
                                : item.action === 'favorited'
                                ? 'bg-purple-400/10 text-purple-400'
                                : 'bg-blue-400/10 text-blue-400'
                            }`}
                          >
                            {item.action}
                          </span>
                          <span className="font-mono text-slate-300 font-semibold truncate max-w-28">{item.text}</span>
                        </div>
                        {item.style && (
                          <span className="text-[9px] text-slate-500 uppercase font-bold">{item.style}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setActivityHistory([]);
                      localStorage.removeItem('usergen_activity_history_v2');
                    }}
                    className="flex items-center space-x-1 rounded bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 text-[10px] text-rose-400 font-semibold uppercase border border-rose-500/20 transition"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Purge History</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <FAQSection />
      </main>

      <Footer />

      {/* OVERLAY PANEL DRAWER: PERSISTENT FAVORITES SIDEBAR */}
      {showFavoritesDrawer && (
        <div className="fixed inset-0 z-[120] flex justify-end bg-black/60 backdrop-blur-sm">
          {/* Close Backdrop Click trigger */}
          <div className="absolute inset-0" onClick={() => setShowFavoritesDrawer(false)} />

          <div className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#06060c] p-6 shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-purple-400 fill-purple-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Favorite Collections
                </h3>
              </div>
              <button
                onClick={() => setShowFavoritesDrawer(false)}
                className="rounded-lg bg-white/5 p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* List selector of bookmarks */}
            {favoriteCollections.length > 0 && (
              <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 border-b border-white/5 max-w-full">
                {favoriteCollections.map(col => (
                  <button
                    key={col.id}
                    onClick={() => setActiveDrawerColId(col.id)}
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide transition uppercase shrink-0 ${
                      activeDrawerColId === col.id
                        ? 'bg-purple-600/25 border border-purple-500/50 text-white font-black'
                        : 'bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {col.name} ({col.usernames.length})
                  </button>
                ))}
              </div>
            )}

            {/* Main drawer list items block */}
            <div className="flex-1 mt-4.5 overflow-y-auto space-y-3.5 pr-1">
              {!activeCol || activeCol.usernames.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Archive className="h-10 w-10 text-slate-700 mb-3" />
                  <p className="text-xs text-slate-500 italic max-w-xs">
                    No usernames saved to this collection. Click the star icon next to generated values to persist them!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {activeCol.usernames.map((u, idx) => {
                    const isJustCopied = copiedText === u.text;
                    return (
                      <div
                        key={`${u.text}-${idx}`}
                        className="group relative flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/[0.01]"
                      >
                        <div>
                          <span
                            onClick={() => handleCopyText(u.text)}
                            className="font-mono text-xs font-black text-white cursor-pointer hover:text-purple-400 transition lowercase"
                          >
                            @{u.text.toLowerCase()}
                          </span>
                          <div className="mt-1 flex items-center space-x-1.5">
                            <span className="rounded bg-white/5 px-1 py-0.2 text-[8px] font-bold text-slate-500 text-[8px]">
                              {u.style}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          {/* Copy button */}
                          <button
                            onClick={() => handleCopyText(u.text)}
                            className="rounded bg-slate-900 border border-white/5 p-1.5 text-slate-400 hover:text-white transition"
                            title="Copy to clipboard"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          {/* Delete button */}
                          <button
                            onClick={() => handleRemoveFavorite(activeCol.id, u.text)}
                            className="rounded bg-slate-900 border border-white/5 p-1.5 text-rose-500 hover:bg-rose-500/10 transition"
                            title="Remove from bookmarks"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>

                        {isJustCopied && (
                          <div className="absolute inset-0 flex items-center justify-center bg-purple-500/10 backdrop-blur-[1px] text-[10px] text-white font-bold tracking-wide transition uppercase pointer-events-none rounded-xl">
                            <div className="rounded-full bg-purple-500 px-3 py-1 flex items-center space-x-1">
                              <span>Copied!</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions for active collection */}
            {activeCol && activeCol.usernames.length > 0 && (
              <div className="border-t border-white/5 pt-4 space-y-2">
                <button
                  onClick={() => {
                    const textsList = activeCol.usernames.map(u => u.text).join('\n');
                    navigator.clipboard.writeText(textsList);
                    setCopiedText('__DRAWER_ALL__');
                    handleAddHistory(`All names from ${activeCol.name} copied`, 'copied');
                    setTimeout(() => setCopiedText(null), 2000);
                  }}
                  className="flex w-full items-center justify-center space-x-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 py-3 text-xs font-bold text-white transition shadow shadow-purple-500/5"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy All Names</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleClearCollection(activeCol.id)}
                    className="flex items-center justify-center space-x-1 rounded-xl bg-white/5 hover:bg-white/10 py-2.5 text-xs text-slate-300 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-slate-500" />
                    <span>Clear Collection</span>
                  </button>

                  <button
                    onClick={() => {
                      // Delete entire collection
                      setFavoriteCollections(prev => prev.filter(c => c.id !== activeCol.id));
                      setActiveDrawerColId('');
                    }}
                    className="flex items-center justify-center space-x-1 rounded-xl bg-rose-500/5 border border-rose-500/10 hover:bg-rose-500/10 py-2.5 text-xs text-rose-400 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete Slot</span>
                  </button>
                </div>
              </div>
            )}
            
            {copiedText === '__DRAWER_ALL__' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[1px] text-xs font-bold text-white uppercase tracking-wide pointer-events-none">
                <div className="rounded-xl border border-purple-500 bg-slate-900 p-4 shadow-2xl flex flex-col items-center space-y-2">
                  <Star className="h-6 w-6 text-purple-400 fill-purple-400 animate-bounce" />
                  <span>Entire Collection Copied!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
