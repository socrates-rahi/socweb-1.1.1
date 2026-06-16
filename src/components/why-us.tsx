"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Sparkles, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const factors = [
  {
    title: "One of the fastest operations",
    description: "In the industry, speed is leverage. We execute at breakneck speeds without compromising the premium quality your brand demands.",
    icon: <Zap className="size-6 text-accent" />
  },
  {
    title: "Creative Crafting",
    description: "Every piece of content, video, and shoot is meticulously crafted. We reject boring trends and outdated conventions to build bespoke narratives.",
    icon: <Sparkles className="size-6 text-accent" />
  },
  {
    title: "AI Integrated Workflow",
    description: "Our efficient, secure, and future-ready pipeline is powered by AI. We don't just adapt to the future; we basically build it.",
    icon: <Cpu className="size-6 text-accent" />
  }
];

export function WhyUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !lineRef.current) return;

    // Line drawing animation
    gsap.fromTo(lineRef.current, 
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // Cards revealing animation
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, x: index % 2 === 0 ? 50 : -50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-6 bg-[#050505] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-heading font-semibold text-white mb-6">
            Okay, but <span className="text-accent italic">why us??</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            In a pool of tons of agencies, this is why we stand out. We don't just deliver; we dominate.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto">
          {/* The revealing line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full" />
          <div 
            ref={lineRef}
            className="absolute left-[28px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-accent to-accent-dark -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(255,59,5,0.5)]" 
          />

          <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {factors.map((factor, idx) => (
              <div 
                key={idx} 
                ref={(el) => { cardsRef.current[idx] = el; }}
                className={cn(
                  "flex flex-col md:flex-row items-start md:items-center w-full gap-8 md:gap-16",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Node on the line */}
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-accent -translate-x-1/2 mt-6 md:mt-0 z-20 shadow-[0_0_10px_rgba(255,59,5,0.8)]" />

                <div className={cn("w-full md:w-1/2 flex", idx % 2 === 0 ? "justify-end pl-16 md:pl-0 pr-0 md:pr-12" : "justify-start pl-16 md:pl-12 pr-0")}>
                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/[0.05] transition-colors w-full relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-accent/20 transition-colors" />
                    <div className="bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                      {factor.icon}
                    </div>
                    <h3 className="text-2xl font-heading font-medium text-white mb-4">{factor.title}</h3>
                    <p className="text-white/60 leading-relaxed">{factor.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
