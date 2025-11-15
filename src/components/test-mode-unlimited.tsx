'use client';

import StatCard from '@/components/stat-card';
import TypingArea from '@/components/typing-area';
import { Button } from '@/components/ui/button';
import { DifficultyLevel, getRandomTextForDifficulty } from '@/lib/difficulty-levels';
import { saveSession } from '@/lib/storage-utils';
import { calculateAccuracy, calculateAdjustedWPM, calculateWPM } from '@/lib/typing-utils';
import { useEffect, useRef, useState } from 'react';

interface UnlimitedModeProps {
  difficulty: DifficultyLevel;
  onFinish: (results: any) => void;
}

export default function UnlimitedMode({ difficulty, onFinish }: UnlimitedModeProps) {
  const [userInput, setUserInput] = useState('');
  const [wpm, setWpm] = useState(0);
  const [adjustedWpm, setAdjustedWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [testText] = useState(getRandomTextForDifficulty(difficulty));
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(Date.now());
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(elapsed);
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isFinished) return;

    if (userInput.length === 0) {
      setWpm(0);
      setAdjustedWpm(0);
      setAccuracy(100);
      return;
    }

    const timeElapsedSeconds = Math.max(elapsedTime, 1);
    const currentWpm = calculateWPM(userInput.length, timeElapsedSeconds);
    const { accuracy: currentAccuracy } = calculateAccuracy(testText, userInput);
    const { correctChars } = calculateAccuracy(testText, userInput);
    const currentAdjustedWpm = calculateAdjustedWPM(correctChars, timeElapsedSeconds);

    setWpm(currentWpm);
    setAdjustedWpm(currentAdjustedWpm);
    setAccuracy(currentAccuracy);
  }, [userInput, elapsedTime, testText, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    setIsFinished(true);
    const { correctChars, errorChars } = calculateAccuracy(testText, userInput);
    const finalWpm = calculateWPM(userInput.length, Math.max(elapsedTime, 1));
    const finalAdjustedWpm = calculateAdjustedWPM(correctChars, Math.max(elapsedTime, 1));
    const { accuracy: finalAccuracy } = calculateAccuracy(testText, userInput);
    
    // Save session to localStorage
    saveSession({
      duration: elapsedTime,
      startTime: new Date(Date.now() - elapsedTime * 1000),
      endTime: new Date(),
      testText: testText,
      userInput: userInput,
      metrics: {
        wpm: finalWpm,
        accuracy: finalAccuracy,
        correctChars: correctChars,
        errorChars: errorChars,
        extraChars: 0
      }
    });

    onFinish({
      mode: 'unlimited',
      wpm: finalWpm,
      adjustedWpm: finalAdjustedWpm,
      accuracy: finalAccuracy,
      testDuration: elapsedTime,
      rawWpm: finalWpm,
      correctChars: correctChars,
      incorrectChars: errorChars,
      totalChars: userInput.length,
      difficulty: difficulty,
      testText: testText,
      userInput: userInput
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="WPM" value={wpm} color="text-primary" />
        <StatCard label="Accuracy" value={`${accuracy}%`} color={accuracy >= 95 ? 'text-accent' : 'text-yellow-500'} />
        <StatCard label="Time" value={formatTime(elapsedTime)} color="text-secondary" />
        <StatCard label="Chars" value={userInput.length} color="text-muted-foreground" />
      </div>

      <TypingArea testText={testText} userInput={userInput} onInput={setUserInput} disabled={isFinished} autoFocus ref={inputRef} />

      <div className="flex gap-4 justify-center">
        <Button onClick={handleFinish} className="px-8 py-3 bg-gradient-to-r from-primary to-secondary">
          Finish Test
        </Button>
      </div>
    </div>
  );
}