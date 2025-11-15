'use client';

import StatCard from '@/components/stat-card';
import { Button } from '@/components/ui/button';
import { DifficultyLevel } from '@/lib/difficulty-levels';
import { saveSession } from '@/lib/storage-utils';
import { calculateAccuracy, calculateAdjustedWPM, calculateWPM } from '@/lib/typing-utils';
import { useEffect, useRef, useState } from 'react';

interface ParagraphModeProps {
  difficulty: DifficultyLevel;
  onFinish: (results: any) => void;
}

const PARAGRAPHS = {
  easy: [
    'The quick brown fox jumps over the lazy dog. Practice typing every day to improve your speed. Learning to type fast takes time and dedication. Typing is an important skill for computer users. The sun is shining and the birds are singing. I love to read books in my free time. Technology makes our lives easier and more convenient. Hard work and dedication lead to success.'
  ],
  medium: [
    'The expeditious locomotion of the auburn canine traverses the indolent feline. Proficiency in typing requires consistent practice and unwavering dedication. Education serves as the most formidable instrument for transforming society. Success is not determined by finality, nor failure by fatality of courage. Contemporary technology integrates seamlessly into quotidian existence. The synchronization of cognitive abilities and motor skills enhances productivity. Linguistic versatility and computational proficiency define modern professional competency. Semantic comprehension alongside syntactic precision facilitates effective communication.'
  ],
  hard: [
    'The perspicacious entrepreneur\'s multifaceted entrepreneurial endeavors necessitated unwavering perseverance throughout their illustrious career. Phenomenological introspection combined with epistemological rigor engenders comprehensive philosophical elucidation and understanding. The cacophonous concatenation of obfuscatory terminology perpetuates epistemic obfuscation within academic discourse. Metaphysical conundrums surrounding ontological realities continue to perplex contemporary philosophical discourse and inquiry. The quintessential manifestation of linguistic sophistication transcends conventional morphosyntactic parameters and constraints. Hermeneutical methodologies facilitate the exegesis of abstruse theological propositions and interpretations. Serendipitous concatenations of fortuitous circumstances engender unanticipated consequences and revelations. The proliferation of neologistic constructions augments lexicographical complexity exponentially and substantially.'
  ]
};

export default function ParagraphMode({ difficulty, onFinish }: ParagraphModeProps) {
  const [userInput, setUserInput] = useState('');
  const [wpm, setWpm] = useState(0);
  const [adjustedWpm, setAdjustedWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [testText] = useState(PARAGRAPHS[difficulty][0]);
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
    const { accuracy: currentAccuracy, correctChars } = calculateAccuracy(testText, userInput);
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

  const progressPercentage = (userInput.length / testText.length) * 100;

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
      mode: 'paragraph',
      wpm: finalWpm,
      adjustedWpm: finalAdjustedWpm,
      accuracy: finalAccuracy,
      testDuration: elapsedTime,
      rawWpm: finalWpm,
      correctChars: correctChars,
      incorrectChars: errorChars,
      totalChars: userInput.length,
      difficulty: difficulty,
      progress: progressPercentage,
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
        <StatCard label="Progress" value={`${Math.round(progressPercentage)}%`} color="text-orange-500" />
      </div>

      <div className="w-full bg-border rounded-full h-2">
        <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all" style={{ width: `${progressPercentage}%` }} />
      </div>

      <div className="p-4 rounded-lg bg-card border border-border">
        <p className="text-sm leading-relaxed text-muted-foreground">{testText}</p>
      </div>

      <textarea
        ref={inputRef}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={isFinished}
        placeholder="Type the paragraph above..."
        className="w-full p-4 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-32"
      />

      <div className="flex gap-4 justify-center">
        <Button onClick={handleFinish} className="px-8 py-3 bg-gradient-to-r from-primary to-secondary">
          Finish Test
        </Button>
      </div>
    </div>
  );
}