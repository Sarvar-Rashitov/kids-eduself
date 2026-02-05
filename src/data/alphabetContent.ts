// Complete Alphabet Learning Content

export interface LetterLesson {
  letter: string;
  word: string;
  wordEnglish: string;
  emoji: string;
  color: string;
  examples: string[];
  story: string;
  sound: string;
}

export const alphabetLessons: LetterLesson[] = [
  {
    letter: 'A',
    word: 'Olma',
    wordEnglish: 'Apple',
    emoji: '🍎',
    color: 'from-red-400 to-pink-400',
    examples: ['Ali', 'Ata', 'Ana'],
    story: 'Olma - shirinlik va sog\'lik belgisi. Har kuni olma yeymiz!',
    sound: 'a-a-a',
  },
  {
    letter: 'B',
    word: 'Banan',
    wordEnglish: 'Banana',
    emoji: '🍌',
    color: 'from-yellow-400 to-amber-400',
    examples: ['Bola', 'Bog\'', 'Bola'],
    story: 'Banan - sariq va mazali meva. Maymunlar yaxshi ko\'radi!',
    sound: 'b-b-b',
  },
  {
    letter: 'D',
    word: 'Daftar',
    wordEnglish: 'Notebook',
    emoji: '📓',
    color: 'from-blue-400 to-cyan-400',
    examples: ['Do\'st', 'Daryo', 'Daraxt'],
    story: 'Daftarga yozamiz va chizamiz. Bilim uchun muhim!',
    sound: 'd-d-d',
  },
  {
    letter: 'O',
    word: 'Oy',
    wordEnglish: 'Moon',
    emoji: '🌙',
    color: 'from-purple-400 to-indigo-400',
    examples: ['Ona', 'Oltin', 'O\'qish'],
    story: 'Oy kechasi osmonda porlaydi. Juda go\'zal!',
    sound: 'o-o-o',
  },
  {
    letter: 'K',
    word: 'Kitob',
    wordEnglish: 'Book',
    emoji: '📚',
    color: 'from-green-400 to-emerald-400',
    examples: ['Kecha', 'Ko\'cha', 'Ko\'k'],
    story: 'Kitob bizga bilim beradi. O\'qishni yaxshi ko\'ramiz!',
    sound: 'k-k-k',
  },
  {
    letter: 'M',
    word: 'Meva',
    wordEnglish: 'Fruit',
    emoji: '🍇',
    color: 'from-purple-500 to-pink-500',
    examples: ['Mushuk', 'Maktab', 'Maymun'],
    story: 'Mevalar shirinlik va vitamin beradi!',
    sound: 'm-m-m',
  },
  {
    letter: 'S',
    word: 'Sut',
    wordEnglish: 'Milk',
    emoji: '🥛',
    color: 'from-blue-300 to-cyan-300',
    examples: ['Sabzi', 'Samokat', 'Somon'],
    story: 'Sut oq va foydali ichimlik. Sog\'liq uchun!',
    sound: 's-s-s',
  },
  {
    letter: 'T',
    word: 'Tut',
    wordEnglish: 'Mulberry',
    emoji: '🫐',
    color: 'from-indigo-400 to-purple-400',
    examples: ['Tovuq', 'Tong', 'Tog\''],
    story: 'Tut - shirinlik daraxtda o\'sadi!',
    sound: 't-t-t',
  },
  {
    letter: 'G',
    word: 'Gul',
    wordEnglish: 'Flower',
    emoji: '🌸',
    color: 'from-pink-400 to-rose-400',
    examples: ['Go\'sht', 'Guliston', 'Gap'],
    story: 'Gul - rang-barang va xushbo\'y!',
    sound: 'g-g-g',
  },
  {
    letter: 'Q',
    word: 'Qush',
    wordEnglish: 'Bird',
    emoji: '🐦',
    color: 'from-cyan-400 to-blue-400',
    examples: ['Qalam', 'Qor', 'Quyosh'],
    story: 'Qush osmondan uchadi va qo\'shiq aytadi!',
    sound: 'q-q-q',
  },
];
