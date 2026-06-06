import { Username, GeneratorFilters, UsernameStyle, TypeFilter, LengthFilter } from '../types';

// Vowels and Consonants for custom brandable/syllabic names
const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];
const CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];

// Syllable roots that look premium and memorable
const BRAND_ROOTS = [
  'lum', 'pyr', 'nov', 'nex', 'zen', 'sol', 'vox', 'kyn', 'vel', 'aer',
  'ten', 'cyn', 'vyl', 'zeph', 'vort', 'ast', 'dyn', 'syn', 'vex', 'zyr',
  'xe', 'kev', 'sah', 'vyn', 'qev', 'ax', 'kye', 'azy', 'vin', 'vibe'
];

const BRAND_SUFFIXES = ['ia', 'io', 'ex', 'is', 'on', 'um', 'ix', 'en', 'ux', 'co', 'ify', 'a', 'o', 'us', 'ro', 'y'];

// Gaming words & prefixes
const GAMING_WORDS = [
  'wraith', 'phantom', 'slayer', 'vortex', 'shadow', 'apex', 'tempest', 'cinder',
  'reaper', 'spectre', 'titan', 'cyber', 'hazard', 'toxic', 'rogue', 'viper',
  'omega', 'matrix', 'fury', 'valkyrie', 'ghost', 'zod', 'bolt', 'pulse', 'havoc',
  'rhythm', 'echo', 'flux', 'glitch', 'abyss', 'cipher', 'haze', 'omega', 'shiver'
];

const GAMING_PREFIXES = ['i', 'x', 'V', 'u', 'e', 'z'];
const GAMING_SUFFIXES = ['Fps', 'Yt', 'Gg', 'Og', 'Vibe', 'X', 'Z', '99'];

// Aesthetic elements
const AESTHETIC_WORDS = [
  'cozy', 'lumi', 'soft', 'sol', 'neo', 'vibe', 'star', 'rain', 'milk', 'pure',
  'luna', 'sweet', 'clover', 'mint', 'rose', 'peach', 'cloud', 'mist', 'haze', 'dusk',
  'dawn', 'plum', 'fern', 'moss', 'glow', 'silk', 'petal', 'opal', 'halo', 'cozy'
];

const AESTHETIC_DECOR = ['xo', 'hx', 'y', 'z', 'ie', 'a', 'ia', 'txt', 'mp3', 'wave', 'co', 'sky', 'qt', '._.', 'x'];

// OG Short combinations
const OG_SHORT_DICTIONARY = [
  'skye', 'void', 'apex', 'neon', 'flux', 'zero', 'lurk', 'echo', 'rift', 'grim',
  'cove', 'mist', 'glen', 'isle', 'maze', 'zone', 'gale', 'pyre', 'lumi', 'rust',
  'soul', 'vial', 'zinc', 'warp', 'fade', 'slip', 'daze', 'scout', 'crypt', 'dust'
];

// Free fire special structures
const FREE_FIRE_DECOR = ['⚡', '〆', '✿', '★', '☣', 'ツ', '☂', '☁', '♛', '☯', '♠', '♥', '☠', '☠️', '⚔️'];

// Meaning mapper to give mock details to premium names (makes it feel super polished!)
const MEANINGS: Record<string, string> = {
  'Vinzu': 'Vibrant voyager, high-frequency branding target.',
  'Zyrox': 'Futuristic obsidian star. Excellent for aggressive gamers.',
  'Xevin': 'OG layout, smooth cybersecurity alias.',
  'Azyr': 'Sky element, calm under pressure.',
  'Sahyx': 'Legendary sand spirit, stealth hunter.',
  'Kyzen': 'Continuous growth, high tech startup aura.',
  'Vynix': 'Neon phoenix of the digital valley.',
  'Qevro': 'Dynamic motion. Perfect for modern influencers.',
  'Axen': 'Minimalist axis, razor-sharp precision.',
  'Vyro': 'Enigmatic power, fast vector branding.',
};

const MEANING_TAGLINE_PREFIXES = [
  'Derived from cosmic elements representing',
  'An elegant synthesis signifying',
  'A rare digital-native term representing',
  'Expresses speed and digital power, representing',
  'Representing stealth and precision, symbolizing',
  'A branding ready moniker signifying'
];

