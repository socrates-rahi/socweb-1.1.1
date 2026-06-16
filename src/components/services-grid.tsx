"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const capabilities = [
  {
    id: "01",
    title: "BRAND DEPLOYMENT",
    description: "End-to-end launching identities & clean codebase blueprints.",
    services: ["Brand Animations", "Personal Branding", "Launch Videos"],
  },
  {
    id: "02",
    title: "CINEMATOGRAPHY",
    description: "Precision-timed product cinemaps mapping spatial structures.",
    services: ["Cinematic Shoots", "High-Converting Ads", "Thumbnails & Hooks"],
  },
  {
    id: "03",
    title: "AI STRATEGY LAB",
    description: "Interactive generative scripts for smart context categorization.",
    services: ["YouTube Management", "Viral Scripting", "Content Repurposing"],
  },
  {
    id: "04",
    title: "RAPID EXECUTION",
    description: "Highly responsive frameworks designed for ultimate loading speeds.",
    services: ["Instagram Reels", "LinkedIn Authority", "Influencer Marketing"],
  }
];

export function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: idx * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="w-full py-32 px-6 shimmer-edge" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Problem → Solution Header */}
        <div className="text-center mb-20">
          <span className="mono-meta inline-block mb-4 px-3 py-1.5 rounded" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}>
            The Problem
          </span>
          <h2 className="text-3xl md:text-5xl font-medium text-white/40 mb-8 max-w-3xl mx-auto tracking-tight leading-tight">
            You have a world-class product, but your content makes you look like a beginner.
          </h2>
          
          <div className="w-px h-12 mx-auto my-6" style={{ background: "linear-gradient(to bottom, transparent, var(--accent), transparent)" }} />
          
          <span className="mono-meta inline-block mb-4 px-3 py-1.5 rounded" style={{ background: "rgba(227, 46, 14, 0.06)", border: "1px solid rgba(227, 46, 14, 0.15)" }}>
            <span className="text-accent">The Solution</span>
          </span>
          <h3 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
            The Complete Arsenal.
          </h3>
        </div>

        {/* Capability cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="tech-card corner-markers p-6 group"
            >
              <span className={`bracket-label text-xs block mb-5 ${idx === 3 ? "!text-accent" : ""}`}>
                [ {cap.id}_{cap.title} ]
              </span>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {cap.description}
              </p>
              
              {/* Service list */}
              <div className="space-y-2 pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                {cap.services.map((service, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-white/60 text-xs font-[family-name:var(--font-mono)] tracking-wide">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
