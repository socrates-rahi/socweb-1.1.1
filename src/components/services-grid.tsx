"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const problemEndings = [
  "your content makes you look like a beginner.",
  "your ads are burning cash with zero returns.",
  "your social presence is completely invisible.",
  "your launch strategy lacks creative direction."
];

import React from "react";

/* ── Inline SVG icons (filled/solid style) ── */

const icons: Record<string, (props: { className?: string }) => React.ReactNode> = {
  brandAnim: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  ),
  personalBrand: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  ),
  launch: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5c0 0-7 6-7 13 0 2.76 2.24 5 5 5h4c2.76 0 5-2.24 5-5 0-7-7-13-7-13zm0 16.5c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm-1-9.5V7l3 3h-2v2h-1z" />
      <circle cx="12" cy="8" r="1.5" />
    </svg>
  ),
  cinematic: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
    </svg>
  ),
  ads: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  thumbnail: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 3H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-5-7l-3 3.72L11 13l-4 5h16l-5-6z" />
    </svg>
  ),
  youtube: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  viral: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
      <path d="M17 7h5v5h-2V9h-3z" />
    </svg>
  ),
  repurpose: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
    </svg>
  ),
  instagram: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  linkedin: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  influencer: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
};

const services = [
  {
    title: "Brand Animations",
    desc: "Elevates brand perception and keeps viewers hooked instantly.",
    icon: "brandAnim",
    color: "#FF5733",
    span: "sm:col-span-1",
  },
  {
    title: "Personal Branding",
    desc: "Builds trust and connects directly with your ideal audience.",
    icon: "personalBrand",
    color: "#A78BFA",
    span: "sm:col-span-1",
  },
  {
    title: "Launch Videos",
    desc: "Creates high-impact awareness and momentum from day one.",
    icon: "launch",
    color: "#60A5FA",
    span: "sm:col-span-1",
  },
  {
    title: "Cinematic Shoots",
    desc: "Delivers premium visual quality that stands out from the noise.",
    icon: "cinematic",
    color: "#F472B6",
    span: "sm:col-span-1",
  },
  {
    title: "High-Converting Ads",
    desc: "Turns passive viewers into active, paying customers.",
    icon: "ads",
    color: "#34D399",
    span: "sm:col-span-1",
  },
  {
    title: "Thumbnails & Hooks",
    desc: "Maximizes click-through rates and aggressively stops the scroll.",
    icon: "thumbnail",
    color: "#FBBF24",
    span: "sm:col-span-1",
  },
  {
    title: "YouTube Management",
    desc: "Grows a loyal subscriber base with consistent, high-value output.",
    icon: "youtube",
    color: "#FF0000",
    span: "sm:col-span-1",
  },
  {
    title: "Viral Scripting",
    desc: "Engineers shareability and retention into every single piece.",
    icon: "viral",
    color: "#2DD4BF",
    span: "sm:col-span-1",
  },
  {
    title: "Content Repurposing",
    desc: "Multiplies your reach efficiently across all social platforms.",
    icon: "repurpose",
    color: "#FB923C",
    span: "sm:col-span-1",
  },
  {
    title: "Instagram Reels",
    desc: "Harnesses short-form algorithms for rapid, organic growth.",
    icon: "instagram",
    color: "#E1306C",
    span: "sm:col-span-1",
  },
  {
    title: "LinkedIn Authority",
    desc: "Positions you as a thought leader in your B2B industry.",
    icon: "linkedin",
    color: "#0A66C2",
    span: "sm:col-span-1",
  },
  {
    title: "Influencer Marketing",
    desc: "Leverages existing audiences for massive, instant credibility.",
    icon: "influencer",
    color: "#F97316",
    span: "sm:col-span-1",
  },
];

export function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [problemIdx, setProblemIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  /* ── Typewriter effect ── */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentString = problemEndings[problemIdx];

    if (!isDeleting && displayText === currentString) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setProblemIdx((prev) => (prev + 1) % problemEndings.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentString.substring(0, prev.length - 1)
            : currentString.substring(0, prev.length + 1)
        );
      }, isDeleting ? 25 : 50);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, problemIdx]);

  /* ── Scroll-triggered card reveals ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: (idx % 4) * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-32 px-6 shimmer-edge"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Problem Header ── */}
        <div className="text-center mb-16">
          <span
            className="mono-meta inline-block mb-4 px-3 py-1.5 rounded"
            style={{
              background: "rgba(227, 46, 14, 0.08)",
              border: "1px solid rgba(227, 46, 14, 0.2)",
              color: "var(--accent)",
            }}
          >
            The Problem
          </span>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground/70 mb-8 max-w-4xl mx-auto tracking-tight leading-tight min-h-[120px] md:min-h-[100px]">
            You have a world-class product, but{" "}
            <br className="hidden md:block" />
            <span
              style={{
                color: "var(--accent)",
                textShadow: "0 0 20px rgba(227, 46, 14, 0.3)",
              }}
            >
              {displayText}
            </span>
            <span className="animate-pulse text-accent">_</span>
          </h2>
        </div>

        <div
          className="w-px h-16 mx-auto my-12"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--accent), transparent)",
          }}
        />

        {/* ── Solution Header ── */}
        <div className="text-center mb-20">
          <span
            className="mono-meta inline-block mb-4 px-3 py-1.5 rounded"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "var(--text-secondary)",
            }}
          >
            The Solution
          </span>
          <h3 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">
            Our Complete Arsenal.
          </h3>
          <p className="text-foreground/50 max-w-xl mx-auto text-lg leading-relaxed">
            12 creative weapons engineered to build authority and drive revenue.
          </p>
        </div>

        {/* ── Services Grid (4-col bento) ── */}
        <style>{`
          .services-grid-card {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, box-shadow 0.4s ease;
            will-change: transform, opacity;
          }
          .services-grid-card:hover {
            transform: scale(1.04) translateY(-4px) !important;
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), 0 0 15px rgba(252, 67, 83, 0.15) !important;
            z-index: 40;
          }
        `}</style>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((service, idx) => {
            const IconComponent = icons[service.icon];
            return (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`tech-card services-grid-card corner-markers group relative p-5 md:p-6 cursor-default overflow-hidden ${service.span}`}
              >
                {/* Large background icon — solid & colored */}
                <div
                  className="absolute -right-4 -bottom-4 w-28 h-28 md:w-36 md:h-36 opacity-10 group-hover:opacity-25 transition-[transform,opacity] duration-700 ease-out pointer-events-none group-hover:scale-110 group-hover:-rotate-6"
                  style={{ color: service.color }}
                >
                  <IconComponent className="w-full h-full" />
                </div>

                {/* Top row: icon left, title right */}
                <div className="flex items-start justify-between gap-3 mb-auto relative z-10">
                  <div
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `${service.color}15`,
                      border: `1px solid ${service.color}25`,
                      color: service.color,
                    }}
                  >
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold text-foreground/90 group-hover:text-foreground transition-colors duration-300 text-right leading-tight tracking-tight max-w-[160px] md:max-w-[180px]">
                    {service.title}
                  </h4>
                </div>

                {/* Description pinned to bottom */}
                <p className="text-[13px] md:text-sm leading-relaxed text-foreground/40 group-hover:text-foreground/60 transition-colors duration-300 relative z-10 mt-5">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
