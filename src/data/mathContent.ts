// Complete Math Learning Content

export interface MathQuestion {
  id: string;
  question: string;
  emoji1: string;
  emoji2: string;
  operation: '+' | '-';
  num1: number;
  num2: number;
  answers: number[];
  correct: number;
  color: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const mathQuestions: MathQuestion[] = [
  // Easy Addition
  {
    id: 'math_1',
    question: '1 + 1 = ?',
    emoji1: '🍎',
    emoji2: '🍎',
    operation: '+',
    num1: 1,
    num2: 1,
    answers: [1, 2, 3],
    correct: 2,
    color: 'from-red-400 to-pink-400',
    difficulty: 'easy',
  },
  {
    id: 'math_2',
    question: '2 + 1 = ?',
    emoji1: '🍌🍌',
    emoji2: '🍌',
    operation: '+',
    num1: 2,
    num2: 1,
    answers: [2, 3, 4],
    correct: 3,
    color: 'from-yellow-400 to-amber-400',
    difficulty: 'easy',
  },
  {
    id: 'math_3',
    question: '2 + 2 = ?',
    emoji1: '🍊🍊',
    emoji2: '🍊🍊',
    operation: '+',
    num1: 2,
    num2: 2,
    answers: [3, 4, 5],
    correct: 4,
    color: 'from-orange-400 to-red-400',
    difficulty: 'easy',
  },
  {
    id: 'math_4',
    question: '3 + 1 = ?',
    emoji1: '⭐⭐⭐',
    emoji2: '⭐',
    operation: '+',
    num1: 3,
    num2: 1,
    answers: [3, 4, 5],
    correct: 4,
    color: 'from-purple-400 to-pink-400',
    difficulty: 'easy',
  },
  {
    id: 'math_5',
    question: '2 + 3 = ?',
    emoji1: '🎈🎈',
    emoji2: '🎈🎈🎈',
    operation: '+',
    num1: 2,
    num2: 3,
    answers: [4, 5, 6],
    correct: 5,
    color: 'from-blue-400 to-cyan-400',
    difficulty: 'easy',
  },
  
  // Easy Subtraction
  {
    id: 'math_6',
    question: '3 - 1 = ?',
    emoji1: '🍎🍎🍎',
    emoji2: '❌ 🍎',
    operation: '-',
    num1: 3,
    num2: 1,
    answers: [1, 2, 3],
    correct: 2,
    color: 'from-green-400 to-emerald-400',
    difficulty: 'easy',
  },
  {
    id: 'math_7',
    question: '4 - 2 = ?',
    emoji1: '🌟🌟🌟🌟',
    emoji2: '❌ 🌟🌟',
    operation: '-',
    num1: 4,
    num2: 2,
    answers: [1, 2, 3],
    correct: 2,
    color: 'from-yellow-400 to-orange-400',
    difficulty: 'easy',
  },
  {
    id: 'math_8',
    question: '5 - 2 = ?',
    emoji1: '🍓🍓🍓🍓🍓',
    emoji2: '❌ 🍓🍓',
    operation: '-',
    num1: 5,
    num2: 2,
    answers: [2, 3, 4],
    correct: 3,
    color: 'from-red-500 to-pink-500',
    difficulty: 'easy',
  },

  // Medium Addition
  {
    id: 'math_9',
    question: '4 + 3 = ?',
    emoji1: '🎯🎯🎯🎯',
    emoji2: '🎯🎯🎯',
    operation: '+',
    num1: 4,
    num2: 3,
    answers: [6, 7, 8],
    correct: 7,
    color: 'from-indigo-400 to-purple-400',
    difficulty: 'medium',
  },
  {
    id: 'math_10',
    question: '5 + 3 = ?',
    emoji1: '🌺🌺🌺🌺🌺',
    emoji2: '🌺🌺🌺',
    operation: '+',
    num1: 5,
    num2: 3,
    answers: [7, 8, 9],
    correct: 8,
    color: 'from-pink-400 to-rose-400',
    difficulty: 'medium',
  },
  {
    id: 'math_11',
    question: '6 + 2 = ?',
    emoji1: '🎨🎨🎨🎨🎨🎨',
    emoji2: '🎨🎨',
    operation: '+',
    num1: 6,
    num2: 2,
    answers: [7, 8, 9],
    correct: 8,
    color: 'from-purple-500 to-indigo-500',
    difficulty: 'medium',
  },
  {
    id: 'math_12',
    question: '5 + 4 = ?',
    emoji1: '🎪🎪🎪🎪🎪',
    emoji2: '🎪🎪🎪🎪',
    operation: '+',
    num1: 5,
    num2: 4,
    answers: [8, 9, 10],
    correct: 9,
    color: 'from-cyan-400 to-blue-400',
    difficulty: 'medium',
  },
];
