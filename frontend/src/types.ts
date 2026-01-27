export type SessionType = 'breathing' | 'eyes' | 'mindwarmup' | 'declutter';

export interface BreathingPattern {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
}

export interface EyeExerciseConfig {
  lookAwayInterval: number;
  peripheralVisionDuration: number;
}

export interface MindWarmUpContent {
  paragraph: string;
  questions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface DeclutterSession {
  thoughtsDump: string;
  intention: string;
  timestamp: number;
}

export interface SoundConfig {
  name: string;
  duration: number;
  fadeIn: number;
  fadeOut: number;
}
