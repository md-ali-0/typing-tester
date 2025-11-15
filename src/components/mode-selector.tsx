'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TestMode } from '@/lib/test-modes';

interface ModeSelectorProps {
  selectedMode: TestMode;
  onModeSelect: (mode: TestMode) => void;
}

const modes: { id: TestMode; title: string; description: string; icon: string; color: string }[] = [
  {
    id: 'timed',
    title: 'Timed Test',
    description: 'Type as many words as possible in a set time limit',
    icon: '⏱️',
    color: 'bg-blue-500/10 border-blue-500/20'
  },
  {
    id: 'unlimited',
    title: 'Unlimited Practice',
    description: 'Practice typing without time pressure',
    icon: '♾️',
    color: 'bg-green-500/10 border-green-500/20'
  },
  {
    id: 'accuracy-focus',
    title: 'Accuracy Challenge',
    description: 'Focus on typing with perfect accuracy',
    icon: '🎯',
    color: 'bg-purple-500/10 border-purple-500/20'
  },
  {
    id: 'paragraph',
    title: 'Paragraph Test',
    description: 'Type real paragraphs to test your skills',
    icon: '📝',
    color: 'bg-yellow-500/10 border-yellow-500/20'
  },
  {
    id: 'speed-challenge',
    title: 'Speed Challenge',
    description: 'Push your limits with our speed challenge',
    icon: '⚡',
    color: 'bg-red-500/10 border-red-500/20'
  }
];

export default function ModeSelector({ selectedMode, onModeSelect }: ModeSelectorProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 gradient-text">Choose Your Test Mode</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select a typing test mode that matches your goals and skill level
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modes.map((mode) => (
          <Card 
            key={mode.id}
            className={`cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] border-2 ${
              selectedMode === mode.id 
                ? `${mode.color} border-opacity-100 ring-2 ring-primary/30` 
                : 'border-border hover:border-primary/50 glass'
            }`}
            onClick={() => onModeSelect(mode.id)}
          >
            <CardHeader className="pb-3">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 ${
                selectedMode === mode.id ? mode.color.replace('10', '20') : 'bg-muted'
              }`}>
                {mode.icon}
              </div>
              <CardTitle className="text-xl flex items-center gap-2">
                {mode.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                {mode.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}