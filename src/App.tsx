import { useEffect, useState } from 'react';
import './App.css';
import { Bug, Terminal } from 'lucide-react';

const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

function glitchText(text: string) {
  return text
    .split('')
    .map((char) => {
      if (char === ' ') return ' ';
      // 50% chance
      if (Math.random() < 0.5) {
        return chars[Math.floor(Math.random() * char.length)];
      }
      return char;
    })
    .join('');
}

// Notação:
// [&>svg]: -> Define algo nos ícones SVG
// [&>svg]:h-16 ou [&>svg]:w-16

export default function App() {
  const text = 'Void';
  const [displayText, setDisplayText] = useState(text);
  const [glitchOn, setGlitchOn] = useState(false);

  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(false);

  function typewriterAnimation({ text, speed }: { text: string; speed: number }) {
    setTerminalText('');
    let i = 0;

    const timer = setInterval(() => {
      if (i < text.length) {
        setTerminalText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return timer;
  }

  useEffect(() => {
    typewriterAnimation({ text: 'vvvvvvoid', speed: 500 });
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchOn((prev) => !prev);
      setDisplayText(glitchText(text));
      setTimeout(() => {
        setDisplayText(text);
        setGlitchOn(false);
      }, 250);
    }, 1000);
    return (): void => clearInterval(interval);
  });

  return (
    <main className="min-h-screen w-screen bg-slate-800">
      <nav className="flex h-10 justify-between bg-slate-700">
        <h1 className="flex pt-2 pl-1 font-bold">
          <Terminal /> Terminal
        </h1>
      </nav>

      <div className="mt-2 flex items-center justify-center">
        <Bug className="h-12 w-12 bg-gradient-to-r from-amber-800 via-amber-500 to-amber-300" />
      </div>

      <div className="relative mt-2 flex items-center justify-center text-2xl font-bold">
        <div className="relative">
          <div
            className={`pointer-events-none absolute transition-opacity duration-200 select-none ${glitchOn ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="translate-x-[2px] text-blue-500">{displayText}</h1>
            <h1 className="absolute top-0 left-0 -translate-x-[2px] text-red-500">{displayText}</h1>
          </div>

          <h1 className="relative z-10">{displayText}</h1>
        </div>
      </div>
      <h1 className="text-6xl">
        {terminalText} {showCursor && <span>|</span>}
      </h1>
    </main>
  );
}
