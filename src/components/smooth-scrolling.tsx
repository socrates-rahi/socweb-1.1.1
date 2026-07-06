"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    // Direct integration: update ScrollTrigger whenever Lenis scrolls
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);
    
    // Drive Lenis requestAnimationFrame loop using GSAP Ticker
    const updateGsap = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateGsap);
    
    // Clean up ticker and scroll events on unmount
    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(updateGsap);
    };
  }, []);

  return (
    <ReactLenis 
      ref={lenisRef} 
      root 
      options={{ 
        autoRaf: false, // Turn off Lenis's built-in animation loop to let GSAP drive it
        lerp: 0.08,     // Smooth inertia interpolation
        wheelMultiplier: 1.0, 
        smoothWheel: true 
      }}
    >
      {children}
    </ReactLenis>
  );
}
