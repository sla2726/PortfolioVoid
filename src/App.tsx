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
      <div className="group relative inline-block text-2xl font-bold">
        <div className="pointer-events-none inset-0 opacity-0 transition-opacity duration-200 select-none group-hover:opacity-100">
          <h1 className="absolute top-0 left-0 translate-x-[2px] text-blue-500">{displayText}</h1>
          <h1 className="absolute top-0 left-0 -translate-x-[2px] text-red-500">{displayText}</h1>
        </div>
        <h1
          onMouseEnter={handleGlitchText}
          onTouchStart={handleGlitchText}
          className="relative z-10">
          {displayText}
        </h1>
      </div>
    </main>
  );
}