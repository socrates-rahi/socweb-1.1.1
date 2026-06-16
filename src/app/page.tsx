import { IntroSequence } from "@/components/intro-sequence";
import { WhyUsSection } from "@/components/why-us";
import { LogoMarquee } from "@/components/logo-marquee";
import { MethodologySection } from "@/components/methodology";
import { ServicesGrid } from "@/components/services-grid";
import { CaseStudies } from "@/components/case-studies";
import { CTAFooter } from "@/components/cta-footer";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-accent selection:text-white">
      {/* 
        IntroSequence combines FrameOne morphing and Hero section pinning
        so they perfectly sync without scrolling past each other.
      */}
      <IntroSequence />
      
      <div className="relative z-10 bg-[#050505]">
        <WhyUsSection />
        <LogoMarquee />
        <MethodologySection />
        <ServicesGrid />
        <CaseStudies />
        <CTAFooter />
      </div>
    </main>
  );
}
