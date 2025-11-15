'use client';

import TypingArea from '@/components/typing-area';
import { Button } from '@/components/ui/button';
import { DifficultyLevel, getRandomTextForDifficulty } from '@/lib/difficulty-levels';
import { useEffect, useRef, useState } from 'react';

interface TypingTestTimedModeProps {
  difficulty: DifficultyLevel;
  onFinish: (results: any) => void;
}

export default function TypingTestTimedMode({ difficulty, onFinish }: TypingTestTimedModeProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [text] = useState(getRandomTextForDifficulty(difficulty));
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      finishTest();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startTest = () => {
    setIsActive(true);
    setStartTime(Date.now());
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const resetTest = () => {
    setIsActive(false);
    setTimeLeft(60);
    setUserInput('');
    setStartTime(null);
  };

  const finishTest = () => {
    if (!startTime) return;

    setIsActive(false);
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000;
    
    // Calculate WPM and accuracy
    const words = userInput.trim().split(/\s+/).filter(word => word.length > 0).length;
    const wpm = Math.round((words / timeElapsed) * 60);
    
    // Calculate accuracy
    let correctChars = 0;
    const minLength = Math.min(userInput.length, text.length);
    for (let i = 0; i < minLength; i++) {
      if (userInput[i] === text[i]) {
        correctChars++;
      }
    }
    const accuracy = minLength > 0 ? Math.round((correctChars / minLength) * 100) : 0;
    
    onFinish({
      wpm,
      accuracy,
      correctChars,
      incorrectChars: minLength - correctChars,
      timeElapsed,
      totalChars: minLength,
      rawWpm: Math.round((userInput.length / 5 / timeElapsed) * 60)
    });
  };

  const handleInputChange = (value: string) => {
    if (!isActive && value.length > 0) {
      startTest();
    }
    setUserInput(value);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Timed Test</h2>
          <div className="text-3xl font-bold text-primary">
            {timeLeft}s
          </div>
        </div>
        
        <div className="flex gap-3 mb-6">
          {!isActive && timeLeft === 60 && (
            <Button 
              onClick={startTest}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Test
            </Button>
          )}
          
          <Button 
            onClick={resetTest}
            variant="outline"
            className="border border-border bg-background hover:bg-muted hover:text-foreground"
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="w-full mb-8">
        <TypingArea
          ref={textareaRef}
          testText={text}
          userInput={userInput}
          onInput={handleInputChange}
          disabled={!isActive && timeLeft !== 60}
          autoFocus={false}
        />
      </div>

      <div className="w-full bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Instructions</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Type the text as quickly and accurately as possible</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>You have 60 seconds to type as much as you can</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Your WPM and accuracy will be calculated at the end</span>
          </li>
        </ul>
      </div>
    </div>
  );
}