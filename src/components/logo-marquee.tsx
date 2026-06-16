"use client";

const partners = [
  { code: "VECTOR", name: "Vector Space", type: "AEROSPACE ROBOTICS", metric: "Mach 4.5" },
  { code: "KRYPTON", name: "Krypton Labs", type: "QUANTUM MEMORY", metric: "-272°C Cool" },
  { code: "VOLT", name: "Volt Motors", type: "SOLID STATE EV", metric: "840mi Range" },
  { code: "APERTURE", name: "Aperture Labs", type: "DEEP AI COMPUTE", metric: "+180% Share" },
  { code: "LINEAR", name: "Linear Systems", type: "ISSUE PROTOCOL", metric: "24ms Velocity" },
  { code: "FRAMEWORK", name: "Framework Co", type: "MODULAR HARDWARE", metric: "1.2M Dispatched" },
  { code: "VERCEL", name: "Vercel Inc", type: "EDGE DEPLOYMENT", metric: "99.99% Uptime" },
  { code: "STRATA", name: "Strata Labs", type: "DEFI LIQUIDITY", metric: "$4.2B TVL" },
  { code: "ARCANE", name: "Arcane Systems", type: "NEURAL COMPUTE", metric: "12x Throughput" },
  { code: "HELIX", name: "Helix Compute", type: "CLOUD INFRA", metric: "Sub-1ms Latency" },
];

export function LogoMarquee() {
  return (
    <section className="w-full py-16 overflow-hidden shimmer-edge" style={{ background: "var(--background)" }}>

      {/* Top labels */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mb-10">
        <div className="section-label">Our Featured Partners</div>
        <span className="mono-meta hidden md:block">[ PIPELINE_SPEED: CONT_FLOW ]</span>
      </div>

      {/* Scrolling partner cards */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

        <div className="group flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="tech-card mx-3 flex-shrink-0 w-56 p-5 flex flex-col gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-[0.65rem] font-bold tracking-wider font-[family-name:var(--font-mono)] text-white rounded" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    {partner.code}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium leading-tight">{partner.name}</p>
                    <p className="mono-meta text-[0.6rem] mt-0.5">{partner.type}</p>
                  </div>
                </div>
                <span className="text-accent text-xs font-medium font-[family-name:var(--font-mono)]">{partner.metric}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom technical status line */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-wrap items-center gap-x-12 gap-y-3">
        <span className="mono-meta">RUNNING_LATENCY: 1.2MS</span>
        <span className="mono-meta">SYNCHRONIZED_METRIC_REPORTS</span>
        <span className="mono-meta flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
          ENDLESS LOOP LOCK
        </span>
      </div>
    </section>
  );
}
