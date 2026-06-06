export interface Username {
  text: string;
  style: string;
  length: number;
  tags: string[];
  meaning?: string;
  isAiGenerated?: boolean;
}

export type UsernameStyle =
  | 'random'
  | 'og'
  | 'rare'
  | 'aesthetic'
  | 'brandable'
  | 'gaming'
  | 'discord'
  | 'instagram'
  | 'telegram'
  | 'freefire'
  | 'clan'
  | 'minimal'
  | 'cool'
  | 'modern';

export type LengthFilter = 'all' | '3' | '4' | '5' | '6' | '7' | '8+';

export type TypeFilter =
  | 'all'
  | 'letters'
  | 'alphanumeric'
  | 'brandable'
  | 'gaming'
  | 'social'
  | 'rare'
  | 'og';

export interface GeneratorFilters {
  length: LengthFilter;
  type: TypeFilter;
  style: UsernameStyle | 'all';
  count: number; // 10, 25, 50, 100
}

export interface FavoriteCollection {
  id: string;
  name: string;
  usernames: Username[];
}

export interface ActivityHistoryItem {
  id: string;
  text: string;
  timestamp: string;
  action: 'generated' | 'copied' | 'favorited';
  style?: string;
}

export interface PlatformAvailability {
  platform: string;
  status: 'available' | 'taken' | 'unknown';
  checking: boolean;
  url?: string;
}

export interface LeaderboardStats {
  text: string;
  count: number;
}
