"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    gsap.registerPlugin(ScrollTrigger);

    // Sync ScrollTrigger on scroll
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Drive Lenis RAF loop via GSAP ticker
    const updateGsap = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateGsap);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(updateGsap);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        autoRaf: false, // Disables built-in RAF loop so GSAP drives it via ScrollSync
        lerp: 0.08, 
        wheelMultiplier: 1.0, 
        smoothWheel: true 
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}
