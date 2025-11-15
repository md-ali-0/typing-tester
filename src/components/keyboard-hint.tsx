'use client';

import { useEffect, useState } from 'react';

export default function KeyboardHint() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-foreground">Keyboard Shortcuts</h3>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex justify-between">
            <span>Restart Test</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + R</kbd>
          </li>
          <li className="flex justify-between">
            <span>Change Mode</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + M</kbd>
          </li>
          <li className="flex justify-between">
            <span>Toggle Theme</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl + T</kbd>
          </li>
        </ul>
      </div>
    </div>
  );
}