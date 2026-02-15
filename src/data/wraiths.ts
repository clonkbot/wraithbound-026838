export interface Wraith {
  id: string;
  name: string;
  element: 'shadow' | 'flame' | 'void' | 'storm' | 'venom' | 'frost';
  rarity: 1 | 2 | 3 | 4 | 5;
  emoji: string;
  gradient: string;
  description: string;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

export const wraiths: Wraith[] = [
  {
    id: 'umbra-rex',
    name: 'Umbra Rex',
    element: 'shadow',
    rarity: 5,
    emoji: '👁️',
    gradient: 'from-purple-900 to-slate-900',
    description: 'The king of shadows, born from the void between stars. Its gaze can consume light itself.',
    abilities: ['Eclipse Strike', 'Void Grasp', 'Shadow Realm'],
    stats: { hp: 120, attack: 95, defense: 80, speed: 75 }
  },
  {
    id: 'inferno-drake',
    name: 'Inferno Drake',
    element: 'flame',
    rarity: 4,
    emoji: '🔥',
    gradient: 'from-orange-600 to-red-900',
    description: 'A serpentine beast wreathed in hellfire. Its scales glow like molten iron.',
    abilities: ['Hellfire Burst', 'Molten Shield', 'Ash Storm'],
    stats: { hp: 100, attack: 110, defense: 60, speed: 85 }
  },
  {
    id: 'nova-specter',
    name: 'Nova Specter',
    element: 'void',
    rarity: 5,
    emoji: '💫',
    gradient: 'from-pink-600 to-purple-900',
    description: 'A being of pure cosmic energy, phasing between dimensions at will.',
    abilities: ['Dimension Rift', 'Cosmic Drain', 'Nova Blast'],
    stats: { hp: 90, attack: 100, defense: 70, speed: 110 }
  },
  {
    id: 'thunder-fang',
    name: 'Thunder Fang',
    element: 'storm',
    rarity: 4,
    emoji: '⚡',
    gradient: 'from-cyan-500 to-blue-900',
    description: 'Lightning incarnate, striking with the fury of a thousand storms.',
    abilities: ['Chain Lightning', 'Storm Surge', 'Static Field'],
    stats: { hp: 95, attack: 90, defense: 65, speed: 120 }
  },
  {
    id: 'venom-lurker',
    name: 'Venom Lurker',
    element: 'venom',
    rarity: 3,
    emoji: '🐍',
    gradient: 'from-green-600 to-emerald-900',
    description: 'A toxic nightmare that dissolves prey with corrosive venom.',
    abilities: ['Acid Spit', 'Toxic Cloud', 'Paralysis Bite'],
    stats: { hp: 85, attack: 75, defense: 70, speed: 90 }
  },
  {
    id: 'frost-wraith',
    name: 'Frost Wraith',
    element: 'frost',
    rarity: 4,
    emoji: '❄️',
    gradient: 'from-blue-400 to-indigo-900',
    description: 'An ethereal specter of endless winter, freezing all in its wake.',
    abilities: ['Blizzard', 'Ice Prison', 'Frozen Heart'],
    stats: { hp: 105, attack: 70, defense: 95, speed: 70 }
  },
  {
    id: 'crimson-maw',
    name: 'Crimson Maw',
    element: 'shadow',
    rarity: 3,
    emoji: '👹',
    gradient: 'from-red-700 to-slate-900',
    description: 'A ravenous demon that feeds on fear and flesh alike.',
    abilities: ['Blood Frenzy', 'Terror Roar', 'Devour'],
    stats: { hp: 110, attack: 85, defense: 75, speed: 65 }
  },
  {
    id: 'plasma-phoenix',
    name: 'Plasma Phoenix',
    element: 'flame',
    rarity: 5,
    emoji: '🦅',
    gradient: 'from-yellow-500 to-orange-700',
    description: 'A radiant bird of pure plasma, reborn from nuclear fire.',
    abilities: ['Solar Flare', 'Rebirth', 'Plasma Dive'],
    stats: { hp: 80, attack: 115, defense: 55, speed: 105 }
  }
];
