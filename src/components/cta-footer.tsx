"use client";

import { ArrowRight } from "lucide-react";

export function CTAFooter() {
  return (
    <footer className="w-full bg-[#050505] relative overflow-hidden pt-32 pb-12 border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/10 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        
        {/* Pricing CTA */}
        <div className="mb-24 flex flex-col items-center">
          <p className="text-white/60 mb-6 text-lg">Curious about the investment?</p>
          <button className="group flex items-center gap-3 px-8 py-4 bg-white/[0.03] border border-white/10 hover:border-white/30 rounded-full transition-all text-white font-medium">
            View Our Pricing Packages
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Final CTA */}
        <h2 className="text-5xl md:text-7xl font-heading font-semibold text-white mb-8">
          Ready to dominate?
        </h2>
        <p className="text-xl text-white/60 mb-12 max-w-2xl">
          Stop burning cash on content that doesn't work. Book a call to find out the best package for you.
        </p>

        <button className="group relative px-10 py-5 bg-accent text-white font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,59,5,0.4)] hover:shadow-[0_0_60px_rgba(255,59,5,0.6)]">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative flex items-center gap-3">
            Book a Discovery Call
            <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform" />
          </span>
        </button>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-white/40">
        <p>© {new Date().getFullYear()} Socrates Studio. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Work</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
