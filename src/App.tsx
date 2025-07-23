import { useEffect, useState } from 'react';
import { Bug, Terminal } from 'lucide-react';
import GlitchText from './components/GlitchText';
import './App.css';

// Notação:
// [&>svg]: -> Define algo nos ícones SVG
// [&>svg]:h-16 ou [&>svg]:w-16

export default function App() {
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

  return (
    <main className="min-h-screen w-screen bg-slate-800">
      <nav className="flex h-10 justify-between bg-slate-700">
        <h1 style={{ fontFamily: 'Oswald, sans-serif' }} className="flex pt-2 pl-1 font-bold">
          <Terminal /> Terminal
        </h1>
      </nav>

      <div className="flex items-center justify-center">
        <div className="mt-2 flex h-16 w-16 items-center justify-center rounded-full border-1 border-red-500 bg-red-500/20 shadow-lg transition-transform duration-300 hover:scale-105">
          <Bug className="h-12 w-12 text-red-950" />
        </div>
      </div>
      <div
        style={{ fontFamily: 'Birthstone, sans-serif' }}
        className="relative mt-2 flex items-center justify-center text-5xl font-bold">
        <GlitchText text="Void" />
      </div>
      <h1 className="text-6xl">
        {terminalText} {showCursor && <span>|</span>}
      </h1>
    </main>
  );
}
