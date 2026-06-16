"use client";

import Link from "next/link";
import { Briefcase, DollarSign, Mail, Home } from "lucide-react";

export function FloatingNav() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-4 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      <Link href="/" className="flex items-center justify-center size-10 rounded-full bg-accent text-white hover:bg-accent-dark transition-colors shrink-0">
        <Home className="size-5" />
      </Link>
      
      <div className="w-[1px] h-6 bg-white/20 mx-4 shrink-0" />
      
      <div className="flex items-center gap-2">
        <NavItem icon={<Briefcase className="size-4" />} label="Work" href="/#work" />
        <NavItem icon={<DollarSign className="size-4" />} label="Price" href="/packages" />
        <NavItem icon={<Mail className="size-4" />} label="Contact" href="/#contact" />
      </div>
    </div>
  );
}

function NavItem({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const content = (
    <>
      <span className="absolute left-3 shrink-0 text-white/70 group-hover:text-white transition-colors">
        {icon}
      </span>
      <span className="absolute left-10 text-xs font-medium text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-[family-name:var(--font-mono)] uppercase tracking-wider">
        {label}
      </span>
    </>
  );

  const className = "group relative flex items-center justify-center size-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all overflow-hidden duration-300 w-10 hover:w-28 shrink-0";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className}>
      {content}
    </button>
  );
}