const MEANING_KEYWORDS = [
  'stealth and deep clarity', 'innovative tech-frontier aura', 'calm under extreme layout conditions',
  'boundless velocity and cyber power', 'mystic shadows and pixel dominance', 'purity of minimal architecture',
  'indigenous cloud-native presence', 'creative rhythm and dynamic design parameters'
];

function generateAestheticMeaning(text: string): string {
  if (MEANINGS[text]) return MEANINGS[text];
  const prefix = MEANING_TAGLINE_PREFIXES[Math.floor(Math.random() * MEANING_TAGLINE_PREFIXES.length)];
  const body = MEANING_KEYWORDS[text.length % MEANING_KEYWORDS.length];
  return `${prefix} ${body}.`;
}

// Generate premium syllabic word
function generatePremiumSyllables(targetLen: number): string {
  let text = '';
  // Alternate consonant and vowel
  let useConsonant = Math.random() > 0.4;
  for (let i = 0; i < targetLen; i++) {
    if (useConsonant) {
      let char = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
      // Prevent double Q, X, Z early on to keep readable
      if ((char === 'q' || char === 'x' || char === 'z') && i === 0) {
        char = ['s', 'v', 'k', 'z', 'l', 'm', 'r'][Math.floor(Math.random() * 7)];
      }
      text += char;
    } else {
      text += VOWELS[Math.floor(Math.random() * VOWELS.length)];
    }
    useConsonant = !useConsonant;
  }
  // Capitalize first letter
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Short micro 3-char/4-char alphanumeric/letters
export function generateShortOGCombo(length: number, lettersOnly: boolean): string {
  let result = '';
  const poolLetters = CONSONANTS.concat(VOWELS);
  const poolNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const totalPool = lettersOnly ? poolLetters : poolLetters.concat(poolNumbers);

  for (let i = 0; i < length; i++) {
    if (!lettersOnly && i === 1 && Math.random() > 0.3) {
      // High chance of number in the middle (e.g. q7x, 98j)
      result += poolNumbers[Math.floor(Math.random() * poolNumbers.length)];
    } else {
      result += totalPool[Math.floor(Math.random() * totalPool.length)];
    }
  }
  return result;
}

// Single generator matching specific styles
function generateSingleUsername(style: UsernameStyle, type: TypeFilter, lengthVal: number): Username {
  let text = '';
  let tags: string[] = [];

  // Override / determine styling based on specific types
  if (style === 'minimal' || style === 'rare') {
    if (lengthVal <= 4) {
      text = generateShortOGCombo(lengthVal, type === 'letters');
      tags = ['OG', 'Short'];
    } else {
      const root = BRAND_ROOTS[Math.floor(Math.random() * BRAND_ROOTS.length)];
      text = root.charAt(0).toUpperCase() + root.slice(1);
      if (text.length < lengthVal) {
        text += VOWELS[Math.floor(Math.random() * VOWELS.length)];
      }
      if (text.length < lengthVal) {
        text += CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
      }
      text = text.slice(0, lengthVal);
      tags = ['Minimal'];
    }
  } else if (style === 'og') {
    // Generates 3-char or 4-char hyper rare names
    const len = lengthVal <= 4 ? lengthVal : (Math.random() > 0.5 ? 3 : 4);
    if (Math.random() > 0.6) {
      // Pick from real OG words like void, haze, flux
      const rWord = OG_SHORT_DICTIONARY[Math.floor(Math.random() * OG_SHORT_DICTIONARY.length)];
      text = rWord;
    } else {
      text = generateShortOGCombo(len, type === 'letters');
    }
    tags = ['OG', 'Ultra Rare'];
  } else if (style === 'gaming' || style === 'freefire') {
    const word = GAMING_WORDS[Math.floor(Math.random() * GAMING_WORDS.length)];
    let decorated = word.charAt(0).toUpperCase() + word.slice(1);

    if (Math.random() > 0.5) {
      const pre = GAMING_PREFIXES[Math.floor(Math.random() * GAMING_PREFIXES.length)].toUpperCase();
      decorated = `${pre}_${decorated}`;
    } else {
      const suff = GAMING_SUFFIXES[Math.floor(Math.random() * GAMING_SUFFIXES.length)];
      decorated = `${decorated}_${suff}`;
    }

    if (style === 'freefire') {
      const decor = FREE_FIRE_DECOR[Math.floor(Math.random() * FREE_FIRE_DECOR.length)];
      decorated = `${decor} ${decorated} ${decor}`;
      tags = ['Free Fire', 'Stylish'];
    } else {
      tags = ['Gaming', 'Action'];
    }
    text = decorated;
  } else if (style === 'clan') {
    const word = GAMING_WORDS[Math.floor(Math.random() * GAMING_WORDS.length)];
    const clanPrefixes = ['Velo', 'Xen', 'Viper', 'Nova', 'Alpha', 'Zeal', 'Spyr', 'Kyn'];
    const prefix = clanPrefixes[Math.floor(Math.random() * clanPrefixes.length)].toUpperCase();
    text = `${prefix}・${word.toUpperCase()}`;
    tags = ['Clan', 'Esports'];
  } else if (style === 'aesthetic') {
    const base = AESTHETIC_WORDS[Math.floor(Math.random() * AESTHETIC_WORDS.length)];
    const dec = AESTHETIC_DECOR[Math.floor(Math.random() * AESTHETIC_DECOR.length)];
    text = Math.random() > 0.5 ? `${base}${dec}` : `${dec}${base}`;
    tags = ['Aesthetic', 'Soft'];
  } else if (style === 'brandable') {
    // Generate startup style Name (like Spyr, Vynix, Solify, Zenix)
    const root = BRAND_ROOTS[Math.floor(Math.random() * BRAND_ROOTS.length)];
    const suff = BRAND_SUFFIXES[Math.floor(Math.random() * BRAND_SUFFIXES.length)];
    text = root + suff;
    text = text.charAt(0).toUpperCase() + text.slice(1);
    tags = ['Brandable', 'SaaS'];
  } else if (style === 'instagram' || style === 'discord' || style === 'telegram') {
    // Social specific styling
    const word = BRAND_ROOTS[Math.floor(Math.random() * BRAND_ROOTS.length)] + (Math.random() > 0.5 ? 'o' : 'x');
    text = word.charAt(0).toUpperCase() + word.slice(1);

    if (style === 'instagram') {
      text = text.toLowerCase();
      if (Math.random() > 0.5) text = `the_${text}`;
      else text = `${text}_official`;
      tags = ['Instagram', 'Creator'];
    } else if (style === 'telegram') {
      text = `${text}Tg`;
      tags = ['Telegram', 'Crypto'];
    } else {
      // Discord
      text = `${text}_og`;
      tags = ['Discord', 'Gaming'];
    }
  } else {
    // Cool / Modern / Random - default syllabic premium generators
    text = generatePremiumSyllables(lengthVal);
    tags = ['Modern', 'Premium'];
  }

  // Post processing for character length restriction if specified in filter
  if (lengthVal > 0) {
    // Clean up symbol prefixes/suffixes if we need letters only
    if (type === 'letters') {
      text = text.replace(/[^a-zA-Z]/g, '');
    }
    // Make sure we conform reasonably to length value requested in generator filters (not for clan/Free Fire tags though)
    if (style !== 'clan' && style !== 'freefire' && text.length !== lengthVal) {
      if (text.length > lengthVal) {
        text = text.slice(0, lengthVal);
      } else {
        const gap = lengthVal - text.length;
        if (type === 'alphanumeric' && gap <= 2) {
          text += Math.floor(Math.random() * 9);
        } else {
          text += generateShortOGCombo(gap, type === 'letters');
        }
      }
    }
  }

  // Final sanitization
  if (type === 'letters') {
    text = text.replace(/[^a-zA-Z]/g, '');
  }

  // Ensure first letter capitalization unless specified
  if (style !== 'instagram' && text.length > 0) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }

  return {
    text,
    style: style.toUpperCase(),
    length: text.length,
    tags,
    meaning: generateAestheticMeaning(text),
  };
}

