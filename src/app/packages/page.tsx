import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { FloatingNav } from "@/components/floating-nav";

export default function PackagesPage() {
  const monthlyFeatures = [
    "Unlimited design & dev requests",
    "Dedicated elite core squad",
    "Average 48h turnaround",
    "Pause or cancel anytime",
    "Priority technical support",
  ];

  const projectFeatures = [
    "Fixed scope & clear deliverables",
    "Custom project roadmap",
    "End-to-end cinematic media",
    "Brand identity architecture",
    "Full IP ownership on delivery",
  ];

  return (
    <main className="min-h-screen bg-background relative selection:bg-accent/30 selection:text-accent-foreground pt-20 pb-32">
      <FloatingNav />
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-16 group font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase">
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          [ RETURN_TO_BASE ]
        </Link>

        <div className="mb-20">
          <span className="bracket-label mb-6 block">[ DEPLOYMENT_MODELS ]</span>
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-[1.1]">
            Select your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">engagement protocol.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Monthly Retainer */}
          <div className="tech-card corner-markers p-10 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="mono-meta block mb-2 text-accent">RETAINER_PROTOCOL</span>
                <h2 className="text-3xl font-medium text-white">Monthly Sub</h2>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-[family-name:var(--font-mono)] text-white/70">
                ACTIVE
              </div>
            </div>

            <p className="text-white/60 mb-8 leading-relaxed">
              Ideal for continuous brand growth and ongoing development support without the overhead of an in-house team.
            </p>

            <div className="mb-10 pb-10 border-b border-border/50">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-semibold text-white">$4,995</span>
                <span className="text-white/40 font-[family-name:var(--font-mono)]">/month</span>
              </div>
              <p className="text-xs text-white/40 font-[family-name:var(--font-mono)] uppercase">Pause or cancel anytime</p>
            </div>

            <ul className="space-y-4 mb-12 flex-1">
              {monthlyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                  <CheckCircle2 className="size-5 text-accent shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors font-[family-name:var(--font-mono)] tracking-wider uppercase text-sm text-white cursor-pointer">
              Initiate Retainer
            </button>
          </div>

          {/* Project Based */}
          <div className="tech-card corner-markers p-10 flex flex-col relative overflow-hidden group border-accent/20 bg-accent/[0.02]">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <span className="mono-meta block mb-2 text-accent">FIXED_PROTOCOL</span>
                <h2 className="text-3xl font-medium text-white">Project Scope</h2>
              </div>
              <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-xs font-[family-name:var(--font-mono)] text-accent">
                CUSTOM
              </div>
            </div>

            <p className="text-white/60 mb-8 leading-relaxed relative z-10">
              Perfect for clearly defined scopes like full website overhauls, cinematic brand films, or one-off identities.
            </p>

            <div className="mb-10 pb-10 border-b border-border/50 relative z-10">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-semibold text-white">Custom</span>
              </div>
              <p className="text-xs text-white/40 font-[family-name:var(--font-mono)] uppercase">Based on requirements</p>
            </div>

            <ul className="space-y-4 mb-12 flex-1 relative z-10">
              {projectFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                  <CheckCircle2 className="size-5 text-accent shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-4 bg-accent hover:bg-accent-dark text-white rounded-xl transition-all shadow-[0_0_20px_rgba(227,46,14,0.2)] hover:shadow-[0_0_40px_rgba(227,46,14,0.4)] font-[family-name:var(--font-mono)] tracking-wider uppercase text-sm relative z-10 cursor-pointer">
              Request Scope Quote
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
