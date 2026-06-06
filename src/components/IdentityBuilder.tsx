import React, { useState } from 'react';
import { 
  Sparkles, Globe, Download, Copy, Check, Info, ShieldAlert, Cpu, 
  Layers, User, AlignLeft, Hash, Star, Trash2, ArrowRight
} from 'lucide-react';
import { REGIONS, RegionType } from '../utils/nameDatabase';
import { CATEGORIES, CategoryType, generateIdentity, CompleteIdentity } from '../utils/identityGenerator';

export default function IdentityBuilder() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Gamer');
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('American');
  const [generatedIdentity, setGeneratedIdentity] = useState<CompleteIdentity | null>(null);
  
  // AI Wizard state
  const [aiInterests, setAiInterests] = useState('');
  const [aiPersonality, setAiPersonality] = useState('');
  const [aiHobbies, setAiHobbies] = useState('');
  const [aiStyle, setAiStyle] = useState('Mysterious');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Field copying indicators
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  // Trigger organic premium generator
  const handleProceduralGenerate = () => {
    const ident = generateIdentity(selectedCategory, selectedRegion);
    setGeneratedIdentity(ident);
    setAiError(null);
  };

  // Trigger Gemini AI custom generator
  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch('/api/gemini/generate-identity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interests: aiInterests,
          personality: aiPersonality,
          hobbies: aiHobbies,
          style: aiStyle
        })
      });
      const data = await res.json();
      if (data.success && data.identity) {
        // Map the payload into a complete identity object
        const payload = data.identity;
        setGeneratedIdentity({
          firstName: payload.firstName || 'Anon',
          lastName: payload.lastName || 'Player',
          username: payload.username || 'anon_hunter',
          displayName: payload.displayName || 'Anon Player',
          nickname: payload.username || 'anon',
          bio: payload.bio || 'Digital pioneer.',
          aboutMe: payload.description || 'Cohesive AI simulated identity.',
          tagline: payload.tagline || 'Pristine operations online.',
          discordBio: `${payload.bio || 'Exploring new structures.'} 🎮`,
          instagramBio: `${payload.bio || 'Digital pioneer.'}\n📩 Mail me\n📍 Worldwide`,
          telegramBio: `💬 @${payload.username || 'anon_hunter'} // Secure channel`,
          gamingName: payload.gamingAlias || 'Anon_Strike',
          clanName: `${payload.firstName || 'Anon'} Tactics`,
          socialHandles: payload.socialHandles || {
            x: `@${payload.username || 'anon_hunter'}`,
            github: payload.username || 'anon_hunter',
            twitch: `${payload.username || 'anon_hunter'}_live`,
            youtube: `@${payload.username || 'anon_hunter'}Official`
          },
          profileDescription: payload.description || 'AI customized parameters.',
          personalityStyle: aiPersonality || 'Custom AI Styled',
          aestheticTheme: aiStyle || 'Cosmic Slate',
          category: 'AI Customized',
          region: 'Global AI'
        });
      } else {
        throw new Error(data.error || 'Identity generation could not complete.');
      }
    } catch (err: any) {
      setAiError(err.message || 'System failed to reach Gemini. Please verify your internet connection or check fallback modes.');
    } finally {
      setAiLoading(false);
    }
  };

  // Dynamic copying logic
  const copyToClipboard = (fieldName: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1800);
  };

  // One-click copy all fields as formatted list
  const handleCopyAll = () => {
    if (!generatedIdentity) return;
    const items = [
      `== USERGEN IDENTITY REPORT // CATEGORY: ${generatedIdentity.category} ==`,
      `Full Name: ${generatedIdentity.firstName} ${generatedIdentity.lastName}`,
      `Username: @${generatedIdentity.username}`,
      `Display Name: ${generatedIdentity.displayName}`,
      `Nickname: ${generatedIdentity.nickname}`,
      `Sleek Bio: "${generatedIdentity.bio}"`,
      `Tagline: "${generatedIdentity.tagline}"`,
      `About Me: ${generatedIdentity.aboutMe}`,
      `Discord Bio: ${generatedIdentity.discordBio}`,
      `Instagram Bio: ${generatedIdentity.instagramBio}`,
      `Telegram Bio: ${generatedIdentity.telegramBio}`,
      `Gaming Handle: ${generatedIdentity.gamingName}`,
      `Esports Clan: ${generatedIdentity.clanName}`,
      `Social - X.com: ${generatedIdentity.socialHandles.x}`,
      `Social - GitHub: ${generatedIdentity.socialHandles.github}`,
      `Social - Twitch: ${generatedIdentity.socialHandles.twitch}`,
      `Social - YouTube: ${generatedIdentity.socialHandles.youtube}`,
      `Deep Description: ${generatedIdentity.profileDescription}`,
      `Personality Profile: ${generatedIdentity.personalityStyle}`,
      `Aesthetic Framework: ${generatedIdentity.aestheticTheme}`,
      `=============================`
    ].join('\n');
    navigator.clipboard.writeText(items);
    setExportSuccess('Copied All!');
    setTimeout(() => setExportSuccess(null), 2500);
  };

  // Binary/Blob dynamic exporter
  const handleExportFile = (format: 'txt' | 'json' | 'pdf') => {
    if (!generatedIdentity) return;
    let filename = `identity_${generatedIdentity.username.toLowerCase()}`;
    let dataStr = '';
    let mimeType = 'text/plain';

    if (format === 'json') {
      dataStr = JSON.stringify(generatedIdentity, null, 2);
      mimeType = 'application/json';
      filename += '.json';
    } else if (format === 'txt') {
      mimeType = 'text/plain';
      filename += '.txt';
      dataStr = [
        `======================================================`,
        `          USERGEN DIGITAL IDENTITY BUILDER RECAP      `,
        `======================================================`,
        `Timestamp: ${new Date().toISOString()}`,
        `Region: ${generatedIdentity.region}`,
        `Category: ${generatedIdentity.category}`,
        ``,
        `1. IDENTITY FIELDSET`,
        `----------------------------------------`,
        `First Name:          ${generatedIdentity.firstName}`,
        `Last Name:           ${generatedIdentity.lastName}`,
        `Display Name:        ${generatedIdentity.displayName}`,
        `Nickname:            ${generatedIdentity.nickname}`,
        `Username Handle:     @${generatedIdentity.username}`,
        ``,
        `2. SOCIAL CHANNELS`,
        `----------------------------------------`,
        `X / Twitter:         ${generatedIdentity.socialHandles.x}`,
        `GitHub:              ${generatedIdentity.socialHandles.github}`,
        `Twitch Server:       ${generatedIdentity.socialHandles.twitch}`,
        `YouTube Official:    ${generatedIdentity.socialHandles.youtube}`,
        ``,
        `3. INTERACTIVE CORNER BIOS`,
        `----------------------------------------`,
        `Slogan Tagline:      "${generatedIdentity.tagline}"`,
        `Sleek Bio:         "${generatedIdentity.bio}"`,
        `Discord Bio:        ${generatedIdentity.discordBio}`,
        `Instagram Bio:      ${generatedIdentity.instagramBio}`,
        `Telegram Bio:       ${generatedIdentity.telegramBio}`,
        ``,
        `4. GAMING ATTRIBUTES`,
        `----------------------------------------`,
        `Gaming Alias Tag:    ${generatedIdentity.gamingName}`,
        `Clan Division:       ${generatedIdentity.clanName}`,
        ``,
        `5. STYLE ARCHITECTURE`,
        `----------------------------------------`,
        `Aesthetic Theme:     ${generatedIdentity.aestheticTheme}`,
        `Personality Profile: ${generatedIdentity.personalityStyle}`,
        `Profile Details:     ${generatedIdentity.aboutMe}`,
        `Detailed Summary:    ${generatedIdentity.profileDescription}`,
        `======================================================`
      ].join('\n');
    } else if (format === 'pdf') {
      // Create a clean formatted text-based PDF container structure complying with portable reading standards
      mimeType = 'application/pdf';
      filename += '.pdf';
      
      const title = `USERGEN CORE DIGITAL IDENTITY REPORT`;
      const subtitle = `Generated uniquely via dynamic algorithmic combinations -- Region: ${generatedIdentity.region}`;
      const line = `---------------------------------------------------------`;
      
      const bodyText = [
        title,
        subtitle,
        line,
        `First Name:          ${generatedIdentity.firstName}`,
        `Last Name:           ${generatedIdentity.lastName}`,
        `Username:            @${generatedIdentity.username}`,
        `Display Name:        ${generatedIdentity.displayName}`,
        `Nickname:            ${generatedIdentity.nickname}`,
        `Tagline:             "${generatedIdentity.tagline}"`,
        `Simple Bio:          "${generatedIdentity.bio}"`,
        `About Me Narrative:  ${generatedIdentity.aboutMe}`,
        `Discord Bio:         ${generatedIdentity.discordBio}`,
        `Instagram Bio:       ${generatedIdentity.instagramBio}`,
        `Telegram Bio:        ${generatedIdentity.telegramBio}`,
        `Gaming Brand Name:   ${generatedIdentity.gamingName}`,
        `Esports Clan Tag:    ${generatedIdentity.clanName}`,
        `X Handle:            ${generatedIdentity.socialHandles.x}`,
        `GitHub Portfolio:    ${generatedIdentity.socialHandles.github}`,
        `Twitch Profile:      ${generatedIdentity.socialHandles.twitch}`,
        `YouTube Channel:     ${generatedIdentity.socialHandles.youtube}`,
        `Profile Description: ${generatedIdentity.profileDescription}`,
        `Personality Style:   ${generatedIdentity.personalityStyle}`,
        `Aesthetic Framework: ${generatedIdentity.aestheticTheme}`,
        line,
        `Offline verification token: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      ].join('\r\n');

      // Formatting a minimum complaint physical text page PDF string
      const pdfString = [
        `%PDF-1.4`,
        `1 0 obj`,
        `<< /Type /Catalog /Pages 2 0 R >>`,
        `endobj`,
        `2 0 obj`,
        `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`,
        `endobj`,
        `3 0 obj`,
        `<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>`,
        `endobj`,
        `4 0 obj`,
        `<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold >>`,
        `endobj`,
        `5 0 obj`,
        `<< /Length ${bodyText.length + 100} >>`,
        `stream`,
        `BT`,
        `/F1 10 Tf`,
        `12 TL`,
        `50 780 Td`,
      ]
      .concat(
        bodyText.split('\r\n').map(l => `(${l.replace(/[()]/g, '')}) Tj T*`)
      )
      .concat([
        `ET`,
        `endstream`,
        `endobj`,
        `xref`,
        `0 6`,
        `0000000000 65535 f `,
        `trailer`,
        `<< /Size 6 /Root 1 0 R >>`,
        `startxref`,
        `120`,
        `%%EOF`
      ]).join('\n');

      dataStr = pdfString;
    }

    const blob = new Blob([dataStr], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportSuccess(`Downloaded ${format.toUpperCase()}!`);
    setTimeout(() => setExportSuccess(null), 2500);
  };

  return (
    <section id="identity-builder-section" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Background radial effects */}
      <div className="absolute top-1/4 right-1/3 -z-10 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Title block */}
      <div className="text-center md:text-left mb-12 border-b border-white/5 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[11px] font-mono text-cyan-400 tracking-wider mb-4 uppercase">
          <Layers className="w-3.5 h-3.5" />
          High-Entropy Credentials
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight font-display">
          Identity Builder<span className="text-cyan-400">.</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm max-w-2xl leading-relaxed">
          Instantly generate a highly detailed digital persona or professional gaming portfolio. Create complete matching tags, bios, aesthetic themes, and globally synchronized handles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Controls Generator options */}
        <div className="lg:col-span-4 space-y-6">
          {/* CONTROL BOX: INSTANT PROCEDURAL */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
              <Cpu className="h-4.5 w-4.5 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200 font-mono">
                Procedural Generator
              </h3>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-slate-400 mb-2">
                Identity Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500/50 focus:outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-slate-400 mb-2">
                Name Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as RegionType)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500/50 focus:outline-none"
              >
                {REGIONS.map(reg => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleProceduralGenerate}
              className="relative flex w-full items-center justify-center space-x-2 rounded-full bg-cyan-500 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 translate-y-[-1px]" />
              <span>Instantiate Identity</span>
            </button>
          </div>

          {/* CONTROL BOX: AI CUSTOM GENERATOR */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-xl">
            <div className="flex items-center space-x-2 border-b border-white/5 pb-3 mb-4">
              <Sparkles className="h-4.5 w-4.5 text-purple-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200 font-mono">
                AI Custom Generator
              </h3>
            </div>

            <form onSubmit={handleAiGenerate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                  My Interests
                </label>
                <input
                  type="text"
                  placeholder="e.g. coffee, rust coding, mechanical keyboards"
                  value={aiInterests}
                  onChange={(e) => setAiInterests(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-purple-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                  Personality Style
                </label>
                <input
                  type="text"
                  placeholder="e.g. introverted, calculated, cozy"
                  value={aiPersonality}
                  onChange={(e) => setAiPersonality(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-purple-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                  Hobbies / Lifestyle
                </label>
                <input
                  type="text"
                  placeholder="e.g. street photography, speedrunning"
                  value={aiHobbies}
                  onChange={(e) => setAiHobbies(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-purple-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">
                  Preferred Theme Style
                </label>
                <select
                  value={aiStyle}
                  onChange={(e) => setAiStyle(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white focus:border-purple-500/50 focus:outline-none"
                >
                  <option value="Mysterious">Mysterious Noir</option>
                  <option value="Cyberpunk Neon">Cyberpunk Neon</option>
                  <option value="Anime Cute">Anime / Cute Kawaii</option>
                  <option value="Hollywood Hero">Hollywood / Cinematic Heroes</option>
                  <option value="Cozy Lo-fi">Cozy Lo-fi Ambient</option>
                  <option value="Minimalist Slate">Minimalist Slate</option>
                  <option value="Brutalist Mono">Brutalist Terminal</option>
                  <option value="Alpine White">Alpine Snow</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={aiLoading}
                className="relative flex w-full items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-xs font-bold text-white hover:opacity-90 disabled:opacity-50 transition cursor-pointer"
              >
                {aiLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    <span>AI Engineering...</span>
                  </>
                ) : (
                  <>
                    <span>AI Generate Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {aiError && (
              <div className="mt-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] p-2 rounded-lg flex items-start gap-1.5 leading-relaxed font-mono">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-red-400" />
                <span>{aiError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Displays parsed identity block of 17 fields */}
        <div className="lg:col-span-8">
          {generatedIdentity ? (
            <div className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Card Title Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                      {generatedIdentity.category}
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">Region: {generatedIdentity.region}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                    {generatedIdentity.firstName} {generatedIdentity.lastName}
                  </h3>
                </div>

                {/* Exporters panel */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopyAll}
                    className="flex items-center space-x-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-1.8 text-xs font-semibold text-slate-300 transition"
                  >
                    <Copy className="w-3 h-3 text-cyan-400" />
                    <span>Copy All</span>
                  </button>

                  <div className="flex bg-slate-950 rounded-full border border-white/10 p-0.5">
                    <button
                      onClick={() => handleExportFile('txt')}
                      className="px-3 py-1.2 rounded-full text-[10px] font-bold text-slate-400 hover:text-white transition uppercase font-mono"
                      title="Export as TXT file"
                    >
                      TXT
                    </button>
                    <button
                      onClick={() => handleExportFile('json')}
                      className="px-3 py-1.2 rounded-full text-[10px] font-bold text-slate-400 hover:text-white transition uppercase font-mono border-x border-white/5"
                      title="Export as JSON"
                    >
                      JSON
                    </button>
                    <button
                      onClick={() => handleExportFile('pdf')}
                      className="px-3 py-1.2 rounded-full text-[10px] font-bold text-slate-400 hover:text-white transition uppercase font-mono"
                      title="Export as PDF"
                    >
                      PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid 17 Fields displayer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* 1. First Name */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">First Name</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm text-slate-200 font-bold">{generatedIdentity.firstName}</span>
                    <button
                      onClick={() => copyToClipboard('firstName', generatedIdentity.firstName)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'firstName' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 2. Last Name */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Last Name</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm text-slate-200 font-bold">{generatedIdentity.lastName}</span>
                    <button
                      onClick={() => copyToClipboard('lastName', generatedIdentity.lastName)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'lastName' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 3. Primary Username */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150 md:col-span-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Core Username Handle</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono text-sm text-cyan-400 font-black">@{generatedIdentity.username}</span>
                    <button
                      onClick={() => copyToClipboard('username', generatedIdentity.username)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'username' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 4. Display Name */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Display Name</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm text-white font-extrabold">{generatedIdentity.displayName}</span>
                    <button
                      onClick={() => copyToClipboard('displayName', generatedIdentity.displayName)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'displayName' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 5. Nickname */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Nickname</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm text-slate-200 font-bold">{generatedIdentity.nickname}</span>
                    <button
                      onClick={() => copyToClipboard('nickname', generatedIdentity.nickname)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'nickname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 6. Simple Bio */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150 md:col-span-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Sleek Bio</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-slate-300 italic">"{generatedIdentity.bio}"</span>
                    <button
                      onClick={() => copyToClipboard('bio', generatedIdentity.bio)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'bio' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 7. Tagline */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">One-Liner Tagline</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-bold">"{generatedIdentity.tagline}"</span>
                    <button
                      onClick={() => copyToClipboard('tagline', generatedIdentity.tagline)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'tagline' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 8. Aesthetic Theme */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Aesthetic Theme</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs tracking-wide text-purple-400 font-bold uppercase">{generatedIdentity.aestheticTheme}</span>
                    <button
                      onClick={() => copyToClipboard('aestheticTheme', generatedIdentity.aestheticTheme)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'aestheticTheme' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 9. Discord Bio */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Discord Status Bio</span>
                  <div className="mt-1 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-300 truncate tracking-tight">{generatedIdentity.discordBio}</span>
                    <button
                      onClick={() => copyToClipboard('discordBio', generatedIdentity.discordBio)}
                      className="text-slate-500 hover:text-white transition shrink-0 ml-1"
                    >
                      {copiedField === 'discordBio' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 10. Instagram Bio */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Instagram Bio Setup</span>
                  <div className="mt-1 flex items-center justify-between text-xs leading-relaxed">
                    <p className="text-slate-300 whitespace-pre-line text-[11px] truncate">{generatedIdentity.instagramBio}</p>
                    <button
                      onClick={() => copyToClipboard('instagramBio', generatedIdentity.instagramBio)}
                      className="text-slate-500 hover:text-white transition shrink-0 ml-1"
                    >
                      {copiedField === 'instagramBio' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 11. Telegram Bio */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Telegram Bio</span>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-mono">{generatedIdentity.telegramBio}</span>
                    <button
                      onClick={() => copyToClipboard('telegramBio', generatedIdentity.telegramBio)}
                      className="text-slate-500 hover:text-white transition shrink-0 ml-1"
                    >
                      {copiedField === 'telegramBio' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 12. Gaming Name */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Gaming Alias Handle</span>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-white font-mono font-extrabold">{generatedIdentity.gamingName}</span>
                    <button
                      onClick={() => copyToClipboard('gamingName', generatedIdentity.gamingName)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'gamingName' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 13. Clan Name */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Esports Clan Division</span>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-rose-400 font-bold font-mono">{generatedIdentity.clanName}</span>
                    <button
                      onClick={() => copyToClipboard('clanName', generatedIdentity.clanName)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'clanName' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 14. Personality Style */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Personality Style</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">{generatedIdentity.personalityStyle}</span>
                    <button
                      onClick={() => copyToClipboard('personalityStyle', generatedIdentity.personalityStyle)}
                      className="text-slate-500 hover:text-white transition"
                    >
                      {copiedField === 'personalityStyle' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 15. About Me Narrative */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150 md:col-span-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">About Me Narrative</span>
                  <div className="mt-1 flex items-center justify-between gap-4 text-xs">
                    <p className="text-slate-400 leading-relaxed text-[11px] font-sans">{generatedIdentity.aboutMe}</p>
                    <button
                      onClick={() => copyToClipboard('aboutMe', generatedIdentity.aboutMe)}
                      className="text-slate-500 hover:text-white transition shrink-0"
                    >
                      {copiedField === 'aboutMe' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 16. Profile Description */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-3 rounded-xl transition duration-150 md:col-span-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">Profile Detailed Description</span>
                  <div className="mt-1 flex items-center justify-between gap-4 text-xs">
                    <p className="text-slate-400 leading-relaxed text-[11px] font-sans">{generatedIdentity.profileDescription}</p>
                    <button
                      onClick={() => copyToClipboard('profileDescription', generatedIdentity.profileDescription)}
                      className="text-slate-500 hover:text-white transition shrink-0"
                    >
                      {copiedField === 'profileDescription' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* 17. Social Media Handle Suggestions */}
                <div className="group relative bg-[#050505]/40 border border-white/5 hover:border-cyan-500/20 p-4 rounded-xl transition duration-150 md:col-span-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider mb-2">Social Channels Synchronized</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-950 p-2 rounded-lg border border-white/5">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase">X / Twitter</span>
                      <span className="text-slate-200 mt-0.5 block truncate font-semibold">{generatedIdentity.socialHandles.x}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-white/5">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase">GitHub</span>
                      <span className="text-slate-200 mt-0.5 block truncate font-semibold">{generatedIdentity.socialHandles.github}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-white/5">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase">Twitch</span>
                      <span className="text-slate-200 mt-0.5 block truncate font-semibold">{generatedIdentity.socialHandles.twitch}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-white/5">
                      <span className="text-[8px] font-mono text-slate-500 block uppercase">YouTube</span>
                      <span className="text-slate-200 mt-0.5 block truncate font-semibold">{generatedIdentity.socialHandles.youtube}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/10 p-12 text-center bg-white/[0.01]">
              <User className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h4 className="text-base font-bold text-slate-300 font-display">No active profile instantiated</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                Choose a regional baseline and category on the left panel, or fill out the AI custom questionnaire to create a complete identity package.
              </p>
            </div>
          )}
        </div>
      </div>

      {exportSuccess && (
        <div className="fixed bottom-6 right-6 z-[150] bg-emerald-500 text-slate-950 rounded-full px-5 py-2.5 shadow-2xl font-bold flex items-center space-x-2 text-xs transition duration-200 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{exportSuccess}</span>
        </div>
      )}
    </section>
  );
}