// Generate an entire robust array of names ensuring uniqueness
export function generateUsernames(filters: GeneratorFilters): Username[] {
  const result: Username[] = [];
  const count = filters.count || 25;
  const seen = new Set<string>();

  // Determine actual length value for generator logic
  let lengthVal = 6;
  if (filters.length === '3') lengthVal = 3;
  else if (filters.length === '4') lengthVal = 4;
  else if (filters.length === '5') lengthVal = 5;
  else if (filters.length === '6') lengthVal = 6;
  else if (filters.length === '7') lengthVal = 7;
  else if (filters.length === '8+') lengthVal = 8 + Math.floor(Math.random() * 3);
  else {
    // All sizes
    lengthVal = 3 + Math.floor(Math.random() * 6);
  }

  // Determine list of styles to cycle through if 'all' is selected
  const availableStyles: UsernameStyle[] = [
    'random', 'og', 'rare', 'aesthetic', 'brandable', 'gaming', 'discord',
    'instagram', 'telegram', 'freefire', 'clan', 'minimal', 'cool', 'modern'
  ];

  let iterationLimit = count * 6; // infinite loop protection

  while (result.length < count && iterationLimit > 0) {
    iterationLimit--;

    // Determine current style for this item
    let currentStyle: UsernameStyle = filters.style === 'all'
      ? availableStyles[Math.floor(Math.random() * availableStyles.length)]
      : filters.style as UsernameStyle;

    // Map general Filter type to specific style presets if 'all' selected but matching filter type
    if (filters.type === 'og' && filters.style === 'all') {
      currentStyle = 'og';
    } else if (filters.type === 'rare' && filters.style === 'all') {
      currentStyle = 'rare';
    } else if (filters.type === 'gaming' && filters.style === 'all') {
      currentStyle = 'gaming';
    } else if (filters.type === 'brandable' && filters.style === 'all') {
      currentStyle = 'brandable';
    }

    // Dynamic length randomization when 'all' is requested
    let currentLen = lengthVal;
    if (filters.length === 'all') {
      if (currentStyle === 'og' || currentStyle === 'rare' || currentStyle === 'minimal') {
        currentLen = Math.random() > 0.4 ? 3 : 4;
      } else if (currentStyle === 'clan' || currentStyle === 'freefire') {
        currentLen = 8 + Math.floor(Math.random() * 4);
      } else {
        currentLen = 5 + Math.floor(Math.random() * 5);
      }
    }

    const item = generateSingleUsername(currentStyle, filters.type, currentLen);

    // Enforce filters strictly (letters, types)
    if (filters.type === 'letters' && /[^a-zA-Z]/g.test(item.text)) {
      continue;
    }
    if (filters.type === 'alphanumeric' && !/[0-9]/.test(item.text)) {
      // Add a number at the end
      item.text = item.text + Math.floor(Math.random() * 9);
      item.length = item.text.length;
    }

    // Uniqueness constraint
    if (!seen.has(item.text.toLowerCase()) && item.text.length > 1) {
      seen.add(item.text.toLowerCase());
      result.push(item);
    }
  }

  // fallback if iteration limit reached
  if (result.length < count) {
    const seedNames = ['Vinzu', 'Zyrox', 'Xevin', 'Azyr', 'Sahyx', 'Kyzen', 'Vynix', 'Qevro', 'Axen', 'Vyro'];
    for (const s of seedNames) {
      if (result.length >= count) break;
      if (!seen.has(s.toLowerCase())) {
        result.push({
          text: s,
          style: 'PREMIUM',
          length: s.length,
          tags: ['Unique', 'Rare'],
          meaning: generateAestheticMeaning(s)
        });
      }
    }
  }

  return result;
}

