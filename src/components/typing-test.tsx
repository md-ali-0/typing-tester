'use client';

import DifficultySelector from '@/components/difficulty-selector';
import KeyboardHint from '@/components/keyboard-hint';
import ModeSelector from '@/components/mode-selector';
import ResultsScreenUnified from '@/components/results-screen-unified';
import AccuracyMode from '@/components/test-mode-accuracy';
import ParagraphMode from '@/components/test-mode-paragraph';
import SpeedChallengeMode from '@/components/test-mode-speed-challenge';
import TypingTestTimedMode from '@/components/test-mode-timed';
import UnlimitedMode from '@/components/test-mode-unlimited';
import { Button } from '@/components/ui/button';
import { DifficultyLevel } from '@/lib/difficulty-levels';
import { TestMode } from '@/lib/test-modes';
import { useState } from 'react';

export default function TypingTestComponent() {
  const [testMode, setTestMode] = useState<TestMode>('timed');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [testStarted, setTestStarted] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const handleStartTest = () => {
    setTestStarted(true);
    setTestResults(null);
  };

  const handleTestFinish = (results: any) => {
    setTestResults(results);
    setTestStarted(false);
  };

  const handleReset = () => {
    setTestStarted(false);
    setTestResults(null);
  };

  if (testResults) {
    return <ResultsScreenUnified results={testResults} onRetry={handleReset} />;
  }

  if (testStarted) {
    return (
      <div className="min-h-screen flex flex-col bg-background relative">
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 flex flex-col relative z-10">
          {testMode === 'timed' && <TypingTestTimedMode difficulty={difficulty} onFinish={handleTestFinish} />}
          {testMode === 'unlimited' && <UnlimitedMode difficulty={difficulty} onFinish={handleTestFinish} />}
          {testMode === 'accuracy-focus' && <AccuracyMode difficulty={difficulty} onFinish={handleTestFinish} />}
          {testMode === 'paragraph' && <ParagraphMode difficulty={difficulty} onFinish={handleTestFinish} />}
          {testMode === 'speed-challenge' && <SpeedChallengeMode difficulty={difficulty} onFinish={handleTestFinish} />}
        </main>
        <KeyboardHint />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12 flex flex-col relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ModeSelector selectedMode={testMode} onModeSelect={setTestMode} />
          </div>

          <div className="space-y-6">
            <DifficultySelector difficulty={difficulty} onDifficultySelect={setDifficulty} />

            <div className="glass border border-border rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Test Configuration</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Selected Mode</p>
                  <p className="font-medium">
                    {testMode === 'timed' ? 'Timed Test' : 
                     testMode === 'unlimited' ? 'Unlimited Practice' : 
                     testMode === 'accuracy-focus' ? 'Accuracy Challenge' : 
                     testMode === 'paragraph' ? 'Paragraph Test' : 'Speed Challenge'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <p className="font-medium capitalize">{difficulty}</p>
                </div>
                
                <Button 
                  onClick={handleStartTest} 
                  className="w-full px-6 py-6 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg mt-4"
                >
                  Start Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <KeyboardHint />
    </div>
  );
}