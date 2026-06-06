import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Copy, Star, Shuffle, Search, Download, RefreshCw, SlidersHorizontal,
  ArrowRight, Check, ListChecks, HelpCircle, Flame, Grid, List, Plus, Trash2, X, Archive, Info
} from 'lucide-react';
import {
  Username, GeneratorFilters, UsernameStyle, TypeFilter, LengthFilter,
  FavoriteCollection, ActivityHistoryItem
} from '../types';
import { generateUsernames } from '../utils/generator';

interface GeneratorEngineProps {
  favoriteCollections: FavoriteCollection[];
  setFavoriteCollections: React.Dispatch<React.SetStateAction<FavoriteCollection[]>>;
  onAddHistory: (text: string, action: 'generated' | 'copied' | 'favorited', style?: string) => void;
  onIncrementGenerated: (amount: number) => void;
  scrollToAnchorRef: React.RefObject<HTMLDivElement | null>;
}

export default function GeneratorEngine({
  favoriteCollections,
  setFavoriteCollections,
  onAddHistory,
  onIncrementGenerated,
  scrollToAnchorRef
}: GeneratorEngineProps) {
  // Tabs: 'express' | 'ai'
  const [activeTab, setActiveTab] = useState<'express' | 'ai'>('express');

  // Core filter states
  const [filters, setFilters] = useState<GeneratorFilters>({
    length: 'all',
    type: 'all',
    style: 'all',
    count: 25
  });

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Auto-refresh layout toggle
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Generated results pool
  const [results, setResults] = useState<Username[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Search state for results
  const [searchQuery, setSearchQuery] = useState('');

  // Bulk actions selection state
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  // Favorite Collection creation Modal/Pop
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  // Target Collection select state
  const [activeCollectionId, setActiveCollectionId] = useState<string>('');

  // Live generation counters
  const [isRefreshing, setIsRefreshing] = useState(false);

  // View style grid vs list
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Trigger procedural generation
  const handleGenerate = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const generated = generateUsernames(filters);
      setResults(generated);
      onIncrementGenerated(generated.length);
      
      if (generated.length > 0) {
        onAddHistory(
          `${generated.length} names generated`,
          'generated',
          filters.style
        );
      }
      setIsRefreshing(false);
      setSelectedNames([]);
    }, 250);
  };

  // Trigger Smart AI Generation via Gemini
  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiGenerating(true);
    setAiError(null);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          count: filters.count,
          style: filters.style !== 'all' ? filters.style : 'modern'
        }),
      });

      const data = await response.json();
      if (data.success && data.usernames) {
        setResults(data.usernames);
        onIncrementGenerated(data.usernames.length);
        onAddHistory(`AI generated names for "${aiPrompt}"`, 'generated', 'AI_SMART');
      } else {
        // If API key is missing or failed, fall back
        if (data.fallback) {
          setAiError(`${data.error} Falling back to high-fidelity procedural generation.`);
          // Procedural fallback
          const fallbackResults = generateUsernames({
            ...filters,
            style: 'modern'
          });
          setResults(fallbackResults);
          onIncrementGenerated(fallbackResults.length);
        } else {
          setAiError(data.error || 'Failed to generate usernames. Please retry.');
        }
      }
    } catch (err: any) {
      console.error(err);
      setAiError('Network disconnect. Activating high-performance procedural fallback names.');
      // Offline fallback
      const offlineFallback = generateUsernames(filters);
      setResults(offlineFallback);
    } finally {
      setIsAiGenerating(false);
      setSelectedNames([]);
    }
  };

  // Trigger generation automatically on filters changes if Auto-Refresh active
  useEffect(() => {
    if (autoRefresh && activeTab === 'express') {
      handleGenerate();
    }
  }, [filters, autoRefresh, activeTab]);

  // Set default favorite collection if exists
  useEffect(() => {
    if (favoriteCollections.length > 0 && !activeCollectionId) {
      setActiveCollectionId(favoriteCollections[0].id);
    }
  }, [favoriteCollections]);

  // Trigger initial generate on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  // Shuffle option values
  const handleShuffleFilters = () => {
    const lengths: LengthFilter[] = ['all', '3', '4', '5', '6', '7', '8+'];
    const types: TypeFilter[] = ['all', 'letters', 'alphanumeric', 'brandable', 'gaming', 'social', 'rare', 'og'];
    const styles: UsernameStyle[] = ['random', 'og', 'rare', 'aesthetic', 'brandable', 'gaming', 'discord', 'instagram', 'telegram', 'freefire', 'clan', 'minimal', 'cool'];

    const randomLength = lengths[Math.floor(Math.random() * lengths.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];

    setFilters(prev => ({
      ...prev,
      length: randomLength,
      type: randomType,
      style: randomStyle
    }));

    onAddHistory('Filters shuffled', 'generated', 'SHUFFLE');
  };

  // Copy individual username
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    onAddHistory(text, 'copied');
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Copy batch of selected names
  const handleCopySelected = () => {
    if (selectedNames.length === 0) return;
    navigator.clipboard.writeText(selectedNames.join('\n'));
    setCopiedText('__SELECTED__');
    onAddHistory(`${selectedNames.length} names copied in bulk`, 'copied');
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Export visible usernames
  const handleExport = (format: 'txt' | 'csv' | 'json') => {
    const dataList = searchQuery
      ? results.filter(r => r.text.toLowerCase().includes(searchQuery.toLowerCase()))
      : results;

    if (dataList.length === 0) return;

    let content = '';
    let filename = `usergen-export-${Date.now()}`;
    let mimeType = 'text/plain';

    if (format === 'txt') {
      content = dataList.map(r => r.text).join('\n');
      filename += '.txt';
    } else if (format === 'csv') {
      content = 'Username,Style,Length,Tags,Significance Meaning\n' +
        dataList.map(r => `"${r.text}","${r.style}",${r.length},"${r.tags.join(' | ')}","${(r.meaning || '').replace(/"/g, '""')}"`).join('\n');
      filename += '.csv';
      mimeType = 'text/csv';
    } else if (format === 'json') {
      content = JSON.stringify(dataList, null, 2);
      filename += '.json';
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onAddHistory(`Exported ${dataList.length} items as ${format.toUpperCase()}`, 'copied');
  };

  // Toggle favorite items inside the selected collection
  const handleToggleFavorite = (user: Username) => {
    if (favoriteCollections.length === 0) {
      // Auto create General Collection
      const defaultCol: FavoriteCollection = {
        id: '1',
        name: 'General Matches',
        usernames: [user]
      };
      setFavoriteCollections([defaultCol]);
      setActiveCollectionId('1');
      onAddHistory(user.text, 'favorited', user.style);
      return;
    }

    const targetColId = activeCollectionId || favoriteCollections[0].id;
    setFavoriteCollections(prev => prev.map(col => {
      if (col.id === targetColId) {
        const index = col.usernames.findIndex(u => u.text.toLowerCase() === user.text.toLowerCase());
        if (index > -1) {
          // Remove
          const updatedUsernames = [...col.usernames];
          updatedUsernames.splice(index, 1);
          return { ...col, usernames: updatedUsernames };
        } else {
          // Add
          onAddHistory(user.text, 'favorited', user.style);
          return { ...col, usernames: [...col.usernames, user] };
        }
      }
      return col;
    }));
  };

  // Check if item is favorited
  const isFavorited = (text: string) => {
    return favoriteCollections.some(col => col.usernames.some(u => u.text.toLowerCase() === text.toLowerCase()));
  };

  // Toggle select state for bulk operations
  const handleToggleSelect = (text: string) => {
    setSelectedNames(prev => {
      if (prev.includes(text)) {
        return prev.filter(n => n !== text);
      } else {
        return [...prev, text];
      }
    });
  };

  // Toggle select all visible
  const handleToggleSelectAll = (visibleNames: string[]) => {
    if (selectedNames.length === visibleNames.length) {
      setSelectedNames([]);
    } else {
      setSelectedNames(visibleNames);
    }
  };

  // Create local bookmark collection
  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    const newCol: FavoriteCollection = {
      id: Date.now().toString(),
      name: newCollectionName.trim(),
      usernames: []
    };
    setFavoriteCollections(prev => [...prev, newCol]);
    setActiveCollectionId(newCol.id);
    setNewCollectionName('');
    setShowNewCollectionModal(false);
  };

  // Preset styles buttons list
  const stylePresets: { label: string; value: UsernameStyle | 'all' }[] = [
    { label: 'All Styles', value: 'all' },
    { label: 'OG/Rare', value: 'og' },
    { label: 'Aesthetic', value: 'aesthetic' },
    { label: 'Brandable', value: 'brandable' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'Free Fire', value: 'freefire' },
    { label: 'Clan Tags', value: 'clan' },
    { label: 'Minimalist', value: 'minimal' },
    { label: 'Discord', value: 'discord' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Telegram', value: 'telegram' }
  ];

  // Filter outputs
  const filteredResults = searchQuery
    ? results.filter(r => r.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : results;

  const visibleTexts = filteredResults.map(r => r.text);

  return (
    <div ref={scrollToAnchorRef} id="generator-engine-core" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Tab Switchers */}
      <div className="flex justify-center border-b border-white/5 pb-1">
        <nav className="flex space-x-6" aria-label="Generator Mode Selection">
          <button
            onClick={() => setActiveTab('express')}
            className={`group relative flex items-center space-x-2 py-4 px-1 text-sm font-semibold border-b-2 transition ${
              activeTab === 'express'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${activeTab === 'express' ? 'text-blue-400' : 'text-slate-500'} group-hover:rotate-45 transition-transform`} />
            <span>⚡ Express Generator</span>
            <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[10px] text-blue-400 font-medium">Instant</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`group relative flex items-center space-x-2 py-4 px-1 text-sm font-semibold border-b-2 transition ${
              activeTab === 'ai'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className={`h-4 w-4 ${activeTab === 'ai' ? 'text-purple-400 animate-pulse' : 'text-slate-500'} group-hover:scale-110 transition-transform`} />
            <span>🧠 AI Smart Generator</span>
            <span className="rounded-full bg-purple-500/10 px-1.5 py-0.5 text-[10px] text-purple-400 font-medium">Gemini 3.5</span>
          </button>
        </nav>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SIDEBAR: Controls and Options Configuration */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-5 md:p-6 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-1.5">
                <SlidersHorizontal className="h-4.5 w-4.5 text-blue-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">Options Engine</h3>
              </div>
              <button
                onClick={handleShuffleFilters}
                className="flex items-center space-x-1 rounded bg-white/5 px-2 py-1 text-[11px] font-semibold text-slate-300 transition hover:bg-white/10"
                title="Randomize filters"
              >
                <Shuffle className="h-3 w-3 text-purple-400" />
                <span>Shuffle</span>
              </button>
            </div>

            <div className="mt-5 space-y-5">
              {/* Filter: Length */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Length Constraint
                </label>
                <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                  {(['all', '3', '4', '5', '6', '7', '8+'] as LengthFilter[]).map(len => (
                    <button
                      key={len}
                      onClick={() => setFilters(prev => ({ ...prev, length: len }))}
                      className={`rounded px-2 py-1.5 text-xs font-semibold uppercase transition ${
                        filters.length === len
                          ? 'bg-blue-500 text-white font-bold'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {len === 'all' ? 'Any' : len}
                    </button>
                  ))}
                </div>
                {filters.length === '3' && (
                  <p className="mt-1.5 text-[10px] text-blue-400">🔥 Pro tip: Perfect for finding OG 3-character handles!</p>
                )}
              </div>

              {/* Filter: Alphanumerics or Letters only */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Output Format Type
                </label>
                <div className="mt-2.5 space-y-2">
                  {(['all', 'letters', 'alphanumeric'] as TypeFilter[]).slice(0, 3).map(type => (
                    <button
                      key={type}
                      onClick={() => setFilters(prev => ({ ...prev, type: type }))}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition ${
                        filters.type === type
                          ? 'border-blue-500/50 bg-blue-500/10 text-white font-bold'
                          : 'border-white/5 bg-white/5 text-slate-300 hover:border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span>
                        {type === 'all' ? 'Mixed Combinations' : type === 'letters' ? 'Alphabetic Only (No numbers)' : 'Alphanumeric Index (Letters + Numbers)'}
                      </span>
                      {filters.type === type && <Check className="h-3.5 w-3.5 text-blue-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result quantity Selector */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Batch Capacity</span>
                  <span className="font-mono text-blue-400 font-bold">{filters.count} names</span>
                </label>
                <div className="mt-3.5 flex space-x-1.5">
                  {[10, 25, 50, 100].map(cnt => (
                    <button
                      key={cnt}
                      onClick={() => setFilters(prev => ({ ...prev, count: cnt }))}
                      className={`flex-1 rounded py-1.5 text-xs font-bold transition ${
                        filters.count === cnt
                          ? 'bg-purple-600 text-white font-extrabold'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive target collection for Favorites */}
              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Active Favorites List
                  </label>
                  <button
                    onClick={() => setShowNewCollectionModal(true)}
                    className="flex items-center space-x-0.5 text-xs text-purple-400 hover:text-purple-300"
                  >
                    <Plus className="h-3 w-3" />
                    <span>New List</span>
                  </button>
                </div>

                <select
                  value={activeCollectionId}
                  onChange={(e) => setActiveCollectionId(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  {favoriteCollections.length === 0 ? (
                    <option value="">No lists saved</option>
                  ) : (
                    favoriteCollections.map(col => (
                      <option key={col.id} value={col.id}>
                        ⭐ {col.name} ({col.usernames.length} saved)
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Instant Auto-Refresh switch */}
              {activeTab === 'express' && (
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-xs text-slate-400">Instant generation update</span>
                  <button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      autoRefresh ? 'bg-blue-600' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        autoRefresh ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN RESULTS CONTAINER ENGINE */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* AI Prompter Block or Preset Pillars */}
          {activeTab === 'ai' ? (
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
                <h3 className="text-sm font-semibold text-white">Gemini Smart AI Prompter</h3>
              </div>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Describe the specific persona, theme, or concept you want. Gemini will output structured premium names.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. cyberninja dark rogue, aesthetic cozy baker shop, glowing neon star..."
                  className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <button
                  onClick={handleAiGenerate}
                  disabled={isAiGenerating || !aiPrompt.trim()}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-600/10 active:translate-y-0 disabled:opacity-55 disabled:hover:translate-y-0"
                >
                  {isAiGenerating ? (
                    <span className="flex items-center space-x-1.5">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Thinking...</span>
                    </span>
                  ) : (
                    <span>Ask Gemini AI</span>
                  )}
                </button>
              </div>

              {aiError && (
                <div className="mt-3 flex items-start space-x-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-2.5 text-[11px] text-rose-300">
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-rose-400" />
                  <span>{aiError}</span>
                </div>
              )}
            </div>
          ) : (
            /* Style Preset badging line of pills */
            <div className="flex flex-wrap gap-2 py-0.5 bg-slate-950/25 p-3 rounded-xl border border-white/5">
              {stylePresets.map(preset => {
                const isSelected = filters.style === preset.value;
                return (
                  <button
                    key={preset.value}
                    onClick={() => setFilters(prev => ({ ...prev, style: preset.value }))}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition ${
                      isSelected
                        ? 'bg-blue-500/20 border border-blue-400/30 text-blue-300'
                        : 'bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Results Action Bar: Search, Bulk Copy, Selection toggle, view style */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/40 p-3 rounded-xl border border-white/5">
            {/* Search items bar */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search generated list..."
                className="w-full rounded-lg border border-white/5 bg-slate-900/60 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-2.5 right-3 text-slate-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Bulk items action toolbar */}
            <div className="flex w-full sm:w-auto items-center justify-end space-x-2">
              {/* Select All */}
              {filteredResults.length > 0 && (
                <button
                  onClick={() => handleToggleSelectAll(visibleTexts)}
                  className="flex items-center space-x-1 rounded bg-white/5 border border-white/5 hover:border-white/10 px-2.5 py-2 text-[11px] font-semibold text-slate-300 hover:text-white"
                >
                  <ListChecks className="h-3.5 w-3.5 text-blue-400" />
                  <span>
                    {selectedNames.length === filteredResults.length ? 'Deselect All' : 'Select All'}
                  </span>
                </button>
              )}

              {/* View Styles toggle */}
              <div className="flex space-x-0.5 rounded-lg border border-white/5 bg-white/5 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-md p-1.5 text-slate-400 hover:text-white transition ${
                    viewMode === 'grid' ? 'bg-[#0a0a10] text-blue-400' : ''
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-md p-1.5 text-slate-400 hover:text-white transition ${
                    viewMode === 'list' ? 'bg-[#0a0a10] text-blue-400' : ''
                  }`}
                  aria-label="List View"
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Express Generation Button (if manual trigger used) */}
              {activeTab === 'express' && !autoRefresh && (
                <button
                  onClick={handleGenerate}
                  disabled={isRefreshing}
                  className="flex items-center space-x-1 rounded bg-blue-500 hover:bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Generate</span>
                </button>
              )}
            </div>
          </div>

          {/* Bulk selected state bar floating or pinned */}
          {selectedNames.length > 0 && (
            <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-900/30 via-[#0d0d15] to-purple-900/30 p-3 border border-blue-500/20 text-xs">
              <span className="text-blue-300 font-semibold uppercase tracking-wide">
                Selected {selectedNames.length} usernames
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopySelected}
                  className="flex items-center space-x-1 rounded bg-blue-500/20 px-2.5 py-1.5 font-bold text-blue-300 hover:bg-blue-500/30 border border-blue-400/20 transition"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy Selection</span>
                </button>

                <div className="h-4 w-px bg-white/10" />

                {/* Exporters dropdown buttons */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleExport('txt')}
                    className="flex items-center space-x-0.5 rounded bg-white/5 border border-white/5 px-2 py-1.5 text-[10px] font-semibold text-slate-300 hover:bg-white/10"
                  >
                    <span>TXT</span>
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="flex items-center space-x-0.5 rounded bg-white/5 border border-white/5 px-2 py-1.5 text-[10px] font-semibold text-slate-300 hover:bg-white/10"
                  >
                    <span>CSV</span>
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="flex items-center space-x-0.5 rounded bg-white/5 border border-white/5 px-2 py-1.5 text-[10px] font-semibold text-slate-300 hover:bg-white/10"
                  >
                    <span>JSON</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results list view block */}
          {filteredResults.length === 0 ? (
            <div className="relative flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-16 px-4 text-center">
              <Archive className="h-10 w-10 text-slate-600 mb-3" />
              <h4 className="text-sm font-semibold text-white">No Usernames in Frame</h4>
              <p className="mt-1 max-w-sm text-xs text-slate-400">
                Adjust filter constraints or search criteria, or click "Generate Usernames" to kick off a new set of handles.
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
                  : 'flex flex-col space-y-2'
              }
            >
              {filteredResults.map((user, idx) => {
                const isItemSel = selectedNames.includes(user.text);
                const isItemFav = isFavorited(user.text);
                const isJustCopied = copiedText === user.text;

                return (
                  <div
                    key={`${user.text}-${idx}`}
                    className={`group relative overflow-hidden rounded-xl border p-4 backdrop-blur-md transition-all duration-200 ${
                      isItemSel
                        ? 'border-blue-500/40 bg-blue-500/5 shadow-md shadow-blue-500/5'
                        : 'border-white/5 bg-[#09090f]/74 hover:border-slate-700/60 hover:bg-[#0c0c16]/90'
                    }`}
                  >
                    {/* Hover Meaning / Aura Drawer at top background */}
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center space-x-1 bg-slate-950/80 rounded-md border border-white/5 p-1">
                        <button
                          onClick={() => handleToggleFavorite(user)}
                          className="rounded p-1 text-slate-400 hover:text-purple-400 transition"
                          title="Save to Favorite list"
                        >
                          <Star className={`h-3 w-3 ${isItemFav ? 'fill-purple-400 text-purple-400' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleCopy(user.text)}
                          className="rounded p-1 text-slate-400 hover:text-blue-400 transition"
                          title="Copy Username"
                        >
                          {isJustCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>

                    {/* Checkbox Multi selector box */}
                    <div className="absolute top-4.5 left-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={isItemSel}
                        onChange={() => handleToggleSelect(user.text)}
                        className="h-3.5 w-3.5 rounded border-white/20 bg-slate-900 text-blue-500 focus:ring-0"
                      />
                    </div>

                    {/* Card Content body */}
                    <div className="pl-6.5">
                      <div className="flex items-baseline space-x-1.5">
                        <span
                          id={`username-raw-${user.text}`}
                          onClick={() => handleCopy(user.text)}
                          className="font-mono text-base font-extrabold text-white tracking-wide cursor-pointer hover:text-blue-400 transition"
                        >
                          {user.text}
                        </span>
                        <span className="text-[9px] font-mono font-medium text-slate-500 capitalize">
                          {user.length}ch
                        </span>
                      </div>

                      {/* Display tags */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {user.tags.map(t => (
                          <span
                            key={t}
                            className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 uppercase tracking-wider"
                          >
                            {t}
                          </span>
                        ))}
                        {user.isAiGenerated && (
                          <span className="rounded bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-purple-400 tracking-wide">
                            AI
                          </span>
                        )}
                      </div>

                      {/* Digital Meaning Concept (Reveals or exists at bottom) */}
                      {user.meaning && (
                        <p className="mt-3.5 text-[10px] sm:text-[11px] text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                          {user.meaning}
                        </p>
                      )}
                    </div>

                    {/* Copy toast overlay indicators */}
                    {isJustCopied && (
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-600/10 backdrop-blur-[1px] text-xs text-white font-bold tracking-wide transition uppercase pointer-events-none">
                        <div className="rounded-full bg-blue-500 border border-blue-400 px-3 py-1 flex items-center space-x-1 shadow-lg">
                          <Check className="h-3.5 w-3.5" />
                          <span>Copied</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Rapid copiers footer bar */}
          {filteredResults.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredResults.length} unique combinations
              </span>

              <div className="flex items-center space-x-3.5">
                {/* Download All option */}
                <button
                  onClick={() => handleExport('txt')}
                  className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Page (.txt)</span>
                </button>

                <div className="h-3.5 w-px bg-white/10" />

                {/* Regeneration */}
                <button
                  id="regen-page-btn"
                  onClick={handleGenerate}
                  className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 font-bold transition"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>One-Click Refresh</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: NEW COLLECTION CREATION */}
      {showNewCollectionModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create Collections Slot</h3>
              <button
                onClick={() => setShowNewCollectionModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Collection List Name
                </label>
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="e.g. My Twitch Brand, Instagram Handles"
                  maxLength={24}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowNewCollectionModal(false)}
                  className="rounded-lg bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCollection}
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 px-4 py-2 text-xs font-bold text-white transition shadow"
                >
                  Save List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
