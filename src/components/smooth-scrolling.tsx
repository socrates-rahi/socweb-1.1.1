"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.035, wheelMultiplier: 1.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
