import { useEffect, useState } from 'react';
import './App.css';
import { FolderCode, Terminal } from 'lucide-react';

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
  colorBase: number;
  text?: React.ReactNode;
}

function NestedCircle({ layers, size, colorBase, text }: CircleProps) {
  if (layers === 0 && text) {
    return <div className="flex items-center justify-center [&>svg]:h-14 [&>svg]:w-14">{text}</div>;
  }

  const borderMap: Record<number, string> = {
    900: 'border-slate-900',
    800: 'border-slate-800',
    700: 'border-slate-700',
    600: 'border-slate-600',
    500: 'border-slate-500',
    400: 'border-slate-400',
    300: 'border-slate-300',
  };
  const currentBord = borderMap[colorBase] || 'border-slate-500';

  return (
    <div
      className={`flex items-center justify-center rounded-full border-4 ${currentBord}`}
      style={{ width: size, height: size }}>
      <NestedCircle layers={layers - 1} size={size - 32} colorBase={colorBase - 100} text={text} />
    </div>
  );
}

// Notação:
// [&>svg]: -> Define algo nos ícones SVG
// [&>svg]:h-16 ou [&>svg]:w-16

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
        <NestedCircle layers={3} size={160} colorBase={500} text={<FolderCode />} />
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
