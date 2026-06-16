"use client";

import { InkReveal } from "./ink-reveal";

export function HeroScreenshot() {
  return (
    <section className="relative w-full h-screen bg-[#fdfdfd] overflow-hidden">
      <InkReveal className="w-full h-full absolute inset-0 z-10">
        {/* Background layer that gets revealed! (Color Storm) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 opacity-90" />
      </InkReveal>

      {/* Foreground Content - Pointer Events None so canvas underneath can be scratched */}
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 z-20 pointer-events-none">
        
        {/* Top Monospace Label */}
        <div className="absolute top-24 flex items-center gap-4 text-[10px] sm:text-xs font-mono tracking-widest text-black/40 uppercase border-b border-black/10 pb-4 mix-blend-difference text-white">
          <span>Designed by Socrates</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Task Reveal State</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-center leading-[1.05] tracking-tighter max-w-6xl mt-12 mix-blend-difference text-white">
          THE CONTENT SYSTEM<br />
          BEHIND THE BRANDS<br />
          YOUR INDUSTRY <span className="relative inline-block">
            TALKS ABOUT.
            <span className="absolute left-0 bottom-1 w-full h-1.5 md:h-2 bg-[#ff3b05] mix-blend-normal" />
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-xs sm:text-sm md:text-base font-mono text-center max-w-2xl leading-relaxed mix-blend-difference text-white/50">
          A high-precision modular workspace supporting custom shadcn paths, Tailwind<br className="hidden sm:block" />
          styling setups and strong Typescript structures.
        </p>

        {/* Bottom Instructions */}
        <div className="absolute bottom-16 flex flex-col items-center gap-4 mix-blend-difference text-white">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-40">
            <span className="w-2 h-2 rounded-full bg-[#ff3b05] mix-blend-normal" />
            Dribble mouse over screen to scratch canvas & uncover color storm
          </div>
          
          <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-30">
            Scroll down to discover ↓
          </div>
        </div>

      </div>
    </section>
  );
}
