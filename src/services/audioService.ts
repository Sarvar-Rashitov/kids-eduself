// Audio and Sound Effects Service

class AudioService {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();

  constructor() {
    // Initialize on user interaction
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Play success sound
  playSuccess(): void {
    this.playTone(800, 0.1, 'sine');
    setTimeout(() => this.playTone(1000, 0.15, 'sine'), 100);
  }

  // Play error sound
  playError(): void {
    this.playTone(300, 0.2, 'sawtooth');
  }

  // Play click sound
  playClick(): void {
    this.playTone(600, 0.05, 'sine');
  }

  // Play reward sound
  playReward(): void {
    const notes = [523, 659, 784, 1047]; // C, E, G, C (higher octave)
    notes.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, 0.15, 'sine'), index * 100);
    });
  }

  // Play star collection sound
  playStar(): void {
    this.playTone(1200, 0.1, 'sine');
    setTimeout(() => this.playTone(1600, 0.1, 'sine'), 50);
  }

  // Play level up sound
  playLevelUp(): void {
    const melody = [
      { freq: 523, duration: 0.1 },
      { freq: 659, duration: 0.1 },
      { freq: 784, duration: 0.1 },
      { freq: 1047, duration: 0.2 },
    ];

    melody.forEach((note, index) => {
      setTimeout(() => this.playTone(note.freq, note.duration, 'sine'), index * 120);
    });
  }

  // Play a tone
  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Play background music (optional)
  playBackgroundMusic(): void {
    // Implementation for background music if needed
  }

  // Stop all sounds
  stopAll(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }
}

export const audioService = new AudioService();
