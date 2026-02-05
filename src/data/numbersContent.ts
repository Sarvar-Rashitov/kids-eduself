// Numbers Learning Content

export interface NumberLesson {
  number: number;
  uzbek: string;
  english: string;
  emoji: string;
  items: string[];
  color: string;
  story: string;
  examples: string[];
}

export const numbersLessons: NumberLesson[] = [
  {
    number: 1,
    uzbek: "Bir",
    english: "One",
    emoji: "🍎",
    items: ["🍎"],
    color: "from-red-400 to-pink-400",
    story: "Bitta olma - bu bir. Har narsa bittadan boshlanadi!",
    examples: ["Bitta quyosh", "Bitta oy", "Bitta burun"],
  },
  {
    number: 2,
    uzbek: "Ikki",
    english: "Two",
    emoji: "🍌",
    items: ["🍌", "🍌"],
    color: "from-yellow-400 to-amber-400",
    story: "Ikkita banan - bu juft! Bizda ikkita qo'l va ikkita oyoq bor.",
    examples: ["Ikkita ko'z", "Ikkita quloq", "Ikkita qo'l"],
  },
  {
    number: 3,
    uzbek: "Uch",
    english: "Three",
    emoji: "🍊",
    items: ["🍊", "🍊", "🍊"],
    color: "from-orange-400 to-red-400",
    story: "Uchta apelsin - ajoyib! Svetoforning uchta rangi bor.",
    examples: ["Uchta barmog'", "Uchta rang", "Uchta yulduz"],
  },
  {
    number: 4,
    uzbek: "To'rt",
    english: "Four",
    emoji: "🍇",
    items: ["🍇", "🍇", "🍇", "🍇"],
    color: "from-purple-400 to-pink-400",
    story: "To'rtta uzum - ko'p! Stulning to'rtta oyog'i bor.",
    examples: ["To'rtta fasl", "To'rtta tom", "To'rtta g'ildirak"],
  },
  {
    number: 5,
    uzbek: "Besh",
    english: "Five",
    emoji: "🍓",
    items: ["🍓", "🍓", "🍓", "🍓", "🍓"],
    color: "from-red-500 to-pink-500",
    story: "Beshta qulupnay - juda shirinlik! Qo'lda beshta barmoq bor.",
    examples: ["Beshta barmoq", "Beshta yulduz", "Beshta kun"],
  },
  {
    number: 6,
    uzbek: "Olti",
    english: "Six",
    emoji: "🥕",
    items: ["🥕", "🥕", "🥕", "🥕", "🥕", "🥕"],
    color: "from-orange-500 to-red-500",
    story: "Oltita sabzi - sog'lom! Asal asalarilar oltita oyoqqa ega.",
    examples: ["Oltita tuxum", "Oltita rangni", "Oltita burchak"],
  },
  {
    number: 7,
    uzbek: "Yetti",
    english: "Seven",
    emoji: "🌈",
    items: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤"],
    color: "from-pink-400 via-purple-400 to-blue-400",
    story: "Yettita rang - kamalakda! Haftada yettita kun bor.",
    examples: ["Yettita kun", "Yettita rang", "Yettita nota"],
  },
  {
    number: 8,
    uzbek: "Sakkiz",
    english: "Eight",
    emoji: "🐙",
    items: ["🦑", "🦑", "🦑", "🦑", "🦑", "🦑", "🦑", "🦑"],
    color: "from-blue-500 to-purple-500",
    story: "Sakkizta sakkizoyoq - dengizda! Sakkiz - juft raqam.",
    examples: ["Sakkizta oyoq", "Sakkizta kun", "Sakkizta yulduz"],
  },
  {
    number: 9,
    uzbek: "To'qqiz",
    english: "Nine",
    emoji: "⭐",
    items: ["⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐"],
    color: "from-yellow-400 to-orange-400",
    story: "To'qqizta yulduz - osmonni bezatadi! To'qqiz katta raqam.",
    examples: ["To'qqizta qush", "To'qqizta gul", "To'qqizta olma"],
  },
  {
    number: 10,
    uzbek: "O'n",
    english: "Ten",
    emoji: "🎯",
    items: ["🎯", "🎯", "🎯", "🎯", "🎯", "🎯", "🎯", "🎯", "🎯", "🎯"],
    color: "from-green-500 to-emerald-500",
    story: "O'nta nishon - mukammal ball! Barmoqlarimiz hammasi o'nta.",
    examples: ["O'nta barmoq", "O'nta ball", "O'nta yulduz"],
  },
];