// Generate static trending usernames pool for trending widget
export const TRENDING_USERNAMES: Username[] = [
  { text: 'Zyrox', style: 'RARE', length: 5, tags: ['Trending', 'Gaming'], meaning: 'Futuristic obsidian star. Intense gaming focus.' },
  { text: 'Azyr', style: 'OG', length: 4, tags: ['OG', 'Rare'], meaning: 'Ethereal sky element, clean branding ready.' },
  { text: 'Vyro', style: 'MINIMAL', length: 4, tags: ['Best', 'SaaS'], meaning: 'Highly dynamic vector flow. Premium branding prefix.' },
  { text: 'Skye', style: 'OG', length: 4, tags: ['OG', 'Popular'], meaning: 'Infinite open digital canvas.' },
  { text: 'Kyzen', style: 'BRANDABLE', length: 5, tags: ['Startup', 'Zen'], meaning: 'Continuous growth. Exceptional professional alias.' },
  { text: 'Vynix', style: 'GAMING', length: 5, tags: ['Free Fire', 'Epic'], meaning: 'Unstoppable neon firebird.' },
  { text: 'Sahyx', style: 'AESTHETIC', length: 5, tags: ['Silent', 'Dark'], meaning: 'Stealth desert hunter of pixel realms.' },
  { text: 'x8q', style: 'OG', length: 3, tags: ['Ultra Rare', '3-Char'], meaning: 'Short alphanumeric matrix code name.' },
];
