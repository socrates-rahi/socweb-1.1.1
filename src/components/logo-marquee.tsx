"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const brands = [
  "Acme Corp", "GlobalTech", "Nexus", "Stark Ind.", 
  "Wayne Ent.", "Cyberdyne", "Oscorp", "Soylent", 
  "Initech", "Umbrella"
];

export function LogoMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full py-16 overflow-hidden bg-[#050505] border-y border-white/5 relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      
      <div className="flex flex-col items-center mb-10">
        <p className="text-xs font-mono text-white/40 uppercase tracking-widest">Our Featured Brands</p>
      </div>

      <div className="group flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused] md:group-hover:animate-marquee-slow">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div 
              key={i} 
              className="mx-8 md:mx-12 flex items-center justify-center h-16 w-32 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              {/* Using text placeholder since we don't have real logos */}
              <span className="text-xl font-heading font-bold text-white whitespace-nowrap">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
