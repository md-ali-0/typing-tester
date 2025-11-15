import { TestSession } from './typing-utils';

const STORAGE_KEY = 'typemaster_sessions';

/**
 * Add session to localStorage
 */
export function saveSession(session: Omit<TestSession, 'id'>): TestSession {
  const sessions = getAllSessions();
  const newSession: TestSession = {
    ...session,
    id: Date.now().toString()
  };
  sessions.push(newSession);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  return newSession;
}

/**
 * Get all sessions from localStorage
 */
export function getAllSessions(): TestSession[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Get statistics summary
 */
export function getStatisticsSummary() {
  const sessions = getAllSessions();
  if (sessions.length === 0) {
    return {
      totalTests: 0,
      averageWpm: 0,
      averageAccuracy: 0,
      bestWpm: 0,
      bestAccuracy: 0,
      totalTimeSpent: 0
    };
  }

  const totalTests = sessions.length;
  const totalWpm = sessions.reduce((sum, s) => sum + s.metrics.wpm, 0);
  const totalAccuracy = sessions.reduce((sum, s) => sum + s.metrics.accuracy, 0);
  const bestWpm = Math.max(...sessions.map(s => s.metrics.wpm));
  const bestAccuracy = Math.max(...sessions.map(s => s.metrics.accuracy));
  const totalTimeSpent = sessions.reduce((sum, s) => sum + s.duration, 0);

  return {
    totalTests,
    averageWpm: Math.round(totalWpm / totalTests),
    averageAccuracy: Math.round(totalAccuracy / totalTests),
    bestWpm,
    bestAccuracy,
    totalTimeSpent
  };
}

/**
 * Clear all sessions
 */
export function clearAllSessions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get sessions for last N days
 */
export function getSessionsForLastDays(days: number): TestSession[] {
  const sessions = getAllSessions();
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  const cutoffTime = now - days * msPerDay;

  return sessions.filter(s => {
    const sessionTime = new Date(s.startTime).getTime();
    return sessionTime >= cutoffTime;
  });
}
