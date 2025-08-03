import React from 'react';
import { useEffect, useState, useMemo, useRef } from 'react';
import {
  Bug,
  Terminal,
  User,
  AtSign,
  MessageSquareMore,
  SendHorizontal,
  ChevronDown,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import './App.css';
import GlitchText from './components/GlitchText';
import SkillList from './components/SkillList';
import BoldChars from './components/utils/BoldChars';
import ProjectGroup from './components/ProjectGroup';
import { langs, frameworks } from './data/skills';
import { projects } from './data/projects';
import { socialLinks } from './data/social-links';

// Notação:
// [&>svg]: -> Define algo nos ícones SVG
// [&>svg]:h-16 ou [&>svg]:w-16

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
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

  // Emailjs
  const form = useRef<HTMLFormElement>(null);
  const sendMail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) {
      alert('Certifique-se de preencher todos os campos!');
      return;
    }

    emailjs.sendForm('service_pn0wzof', 'template_vomt28g', form.current, 'nvQ6zma3laIAZpCbg').then(
      () => {
        alert('Mensagem enviada com sucesso!');
        form.current?.reset();
      },
      (error) => alert('Erro ao enviar mensagem! Tente novamente.' + error.text)
    );
  };

  if (isLoading) {
    return (
      <main className="min-h-screen w-screen bg-gray-950 text-white">
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-950 text-white">
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-londrina-solid text-9xl font-bold uppercase">Vvoid</h1>
            <div className="h-6 w-96 max-w-xs md:max-w-md lg:max-w-lg">
              <div
                style={{ width: `${Math.min(progress, 100)}%` }}
                className="h-full rounded-full bg-gradient-to-r from-red-500/70 to-slate-600/80 transition-all duration-500"
              />
            </div>
            <p className="mt-4 font-mono text-2xl font-bold text-green-500 md:text-3xl lg:text-3xl">
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

      <nav className="relative z-10 flex h-12 justify-between border border-b-red-500 bg-gray-800 py-1 md:h-16">
        <h1 className="font-oswald flex pt-2 pl-1 md:mt-2 md:pl-4">
          <Terminal /> Terminal
        </h1>
      </nav>

      <header className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="default-border mx-auto w-3/4 rounded-md bg-slate-950 px-2 py-2 transition-transform duration-300 hover:scale-105">
          <div className="flex items-center justify-center">
            <div className="my-2 flex h-16 w-16 items-center justify-center rounded-full border border-red-500 bg-gradient-to-br from-red-900 to-red-800/10 shadow-lg transition-transform duration-300 hover:scale-105 md:my-6 lg:my-6">
              <Bug className="h-12 w-12 text-red-500" />
            </div>
          </div>

          <div className="font-birthstone relative flex items-center justify-center text-5xl font-bold">
            <GlitchText text="Vvoid" />
          </div>
        </div>

        <div className="default-border relative z-10 mx-auto mt-18 mb-12 w-4/5 rounded-md bg-slate-950 px-2 py-2 transition-transform duration-300 hover:scale-105">
          <h1 className="font-oswald text-2xl">
            <BoldChars text={terminalText} wordsToBold={['sites', 'aplicativos']} />{' '}
            {showCursor && <span>|</span>}
          </h1>
        </div>

        <div className="mt-12 animate-bounce">
          <div className="relative flex flex-col items-center justify-center">
            <ChevronDown size={36} className="absolute mb-2 text-red-500 md:mb-4 md:h-14 md:w-14" />
            <ChevronDown size={48} className="relative text-red-500 md:h-18 md:w-18" />
          </div>
        </div>
      </header>

      <section className="relative z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950/70 to-gray-900/80 py-8 ring-1 ring-red-500/20">
        <h1 className="default-border font-londrina-solid md:4xl mb-8 w-2/4 bg-slate-950 text-center text-3xl">
          Sobre Mim
        </h1>
        <div className="font-oswald default-border w-3/4 space-y-2 rounded-md bg-slate-950 px-4 py-2 transition-transform duration-300 hover:scale-105 md:text-2xl">
          <p>Sou apenas um desenvolvedor apaixonado por tecnologia.</p>
          <p>
            Sério, já parou pra pensar em como a programação é surreal? Desde as linguagens de alto
            nível até o funcionamento por trás da linguagem de máquina.
          </p>
          <p>
            Reflexões à parte, venho brincando com código há pelo menos dois anos, mas comecei a
            levar a sério mesmo há cerca de quatro meses.
          </p>
          <p>
            Iniciei minha jornada com Python para aprender a lógica da programação. Depois,
            mergulhei em HTML, CSS e JavaScript — já com um projeto em mãos para uns amigos. Projeto
            esse que, sinceramente, prefiro não mostrar... o código parece um manuscrito antigo. Eu
            não tinha sequer duas semanas de experiência.
          </p>
          <p>
            Atualmente, uso React e Tailwind no desenvolvimento. São duas tecnologias que, além de
            bem documentadas, me oferecem agilidade e praticidade — Tailwind que o diga.
          </p>
          <p>
            Uma das minhas maiores características é o quanto me entrego aos projetos. Sem exagero,
            é surreal. Sobre meu tempo de experiência: pode parecer curto, mas vale lembrar que
            estudo ou pratico de 2 a 4 horas por dia, quase todos os dias.
          </p>
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <h1 className="font-londrina-solid default-border mx-auto mb-4 w-2/4 bg-slate-950 py-2 text-center text-3xl font-bold italic">
          Hard Skills
        </h1>
        <SkillList groups={[langs, frameworks]} />
      </section>

      <section className="relative z-10 mt-20 bg-gradient-to-br from-slate-950/70 to-gray-900/80 py-8 ring-1 ring-red-500/20">
        <h1 className="font-londrina-solid default-border mx-auto mb-6 w-2/4 bg-slate-950 py-2 text-center text-3xl font-bold italic">
          Projetos
        </h1>
        <ProjectGroup projects={projects} onImageClick={setSelectedImage} />
      </section>

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
                className="pointer-events-none mx-2 inline-block max-h-[300px] rounded-lg object-cover md:max-h-[500px] lg:max-h-[500px]"
              />
            ))}
          </div>
        </div>
      )}

      <h1 className="font-londrina-solid default-border relative z-10 mx-auto mt-16 mb-8 w-2/4 bg-slate-950 py-2 text-center text-3xl font-bold italic">
        Contato | E-mail
      </h1>
      <section className="relative z-10 flex w-full items-center justify-center md:text-2xl">
        <form
          ref={form}
          onSubmit={sendMail}
          className="default-border font-oswald mb-8 flex w-3/4 flex-col items-center justify-center space-y-4 rounded-md bg-slate-950 px-2 py-4 transition-transform duration-300 hover:scale-105">
          <div className="relative flex w-3/4 items-center">
            <User className="absolute left-3 text-gray-500" />
            <input
              name="user_name"
              placeholder="Seu nome..."
              className="w-full rounded-md border-2 border-red-500 bg-slate-800 p-2 pl-10 focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
          </div>
          <div className="relative flex w-3/4 items-center">
            <AtSign className="absolute left-3 text-gray-500" />
            <input
              name="user_email"
              placeholder="Seu email..."
              className="w-full rounded-md border-2 border-red-500 bg-slate-800 p-2 pl-10 focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
          </div>
          <div className="relative flex w-3/4 items-center">
            <MessageSquareMore className="absolute top-3 left-3 text-gray-500" />
            <textarea
              name="message"
              placeholder="Sua mensagem..."
              className="h-16 w-full rounded-md border-2 border-red-500 bg-slate-800 p-2 pl-10 focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
          </div>
          <div className="relative flex w-3/4 items-center">
            <SendHorizontal className="absolute left-3 text-gray-500 text-white" />
            <button
              aria-label="Enviar mensagem"
              type="submit"
              className="w-full rounded-md border border-red-500 bg-red-500/60 py-2 transition-transform duration-300 hover:scale-105 hover:border-2">
              Enviar
            </button>
          </div>
          <div className="flex flex-col p-2 md:text-2xl lg:text-2xl">
            <p>Meu e-mail caso queira manualmente: </p>
            <span className="text-red-500">fabiodasilvajuniosilva@gmail.com</span>
          </div>

          <div className="flex items-center space-x-2 justify-center">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <div key={i}>
                  <a className="transition-all duration-300 hover:text-red-500 md:text-2xl" href={social.link} target="_blank" rel="noopener noreferrer">
                    <Icon className="text-2xl"/>
                  </a>
                </div>
              );
            })}
          </div>
        </form>
        
      </section>
    </main>
  );
}
