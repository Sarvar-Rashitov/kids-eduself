// Complete Language Learning Content

export interface LanguageWord {
  id: string;
  english: string;
  uzbek: string;
  emoji: string;
  color: string;
  category: 'greeting' | 'food' | 'animal' | 'object' | 'family' | 'color' | 'number';
  pronunciation: string;
  example: string;
}

export const languageWords: LanguageWord[] = [
  // Greetings
  {
    id: 'lang_1',
    english: 'Hello',
    uzbek: 'Salom',
    emoji: '👋',
    color: 'from-blue-400 to-cyan-400',
    category: 'greeting',
    pronunciation: 'heh-loh',
    example: 'Hello, my friend!',
  },
  {
    id: 'lang_2',
    english: 'Thank you',
    uzbek: 'Rahmat',
    emoji: '🙏',
    color: 'from-purple-400 to-pink-400',
    category: 'greeting',
    pronunciation: 'thank yoo',
    example: 'Thank you very much!',
  },
  {
    id: 'lang_3',
    english: 'Good morning',
    uzbek: 'Xayrli tong',
    emoji: '🌅',
    color: 'from-orange-400 to-yellow-400',
    category: 'greeting',
    pronunciation: 'good mor-ning',
    example: 'Good morning, mom!',
  },
  {
    id: 'lang_4',
    english: 'Good night',
    uzbek: 'Xayrli tun',
    emoji: '🌙',
    color: 'from-indigo-400 to-purple-400',
    category: 'greeting',
    pronunciation: 'good nait',
    example: 'Good night, sleep well!',
  },

  // Food
  {
    id: 'lang_5',
    english: 'Apple',
    uzbek: 'Olma',
    emoji: '🍎',
    color: 'from-red-400 to-pink-400',
    category: 'food',
    pronunciation: 'ap-puhl',
    example: 'I eat an apple.',
  },
  {
    id: 'lang_6',
    english: 'Banana',
    uzbek: 'Banan',
    emoji: '🍌',
    color: 'from-yellow-400 to-amber-400',
    category: 'food',
    pronunciation: 'buh-na-nuh',
    example: 'Banana is yellow.',
  },
  {
    id: 'lang_7',
    english: 'Bread',
    uzbek: 'Non',
    emoji: '🍞',
    color: 'from-amber-400 to-orange-400',
    category: 'food',
    pronunciation: 'bred',
    example: 'I like bread.',
  },
  {
    id: 'lang_8',
    english: 'Water',
    uzbek: 'Suv',
    emoji: '💧',
    color: 'from-blue-400 to-cyan-400',
    category: 'food',
    pronunciation: 'waw-ter',
    example: 'Water is good.',
  },

  // Animals
  {
    id: 'lang_9',
    english: 'Cat',
    uzbek: 'Mushuk',
    emoji: '🐱',
    color: 'from-orange-400 to-yellow-400',
    category: 'animal',
    pronunciation: 'kat',
    example: 'The cat is cute.',
  },
  {
    id: 'lang_10',
    english: 'Dog',
    uzbek: 'It',
    emoji: '🐶',
    color: 'from-amber-500 to-orange-500',
    category: 'animal',
    pronunciation: 'dawg',
    example: 'My dog is happy.',
  },
  {
    id: 'lang_11',
    english: 'Bird',
    uzbek: 'Qush',
    emoji: '🐦',
    color: 'from-sky-400 to-blue-400',
    category: 'animal',
    pronunciation: 'burd',
    example: 'Bird can fly.',
  },
  {
    id: 'lang_12',
    english: 'Fish',
    uzbek: 'Baliq',
    emoji: '🐠',
    color: 'from-cyan-400 to-teal-400',
    category: 'animal',
    pronunciation: 'fish',
    example: 'Fish lives in water.',
  },

  // Objects
  {
    id: 'lang_13',
    english: 'Book',
    uzbek: 'Kitob',
    emoji: '📚',
    color: 'from-green-400 to-emerald-400',
    category: 'object',
    pronunciation: 'book',
    example: 'I read a book.',
  },
  {
    id: 'lang_14',
    english: 'Ball',
    uzbek: 'To\'p',
    emoji: '⚽',
    color: 'from-red-500 to-orange-500',
    category: 'object',
    pronunciation: 'bawl',
    example: 'Let\'s play with a ball.',
  },
  {
    id: 'lang_15',
    english: 'Car',
    uzbek: 'Mashina',
    emoji: '🚗',
    color: 'from-blue-500 to-indigo-500',
    category: 'object',
    pronunciation: 'kar',
    example: 'The car is fast.',
  },

  // Family
  {
    id: 'lang_16',
    english: 'Mother',
    uzbek: 'Ona',
    emoji: '👩',
    color: 'from-pink-400 to-rose-400',
    category: 'family',
    pronunciation: 'muh-ther',
    example: 'I love my mother.',
  },
  {
    id: 'lang_17',
    english: 'Father',
    uzbek: 'Ota',
    emoji: '👨',
    color: 'from-blue-500 to-cyan-500',
    category: 'family',
    pronunciation: 'fah-ther',
    example: 'My father is strong.',
  },

  // Colors
  {
    id: 'lang_18',
    english: 'Red',
    uzbek: 'Qizil',
    emoji: '🔴',
    color: 'from-red-400 to-red-600',
    category: 'color',
    pronunciation: 'red',
    example: 'The apple is red.',
  },
  {
    id: 'lang_19',
    english: 'Blue',
    uzbek: 'Ko\'k',
    emoji: '🔵',
    color: 'from-blue-400 to-blue-600',
    category: 'color',
    pronunciation: 'bloo',
    example: 'The sky is blue.',
  },
  {
    id: 'lang_20',
    english: 'Yellow',
    uzbek: 'Sariq',
    emoji: '🟡',
    color: 'from-yellow-400 to-yellow-600',
    category: 'color',
    pronunciation: 'yel-oh',
    example: 'The sun is yellow.',
  },
];
