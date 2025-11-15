'use client';

import StatCard from '@/components/stat-card';
import TypingArea from '@/components/typing-area';
import { Button } from '@/components/ui/button';
import { DifficultyLevel, getRandomTextForDifficulty } from '@/lib/difficulty-levels';
import { saveSession } from '@/lib/storage-utils';
import { calculateAccuracy, calculateAdjustedWPM, calculateWPM } from '@/lib/typing-utils';
import { useEffect, useRef, useState } from 'react';

interface SpeedChallengeModeProps {
  difficulty: DifficultyLevel;
  onFinish: (results: any) => void;
}

export default function SpeedChallengeMode({ difficulty, onFinish }: SpeedChallengeModeProps) {
  const [userInput, setUserInput] = useState('');
  const [wpm, setWpm] = useState(0);
  const [adjustedWpm, setAdjustedWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [multiplier, setMultiplier] = useState(1);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [testText] = useState(getRandomTextForDifficulty(difficulty));
  const [isFinished, setIsFinished] = useState(false);
  const [targetWpm] = useState(difficulty === 'easy' ? 40 : difficulty === 'medium' ? 80 : 120);
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
      setMultiplier(1);
      setScore(0);
      return;
    }

    const timeElapsedSeconds = Math.max(elapsedTime, 1);
    const currentWpm = calculateWPM(userInput.length, timeElapsedSeconds);
    const { accuracy: currentAccuracy, correctChars } = calculateAccuracy(testText, userInput);
    const currentAdjustedWpm = calculateAdjustedWPM(correctChars, timeElapsedSeconds);

    setWpm(currentWpm);
    setAdjustedWpm(currentAdjustedWpm);
    setAccuracy(currentAccuracy);

    // Calculate multiplier based on target WPM
    let newMultiplier = 1;
    if (currentWpm >= targetWpm * 1.5) newMultiplier = 3;
    else if (currentWpm >= targetWpm * 1.2) newMultiplier = 2.5;
    else if (currentWpm >= targetWpm) newMultiplier = 2;
    else if (currentWpm >= targetWpm * 0.8) newMultiplier = 1.5;

    setMultiplier(newMultiplier);

    // Score calculation: WPM * accuracy * multiplier
    const calculatedScore = Math.round(currentWpm * (currentAccuracy / 100) * newMultiplier);
    setScore(calculatedScore);
  }, [userInput, elapsedTime, testText, isFinished, targetWpm]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const multiplierColor = multiplier >= 3 ? 'text-accent' : multiplier >= 2.5 ? 'text-yellow-500' : multiplier >= 2 ? 'text-orange-500' : 'text-muted-foreground';

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
      mode: 'speed-challenge',
      wpm: finalWpm,
      adjustedWpm: finalAdjustedWpm,
      accuracy: finalAccuracy,
      score: score,
      multiplier: multiplier,
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
      <div className="grid grid-cols-5 gap-4">
        <StatCard label="WPM" value={wpm} color="text-primary" />
        <StatCard label="Target" value={targetWpm} color="text-secondary" />
        <StatCard label="Accuracy" value={`${accuracy}%`} color={accuracy >= 95 ? 'text-accent' : 'text-yellow-500'} />
        <StatCard label={`Multiplier ${multiplier.toFixed(1)}x`} value={score} color={multiplierColor} />
        <StatCard label="Time" value={formatTime(elapsedTime)} color="text-muted-foreground" />
      </div>

      <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
        <p className="text-sm font-semibold mb-2">Challenge Multipliers:</p>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div>Below Target: 1x</div>
          <div>80% Target: 1.5x</div>
          <div>100% Target: 2x</div>
          <div>150%+ Target: 3x</div>
        </div>
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