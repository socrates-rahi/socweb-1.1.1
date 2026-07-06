"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const frameVisualsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSubtextRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "converts your clients.",
    "gets you funded.",
    "makes you viral.",
    "grows your brand."
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
          end: "+=1200", // Decreased scroll distance for faster transitions
          scrub: 0.5, // Tightened scrub delay for responsive catch-up
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
        .to(frameVisualsRef.current, {
          opacity: 0,
          duration: 0.9,
          ease: "power2.inOut",
        }, 0)
        .to(textRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.inOut",
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
        <div className="relative z-10 grid items-center justify-items-center max-w-7xl px-4 md:px-12 text-center w-full">
          <h2 
            ref={heroTextRef}
            className="col-start-1 row-start-1 text-4xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-bold leading-[1.1] tracking-tighter relative flex flex-col items-center w-full"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-foreground/50 text-center pb-2 whitespace-nowrap">
              We craft you an identity that
            </span>
            <span className="relative w-full h-[1.3em] overflow-visible block text-accent">
              <AnimatePresence>
                <motion.span
                  key={phraseIndex}
                  initial={{ y: 25, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -25, opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-0 text-center bg-clip-text text-transparent bg-gradient-to-r from-accent to-[#E51A71]"
                >
                  {phrases[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-accent/30 to-transparent bg-clip-text text-transparent opacity-50 blur-sm pointer-events-none" />
          </h2>

          <div 
            ref={heroSubtextRef}
            className="col-start-1 row-start-1 flex flex-col items-center gap-8 opacity-0 pointer-events-none max-w-5xl"
          >
            <p className="text-xl md:text-2xl lg:text-[1.75rem] font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 leading-[1.35]">
              We build brands that command <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#E51A71]">attention.</span> As your end-to-end creative engine, we craft cinematic content and strategic narratives that give early startups and D2C/SaaS brands the visual authority to dominate their market.
            </p>
            <Link 
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-accent to-[#E51A71] hover:from-[#E51A71] hover:to-accent text-white font-semibold rounded-full shadow-[0_10px_25px_rgba(229,26,113,0.3)] transition-all duration-300 hover:scale-105 pointer-events-auto"
            >
              Let's start working
            </Link>
          </div>
        </div>
      </section>

      {/* FrameOne floating navbar overlay */}
      <div
        ref={frameRef}
        className="fixed z-50 overflow-hidden flex items-center justify-center origin-center pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
        style={{ width: "100vw", height: "100vh", top: 0, left: "50%", transform: "translateX(-50%)" }}
      >
        <div ref={frameVisualsRef} className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-white z-0" />

          {/* Top Text */}
          <h2 className="absolute top-8 w-full text-center text-black/70 font-bold text-lg md:text-xl tracking-[0.25em] font-[family-name:var(--font-mono)] z-20 pointer-events-none">
            SOCRATES STUDIO
          </h2>

        {/* The New Image Background (revealed by ink) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/frameone-v3.jpg"
            alt="Frame Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* The InkReveal Mask (includes built-in Grid or Image) */}
        <div className="absolute inset-0 z-10">
          <InkReveal maskColor={[255, 255, 255]} imageSrc="/whitefraame.jpg?v=2" />
        </div>

        {/* Center Content Group */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none w-full max-w-5xl">
          {/* Removed top small text */}

          <h1
            ref={textRef}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-black leading-[1.15] tracking-tight drop-shadow-sm mb-10"
          >
            <span className="text-accent font-normal">Stop</span> burning cash on content<br />that doesn't{" "}
            <span className="relative inline-block">
              perform.
              <span className="absolute left-0 bottom-[-2px] w-full h-[3px] bg-accent z-[-1]" />
            </span>
          </h1>

          {/* Removed bottom small text */}
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-10 w-full flex flex-col items-center justify-center z-20 pointer-events-none">
          {/* Removed scratch instruction text */}
          <span className="text-black/60 text-[0.8rem] tracking-[0.3em] uppercase mb-2 font-[family-name:var(--font-mono)] font-semibold">
            SCROLL: DOWN TO DISCOVER
          </span>
          <ArrowDown className="size-4 text-black/60 animate-bounce mt-2" />
        </div>
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
