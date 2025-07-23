import { useState, useEffect } from "react";

const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

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

interface GlitchTextProps {
    text: string;
    intervalMs?: number;
    timeoutMs?: number;
}

export default function GlitchText({text, intervalMs = 1000, timeoutMs = 250, }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [glitchOn, setGlitchOn] = useState(false);

    useEffect(() => {
    const interval = setInterval(() => {
      setGlitchOn((prev) => !prev);
      setDisplayText(glitchText(text));
      setTimeout(() => {
        setDisplayText(text);
        setGlitchOn(false);
      }, timeoutMs);
    }, intervalMs);
    return (): void => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
          <div
            className={`pointer-events-none absolute transition-opacity duration-200 select-none ${glitchOn ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="translate-x-[2px] text-blue-500">{displayText}</h1>
            <h1 className="absolute top-0 left-0 -translate-x-[2px] text-red-500">{displayText}</h1>
          </div>

          <h1 className="relative z-10">{displayText}</h1>
        </div>
  )
}