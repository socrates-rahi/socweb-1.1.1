"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Sparkles, Cpu } from "lucide-react";

const factors = [
  {
    title: "One of the fastest operations",
    description: "In the industry, speed is leverage. We execute at breakneck speeds without compromising the premium quality your brand demands.",
    icon: <Zap className="size-5 text-accent" />,
    tag: "VELOCITY_INDEX",
  },
  {
    title: "Creative Crafting",
    description: "Every piece of content, video, and shoot is meticulously crafted. We reject boring trends and outdated conventions to build bespoke narratives.",
    icon: <Sparkles className="size-5 text-accent" />,
    tag: "CRAFT_PROTOCOL",
  },
  {
    title: "AI ready frameworks",
    description: "Our efficient, secure, and future-ready pipeline is powered by AI. We don't just adapt to the future; we basically build it.",
    icon: <Cpu className="size-5 text-accent" />,
    tag: "AI_ENGINE",
  }
];

export function WhyUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 px-6 shimmer-edge" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Section Header with technical labels */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20">
          <div className="flex-1">
            <div className="section-label mb-6">Bespoke Production Engine</div>
            <h2 className="text-4xl md:text-6xl font-semibold text-foreground mb-6 tracking-tight">
              Okay, but <span className="text-accent italic">why us??</span>
            </h2>
            <p className="text-lg text-foreground/50 max-w-2xl leading-relaxed">
              We operate as an elite core squad for early founders, engineering hyper-stylized digital blueprints, premium layout systems, and cinematic market narratives.
            </p>
          </div>

          <div className="flex-shrink-0 md:text-right">
            <span className="bracket-label">↳ [ STUDIO THESIS ]</span>
            <p className="text-foreground/40 text-sm mt-3 max-w-md leading-relaxed font-[family-name:var(--font-mono)]">
              We completely bypass agency fluff and generic consulting. Instead, we design, code, and deploy high-fidelity brand assets and tactile visual systems.
            </p>
          </div>
        </div>

        {/* Technical metadata strip */}
        <div className="flex flex-wrap gap-x-16 gap-y-4 mb-16 pb-8 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <div>
            <span className="mono-meta block mb-1">Design Velocity</span>
            <span className="text-foreground font-medium text-sm font-[family-name:var(--font-mono)] tracking-wide uppercase">Weeks, Not Months</span>
          </div>
          <div>
            <span className="mono-meta block mb-1">Engagement Model</span>
            <span className="text-foreground font-medium text-sm font-[family-name:var(--font-mono)] tracking-wide uppercase">Direct-to-Founder</span>
          </div>
          <div>
            <span className="mono-meta block mb-1">Quality Index</span>
            <span className="text-foreground font-medium text-sm font-[family-name:var(--font-mono)] tracking-wide uppercase">Zero Compromise</span>
          </div>
        </div>

        {/* Factor cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {factors.map((factor, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="tech-card corner-markers p-8 group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "rgba(227, 46, 14, 0.08)", border: "1px solid rgba(227, 46, 14, 0.15)" }}>
                  {factor.icon}
                </div>
                <span className="status-badge">{factor.tag}</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4 group-hover:text-accent transition-colors">
                {factor.title}
              </h3>
              <p className="text-foreground/45 leading-relaxed text-sm">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
