// Language Learning Content - Modular Structure
// All categories are in separate files under /src/data/language/

export type LanguageType = 'uzbek-english' | 'uzbek-russian' | 'uzbek-both';

export interface LanguageWord {
  id: string;
  english: string;
  russian: string;
  uzbek: string;
  emoji: string;
  color: string;
  category: 'greeting' | 'food' | 'animal' | 'object' | 'family' | 'color' | 'number' | 'verb' | 'nature' | 'body';
  pronunciationEn: string;
  pronunciationRu: string;
  exampleEn: string;
  exampleRu: string;
  exampleUz: string;
}

// Import from modular files
import { greetings } from './language/greetings';
import { food } from './language/food';
import { animals } from './language/animals';
import { objects } from './language/objects';
import { family } from './language/family';
import { colors } from './language/colors';
import { numbers } from './language/numbers';
import { verbs } from './language/verbs';
import { nature } from './language/nature';
import { body } from './language/body';

// Re-export individual categories
export { greetings, food, animals, objects, family, colors, numbers, verbs, nature, body };

// All words aggregated
export const languageWords: LanguageWord[] = [
  ...greetings,
  ...food,
  ...animals,
  ...objects,
  ...family,
  ...colors,
  ...numbers,
  ...verbs,
  ...nature,
  ...body,
];

// Category metadata
export const categoryMeta: Record<LanguageWord['category'], { label: string; emoji: string; color: string }> = {
  greeting:  { label: 'Salomlashish', emoji: '👋', color: 'from-blue-400 to-cyan-400' },
  food:      { label: 'Ovqat',        emoji: '🍎', color: 'from-red-400 to-orange-400' },
  animal:    { label: 'Hayvonlar',    emoji: '🐱', color: 'from-amber-400 to-orange-400' },
  object:    { label: 'Narsalar',     emoji: '📚', color: 'from-green-400 to-teal-400' },
  family:    { label: 'Oila',         emoji: '👨‍👩‍👧', color: 'from-pink-400 to-rose-400' },
  color:     { label: 'Ranglar',      emoji: '🎨', color: 'from-purple-400 to-pink-400' },
  number:    { label: 'Raqamlar',     emoji: '🔢', color: 'from-indigo-400 to-purple-400' },
  verb:      { label: "Fe'llar",      emoji: '🏃', color: 'from-green-500 to-emerald-500' },
  nature:    { label: 'Tabiat',       emoji: '🌿', color: 'from-teal-400 to-green-500' },
  body:      { label: 'Tana',         emoji: '🖐️', color: 'from-amber-400 to-orange-400' },
};

// Filter by category
export function getWordsByCategory(category: LanguageWord['category']): LanguageWord[] {
  return languageWords.filter(word => word.category === category);
}

// Get random words for practice
export function getRandomWords(count: number): LanguageWord[] {
  const shuffled = [...languageWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Get words by category for speaking practice
export function getWordsForSpeaking(count: number = 8): LanguageWord[] {
  const simpleCategories: LanguageWord['category'][] = ['greeting', 'food', 'animal', 'color'];
  const pool = languageWords.filter(w => simpleCategories.includes(w.category));
  return pool.sort(() => 0.5 - Math.random()).slice(0, count);
}
