'use client';

import TypingTestComponent from '@/components/typing-test';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Typing Test</h1>
          <p className="text-muted-foreground text-lg">
            Choose your preferred test mode and difficulty level
          </p>
        </div>
        
        <div className="glass border border-border rounded-2xl p-6 shadow-xl">
          <TypingTestComponent />
        </div>
      </div>
    </div>
  );
}