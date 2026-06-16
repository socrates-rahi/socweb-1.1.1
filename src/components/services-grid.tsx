"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

const services = [
  "Brand Animations",
  "Personal Branding",
  "Launch Videos",
  "High-Converting Ads",
  "YouTube Management",
  "Instagram Reels",
  "LinkedIn Authority",
  "Cinematic Shoots",
  "Viral Scripting",
  "Influencer Marketing",
  "Thumbnails & Hooks",
  "Content Repurposing"
];

export function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // We create a stagger animation as user scrolls into the grid
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      
      const icon = card.querySelector(".tick-icon");
      
      gsap.fromTo(card,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      if (icon) {
        gsap.fromTo(icon,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            delay: 0.3,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="w-full py-32 px-6 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Problem -> Solution Header */}
        <div className="text-center mb-24">
          <div className="inline-block border border-white/10 rounded-full px-4 py-1.5 mb-6 bg-white/5">
            <span className="text-sm text-white/60">The Problem</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-white/50 mb-8 max-w-3xl mx-auto">
            You have a world-class product, but your content makes you look like a beginner.
          </h2>
          
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent to-transparent mx-auto my-8" />
          
          <div className="inline-block border border-accent/20 rounded-full px-4 py-1.5 mb-6 bg-accent/10">
            <span className="text-sm text-accent font-medium">The Solution</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-heading font-semibold text-white">
            The Complete Arsenal.
          </h3>
        </div>

        {/* 3x4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex items-center justify-between group hover:border-accent/50 transition-colors"
            >
              <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                {service}
              </span>
              <CheckCircle2 className="tick-icon size-6 text-accent opacity-0" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
