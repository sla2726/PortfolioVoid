import { useEffect, useState } from 'react';
import './App.css';
import { Terminal } from 'lucide-react';

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

interface CircleProps {
  layers: number;
  size: number;
  color: string;
  colorBase: number;
  text?: string;
}
function NestedCircle({ layers, size, color, colorBase, text }: CircleProps) {
  if (layers === 0) {
    return <h1 className="text-6xl font-extrabold">{text}</h1>;
  }

  const currentBg = `{color}-{colorBase}`;
  return <div></div>;
}

export default function App() {
  const text = 'Void';
  const [displayText, setDisplayText] = useState(text);
  const [glitchOn, setGlitchOn] = useState(false);

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
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-slate-700">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-slate-600">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-500"></div>
          </div>
        </div>
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
    </main>
  );
}