"use client";

import { useState, useEffect } from "react";
import { IntroSequence } from "@/components/intro-sequence";
import { WhyUsSection } from "@/components/why-us";
import { LogoMarquee } from "@/components/logo-marquee";
import { MethodologySection } from "@/components/methodology";
import { ServicesGrid } from "@/components/services-grid";
import { CaseStudies } from "@/components/case-studies";
import { FaqSection } from "@/components/faq-section";
import { CTAFooter } from "@/components/cta-footer";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [isLight, setIsLight] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowButton(window.scrollY > window.innerHeight * 0.8);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main className={`min-h-screen text-foreground overflow-x-hidden selection:bg-accent selection:text-white ${isLight ? "theme-light" : ""}`} style={{ background: "var(--background)" }}>
      {/* 
        IntroSequence combines FrameOne morphing and Hero section pinning
        so they perfectly sync without scrolling past each other.
      */}
      <IntroSequence />
      
      <div 
        className={`relative z-10 transition-colors duration-700 ease-in-out ${isLight ? "theme-light" : ""}`}
        style={{ background: "var(--background)" }}
      >
        <div className="section-divider" />
        <LogoMarquee />
        <div className="section-divider" />
        <ServicesGrid />
        <div className="section-divider" />
        <CaseStudies />
        <div className="section-divider" />
        <WhyUsSection />
        <div className="section-divider" />
        <MethodologySection />
        <div className="section-divider" />
        <FaqSection />
        <div className="section-divider" />
        <CTAFooter />
      </div>

      {/* Fixed Theme Toggle Button */}
      <button 
        onClick={() => setIsLight(!isLight)}
        className={`fixed bottom-8 right-8 z-[100] size-14 rounded-full bg-accent hover:bg-accent-dark text-white flex items-center justify-center shadow-[0_0_20px_rgba(227,46,14,0.4)] transition-all duration-300 ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        aria-label="Toggle light mode"
      >
        {isLight ? <Moon className="size-6" /> : <Sun className="size-6" />}
      </button>
    </main>
  );
}
