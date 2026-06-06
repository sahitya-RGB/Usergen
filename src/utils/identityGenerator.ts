// Identity Generator supporting both fully randomized offline generations and structured parameters

import { RegionType, getRandomName } from './nameDatabase';

export interface CompleteIdentity {
  firstName: string;
  lastName: string;
  username: string;
  displayName: string;
  nickname: string;
  bio: string;
  aboutMe: string;
  tagline: string;
  discordBio: string;
  instagramBio: string;
  telegramBio: string;
  gamingName: string;
  clanName: string;
  socialHandles: {
    x: string;
    github: string;
    twitch: string;
    youtube: string;
  };
  profileDescription: string;
  personalityStyle: string;
  aestheticTheme: string;
  category: string;
  region: string;
}

export const CATEGORIES = [
  'Gamer', 'Anime', 'Chill', 'Mysterious', 'Minimalist', 'Sigma', 
  'Professional', 'Creator', 'Streamer', 'Editor', 'Developer', 'Student', 'Artist'
] as const;

export type CategoryType = typeof CATEGORIES[number];

// Helper dataset for generating customized text per category
interface CategoryData {
  nicknames: string[];
  bios: string[];
  taglines: string[];
  aboutMes: string[];
  discordBios: string[];
  instagramBios: string[];
  telegramBios: string[];
  gamingNames: string[];
  clanNames: string[];
  profileDescriptions: string[];
  personalityStyles: string[];
  aestheticThemes: string[];
}

