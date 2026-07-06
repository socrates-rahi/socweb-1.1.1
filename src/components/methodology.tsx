"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

const phases = [
  {
    id: "SEC-01",
    category: "BRAND ARCHITECTURE",
    title: "Monotone Sovereignty & Identity Systems",
    description: "Dynamic dark-canvas vector iconographies. High-contrast bespoke editorial typography pairings. Rigorous responsive brand guidelines across all deployment surfaces. 4K resolution production-ready SVG brand layouts.",
    status: "ACTIVE_STATE",
    active: true,
  },
  {
    id: "SEC-02",
    category: "CINEMATICS & RAW SPECS",
    title: "Ultra-High Framerate Product Epilogues",
    description: "Precision-timed product cinemaps mapping spatial structures. 10-BIT ProRes RAW 4K capture with OLED black contrast matrix. Carefully crafted narratives for every shoot, every frame.",
    status: "READY_TO_LAUNCH",
    active: false,
  },
  {
    id: "SEC-03",
    category: "DIGITAL BLUEPRINTS",
    title: "Custom Interactive Code Monuments",
    description: "High-performance responsive frameworks designed for ultimate loading speeds. Interactive generative scripts for smart context categorization. Custom-coded landing pages with Vite + TypeScript.",
    status: "READY_TO_LAUNCH",
    active: false,
  },
  {
    id: "SEC-04",
    category: "FOUNDER DISTRIBUTION",
    title: "Stealth Content Pipelines",
    description: "We start personal branding for you (the founder) to indirectly bring in highly-qualified customers and establish industry authority. Algorithmic content optimization across all platforms.",
    status: "READY_TO_LAUNCH",
    active: false,
  }
];

export function MethodologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card, 
          { opacity: 0, y: 30 },
          {
            opacity: 1, 
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-32 px-6 shimmer-edge" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="section-label">System_Capabilities</div>
          <span className="mono-meta">Core Execution</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Heading & Outcome */}
          <div className="w-full lg:w-2/5">
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-6 tracking-tight">
              Our Protocol
            </h2>
            <p className="text-foreground/50 mb-12 leading-relaxed">
              A systematic, brutal, and elegant approach to building brands that cannot be ignored.
            </p>

            {/* Projected outcome card */}
            <div className="tech-card p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent via-accent/50 to-transparent" />
              <span className="bracket-label text-xs">[ PROJECTED_OUTCOME ]</span>
              <p className="text-5xl font-bold text-foreground mt-4 mb-2 tracking-tight">260%</p>
              <p className="text-foreground/70 font-medium mb-6">Higher Conversion Rate</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-foreground/50 text-sm">Revenue leaks plugged</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-foreground/50 text-sm">Lower Customer Acquisition Cost</span>
                </div>
              </div>

              {/* Technical footer */}
              <div className="mt-8 pt-4 flex gap-8" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <div>
                  <span className="mono-meta block text-[0.6rem] mb-1">Pipeline Stability</span>
                  <span className="text-accent text-xs font-medium font-[family-name:var(--font-mono)]">99.8%</span>
                </div>
                <div>
                  <span className="mono-meta block text-[0.6rem] mb-1">Index Scale</span>
                  <span className="text-accent text-xs font-medium font-[family-name:var(--font-mono)]">x4.5 Multi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion phases */}
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            {phases.map((phase, idx) => (
              <div 
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="tech-card overflow-hidden cursor-pointer group"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                {/* Orange top accent on active */}
                {openIndex === idx && (
                  <div className="h-[2px] bg-gradient-to-r from-accent via-accent to-transparent" />
                )}

                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="bracket-label text-xs whitespace-nowrap">
                      [ {phase.id} // {phase.category} ]
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`status-badge ${openIndex === idx ? "!text-accent !border-accent/30" : ""}`}>
                      {phase.status}
                    </span>
                    <ChevronDown className={`size-4 text-foreground/30 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {/* Expanded content */}
                <div 
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: openIndex === idx ? "300px" : "0px", opacity: openIndex === idx ? 1 : 0 }}
                >
                  <div className="px-6 pb-6">
                    <h3 className="text-xl md:text-2xl font-medium text-foreground mb-4">
                      {phase.title}
                    </h3>
                    <p className="text-foreground/45 leading-relaxed text-sm">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
