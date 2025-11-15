'use client';

import { forwardRef, useEffect } from 'react';

interface TypingAreaProps {
  testText: string;
  userInput: string;
  onInput: (text: string) => void;
  disabled: boolean;
  autoFocus: boolean;
}

const TypingArea = forwardRef<HTMLTextAreaElement, TypingAreaProps>(
  ({ testText, userInput, onInput, disabled, autoFocus }, ref) => {
    useEffect(() => {
      if (autoFocus && ref && 'current' in ref && ref.current) {
        ref.current.focus();
      }
    }, [autoFocus, ref]);

    return (
      <div className="space-y-4">
        {/* Display Text */}
        <div className="p-8 rounded-xl bg-card border border-border min-h-32 shadow-sm">
          <div className="text-lg leading-relaxed font-mono select-none">
            {testText.split('').map((char, i) => {
              let charClass = 'text-muted-foreground';
              
              if (i < userInput.length) {
                charClass = userInput[i] === char
                  ? 'text-accent font-semibold'
                  : 'text-destructive bg-destructive/10 font-semibold';
              }
              
              // Highlight current character
              if (i === userInput.length) {
                charClass += ' bg-primary/20';
              }

              return (
                <span key={i} className={charClass}>
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        {/* Input Area */}
        <div className="relative">
          <textarea
            ref={ref}
            value={userInput}
            onChange={(e) => onInput(e.target.value)}
            disabled={disabled}
            placeholder="Click here and start typing..."
            className="w-full p-6 rounded-xl border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 resize-none min-h-32 font-mono disabled:opacity-50 shadow-sm"
          />
        </div>
      </div>
    );
  }
);

TypingArea.displayName = 'TypingArea';

export default TypingArea;