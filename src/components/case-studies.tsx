"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const metrics = [
  {
    id: "01",
    label: "METRIC_LAYER",
    title: "Average Reach Growth",
    value: "420%",
    detail: "120-Day Cycle",
    confidence: "99.8%",
    scale: "x4.5 Multi",
  },
  {
    id: "02",
    label: "METRIC_LAYER",
    title: "Client Revenue Multiplier",
    value: "8x",
    detail: "ROAS Average",
    confidence: "97.2%",
    scale: "Across Verticals",
  },
  {
    id: "03",
    label: "METRIC_LAYER",
    title: "Industries Disrupted",
    value: "15+",
    detail: "+75% Max",
    confidence: "Direct",
    scale: "Multi-Sector",
  },
  {
    id: "04",
    label: "METRIC_LAYER",
    title: "Founder Capital Unlocked",
    value: "$140M+",
    detail: "+140% Max",
    confidence: "Verified",
    scale: "Aggregate",
  },
];

const testimonials = [
  {
    name: "Dr. Alistair Vance",
    company: "Aperture Grid",
    quote: "Socrates didn't just rebrand us — they recalibrated the entire market's perception. Our Series B deck became a weapon.",
  },
  {
    name: "Hana Nakajima",
    company: "Krypton Labs",
    quote: "The speed and quality are unmatched. Within weeks, we had a visual identity that Fortune 500 companies spend years developing.",
  },
  {
    name: "Jack Thornton",
    company: "Helius Compute",
    quote: "Their cinematic approach to content turned our product demos into viral moments. 2.4M organic views in the first month.",
  },
];

export function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    metricsRef.current.forEach((el, idx) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: idx * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 px-6 shimmer-edge" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="section-label">Performance Metrics</div>
          <span className="mono-meta">Verified via Stripe / GA / Hubspot</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-semibold text-foreground mb-16 tracking-tight">
          Proof of Work
        </h2>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {metrics.map((metric, idx) => (
            <div 
              key={idx}
              ref={(el) => { metricsRef.current[idx] = el; }}
              className="tech-card p-6 relative overflow-hidden"
            >
              {idx === 0 && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent to-transparent" />
              )}
              
              <div className="flex items-center gap-2 mb-6">
                <span className="mono-meta text-[0.6rem]">{metric.id}</span>
                <span className="mono-meta text-[0.6rem]">{metric.label}</span>
              </div>

              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">{metric.value}</p>
              <p className="text-foreground/70 font-medium text-sm mb-1">{metric.title}</p>
              <p className="mono-meta text-[0.6rem] mb-6">{metric.detail}</p>

              <div className="flex gap-6 pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <div>
                  <span className="mono-meta block text-[0.55rem] mb-0.5">Confidence</span>
                  <span className="text-accent text-xs font-medium font-[family-name:var(--font-mono)]">{metric.confidence}</span>
                </div>
                <div>
                  <span className="mono-meta block text-[0.55rem] mb-0.5">Index Scale</span>
                  <span className="text-foreground/60 text-xs font-[family-name:var(--font-mono)]">{metric.scale}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-8">
          <div className="section-label mb-10">Verified_Endorsements</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="tech-card corner-markers p-8">
              <p className="text-foreground/60 text-sm leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <p className="text-foreground font-medium text-sm">{t.name}</p>
                <p className="mono-meta text-[0.6rem] mt-1">{t.company}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
