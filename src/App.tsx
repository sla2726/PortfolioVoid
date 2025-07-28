import { useEffect, useState } from 'react';
import { Bug, Terminal } from 'lucide-react';
import './App.css';
import GlitchText from './components/GlitchText';
import SkillList from './components/SkillList';
import BoldChars from './components/utils/BoldChars';

// Notação:
// [&>svg]: -> Define algo nos ícones SVG
// [&>svg]:h-16 ou [&>svg]:w-16

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [progress, setProgress] = useState(0);

  const loadingWords = [
    'Inicializando sistema...',
    'Carregando efeitos...',
    'Gerando palavras...',
    'Concluído!',
  ];

  useEffect(() => {
    let currentIndex = 0;
    const loadInterval = setInterval(() => {
      if (currentIndex < loadingWords.length) {
        setTypedText(loadingWords[currentIndex]);

        const newProgress = ((currentIndex + 1) / loadingWords.length) * 100;
        setProgress(newProgress);

        currentIndex++;
      } else {
        clearInterval(loadInterval);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }, 800);
    return () => clearInterval(loadInterval);
  }, []);

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
    typewriterAnimation({
      text: 'Desenvolvendo sites e aplicativos a mais de 4 meses!',
      speed: 150,
    });
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 450);
    return () => clearInterval(cursorTimer);
  }, []);

  type Skill = {
    category: string;
    name: string;
    exp: number;
  };

  const langs: Skill[] = [
    { category: 'Linguagens', name: 'JavaScript', exp: 60 },
    { category: 'Linguagens', name: 'TypeScript', exp: 60 },
    { category: 'Linguagens', name: 'HTML/CSS', exp: 93 },
  ];
  const frameworks: Skill[] = [
    { category: 'Frameworks', name: 'React', exp: 78 },
    { category: 'Frameworks', name: 'React Native', exp: 46 },
    { category: 'Frameworks', name: 'Tailwind CSS', exp: 87 },
  ];
  if (isLoading) {
    return (
      <main className="min-h-screen w-screen bg-gray-950 text-white">
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-950 text-white">
          <div className="flex flex-col items-center justify-center">
            <h1 className="uppercase font-birthstone text-9xl font-bold">Void</h1>
            <div className="h-6 w-96 max-w-xs md:max-w-md lg:max-w-lg">
              <div
                style={{ width: `${Math.min(progress, 100)}%` }}
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-500"
              />
            </div>
            <p className="mt-4 text-3xl md:text-5xl lg:text-6xl font-mono font-bold text-green-500">{typedText}</p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="transition-transform duration-300 min-h-screen w-screen bg-gray-950 text-white">
      <nav className="flex justify-between border border-b-red-500 bg-gray-800 py-1 sm:h-10 lg:h-12">
        <h1 className="font-oswald flex pt-2 pl-1">
          <Terminal /> Terminal
        </h1>
      </nav>

      <header className="mx-auto mt-20 w-3/4 rounded-md border border-dotted border-red-500 bg-slate-950 px-2 py-2 transition-transform duration-300 hover:scale-105">
        <div className="flex items-center justify-center">
          <div className="mt-2 flex h-16 w-16 items-center justify-center rounded-full border border-red-500 bg-gradient-to-br from-red-900 to-red-800/10 shadow-lg transition-transform duration-300 hover:scale-105">
            <Bug className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div
          style={{ fontFamily: 'Birthstone, sans-serif' }}
          className="relative mt-2 flex items-center justify-center text-5xl font-bold">
          <GlitchText text="Void" />
        </div>
      </header>

      <section className="mx-auto mt-12 mb-12 w-4/5 rounded-md border border-dotted border-red-500 bg-slate-950 px-2 py-2 transition-transform duration-300 hover:scale-105">
        <h1 style={{ fontFamily: 'Oswald, sans-serif' }} className="text-2xl">
          <BoldChars text={terminalText} wordsToBold={['sites', 'aplicativos']} />{' '}
          {showCursor && <span>|</span>}
        </h1>
      </section>

      <SkillList groups={[langs, frameworks]} />
    </main>
  );
}
