import { useEffect, useState, useMemo } from 'react';
import { Bug, Terminal } from 'lucide-react';
import './App.css';
import GlitchText from './components/GlitchText';
import SkillList from './components/SkillList';
import BoldChars from './components/utils/BoldChars';
import ProjectGroup from './components/ProjectGroup';
import { langs, frameworks } from './data/skills';
import { projects } from './data/projects';

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
    'Verificando skills...',
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

  const backgroundDots = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 2,
    }));
  }, []);

  const [selectedImage, setSelectedImage] = useState<string[] | null>(null);

  
  if (isLoading) {
    return (
      <main className="min-h-screen w-screen bg-gray-950 text-white">
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-950 text-white">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-birthstone text-9xl font-bold uppercase">Void</h1>
            <div className="h-6 w-96 max-w-xs md:max-w-md lg:max-w-lg">
              <div
                style={{ width: `${Math.min(progress, 100)}%` }}
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-500"
              />
            </div>
            <p className="mt-4 font-mono text-3xl font-bold text-green-500 md:text-5xl lg:text-6xl">
              {typedText}
            </p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="relative min-h-screen w-screen bg-gradient-to-br from-black to-gray-900 text-white transition-transform duration-300">
      <div className="absolute inset-0">
        {backgroundDots.map((dot) => (
          <div
            key={dot.id}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-red-400 opacity-20"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animationDelay: `${dot.animationDelay}s`,
              animationDuration: `${dot.animationDuration}s`,
            }}
          />
        ))}
      </div>

      <nav className="relative z-10 flex justify-between border border-b-red-500 bg-gray-800 py-1 sm:h-10 lg:h-12">
        <h1 className="font-oswald flex pt-2 pl-1">
          <Terminal /> Terminal
        </h1>
      </nav>

      <header className="relative z-10 mx-auto mt-20 w-3/4 rounded-md border border-dotted border-red-500 bg-slate-950 px-2 py-2 transition-transform duration-300 hover:scale-105">
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

      <section className="relative z-10 mx-auto mt-12 mb-12 w-4/5 rounded-md border border-dotted border-red-500 bg-slate-950 px-2 py-2 transition-transform duration-300 hover:scale-105">
        <h1 style={{ fontFamily: 'Oswald, sans-serif' }} className="text-2xl">
          <BoldChars text={terminalText} wordsToBold={['sites', 'aplicativos']} />{' '}
          {showCursor && <span>|</span>}
        </h1>
      </section>

      <h1 className="font-londrina-solid relative z-10 mx-auto mt-16 mb-4 w-2/4 border border-dotted border-red-500 bg-slate-950 py-2 text-center text-4xl font-bold italic">
        Hard Skills
      </h1>
      <SkillList groups={[langs, frameworks]} />

      <h1 className="font-londrina-solid relative z-10 mx-auto mt-16 mb-6 w-2/4 border border-dotted border-red-500 bg-slate-950 py-2 text-center text-4xl font-bold italic">
        Projetos
      </h1>
      <ProjectGroup projects={projects} onImageClick={setSelectedImage} />

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="custom-scrollbar max-h-full max-w-full overflow-x-auto p-6 whitespace-nowrap">
            {selectedImage.map((img, i) => (
              <img
                key={i}
                alt={`Screenshot ${i + 1}`}
                src={img}
                className="pointer-events-none mx-2 inline-block max-h-[250px] rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
