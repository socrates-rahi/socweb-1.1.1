"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const caseStudies = [
  {
    client: "TechFlow",
    title: "From 0 to $2M ARR via Organic TikTok",
    description: "We completely revamped TechFlow's brand identity and launched a 90-day viral scripting campaign that resulted in a massive surge in qualified leads.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3",
    metrics: ["+400% Traffic", "$2M ARR", "1.2M Views"]
  },
  {
    client: "Aura Skincare",
    title: "Cinematic Launch that Sold Out in 4 Hours",
    description: "A premium product needed a premium launch. We shot a 60-second cinematic ad and executed a multi-platform distribution strategy.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
    metrics: ["Sold Out", "8x ROAS", "Brand Elevated"]
  }
];

export function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const studiesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    studiesRef.current.forEach((study, idx) => {
      if (!study) return;
      const imageWrapper = study.querySelector(".image-wrapper");
      const content = study.querySelector(".content-wrapper");

      // Parallax effect on image
      if (imageWrapper) {
        gsap.fromTo(imageWrapper,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: study,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

      // Content fade in
      if (content) {
        gsap.fromTo(content,
          { opacity: 0, x: idx % 2 === 0 ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: study,
              start: "top 60%",
            }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-semibold text-white">
            Proof of Work
          </h2>
        </div>

        {caseStudies.map((study, idx) => (
          <div 
            key={idx}
            ref={(el) => { studiesRef.current[idx] = el; }}
            className={cn(
              "flex flex-col lg:flex-row gap-12 lg:gap-24 items-center",
              idx % 2 !== 0 && "lg:flex-row-reverse"
            )}
          >
            {/* Image Side */}
            <div className="w-full lg:w-1/2 overflow-hidden rounded-3xl h-[400px] md:h-[600px] relative">
              <div className="image-wrapper absolute inset-0 -top-20 -bottom-20 w-full">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>

            {/* Content Side */}
            <div className="content-wrapper w-full lg:w-1/2 flex flex-col justify-center">
              <span className="text-accent font-bold tracking-widest uppercase mb-4 text-sm">
                {study.client}
              </span>
              <h3 className="text-3xl md:text-5xl font-heading font-medium text-white mb-6 leading-tight">
                {study.title}
              </h3>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8">
                {study.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {study.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="bg-white/5 border border-white/10 rounded-full px-5 py-2 text-white/90 text-sm font-medium">
                    {metric}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
