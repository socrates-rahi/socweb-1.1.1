"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Compass, PenTool, UserCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Phase 1: Discover",
    description: "Getting to know the vision, the founder, and the product. We strip away the noise to find the core pulse of your brand.",
    icon: <Compass className="size-6 text-white" />
  },
  {
    title: "Phase 2: Recon",
    description: "We don't just research; we scrape the market and dissect competitors. We find the gaps they missed and the angles they ignored.",
    icon: <Search className="size-6 text-white" />
  },
  {
    title: "Phase 3: Crafting",
    description: "Carefully crafting the narratives and all the media needed. High-end production meets algorithmic optimization.",
    icon: <PenTool className="size-6 text-white" />
  },
  {
    title: "Phase 4: Personal Branding",
    description: "We start personal branding for you (the founder) to indirectly bring in highly-qualified customers and establish industry authority.",
    icon: <UserCircle className="size-6 text-white" />
  }
];

export function MethodologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const outcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    stepsRef.current.forEach((step, idx) => {
      if (!step) return;
      gsap.fromTo(step, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    if (outcomeRef.current) {
      gsap.fromTo(outcomeRef.current,
        { scale: 0.9, opacity: 0, rotation: -2 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: outcomeRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="w-full py-32 px-6 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Column: Heading & Outcomes */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between">
          <div className="sticky top-32">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-white mb-6">
              Our Protocol
            </h2>
            <p className="text-white/60 mb-12">
              A systematic, brutal, and elegant approach to building brands that cannot be ignored.
            </p>

            <div 
              ref={outcomeRef}
              className="bg-accent/10 border border-accent/20 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 text-accent opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all">
                <ArrowUpRight className="size-12" />
              </div>
              <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-2">Projected Outcome</h4>
              <p className="text-5xl font-heading font-bold text-white mb-2">260%</p>
              <p className="text-white/80 font-medium mb-4">Higher Conversion Rate</p>
              <ul className="text-white/60 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Revenue leaks plugged
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Lower Customer Acquisition Cost
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Steps */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              ref={(el) => { stepsRef.current[idx] = el; }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 hover:bg-white/[0.04] transition-all overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300" />
              
              <div className="flex items-start gap-6">
                <div className="mt-1 bg-[#0a0a0a] border border-white/10 p-3 rounded-2xl group-hover:border-accent/50 transition-colors">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-medium text-white mb-3 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
