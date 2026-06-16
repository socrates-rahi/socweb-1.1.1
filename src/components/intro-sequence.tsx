"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, DollarSign, Mail, Home } from "lucide-react";

export function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSubtextRef = useRef<HTMLParagraphElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !frameRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2200", // Increased scroll distance for text transitions
          scrub: 1,
          pin: true, // Pin the Hero Section
        },
      });

      // Initial state for Nav Items
      gsap.set(navItemsRef.current, { opacity: 0, display: "none" });

      // FrameOne Morph
      tl.fromTo(frameRef.current,
        {
          width: "100vw",
          height: "100vh",
          top: "0px",
          left: "50%",
          xPercent: -50,
          borderRadius: "0px",
          backgroundColor: "#0a0a0f",
          border: "0px solid rgba(255, 255, 255, 0)",
        },
        {
          width: isDesktop ? "400px" : "90vw",
          height: "64px",
          top: isDesktop ? "24px" : "16px",
          borderRadius: "32px",
          backgroundColor: "rgba(10, 10, 15, 0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          ease: "power2.inOut",
          duration: 1,
        }, 0)
        .to(textRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power1.inOut",
        }, 0)
        .to(imageRef.current, {
          opacity: 0,
          scale: 1.2,
          duration: 0.5,
          ease: "power1.inOut",
        }, 0)
        .to(navItemsRef.current, {
          display: "flex",
          opacity: 1,
          duration: 0.3,
          ease: "power1.inOut",
        }, 0.7);

      // Hero Section Reveal (happens underneath as FrameOne shrinks)
      tl.fromTo(heroTextRef.current,
        { filter: "blur(12px)", opacity: 0, scale: 1.05 },
        { filter: "blur(0px)", opacity: 1, scale: 1, ease: "power2.out", duration: 0.6 }, 
        0.3
      )
      .to(dotsRef.current, {
        backgroundSize: "24px 24px",
        opacity: 0.3,
        ease: "power2.inOut",
        duration: 1,
      }, 0);

      // Ensure subtext is completely hidden from the start
      gsap.set(heroSubtextRef.current, { opacity: 0, filter: "blur(10px)", scale: 0.95 });

      // Phase 2: Transition from Main Text to Subtext
      tl.to(heroTextRef.current, {
        filter: "blur(12px)",
        opacity: 0,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.inOut",
      }, 1.4)
      .to(heroSubtextRef.current, {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.inOut",
      }, 1.8);

      // Phase 3: Add buffer so subtext is readable before unpinning
      tl.to({}, { duration: 0.6 });

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);
  
  return (
    <>
      {/* Pinned Hero Container */}
      <section 
        ref={containerRef} 
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-16" style={{ background: "var(--background)" }}
      >
        {/* Dotted Background */}
        <div 
          ref={dotsRef}
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
            backgroundPosition: "center center",
          }}
        />
        
        {/* Glowing Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        {/* Hero Content */}
        <div className="relative z-10 grid items-center justify-items-center max-w-5xl px-6 text-center w-full">
          <h2 
            ref={heroTextRef}
            className="col-start-1 row-start-1 text-5xl md:text-7xl lg:text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 leading-[1.05] tracking-tight relative"
          >
            Craft the Identity that closes the round
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent/30 to-transparent bg-clip-text text-transparent opacity-50 blur-sm pointer-events-none" />
          </h2>

          <p 
            ref={heroSubtextRef}
            className="col-start-1 row-start-1 text-lg md:text-2xl text-white/70 max-w-3xl leading-relaxed font-sans opacity-0 pointer-events-none"
          >
            We are your complete creative partner. We craft high-end branding, shoot cinematic media, and run trend-optimized socials for startups, established businesses, and ambitious individuals who refuse to blend in.
          </p>
        </div>
      </section>

      {/* FrameOne floating navbar overlay */}
      <div
        ref={frameRef}
        className="fixed z-50 overflow-hidden flex items-center justify-center origin-center pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        style={{ width: "100vw", height: "100vh", top: 0, left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            ref={imageRef}
            src="/frame.png"
            alt="3D Digital Circuit"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>
        
        <h1
          ref={textRef}
          className="absolute text-3xl md:text-5xl lg:text-7xl font-heading font-medium text-white text-center w-full px-6 leading-tight tracking-tight drop-shadow-2xl translate-y-6 md:translate-y-10"
        >
          Stop burning cash on<br />content that doesn't work.
        </h1>

        <div
          ref={navItemsRef}
          className="absolute inset-0 w-full h-full hidden items-center justify-between px-4"
        >
          <button className="flex items-center justify-center size-10 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors shrink-0">
            <Home className="size-5" />
          </button>
          
          <div className="w-[1px] h-6 bg-white/20 mx-2 shrink-0" />
          
          <div className="flex items-center gap-2">
            <NavItem icon={<Briefcase className="size-4" />} label="Work" />
            <NavItem icon={<DollarSign className="size-4" />} label="Price" />
            <NavItem icon={<Mail className="size-4" />} label="Contact" />
          </div>
        </div>
      </div>
    </>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="group relative flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all overflow-hidden duration-300 w-10 hover:w-28 shrink-0">
      <span className="absolute left-3 shrink-0 text-white/70 group-hover:text-white transition-colors">
        {icon}
      </span>
      <span className="absolute left-10 opacity-0 group-hover:opacity-100 text-sm font-medium text-white whitespace-nowrap transition-opacity duration-300 delay-100">
        {label}
      </span>
    </button>
  );
}