const CATEGORY_DATA: Record<CategoryType, CategoryData> = {
  Gamer: {
    nicknames: ['Wraith', 'Phantom', 'Vortex', 'Apex', 'Tempest', 'Cinder', 'Reaper', 'Spectre', 'Viper', 'Omega', 'Hazard', 'Toxic', 'Rogue', 'Havoc', 'Rhythm'],
    bios: [
      "Winning isn't everything. It's the only thing.",
      "Eat. Sleep. Game. Repeat.",
      "Rage quitting is for amateurs.",
      "Living in 144Hz. Sleep is just a loading screen.",
      "Ping high, standards higher."
    ],
    taglines: [
      "Aim assist? No, pure muscle memory.",
      "Just one more game...",
      "Clutch or kick represents my life philosophy.",
      "Respawning instantly under pressure."
    ],
    aboutMes: [
      "Gamer from birth, pixel hunter by trade. Specializing in high-intensity matches and low latency maneuvers. Let's lobby up.",
      "Competitive esports fan, strategist, and tactical marksman. I spend way too much time tuning mouse sensitivity.",
      "Console collector and mechanical keyboard building addict. Proudly owning noobs since the era of local LAN parties."
    ],
    discordBios: [
      "🎮 Active In-Game // DMs Open for squad invites",
      "Looking for a premium Duo partner. Let's rank up.",
      "🎧 listening to lofi // grinding ranked ladders"
    ],
    instagramBios: [
      "Esports Athlete | Tech reviewer | Content creator\n📩 Business: business@example.com\n🎮 Live on Twitch every Saturday!",
      "Just a pixel pusher breathing digital oxygen. Swipe left for clips."
    ],
    telegramBios: [
      "💬 t.me/squad_up // Gaming community coordinator",
      "Tournament notifications channel."
    ],
    gamingNames: ['[xX_Slayer_Xx]', 'V1per_FPS', 'Omega_Clutch', 'Zero_Delay', 'Tempest_OG'],
    clanNames: ['Project Nova', 'Vibe Tactics', 'Ethereal Esports', 'Viper Legion', 'Cyber Shadows'],
    profileDescriptions: [
      "Ambitious competitive gamer with robust reflexes and standard structural execution. Specializes in fps, tactical setups, and raw gaming energy.",
      "A seasoned strategist who treats every gaming session as a high stakes digital competition."
    ],
    personalityStyles: ['Hyper Competitive', 'Aggressive Tactician', 'Focused Esports Veteran', 'Casual Completionist'],
    aestheticThemes: ['Cyberpunk Neon', 'Midnight Obsidian', 'Redline Carbon', 'Retro Arcade Glow']
  },
  Anime: {
    nicknames: ['Senpai', 'Otaku', 'Kage', 'Shinobi', 'Kaiju', 'Tsundere', 'Bakugo', 'Chibi', 'Neko', 'Ronin', 'Kenshin', 'Sora', 'Luffy', 'Goku'],
    bios: [
      "Living somewhere between reality and anime.",
      "Believe in the me that believes in you.",
      "Just a main character in my filler arc.",
      "Waiting patiently for my redemption sequence.",
      "Omae wa mou shindeiru."
    ],
    taglines: [
      "Don't limit your challenges, challenge your limits.",
      "I'm not short, I'm just compact anime size.",
      "Chasing cherry blossoms and high-octane soundtracks.",
      "Powering up my inner energy levels."
    ],
    aboutMes: [
      "Deeply immersed in Japanese culture, vintage manga, and modern cyberpunk animations. Yes, Japanese subtitles are mandatory.",
      "Casual sketch artist drawing original anime concepts. My life goal is to visit Akihabara at least once a year.",
      "Collecting figures, studying classic animation frames, and rating shows with total editorial precision."
    ],
    discordBios: [
      "🌸 studying in the library // animes only",
      "Nani? // Do not ping unless urgent! 🍃"
    ],
    instagramBios: [
      "Anime enthusiast & tea consumer 🍵\n✨ \"A silent voice is loudest\"\n🍥 Next convention: Tokyo Spring"
    ],
    telegramBios: [
      "🍃 Shinobi hideout // DMs muted",
      "Reviewing manga chapters daily."
    ],
    gamingNames: ['Kage_Shinobi', 'Senpai_X', 'Ren_Goku', 'Chibi_Titan', 'Yuki_Striker'],
    clanNames: ['Akatsuki Syndicate', 'Uchiha Clan', 'Straw Hat Division', 'Gotei 13 Reserve', 'The Guild of Fairy'],
    profileDescriptions: [
      "Passionate student of storytelling, eastern art forms, and animated masterpieces. Vibing through natural story arcs.",
      "A creative dreamer who explores complex emotional fantasy narratives and draws inspiration from classic manga."
    ],
    personalityStyles: ['Imaginative Otaku', 'Introverted Dreamer', 'Ethereal Fantasy Lover', 'Determined Protagonist'],
    aestheticThemes: ['Neo-Tokyo Cyber', 'Cherry Blossom Pink', 'Cozy Studio Ghibli', 'Vaporwave Sunset']
  },
  Chill: {
    nicknames: ['Mellow', 'Breeze', 'Haze', 'Dusk', 'Wave', 'Zen', 'Snooze', 'Drifter', 'Float', 'Mist', 'Fern', 'Moss', 'Opal', 'Amber'],
    bios: [
      "No rush. No pressure. Just good vibes.",
      "Everything happens for a reason. Let it slide.",
      "Offline is peace of mind.",
      "Drinking green tea and listening to water droplets.",
      "Current status: vibing in slow motion."
    ],
    taglines: [
      "Smooth seas don't make skillful sailors, but they are great for drifting.",
      "Slow down, you're doing fine.",
      "Caffeine, ambient sounds, and zero alarms.",
      "Let things flow naturally."
    ],
    aboutMes: [
      "A simple observer of daily moments. Dedicated to discovering new indie bands, collecting vinyl records, and drinking cold brews.",
      "Warm cozy enthusiast. When I am not reading near a window, you can find me taking long nocturnal walks.",
      "Focusing on slow living, organic layouts, and mental grounding. Taking it one day, one deep breath at a time."
    ],
    discordBios: [
      "☕ cup of coffee // do not disturb",
      "just floating along... 🌊 // offline mostly"
    ],
    instagramBios: [
      "Plant parent 🌿 | Lo-fi curator 🎧\n✨ Keep it simple.\n📍 Sunset Collector"
    ],
    telegramBios: [
      "🍃 quiet space // safe zone",
      "Drifting peacefully."
    ],
    gamingNames: ['Mellow_Wave', 'Breeze_Drifter', 'Zen_Snooze', 'Lazy_Haze', 'Slo_Mo'],
    clanNames: ['The Cozy Corner', 'Sleepy Hollow', 'Cloud Nine Collective', 'Gentle Waves', 'Silent Solitude'],
    profileDescriptions: [
      "Pristine peaceful soul searching for dynamic harmony and slow-living templates. Keeping things thoroughly simple.",
      "A calm spirit dedicated to natural soundscapes, cozy interior layouts, and slow-brewed lifestyle aesthetics."
    ],
    personalityStyles: ['Calm Vibing', 'Zen Minimalist', 'Cozy Observer', 'Gentle Soul'],
    aestheticThemes: ['Pastel Sage', 'Coffee Shop Lo-Fi', 'Warm Vintage Amber', 'Cloudy Misty Dusk']
  },
  Mysterious: {
    nicknames: ['Spectre', 'Shadow', 'Enigma', 'Void', 'Cipher', 'Hush', 'Occult', 'Riddle', 'Veil', 'Grim', 'Onyx', 'Phantom', 'Midnight', 'Eerie'],
    bios: [
      "Silent moves. Loud results.",
      "Known by many, understood by none.",
      "The less you reveal, the more they wonder.",
      "Vanishing into the background noise.",
      "Do not look for me. I am already behind you."
    ],
    taglines: [
      "Secret algorithms operate in quiet layers.",
      "Shadows have more substance than empty words.",
      "An puzzle with custom complexity.",
      "Behind every mask is another mask."
    ],
    aboutMes: [
      "Operating in the negative spaces of the internet. I compile hidden patterns, solve abstract cryptic riddles, and enjoy the dark night sky.",
      "A collector of forgotten history, mechanical keys, and dark classical composition sheets. Highly reserved.",
      "Observing social trends from a safe detached distance. Silent architect of custom private networks."
    ],
    discordBios: [
      "⚫ incognito // [REDACTED]",
      "connecting through proxy // server offline"
    ],
    instagramBios: [
      "...\nNo logs. No trace.\n🌑"
    ],
    telegramBios: [
      "🔐 cipher endpoint // securely encrypted",
      "Message auto-destruction: active."
    ],
    gamingNames: ['[REDACTED]', 'Spectre_Void', 'Onyx_Ghost', 'Cipher_0x', 'Hush_Active'],
    clanNames: ['The Onyx Guard', 'Shadow Protocol', 'Zero Trace', 'Midnight Phantoms', 'The Veil Collective'],
    profileDescriptions: [
      "An elusive, highly analytical mind operating from the shadows. Master of stealth, secure systems, and cryptic prose.",
      "Exquisite quiet strategist. Thrives under total anonymity and calculated hidden maneuvers."
    ],
    personalityStyles: ['Calculated Strategist', 'Quietly Reserved', 'Intriguing Enigma', 'Intense Analytical'],
    aestheticThemes: ['Midnight Obsidian', 'Dark Cyberpunk', 'Matrix Green Terminal', 'Foggy Noir Detective']
  },
  Minimalist: {
    nicknames: ['Dot', 'Null', 'Mono', 'Grid', 'Base', 'Zero', 'Core', 'Pure', 'Flat', 'Line', 'Tone', 'Thin', 'Bare', 'Less'],
    bios: [
      "Less is more.",
      "Pruning the noise.",
      "Simple, not simpler.",
      "Focused on essentials.",
      "Clean margins. Clear thoughts."
    ],
    taglines: [
      "Whitespace is an active design element.",
      "Remove everything that doesn't add value.",
      "Functional beauty requires no decoration.",
      "Eliminating the clutter."
    ],
    aboutMes: [
      "Designing clean minimalist user experiences, writing semantic code blocks, and optimizing layouts for maximum efficiency.",
      "Avid reader of Swiss modernist design essays, practicing extreme essentialism, living with under 100 highly curated useful relics.",
      "A visual designer dedicated to grid structures, functional typography, and pristine empty intervals."
    ],
    discordBios: [
      "▪️ pure architecture",
      "minimal presence // focus online"
    ],
    instagramBios: [
      "Focus.\n▫️ Design | Code | Architecture\n📍 Basel, CH"
    ],
    telegramBios: [
      "▫️ simple endpoint",
      "Direct responses only."
    ],
    gamingNames: ['Null_Core', 'Mono_Grid', 'Less_X', 'Pure_Dot', 'Base_0'],
    clanNames: ['The Grid System', 'Swiss Modern', 'Form & Function', 'Element Zero', 'The Blank Canvas'],
    profileDescriptions: [
      "A strict minimalist emphasizing functional simplicity, premium typography, structural symmetry, and absolute focus.",
      "A refined minimalist creator who strips away decorative clutter to highlight raw structural utility."
    ],
    personalityStyles: ['Strict Essentialist', 'Structured Thinker', 'Pragmatic Modernist', 'Focused Designer'],
    aestheticThemes: ['Bauhaus White', 'Matte Charcoal', 'Alpine Snow', 'Brutalist Monospace']
  },
  Sigma: {
    nicknames: ['Lone', 'Alpha', 'Apex', 'Grim', 'Vanguard', 'Titan', 'Chief', 'Wild', 'Rogue', 'Fierce', 'Sovereign', 'Iron', 'Steel'],
    bios: [
      "Focused internally. Powered externally.",
      "Never look back. There's nothing to see.",
      "I don't follow trends; I compile my own paths.",
      "Silence is a sigma's natural weapon.",
      "The wolf doesn't care about the opinion of sheep."
    ],
    taglines: [
      "My execution speed doesn't wait for permission.",
      "Rule #1: Focus on your own growth parameters.",
      "Self reliance is the ultimate luxury.",
      "Quiet confidence is stronger than shouting."
    ],
    aboutMes: [
      "An independent operator executing specialized high stakes processes. I don't participate in standard networks; I build my own.",
      "Dedicated to extreme discipline, strength training, and mastering mental game models. Operating state: perpetual growth.",
      "Silent observer of human behavior, building private capital streams, and developing pristine, self-governed systems."
    ],
    discordBios: [
      "⚡ busy grinding // ignore chats",
      "self-governed // private access"
    ],
    instagramBios: [
      "Discipline > Motivation\n📈 Building systems in silence\n♟️ Playing the long game"
    ],
    telegramBios: [
      "🐺 lone operator // encrypted",
      "Channels muted permanently."
    ],
    gamingNames: ['Lone_Iron', 'Sigma_Sovereign', 'Titan_Apex', 'Vanguard_Solo', 'Grim_Discipline'],
    clanNames: ['The Lone Wolves', 'Sovereign Legion', 'Apex Command', 'Vanguard Elite', 'Iron Protocol'],
    profileDescriptions: [
      "Highly self-disciplined independent operator. Highly focused on physical and intellectual growth, structural mastery, and severe output metrics.",
      "An autonomous individualist who rejects conventional boxes to build their own powerful trajectory."
    ],
    personalityStyles: ['Extremely Disciplined', 'Independent Operator', 'Quietly Ambitious', 'Determined Leader'],
    aestheticThemes: ['Industrial Steel', 'Brushed Titanium', 'Executive Midnight', 'Shadow Amber Accent']
  },
  Professional: {
    nicknames: ['Lead', 'Chief', 'Principal', 'Expert', 'Adviser', 'Analyst', 'Strategist', 'Partner', 'Director', 'Consultant'],
    bios: [
      "Delivering high impact analytical blueprints.",
      "Connecting global technology networks.",
      "Strategizing startup growth vectors.",
      "Polished interfaces. Scalable backends.",
      "Aligning long-term visions with current execution."
    ],
    taglines: [
      "Execution exceeds promises.",
      "Pristine performance, structured delivery.",
      "Data driven solutions for complex enterprise limits.",
      "Excellence is an everyday standard."
    ],
    aboutMes: [
      "A dedicated corporate design and technology architect with over a decade of system execution experience. Helping founders scale operational models.",
      "Specializing in cloud engineering integrations, security architectures, and team coordination workflows. Regular speaker at global conferences.",
      "A seasoned product director who blends user experience research, performance budgets, and product lifecycle strategy to achieve business goals."
    ],
    discordBios: [
      "👔 Professional inquiries via email",
      "Active // Coordinating corporate releases"
    ],
    instagramBios: [
      "Technology Architect & Speaker 🎤\n💼 advising early stage startups\n📈 Let's connect on LinkedIn!"
    ],
    telegramBios: [
      "💼 professional desk // secure",
      "Schedule meetings via calendar link."
    ],
    gamingNames: ['Chief_Exec', 'Lead_Tactician', 'Agile_Partner', 'SaaS_Director', 'Sovereign_Corp'],
    clanNames: ['The Boardroom', 'Global Synergy', 'Principal Advisors', 'Enterprise Core', 'Syndicate Capital'],
    profileDescriptions: [
      "Polished executive with extensive system architecture design, strategic consulting background, and high standard implementation workflows.",
      "An expert solutions engineer committed to scaling corporate infrastructures with absolute professional integrity."
    ],
    personalityStyles: ['Strategic Leader', 'Highly Analytical', 'Exacting Executor', 'Diplomatic Advisor'],
    aestheticThemes: ['Executive Slate', 'Corporate Deep Blue', 'Minimal Chalk Gray', 'Polished Silver Accent']
  },
  Creator: {
    nicknames: ['Build', 'Maker', 'Art', 'Forge', 'Spark', 'Canvas', 'Nova', 'Flux', 'Aura', 'Shift', 'Prism', 'Ink', 'Echo', 'Drift'],
    bios: [
      "Building ideas into reality.",
      "Documenting the creative frontier.",
      "Creating things worth remembering.",
      "Pixel by pixel, line by line.",
      "Turning blank canvases into digital products."
    ],
    taglines: [
      "Don't wait for inspiration; create your own kinetic energy.",
      "Design is not just what it looks like; it's how it executes.",
      "Crafting content with absolute intent.",
      "The digital world is my canvas."
    ],
    aboutMes: [
      "A full time digital creator merging interactive code, beautiful cinematography, and written essays. Designing the future of learning frameworks.",
      "Experienced visual artist crafting high definition motion graphics, branding systems, and dynamic creative assets for modern clients.",
      "An indie developer and content builder exploring the intersection of creative coding, typography, and dynamic Web platforms."
    ],
    discordBios: [
      "🎨 Designing a new pack // stream live",
      "Creative studio active // leave a note"
    ],
    instagramBios: [
      "Digital Creator & Brand Architect 🎨\n🎬 Daily design tutorials in reels\n📦 Asset store: link below"
    ],
    telegramBios: [
      "🚀 Creative channel // updates",
      "Join the design collective."
    ],
    gamingNames: ['Maker_Flux', 'Forge_Spark', 'Canvas_Drift', 'Prism_Echo', 'Creative_Shift'],
    clanNames: ['The Creative Forge', 'Design Sanctuary', 'Pixel Artisans', 'Kinetic Collective', 'Aura Builders'],
    profileDescriptions: [
      "Imaginative digital builder combining clean typography, robust coding frameworks, and cinematic visuals to tell memorable stories.",
      "An expressive innovator who turns abstract concepts into highly polished, engaging physical and digital media products."
    ],
    personalityStyles: ['Imaginatively Creative', 'Expressive Builder', 'Inspiring Visionary', 'Energetic Maker'],
    aestheticThemes: ['Neon Vaporwave', 'Vibrant Sunset Gold', 'Studio Workspace Light', 'Matte Sage & Forest']
  },
  Streamer: {
    nicknames: ['Live', 'OnAir', 'Broadcaster', 'Host', 'Stream', 'Cast', 'Beam', 'Show', 'Clip', 'Play', 'Vibe', 'Tune', 'Spotlight'],
    bios: [
      "Streaming live. Spreading positive energy.",
      "Join the conversation. DMs open.",
      "Building a safe, cozy space for internet wanderers.",
      "Live almost every weekday at 8 PM.",
      "Your daily dose of gameplay and lofi vibes."
    ],
    taglines: [
      "Chat drives the stream, I just steer the ship.",
      "Building communities is my ultimate mission.",
      "Pixel perfect streams and absolute vibes.",
      "Press follow to support the adventure."
    ],
    aboutMes: [
      "Full-time live broadcaster sharing horror games, sandbox titles, and coding marathons. Let's make internet history together.",
      "A friendly neighborhood stream host focused on keeping chats toxic-free, supporting mental health awareness, and sharing cozy multiplayer titles.",
      "Just an introverted guy who loves interacting with people from around the globe while failing spectacularly at speedrunning classic platformers."
    ],
    discordBios: [
      "🔴 STREAM IS ONLINE NOW!",
      "Chat with subscribers // join general voice"
    ],
    instagramBios: [
      "Twitch Partner 💜 | Gamer | Entertainer\n🔴 Scheduled: Mon - Fri @ 7 PM\nJoin the official Discord! 👇"
    ],
    telegramBios: [
      "📢 Stream notifications & schedules",
      "Live clips archive."
    ],
    gamingNames: ['Live_Streamer', 'OnAir_Host', 'Vibe_Broadcaster', 'Clip_Master', 'Spotlight_OG'],
    clanNames: ['The Live Lobby', 'Streamer Syndicate', 'Vibe Broadcast Network', 'Spotlight Stars', 'On Air Squad'],
    profileDescriptions: [
      "Charismatic and community-oriented stream host. Passionate about interactive setups, chat engagement, and maintaining premium stream qualities.",
      "An interactive gaming host dedicated to producing highly responsive broadcast environments and building tight-knit digital communities."
    ],
    personalityStyles: ['Charismatic Host', 'Community Centric', 'Highly Engaging', 'Energetic Entertainer'],
    aestheticThemes: ['Vibrant Neon Cyan', 'Obsidian Purple Accent', 'Warm Retro Stage Lights', 'Clean Studio Glow']
  },
  Editor: {
    nicknames: ['Edit', 'Render', 'Cut', 'Slice', 'Trim', 'Timeline', 'Frame', 'Pixel', 'Focus', 'Zoom', 'Zoomer', 'Split', 'Grade', 'Warp'],
    bios: [
      "Formatting chaos into pristine frames.",
      "Making every single frame count.",
      "Video editing is my sensory language.",
      "Where timing is everything.",
      "Color grading my way out of reality."
    ],
    taglines: [
      "A story is told in the cutting room.",
      "Pacing, sequence, and visual flow.",
      "Translating raw footage into cinematic masterworks.",
      "Render queued, coffee brewed."
    ],
    aboutMes: [
      "Professional non-linear video editor specializing in extreme pace vlogs, commercial grade color pipelines, and multi cam live concert packages.",
      "Motion graphics designer and compositor with a deep addiction to keyframes, sound design soundscapes, and procedural particle generation.",
      "Polishing raw files into storytelling gems. Working across documentary formats, sports highlights, and startup explainer animations."
    ],
    discordBios: [
      "🎬 Grading a video // Do not disturb",
      "Render in progress // RAM at 99%"
    ],
    instagramBios: [
      "Video Editor & Colorist 🎬\n🖥️ Premiere Pro | After Effects | DaVinci\n📩 Portfolios/Inquiries below"
    ],
    telegramBios: [
      "🎥 Editors channel // Asset sharing",
      "Send files securely."
    ],
    gamingNames: ['Frame_Perfect', 'Cut_Slice', 'Timeline_OG', 'Render_Master', 'Color_Grader'],
    clanNames: ['The Cutting Room', 'Timeline Technicians', 'Render Farm Collective', 'Frame Masters', 'Keyframe Alliance'],
    profileDescriptions: [
      "Meticulous, design centered video editor. Possesses deep technical expertise in color pipelines, narrative pacing, and interactive motion design.",
      "A visual designer with a sharp eye for editorial rhythm and highly synchronized audio-visual storytelling."
    ],
    personalityStyles: ['Meticulously Detailed', 'Narrative Pacer', 'Stylishly Visual', 'Technical Director'],
    aestheticThemes: ['High Contrast Film Noir', 'Teal & Orange Grade', 'Matte Steel Dark', 'Warm Vintage Kodak']
  },
  Developer: {
    nicknames: ['Code', 'Dev', 'Stack', 'Query', 'Script', 'Byte', 'Kernel', 'Shell', 'Node', 'Grid', 'Port', 'Proxy', 'Logic', 'Merge'],
    bios: [
      "Building robust scalable pipelines.",
      "I write code that writes code.",
      "Converting caffeine into optimized algorithms.",
      "Keeping servers online since the midnight build.",
      "Simplicity is a prerequisite for reliability."
    ],
    taglines: [
      "Fixing bugs that didn't exist until I fixed them.",
      "If it's not documented, it doesn't exist.",
      "Automate everything except human connections.",
      "Git commit -m \"Pristine refactor\""
    ],
    aboutMes: [
      "Full stack systems engineer passionate about typed languages, asynchronous architectures, distributed database logic, and zero downtime deployments.",
      "Open source developer contributing to standard web frameworks, building elegant developer utilities, and documenting clean terminal environments.",
      "A hardware enthusiast and low-level C developer crafting micro-firmware for embedded IoT nodes and customized mechanical keyboard layouts."
    ],
    discordBios: [
      "💻 VS Code active // compiling...",
      "localhost:3000 running // API endpoints online 🚀"
    ],
    instagramBios: [
      "Software Engineer | OSS Contributor 💻\n⚙️ React | Node | Rust | Go\n📍 127.0.0.1"
    ],
    telegramBios: [
      "🛠️ Repo commit feed // updates",
      "DMs redirecting via terminal."
    ],
    gamingNames: ['Byte_Kernel', 'Dev_Null', 'Merge_Conflict', 'Script_Kiddie', 'Logic_Gates'],
    clanNames: ['The Git Commits', 'Brutalist Coders', 'Runtime Errors', 'Stack Overflowers', 'Kernel Panic'],
    profileDescriptions: [
      "Logical and solution-oriented software architect. Promotes pristine coding standards, semantic structures, and scalable backend logic.",
      "A disciplined systems integration engineer dedicated to continuous code optimization and robust offline-first software architectures."
    ],
    personalityStyles: ['highly logical', 'System Architect', 'Pragmatic Problem Solver', 'Disciplined Builder'],
    aestheticThemes: ['JetBrains Matrix Green', 'Atom Dark Obsidian', 'Monospace Slate', 'Minimalist Paper Light']
  },
  Student: {
    nicknames: ['Study', 'Learn', 'Academia', 'Thesis', 'Notes', 'Book', 'Paper', 'Scribe', 'Mind', 'Idea', 'Scope', 'Curious', 'Pencil', 'Quest'],
    bios: [
      "Learning every day. Designing my future.",
      "Currently fueled by iced lattes and upcoming deadlines.",
      "Collecting knowledge and sticky notes.",
      "Just a student trying to decode the universe.",
      "Reading between the lines of dense textbooks."
    ],
    taglines: [
      "The beautiful thing about learning is that no one can take it from you.",
      "An investment in knowledge pays the best interest.",
      "Late nights, bright highlights.",
      "Always curious, perpetually studying."
    ],
    aboutMes: [
      "Undergraduate student exploring cognitive science, visual design, and data analytics. Writing essays on how technology shapes focus patterns.",
      "High school senior preparing for university engineering tracks, building small coding prototypes, and practicing classical piano.",
      "A quiet literature major studying classic prose formats, maintaining a neat catalog of digital notes, and drinking way too many espresso shots."
    ],
    discordBios: [
      "📚 Pomodoro timer active // 25m focus",
      "study session starting // mute mic"
    ],
    instagramBios: [
      "Student | Lifelong Learner 🎓\n✍️ Sharing neat study templates\n🌱 growing every single semester"
    ],
    telegramBios: [
      "📖 Semester prep // shared syllabus",
      "Library study group chat link."
    ],
    gamingNames: ['Study_Scribe', 'Learn_Lurk', 'Book_Worm', 'Curious_Mind', 'Thesis_OG'],
    clanNames: ['The Study Club', 'Academic Alliance', 'The Midnight Oil', 'Honor Society', 'Book Club Scholars'],
    profileDescriptions: [
      "Persistent and detail-oriented student researcher. Highly invested in neat study workflows, clear documentation archives, and comprehensive learning systems.",
      "A quiet academic enthusiast passionate about history timelines, high-density study systems, and organic campus aesthetics."
    ],
    personalityStyles: ['Diligent Learner', 'Quietly Thoughtful', 'Organized Academic', 'Curious Explorer'],
    aestheticThemes: ['Classic Ivory Stationery', 'Cozy Warm Library Brown', 'Minimal Grid Blueprint', 'Misty Green Eucalyptus']
  },
  Artist: {
    nicknames: ['Paint', 'Draw', 'Illustrate', 'Ink', 'Palette', 'Easel', 'Brush', 'Clay', 'Sculpt', 'Studio', 'Draft', 'Vivid', 'Hue', 'Shade'],
    bios: [
      "Translating emotions into visual frequencies.",
      "Living in a high definition color spectrum.",
      "Every medium tells a different story.",
      "Smeared paint and endless creative ideas.",
      "Creating physical artifacts in a digital era."
    ],
    taglines: [
      "Art is the lie that enables us to realize the truth.",
      "My hands are messy, but my vision is clear.",
      "A composition starts with a single honest stroke.",
      "Finding geometry in wild natural chaos."
    ],
    aboutMes: [
      "Traditional oil painter exploring modern cityscapes, abstract human shapes, and light reflections. Operating from a small skylight studio.",
      "Experienced printmaker and independent illustrator designing customized indie book covers, gig poster layouts, and retro visual designs.",
      "A ceramic sculptor and mixed-media explorer searching for ways to merge natural clay textures with industrial metallic wires."
    ],
    discordBios: [
      "🎨 painting stream active on Twitch!",
      "Sketches directory open for custom queries"
    ],
    instagramBios: [
      "Fine Artist & Illustrator 🎨\n📦 Framing and worldwide shipping\nCheck out my current collection! 👇"
    ],
    telegramBios: [
      "✨ Art gallery updates // pre-orders",
      "Studio scrapbooks archive."
    ],
    gamingNames: ['Paint_Brush', 'Vivid_Palette', 'Ink_Illustration', 'Draft_Art', 'Easel_OG'],
    clanNames: ['The Art Collective', 'Visual Alchemists', 'Smeared Paint Guild', 'The Easel Alliance', 'Spectrum Studio'],
    profileDescriptions: [
      "Highly expressive, tactile fine arts creator. Combines classic compositions with modern digital printing methods to achieve stellar visual statements.",
      "A dedicated, abstract designer finding aesthetic harmony inside organic textures, deep earth tones, and wild charcoal strokes."
    ],
    personalityStyles: ['Tactile Creator', 'Abstract Expressive', 'Meticulously Visual', 'Inspired Original'],
    aestheticThemes: ['Handmade Textures', 'Warm Earth Ochre', 'Minimalist Charcoal Grey', 'Sunlit Studio Workspace']
  }
};

