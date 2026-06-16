import { IntroSequence } from "@/components/intro-sequence";
import { WhyUsSection } from "@/components/why-us";
import { LogoMarquee } from "@/components/logo-marquee";
import { MethodologySection } from "@/components/methodology";
import { ServicesGrid } from "@/components/services-grid";
import { CaseStudies } from "@/components/case-studies";
import { CTAFooter } from "@/components/cta-footer";

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden selection:bg-accent selection:text-white" style={{ background: "var(--background)" }}>
      {/* 
        IntroSequence combines FrameOne morphing and Hero section pinning
        so they perfectly sync without scrolling past each other.
      */}
      <IntroSequence />
      
      <div className="relative z-10" style={{ background: "var(--background)" }}>
        <div className="section-divider" />
        <WhyUsSection />
        <div className="section-divider" />
        <LogoMarquee />
        <div className="section-divider" />
        <MethodologySection />
        <div className="section-divider" />
        <ServicesGrid />
        <div className="section-divider" />
        <CaseStudies />
        <div className="section-divider" />
        <CTAFooter />
      </div>
    </main>
  );
}
