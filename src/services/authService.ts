// Authentication & Progress Tracking Service with localStorage
// Stores all user progress, stars, XP, and completed lessons

export interface UserProgress {
  name: string;
  age: number;
  level: number;
  totalXP: number;
  totalStars: number;
  streak: number;
  streakDays: number;
  lastVisit: string;
  completedLessons: Record<string, CompletedLesson>;
  unlockedModules: string[];
  subjectProgress: {
    alphabet: number;
    numbers: number;
    speaking: number;
    math: number;
    science: number;
    language: number;
  };
  preferences: {
    theme: string;
    sound: boolean;
    language: string;
  };
}

export interface CompletedLesson {
  id: string;
  category: string;
  completedAt: string;
  stars: number;
  score?: number;
}

const STORAGE_KEY = 'eduself_user_progress';
const DEFAULT_PROGRESS: UserProgress = {
  name: 'Bola',
  age: 6,
  level: 1,
  totalXP: 0,
  totalStars: 0,
  streak: 0,
  streakDays: 0,
  lastVisit: new Date().toISOString(),
  completedLessons: {},
  unlockedModules: ['counting', 'unit1', 'gravity', 'light', 'sound'], // First modules unlocked
  subjectProgress: {
    alphabet: 0,
    numbers: 0,
    speaking: 0,
    math: 0,
    science: 0,
    language: 0,
  },
  preferences: {
    theme: 'default',
    sound: true,
    language: 'uz',
  },
};

class AuthService {
  private currentProgress: UserProgress | null = null;

  constructor() {
    this.loadProgress();
  }

  // Load progress from localStorage
  private loadProgress(): void {
    try {
      const progressStr = localStorage.getItem(STORAGE_KEY);
      if (progressStr) {
        const savedProgress = JSON.parse(progressStr);
        // Merge with DEFAULT_PROGRESS to ensure all fields exist
        this.currentProgress = {
          ...DEFAULT_PROGRESS,
          ...savedProgress,
          subjectProgress: {
            ...DEFAULT_PROGRESS.subjectProgress,
            ...(savedProgress.subjectProgress || {}),
          },
          preferences: {
            ...DEFAULT_PROGRESS.preferences,
            ...(savedProgress.preferences || {}),
          },
        };
        // Save the merged progress to update localStorage
        this.saveProgress();
      } else {
        this.currentProgress = { ...DEFAULT_PROGRESS };
        this.saveProgress();
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      this.currentProgress = { ...DEFAULT_PROGRESS };
    }
  }

  // Save progress to localStorage
  private saveProgress(): void {
    if (this.currentProgress) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.currentProgress));
    }
  }

  // Get current progress
  getProgress(): UserProgress {
    if (!this.currentProgress) {
      this.loadProgress();
    }
    return this.currentProgress!;
  }

  // Get current user info
  getCurrentUser(): { name: string; age: number; avatar: string } | null {
    const progress = this.getProgress();
    return {
      name: progress.name,
      age: progress.age,
      avatar: '👦', // Default avatar
    };
  }

  // Get total stars
  getTotalStars(): number {
    return this.getProgress().totalStars;
  }

  // Get total XP
  getTotalXP(): number {
    return this.getProgress().totalXP;
  }

  // Get streak
  getStreak(): number {
    return this.getProgress().streak;
  }

  // Add XP
  addXP(amount: number): void {
    const progress = this.getProgress();
    progress.totalXP += amount;
    
    // Calculate level based on XP (every 100 XP = 1 level)
    const newLevel = Math.floor(progress.totalXP / 100) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
      console.log(`🎉 Level up! Now level ${newLevel}`);
    }
    
    this.saveProgress();
  }

  // Add stars
  addStars(count: number): void {
    const progress = this.getProgress();
    progress.totalStars += count;
    this.addXP(count * 10); // 1 star = 10 XP
    this.saveProgress();
  }

  // Complete lesson
  completeLesson(lessonId: string, category: string, stars: number = 3, score?: number): void {
    const progress = this.getProgress();
    
    const lesson: CompletedLesson = {
      id: lessonId,
      category,
      completedAt: new Date().toISOString(),
      stars,
      score,
    };
    
    progress.completedLessons[lessonId] = lesson;
    this.saveProgress();
  }

  // Check if lesson is completed
  isLessonCompleted(lessonId: string): boolean {
    const progress = this.getProgress();
    return !!progress.completedLessons[lessonId];
  }

  // Get completed lessons as array
  getCompletedLessons(): string[] {
    const progress = this.getProgress();
    return Object.keys(progress.completedLessons);
  }

  // Get lesson progress
  getLessonProgress(lessonId: string): CompletedLesson | null {
    const progress = this.getProgress();
    return progress.completedLessons[lessonId] || null;
  }

  // Unlock module
  unlockModule(moduleId: string): void {
    const progress = this.getProgress();
    if (!progress.unlockedModules.includes(moduleId)) {
      progress.unlockedModules.push(moduleId);
      this.saveProgress();
    }
  }

  // Check if module is unlocked
  isModuleUnlocked(moduleId: string): boolean {
    const progress = this.getProgress();
    return progress.unlockedModules.includes(moduleId);
  }

  // Check if can unlock module (based on XP)
  canUnlockModule(requiredXP: number): boolean {
    return this.getTotalXP() >= requiredXP;
  }

  // Update streak
  updateStreak(): void {
    const progress = this.getProgress();
    const today = new Date().toDateString();
    const lastVisit = new Date(progress.lastVisit).toDateString();

    if (today !== lastVisit) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastVisit === yesterdayStr) {
        // Continue streak
        progress.streak += 1;
        progress.streakDays += 1;
      } else {
        // Reset streak
        progress.streak = 1;
        progress.streakDays = 1;
      }

      progress.lastVisit = new Date().toISOString();
      this.saveProgress();
    }
  }

  // Update user profile
  updateProfile(name?: string, age?: number): void {
    const progress = this.getProgress();
    if (name) progress.name = name;
    if (age) progress.age = age;
    this.saveProgress();
  }

  // Update preferences
  updatePreferences(prefs: Partial<UserProgress['preferences']>): void {
    const progress = this.getProgress();
    progress.preferences = { ...progress.preferences, ...prefs };
    this.saveProgress();
  }

  // Update subject progress
  updateSubjectProgress(subject: keyof UserProgress['subjectProgress'], increment: number = 1): void {
    const progress = this.getProgress();
    if (progress.subjectProgress) {
      progress.subjectProgress[subject] = (progress.subjectProgress[subject] || 0) + increment;
      this.saveProgress();
    }
  }

  // Reset progress (for testing)
  resetProgress(): void {
    this.currentProgress = { ...DEFAULT_PROGRESS };
    this.saveProgress();
  }

  // Clear all data
  clearData(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.currentProgress = null;
  }

  // Export progress as JSON
  exportProgress(): string {
    return JSON.stringify(this.getProgress(), null, 2);
  }

  // Import progress from JSON
  importProgress(progressJson: string): boolean {
    try {
      const progress = JSON.parse(progressJson);
      this.currentProgress = progress;
      this.saveProgress();
      return true;
    } catch (error) {
      console.error('Error importing progress:', error);
      return false;
    }
  }
}

export const authService = new AuthService();