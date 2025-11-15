export interface TestMetrics {
  wpm: number;
  accuracy: number;
  correctChars: number;
  errorChars: number;
  extraChars: number;
}

export interface TestSession {
  id: string;
  duration: number;
  startTime: Date;
  endTime?: Date;
  metrics: TestMetrics;
  testText: string;
  userInput: string;
}

/**
 * Calculate accurate WPM using standard formula
 * WPM = (Total Characters Typed / 5) / Time in Minutes
 * Using standard 5-character word average
 */
export function calculateWPM(
  totalChars: number,
  timeElapsedSeconds: number
): number {
  if (timeElapsedSeconds === 0) return 0;
  const timeInMinutes = timeElapsedSeconds / 60;
  const words = totalChars / 5; // Standard word = 5 chars
  return Math.round(words / timeInMinutes);
}

/**
 * Calculate accuracy percentage
 * Compares typed text with original text character by character
 */
export function calculateAccuracy(
  original: string,
  typed: string
): { accuracy: number; correctChars: number; errorChars: number; extraChars: number } {
  let correctChars = 0;
  let errorChars = 0;
  let extraChars = 0;

  const minLength = Math.min(original.length, typed.length);

  // Count correct characters
  for (let i = 0; i < minLength; i++) {
    if (original[i] === typed[i]) {
      correctChars++;
    } else {
      errorChars++;
    }
  }

  // Count extra characters typed beyond the original text
  if (typed.length > original.length) {
    extraChars = typed.length - original.length;
    errorChars += extraChars;
  }

  // Calculate accuracy
  const totalCharsToCheck = Math.max(typed.length, 1);
  const accuracy = Math.round((correctChars / totalCharsToCheck) * 100);

  return {
    accuracy: Math.min(100, accuracy),
    correctChars,
    errorChars,
    extraChars
  };
}

/**
 * Calculate adjusted WPM (removes errors)
 * Adjusted WPM = (Correct Characters / 5) / Time in Minutes
 */
export function calculateAdjustedWPM(
  correctChars: number,
  timeElapsedSeconds: number
): number {
  if (timeElapsedSeconds === 0) return 0;
  const timeInMinutes = timeElapsedSeconds / 60;
  const correctWords = correctChars / 5;
  return Math.round(correctWords / timeInMinutes);
}

/**
 * Get performance rating based on WPM
 */
export function getPerformanceRating(wpm: number): {
  label: string;
  description: string;
  color: string;
} {
  if (wpm >= 120) {
    return {
      label: 'PROFESSIONAL',
      description: 'Exceptional typing speed!',
      color: 'text-accent'
    };
  }
  if (wpm >= 80) {
    return {
      label: 'ADVANCED',
      description: 'Great typing skills!',
      color: 'text-secondary'
    };
  }
  if (wpm >= 50) {
    return {
      label: 'INTERMEDIATE',
      description: 'Good job! Keep practicing.',
      color: 'text-primary'
    };
  }
  if (wpm >= 30) {
    return {
      label: 'BEGINNER',
      description: 'You\'re on the right track!',
      color: 'text-yellow-500'
    };
  }
  return {
    label: 'NOVICE',
    description: 'Keep practicing to improve!',
    color: 'text-destructive'
  };
}

/**
 * Get accuracy rating
 */
export function getAccuracyRating(accuracy: number): string {
  if (accuracy >= 99) return 'Perfect!';
  if (accuracy >= 95) return 'Excellent';
  if (accuracy >= 90) return 'Very Good';
  if (accuracy >= 80) return 'Good';
  if (accuracy >= 70) return 'Okay';
  return 'Need Practice';
}