// Advanced offline generation logic with millions of combinations
export function generateIdentity(category: CategoryType, region: RegionType): CompleteIdentity {
  const { firstName, lastName, fullName } = getRandomName(region);
  const data = CATEGORY_DATA[category];

  // Pick random elements from dataset securely
  const nickname = data.nicknames[Math.floor(Math.random() * data.nicknames.length)];
  const bio = data.bios[Math.floor(Math.random() * data.bios.length)];
  const tagline = data.taglines[Math.floor(Math.random() * data.taglines.length)];
  const aboutMe = data.aboutMes[Math.floor(Math.random() * data.aboutMes.length)];
  const discordBio = data.discordBios[Math.floor(Math.random() * data.discordBios.length)];
  const instagramBio = data.instagramBios[Math.floor(Math.random() * data.instagramBios.length)];
  const telegramBio = data.telegramBios[Math.floor(Math.random() * data.telegramBios.length)];
  const gamingName = data.gamingNames[Math.floor(Math.random() * data.gamingNames.length)];
  const clanName = data.clanNames[Math.floor(Math.random() * data.clanNames.length)];
  const profileDescription = data.profileDescriptions[Math.floor(Math.random() * data.profileDescriptions.length)];
  const personalityStyle = data.personalityStyles[Math.floor(Math.random() * data.personalityStyles.length)];
  const aestheticTheme = data.aestheticThemes[Math.floor(Math.random() * data.aestheticThemes.length)];

  // Generate highly randomized, unique, non-overlapping usernames
  const nameClean = firstName.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const surnameClean = lastName.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const nickClean = nickname.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const indexSeed = Math.floor(Math.random() * 8);

  let username = `${nameClean}_${nickClean}`;
  if (indexSeed === 0) username = `${nickClean}.${nameClean}`;
  else if (indexSeed === 1) username = `the_${nameClean}`;
  else if (indexSeed === 2) username = `${nameClean}${surnameClean.slice(0, 3)}${Math.floor(Math.random() * 99)}`;
  else if (indexSeed === 3) username = `${nickClean}_og`;
  else if (indexSeed === 4) username = `${nameClean}_${surnameClean}`;
  else if (indexSeed === 5) username = `its_${nickClean}`;
  else if (indexSeed === 6) username = `${nameClean}.0x`;
  else username = `${nameClean}${Math.floor(Math.random() * 999)}`;

  // Capitalize display name
  const displayName = `${firstName} "${nickname}" ${lastName}`;

  // Platform specific handle variations for realistic setups
  const socialHandles = {
    x: `@${username}`,
    github: username,
    twitch: `${username}_live`,
    youtube: `@${username}Official`
  };

  return {
    firstName,
    lastName,
    username,
    displayName,
    nickname,
    bio,
    aboutMe,
    tagline,
    discordBio,
    instagramBio,
    telegramBio,
    gamingName,
    clanName,
    socialHandles,
    profileDescription,
    personalityStyle,
    aestheticTheme,
    category,
    region
  };
}
