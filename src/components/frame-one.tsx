"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, DollarSign, Mail, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function FrameOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !frameRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000", // Scroll duration for the morph
        scrub: 1,
        pin: true,
      },
    });

    // Initial state
    gsap.set(navItemsRef.current, { opacity: 0, display: "none" });

    // Morph animation
    tl.to(frameRef.current, {
      width: "min(90vw, 400px)",
      height: "64px",
      borderRadius: "32px",
      top: "24px",
      left: "50%",
      xPercent: -50,
      backgroundColor: "rgba(10, 10, 10, 0.6)",
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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative z-50 pointer-events-none">
      <div
        ref={frameRef}
        className="fixed top-0 left-0 w-full h-full bg-[#050505] overflow-hidden flex items-center justify-center origin-center pointer-events-auto"
      >
        <Image
          ref={imageRef}
          src="/frameone_circuit.png"
          alt="3D Digital Circuit"
          fill
          className="object-cover opacity-80"
          priority
        />
        
        {/* FrameOne Text */}
        <h1
          ref={textRef}
          className="absolute text-3xl md:text-5xl lg:text-7xl font-heading font-medium text-white text-center max-w-4xl px-6 leading-tight tracking-tight drop-shadow-2xl"
        >
          Stop burning cash on content that doesn't work.
        </h1>

        {/* Morphed Navbar Content */}
        <div
          ref={navItemsRef}
          className="absolute inset-0 w-full h-full hidden items-center justify-between px-4"
        >
          <button className="flex items-center justify-center size-10 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors">
            <Home className="size-5" />
          </button>
          
          <div className="w-[1px] h-6 bg-white/20 mx-2" />
          
          <div className="flex items-center gap-2">
            <NavItem icon={<Briefcase className="size-4" />} label="Work" />
            <NavItem icon={<DollarSign className="size-4" />} label="Price" />
            <NavItem icon={<Mail className="size-4" />} label="Contact" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="group relative flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all overflow-hidden duration-300 w-10 hover:w-28">
      <span className="absolute left-3 shrink-0 text-white/70 group-hover:text-white transition-colors">
        {icon}
      </span>
      <span className="absolute left-10 opacity-0 group-hover:opacity-100 text-sm font-medium text-white whitespace-nowrap transition-opacity duration-300 delay-100">
        {label}
      </span>
    </button>
  );
}
