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
  const [displayText, setDisplayText] = useState('Void');
  const [glitchOn, setGlitchOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchOn((prev) => !prev);
      if (!glitchOn) {
        setDisplayText(glitchText(displayText));
      } else {
        setDisplayText(displayText);
      }
    }, 150);

    return (): void => clearInterval(interval);
  }, [glitchOn, displayText]);

  return (
    <main className="min-h-screen w-screen bg-slate-700">
      <header className="text-2xl">
        <h1>{displayText}</h1>
      </header>
    </main>
  );
}
