// Authentication Service

export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string;
  parentEmail?: string;
  createdAt: Date;
}

export interface UserProgress {
  userId: string;
  totalStars: number;
  level: number;
  streakDays: number;
  completedLessons: string[];
  achievements: string[];
  lastActiveDate: string;
  subjectProgress: {
    alphabet: number;
    numbers: number;
    speaking: number;
    math: number;
    science: number;
    language: number;
  };
}

class AuthService {
  private readonly USER_KEY = 'eduself_user';
  private readonly PROGRESS_KEY = 'eduself_progress';
  private currentUser: User | null = null;

  constructor() {
    this.loadUser();
  }

  // Load user from localStorage
  private loadUser(): void {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }
  }

  // Register new user
  register(name: string, age: number, avatar: string, parentEmail?: string): User {
    const user: User = {
      id: this.generateId(),
      name,
      age,
      avatar,
      parentEmail,
      createdAt: new Date(),
    };

    // Initialize user progress
    const progress: UserProgress = {
      userId: user.id,
      totalStars: 0,
      level: 1,
      streakDays: 0,
      completedLessons: [],
      achievements: [],
      lastActiveDate: new Date().toISOString(),
      subjectProgress: {
        alphabet: 0,
        numbers: 0,
        speaking: 0,
        math: 0,
        science: 0,
        language: 0,
      },
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(progress));
    
    this.currentUser = user;
    return user;
  }

  // Login user
  login(userId: string): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.id === userId) {
        this.currentUser = user;
        return user;
      }
    }
    return null;
  }

  // Logout
  logout(): void {
    this.currentUser = null;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Update user profile
  updateProfile(updates: Partial<User>): void {
    if (!this.currentUser) return;

    this.currentUser = { ...this.currentUser, ...updates };
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.currentUser));
  }

  // Get user progress
  getProgress(): UserProgress | null {
    const progressStr = localStorage.getItem(this.PROGRESS_KEY);
    if (progressStr) {
      return JSON.parse(progressStr);
    }
    return null;
  }

  // Update progress
  updateProgress(updates: Partial<UserProgress>): void {
    const current = this.getProgress();
    if (!current) return;

    const updated = { ...current, ...updates };
    localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(updated));
  }

  // Add stars
  addStars(count: number): void {
    const progress = this.getProgress();
    if (!progress) return;

    progress.totalStars += count;
    
    // Check for level up
    const newLevel = Math.floor(progress.totalStars / 10) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
      // Level up event
    }

    this.updateProgress(progress);
  }

  // Complete lesson
  completeLesson(lessonId: string, subject: keyof UserProgress['subjectProgress']): void {
    const progress = this.getProgress();
    if (!progress) return;

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.subjectProgress[subject] = (progress.subjectProgress[subject] || 0) + 1;
      this.updateProgress(progress);
    }
  }

  // Unlock achievement
  unlockAchievement(achievementId: string): void {
    const progress = this.getProgress();
    if (!progress) return;

    if (!progress.achievements.includes(achievementId)) {
      progress.achievements.push(achievementId);
      this.updateProgress(progress);
    }
  }

  // Update streak
  updateStreak(): void {
    const progress = this.getProgress();
    if (!progress) return;

    const today = new Date().toDateString();
    const lastActive = new Date(progress.lastActiveDate).toDateString();

    if (today !== lastActive) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastActive === yesterdayStr) {
        progress.streakDays += 1;
      } else {
        progress.streakDays = 1;
      }

      progress.lastActiveDate = new Date().toISOString();
      this.updateProgress(progress);
    }
  }

  // Generate unique ID
  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Clear all data (for testing)
  clearData(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.PROGRESS_KEY);
    this.currentUser = null;
  }
}

export const authService = new AuthService();
