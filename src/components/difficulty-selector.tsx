'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DifficultyLevel } from '@/lib/difficulty-levels';

interface DifficultySelectorProps {
  difficulty: DifficultyLevel;
  onDifficultySelect: (difficulty: DifficultyLevel) => void;
}

const difficulties: { 
  id: DifficultyLevel; 
  title: string; 
  description: string; 
  color: string;
  sample: string;
}[] = [
  {
    id: 'easy',
    title: 'Easy',
    description: 'Simple words and sentences for beginners',
    color: 'bg-green-500',
    sample: 'The quick brown fox...'
  },
  {
    id: 'medium',
    title: 'Medium',
    description: 'Moderate complexity for average typists',
    color: 'bg-yellow-500',
    sample: 'Education serves as...'
  },
  {
    id: 'hard',
    title: 'Hard',
    description: 'Complex vocabulary and sentence structures',
    color: 'bg-red-500',
    sample: 'Phenomenological...'
  }
];

export default function DifficultySelector({ difficulty, onDifficultySelect }: DifficultySelectorProps) {
  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold gradient-text">Select Difficulty</h3>
        <p className="text-muted-foreground text-sm">
          Choose a difficulty level that matches your skill
        </p>
      </div>
      
      <div className="space-y-4">
        {difficulties.map((level) => (
          <Card 
            key={level.id}
            className={`cursor-pointer transition-all hover:shadow-md hover:scale-[1.01] border-2 ${
              difficulty === level.id 
                ? 'border-primary ring-2 ring-primary/30 glass' 
                : 'border-border hover:border-primary/50 glass'
            }`}
            onClick={() => onDifficultySelect(level.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${level.color}`}></span>
                  {level.title}
                </CardTitle>
                <span className="text-xs px-2 py-1 bg-muted rounded-full">
                  {level.sample}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                {level.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}