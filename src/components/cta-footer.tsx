"use client";

import { ArrowRight, ArrowUp } from "lucide-react";

export function CTAFooter() {
  return (
    <footer className="w-full relative overflow-hidden pt-32 pb-8 shimmer-edge" style={{ background: "var(--background)" }}>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-accent/8 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        
        {/* Pricing CTA */}
        <div className="mb-20 flex flex-col items-center">
          <span className="mono-meta mb-4">Curious about the investment?</span>
          <button className="group flex items-center gap-3 px-7 py-3.5 rounded-xl transition-all text-white text-sm font-medium font-[family-name:var(--font-mono)] tracking-wide uppercase" style={{ background: "var(--bg-card)", border: "1px solid var(--border-medium)" }}>
            View Pricing Packages
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform text-white/40" />
          </button>
        </div>

        {/* Final CTA */}
        <h2 className="text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tight">
          Ready to dominate?
        </h2>
        <p className="text-lg text-white/50 mb-12 max-w-2xl leading-relaxed">
          Stop burning cash on content that doesn&apos;t work. Book a call to find out the best package for you.
        </p>

        <button className="group relative px-10 py-4 bg-accent text-white font-bold text-sm rounded-xl overflow-hidden hover:scale-[1.03] transition-all duration-300 shadow-[0_0_30px_rgba(227,46,14,0.3)] hover:shadow-[0_0_50px_rgba(227,46,14,0.5)] font-[family-name:var(--font-mono)] tracking-widest uppercase">
          <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative flex items-center gap-3">
            Book a Discovery Call
            <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
          </span>
        </button>

      </div>

      {/* Structured Technical Footer */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="section-divider mb-10" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: About */}
          <div>
            <span className="bracket-label text-xs block mb-4">[ SOCRATES_STUDIO ]</span>
            <p className="text-white/35 text-sm leading-relaxed font-[family-name:var(--font-mono)]">
              We architect pristine digital presence and ultra-high framerate cinematography for founders who refuse to blend in.
            </p>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <span className="mono-meta block mb-4">Platform Links</span>
            <div className="space-y-2.5">
              {["SOCRATES_THESIS", "BRAND_PARTNERS", "CAPABILITIES_SPEC", "METRIC_PROOFS"].map((link) => (
                <a key={link} href="#" className="block text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider hover:text-accent transition-colors uppercase">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Core System */}
          <div>
            <span className="mono-meta block mb-4">Core System</span>
            <div className="space-y-2.5">
              {["AI_BLUEPRINT_LAB", "CLIENT_ENDORSEMENTS", "SERVICE_PRICING"].map((link) => (
                <a key={link} href="#" className="block text-white/40 text-xs font-[family-name:var(--font-mono)] tracking-wider hover:text-accent transition-colors uppercase">
                  {link}
                </a>
              ))}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 text-accent text-xs font-[family-name:var(--font-mono)] tracking-wider hover:text-white transition-colors uppercase"
              >
                [ TRIGGER_SYSTEM_RESET_▲ ]
              </button>
            </div>
          </div>
        </div>

        {/* Bottom technical metadata */}
        <div className="section-divider mb-6" />
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <span className="mono-meta text-[0.6rem]">ATHENS / NEW YORK</span>
            <span className="mono-meta text-[0.6rem]">SYSTEM_TIME: UTC</span>
            <span className="mono-meta text-[0.6rem] flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-500" />
              S_STUDIO_KEY [OK]
            </span>
          </div>
          <span className="mono-meta text-[0.6rem]">
            © {new Date().getFullYear()} SOCRATES_STUDIO // SHA-256_VERIFIED
          </span>
        </div>
      </div>
    </footer>
  );
}
