'use client';

import { getPerformanceRating } from '@/lib/typing-utils';

interface SessionProps {
  id: string;
  duration: number;
  startTime: Date;
  metrics: {
    wpm: number;
    accuracy: number;
    correctChars: number;
    errorChars: number;
    extraChars: number;
  };
}

interface SessionHistoryProps {
  sessions: SessionProps[];
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold">Recent Sessions</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">WPM</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Accuracy</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Duration</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, idx) => {
              const rating = getPerformanceRating(session.metrics.wpm);
              return (
                <tr key={session.id || idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm">{formatDate(session.startTime)}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-primary">{session.metrics.wpm}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${session.metrics.accuracy >= 95 ? 'text-accent' : 'text-yellow-500'}`}>
                      {session.metrics.accuracy}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{session.duration}s</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${rating.color}`}>
                      {rating.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {session.metrics.correctChars} / {session.metrics.errorChars} errors
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
