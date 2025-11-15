'use client';

export type TestMode = 'timed' | 'unlimited' | 'accuracy-focus' | 'paragraph' | 'speed-challenge';

export interface TestModeConfig {
  id: TestMode;
  label: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export const TEST_MODES: Record<TestMode, TestModeConfig> = {
  timed: {
    id: 'timed',
    label: 'Timed Test',
    description: 'Race against the clock',
    icon: '⏱️',
    color: 'from-primary to-blue-500',
    features: ['15s, 30s, 60s durations', 'Real-time WPM tracking', 'Perfect for quick practice']
  },
  unlimited: {
    id: 'unlimited',
    label: 'Practice Mode',
    description: 'Type at your own pace',
    icon: '∞',
    color: 'from-purple-500 to-secondary',
    features: ['No time limit', 'Focus on accuracy', 'Learn proper technique']
  },
  'accuracy-focus': {
    id: 'accuracy-focus',
    label: 'Accuracy Focus',
    description: 'Minimize mistakes',
    icon: '🎯',
    color: 'from-accent to-green-500',
    features: ['Penalty for errors', 'Accuracy-first scoring', 'Build muscle memory']
  },
  paragraph: {
    id: 'paragraph',
    label: 'Paragraph Typing',
    description: 'Type full paragraphs',
    icon: '📄',
    color: 'from-orange-500 to-red-500',
    features: ['Longer texts', 'Real-world practice', 'Endurance building']
  },
  'speed-challenge': {
    id: 'speed-challenge',
    label: 'Speed Challenge',
    description: 'Beat your personal best',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500',
    features: ['Progressive difficulty', 'Leaderboard scoring', 'Competitive gameplay']
  }
};

export function getModeConfig(mode: TestMode): TestModeConfig {
  return TEST_MODES[mode];
}
