"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, DollarSign, Mail, Home, ArrowDown } from "lucide-react";

import { DottedSurface } from "@/components/ui/dotted-surface";
import { InkReveal } from "@/components/ui/ink-reveal";

export function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSubtextRef = useRef<HTMLParagraphElement>(null);

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
      );

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
        {/* Animated 3D Background Dots */}
        <DottedSurface className="absolute inset-0 z-0 opacity-100" />
        
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
        className="fixed z-50 overflow-hidden flex items-center justify-center origin-center pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.1)] bg-white"
        style={{ width: "100vw", height: "100vh", top: 0, left: "50%", transform: "translateX(-50%)" }}
      >
        {/* White Grid Background (under everything) */}
        <div className="absolute inset-0 bg-white z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-100 z-0" />

        {/* The Glowing Shader (revealed by ink) - Custom High-Performance CSS Shader */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#2a1122]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#b76e79_0%,transparent_50%)] animate-pulse duration-1000 opacity-90 blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#6b21a8_0%,transparent_50%)] animate-pulse duration-1000 opacity-80 blur-2xl delay-700" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,#c2410c_0%,transparent_60%)] animate-pulse duration-1000 opacity-80 blur-3xl delay-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#ca8a04_0%,transparent_40%)] animate-pulse duration-1000 opacity-70 blur-2xl delay-300" />
          
          {/* Moving background layer for extra depth */}
          <div 
            className="absolute -inset-[100%] opacity-40 blur-3xl"
            style={{
              background: "conic-gradient(from 0deg, #b76e79, #6b21a8, #ca8a04, #c2410c, #b76e79)",
              animation: "spin 20s linear infinite",
            }}
          />
        </div>

        {/* The InkReveal Mask (White mask [255, 255, 255] to match frame background) */}
        <div className="absolute inset-0 z-10">
          <InkReveal maskColor={[255, 255, 255]} />
        </div>

        {/* Center Content Group */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none w-full max-w-5xl">
          <p className="text-black/40 text-xs md:text-sm tracking-[0.2em] font-[family-name:var(--font-mono)] uppercase mb-8">
            DESIGNED BY SOCRATES <span className="mx-4">•</span> TASK REVEAL SUITE
          </p>

          <h1
            ref={textRef}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-black leading-[1.1] tracking-tight drop-shadow-sm mb-10"
          >
            THE CONTENT SYSTEM<br />
            BEHIND THE BRANDS<br />
            YOUR INDUSTRY <span className="relative inline-block">
              TALKS ABOUT.
              <span className="absolute left-0 bottom-[-4px] w-full h-[6px] bg-orange-500 z-[-1]" />
            </span>
          </h1>

          <p className="text-black/50 text-sm md:text-base font-[family-name:var(--font-mono)] max-w-3xl leading-relaxed mx-auto">
            A high-precision modular workspace supporting custom shadcn paths, Tailwind<br />
            styling setups and strong Typescript structures.
          </p>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-10 w-full flex flex-col items-center justify-center z-20 pointer-events-none">
          <span className="text-orange-500 flex items-center gap-2 text-[0.55rem] tracking-[0.2em] uppercase mb-4 font-[family-name:var(--font-mono)]">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            DRIBBLE MOUSE OVER SCREEN TO SCRATCH CANVAS & UNCOVER COLOR STORM
          </span>
          <span className="text-black/40 text-[0.65rem] tracking-[0.3em] uppercase mb-2 font-[family-name:var(--font-mono)]">
            SCROLL: DOWN TO DISCOVER
          </span>
          <ArrowDown className="size-3 text-black/40 animate-bounce mt-2" />
        </div>

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
            <NavItem icon={<DollarSign className="size-4" />} label="Price" href="/packages" />
            <NavItem icon={<Mail className="size-4" />} label="Contact" />
          </div>
        </div>
      </div>
    </>
  );
}

function NavItem({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const content = (
    <>
      <span className="absolute left-3 shrink-0 text-white/70 group-hover:text-white transition-colors">
        {icon}
      </span>
      <span className="absolute left-10 text-xs font-medium text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-[family-name:var(--font-mono)] uppercase tracking-wider">
        {label}
      </span>
    </>
  );

  const className = "group relative flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all overflow-hidden duration-300 w-10 hover:w-28 shrink-0";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className}>
      {content}
    </button>
  );
}
