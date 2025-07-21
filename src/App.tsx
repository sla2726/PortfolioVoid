import { useEffect, useState } from 'react';
import './App.css';

const chars = 'abcdefghijklmnopqrstuvwxyz0123456789@#*!?█▓▒░▀▄▌▐■□▪▫';

function glitchText(text: string) {
  return text
    .split('')
    .map((char) => {
      if (char === ' ') return ' ';
      // 50% chance
      if (Math.random() < 0.5) {
        return chars[Math.floor(Math.random() * chars.length)];
      }
      return char;
    })
    .join('');
}

export default function App() {
  const text = 'Void';
  const [displayText, setDisplayText] = useState(text);

  const handleGlitchText = (): void => {
    setDisplayText(glitchText(text));
    setTimeout(() => setDisplayText(text), 300);
  };
  return (
    <main className="min-h-screen w-screen bg-slate-700">
      <header className="text-2xl">
        <h1 onMouseEnter={handleGlitchText} onTouchStart={handleGlitchText}>
          {displayText}
        </h1>
      </header>
    </main>
  );
}
