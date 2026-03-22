// Speech Recognition and Synthesis Service

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface VoiceAnalysisResult {
  score: number;
  feedback: string;
  pronunciation: 'excellent' | 'good' | 'needs-improvement';
  matchedWords: string[];
  missedWords: string[];
}

class SpeechService {
  private recognition: any;
  private synthesis: SpeechSynthesis;
  private isListening: boolean = false;

  constructor() {
    this.synthesis = window.speechSynthesis;
    
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'uz-UZ'; // Uzbek language
    }
  }

  // Start listening
  startListening(onResult: (result: string) => void, onError?: (error: string) => void, lang?: string): void {
    if (!this.recognition) {
      onError?.('Speech recognition not supported in this browser');
      return;
    }

    // Set language for recognition
    if (lang) {
      this.recognition.lang = lang;
    }

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      console.log('Recognized:', transcript, 'Confidence:', confidence);
      onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      onError?.(event.error);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      onError?.('Failed to start listening');
    }
  }

  // Stop listening
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Speak text (Text-to-Speech)
  speak(text: string, lang: string = 'uz-UZ', onEnd?: () => void): void {
    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // For Uzbek language, we need to be creative with voice selection
    // since true Uzbek voices are rare
    if (lang === 'uz-UZ' || lang === 'uz') {
      // Use a neutral voice and modify the text slightly for better pronunciation
      utterance.lang = 'ru-RU'; // Russian is phonetically closer to Uzbek
      utterance.rate = 0.75; // Slower for clarity
      utterance.pitch = 1.1; // Slightly higher pitch
    } else if (lang.startsWith('ru')) {
      utterance.lang = 'ru-RU';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
    } else if (lang.startsWith('en')) {
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
    } else {
      utterance.lang = lang;
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
    }
    
    utterance.volume = 1;

    if (onEnd) {
      utterance.onend = onEnd;
    }

    // Wait for voices to load
    const setVoice = () => {
      const voices = this.synthesis.getVoices();
      
      let selectedVoice = null;
      
      // For Uzbek, prefer Russian or Turkish voices
      if (lang === 'uz-UZ' || lang === 'uz') {
        selectedVoice = voices.find(voice => 
          voice.lang.startsWith('ru') && 
          (voice.name.includes('Female') || voice.name.includes('Anna') || voice.name.includes('Google'))
        ) || voices.find(voice => voice.lang.startsWith('ru'));
      } else if (lang.startsWith('ru')) {
        selectedVoice = voices.find(voice => 
          voice.lang.startsWith('ru') && 
          (voice.name.includes('Female') || voice.name.includes('Google'))
        ) || voices.find(voice => voice.lang.startsWith('ru'));
      } else if (lang.startsWith('en')) {
        selectedVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.includes('Female') || voice.name.includes('Google'))
        ) || voices.find(voice => voice.lang.startsWith('en'));
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('Selected voice:', selectedVoice.name, selectedVoice.lang);
      }
      
      this.synthesis.speak(utterance);
    };

    // Check if voices are loaded
    const voices = this.synthesis.getVoices();
    if (voices.length > 0) {
      setVoice();
    } else {
      // Wait for voices to load
      this.synthesis.onvoiceschanged = setVoice;
    }
  }

  // Analyze pronunciation (AI-powered)
  analyzePronunciation(spokenText: string, expectedText: string): VoiceAnalysisResult {
    const spoken = spokenText.toLowerCase().trim();
    const expected = expectedText.toLowerCase().trim();

    // Calculate similarity score
    const similarity = this.calculateSimilarity(spoken, expected);
    const score = Math.round(similarity * 100);

    // Analyze matched and missed words
    const spokenWords = spoken.split(/\s+/);
    const expectedWords = expected.split(/\s+/);
    
    const matchedWords = spokenWords.filter(word => 
      expectedWords.some(exp => this.wordsMatch(word, exp))
    );
    
    const missedWords = expectedWords.filter(word =>
      !spokenWords.some(spoken => this.wordsMatch(spoken, word))
    );

    // Determine pronunciation quality
    let pronunciation: 'excellent' | 'good' | 'needs-improvement';
    let feedback: string;

    if (score >= 90) {
      pronunciation = 'excellent';
      feedback = 'Ajoyib! Juda to\'g\'ri aytdingiz! 🌟';
    } else if (score >= 75) {
      pronunciation = 'good';
      feedback = 'Yaxshi! Yana bir marta mashq qiling! 👍';
    } else {
      pronunciation = 'needs-improvement';
      feedback = 'Yaxshi harakat! Davom eting! 💪';
    }

    return {
      score,
      feedback,
      pronunciation,
      matchedWords,
      missedWords,
    };
  }

  // Calculate text similarity (Levenshtein distance based)
  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  // Levenshtein distance algorithm
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  // Check if two words match (with tolerance)
  private wordsMatch(word1: string, word2: string): boolean {
    const similarity = this.calculateSimilarity(word1, word2);
    return similarity >= 0.8; // 80% similarity threshold
  }

  // Check if browser supports speech recognition
  isSupported(): boolean {
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }
}

export const speechService = new SpeechService();