'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAccuracyRating } from '@/lib/typing-utils';

interface ResultsScreenProps {
  results: {
    wpm: number;
    adjustedWpm: number;
    accuracy: number;
    duration: number;
    charCount: number;
    correctChars: number;
    errors: number;
    rating: {
      label: string;
      description: string;
      color: string;
    };
    timestamp: string;
  };
  onRetry: () => void;
}

export default function ResultsScreen({ results, onRetry }: ResultsScreenProps) {
  const accuracyRating = getAccuracyRating(results.accuracy);

  const shareResults = () => {
    const text = `I scored ${results.wpm} WPM with ${results.accuracy}% accuracy on TypeMaster! Try it: https://typemaster.dev`;
    if (navigator.share) {
      navigator.share({
        title: 'My TypeMaster Results',
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">TM</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline">TypeMaster</span>
          </Link>
        </div>
      </nav>

      {/* Results Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Test Completed!</h1>
          <p className="text-muted-foreground text-lg">Completed at {results.timestamp}</p>
        </div>

        {/* Main Results */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* WPM */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:shadow-lg">
            <div className="text-sm text-muted-foreground mb-2">Words Per Minute</div>
            <div className="text-5xl font-bold text-primary mb-4">{results.wpm}</div>
            <div className={`font-semibold text-sm ${results.rating.color}`}>
              {results.rating.label}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{results.rating.description}</p>
          </div>

          {/* Accuracy */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:shadow-lg">
            <div className="text-sm text-muted-foreground mb-2">Accuracy</div>
            <div className="text-5xl font-bold text-accent mb-4">{results.accuracy}%</div>
            <div className="font-semibold text-sm text-accent mb-2">{accuracyRating}</div>
            <div className="text-xs text-muted-foreground">
              {results.correctChars}/{results.charCount} correct
            </div>
          </div>

          {/* Adjusted WPM */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 hover:shadow-lg">
            <div className="text-sm text-muted-foreground mb-2">Adjusted WPM</div>
            <div className="text-5xl font-bold text-secondary mb-4">{results.adjustedWpm}</div>
            <div className="text-xs text-muted-foreground">
              Errors: {results.errors}
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="w-full p-6 rounded-xl bg-card border border-border mb-12">
          <h3 className="font-bold text-lg mb-4">Detailed Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="text-2xl font-bold">{results.duration}s</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Characters</div>
              <div className="text-2xl font-bold">{results.charCount}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Correct</div>
              <div className="text-2xl font-bold text-accent">{results.correctChars}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Errors</div>
              <div className="text-2xl font-bold text-destructive">{results.errors}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onRetry}
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-primary to-secondary"
          >
            Try Again
          </Button>
          <Button
            onClick={shareResults}
            variant="outline"
            className="px-8 py-3 text-lg font-semibold"
          >
            Share Results
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="px-8 py-3 text-lg font-semibold w-full"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
