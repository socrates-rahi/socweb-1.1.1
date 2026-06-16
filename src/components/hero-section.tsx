"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // A subtle reveal animation once FrameOne starts morphing and Hero is visible
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 1,
      },
    });

    tl.to(textRef.current, {
      filter: "blur(8px)",
      opacity: 0.2,
      scale: 1.05,
      ease: "power2.inOut",
    }, 0)
    .fromTo(subtextRef.current, 
      { filter: "blur(10px)", opacity: 0, y: 20 },
      { filter: "blur(0px)", opacity: 1, y: 0, ease: "power2.out" }, 
      0.2
    )
    .to(dotsRef.current, {
      backgroundSize: "24px 24px",
      opacity: 0.3,
      ease: "power2.inOut",
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] -mt-[100vh] pt-32"
    >
      {/* 21st.dev Dotted Surface Background Replica */}
      <div 
        ref={dotsRef}
        className="absolute inset-0 pointer-events-none opacity-50 transition-all duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
          backgroundPosition: "center center",
        }}
      />
      
      {/* Glowing Blob behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl px-6 text-center">
        <h2 
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 mb-8 leading-[1.1] relative"
        >
          Craft the Identity that closes the round
          {/* Subtle moving shining stroke could be implemented with an SVG overlay, but CSS text-shadow acts as the glow here */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent/30 to-transparent bg-clip-text text-transparent opacity-50 blur-sm pointer-events-none" />
        </h2>

        <p 
          ref={subtextRef}
          className="text-lg md:text-2xl text-white/70 max-w-3xl leading-relaxed font-sans"
        >
          We are your complete creative partner. We craft high-end branding, shoot cinematic media, and run trend-optimized socials for startups, established businesses, and ambitious individuals who refuse to blend in.
        </p>
      </div>
    </section>
  );
}
