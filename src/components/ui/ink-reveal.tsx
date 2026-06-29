"use client";
import { useEffect, useRef, useCallback } from "react";

interface InkRevealProps {
  /** RGB color of the mask overlay, e.g. [252, 250, 248] */
  maskColor?: [number, number, number];
  /** Optional image to use as the mask overlay instead of a solid color */
  imageSrc?: string;
  /** Radius of each ink stamp in px */
  brushSize?: number;
  /** How long each stamp lives before fading (ms) */
  lifetime?: number;
  /** Initial radius before the stamp expands */
  rStart?: number;
  /** Random variation factor for stamp radius (0–1) */
  rVary?: number;
  /** Min pixel distance between stamps along a stroke */
  stampStep?: number;
  /** Max stamps alive at once (oldest are pruned) */
  maxStamps?: number;
  /** Number of segments on the wobble circle (higher = smoother) */
  segments?: number;
  /** Wobble amplitude weights [primary, secondary, tertiary] */
  wobble?: [number, number, number];
  /** Gradient inner-radius factor (0–1, relative to stamp radius) */
  gradientInnerRadius?: number;
  /** Gradient opacity stops [center, mid, edge] */
  gradientStops?: [number, number, number];
  /** Extra CSS class for the canvas element */
  className?: string;
  /** Extra inline styles for the canvas element */
  style?: React.CSSProperties;
}

interface Stamp {
  x: number;
  y: number;
  born: number;
  seed: number;
  rmax: number;
}

export function InkReveal({
  maskColor = [252, 250, 248],
  imageSrc,
  brushSize = 128,
  lifetime = 600,
  rStart = 10,
  rVary = 0.45,
  stampStep = 10,
  maxStamps = 200,
  segments = 36,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const runningRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);

  const mc = maskColor;

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.globalCompositeOperation = "source-over";
    
    if (imgRef.current) {
      const img = imgRef.current;
      const imgRatio = img.width / img.height;
      const canvasRatio = w / h;
      let renderW, renderH, renderX, renderY;
      
      if (imgRatio < canvasRatio) {
          renderW = w;
          renderH = w / imgRatio;
          renderX = 0;
          renderY = (h - renderH) / 2;
      } else {
          renderW = h * imgRatio;
          renderH = h;
          renderX = (w - renderW) / 2;
          renderY = 0;
      }
      ctx.drawImage(img, renderX, renderY, renderW, renderH);
    } else {
      ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
      ctx.fillRect(0, 0, w, h);

      // Draw the premium grid directly on the mask
      const gridSize = 64;
      ctx.lineWidth = 2; // Not thin
      ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
      ctx.beginPath();
      for (let x = (w % gridSize) / 2; x <= w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = (h % gridSize) / 2; y <= h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Smooth intersections by fading out the grid radially
      const rg = ctx.createRadialGradient(w/2, h/2, Math.min(w,h) * 0.2, w/2, h/2, Math.max(w,h) * 0.6);
      rg.addColorStop(0, `rgba(${mc[0]},${mc[1]},${mc[2]},0)`);
      rg.addColorStop(1, `rgba(${mc[0]},${mc[1]},${mc[2]},1)`);
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
    }
  }, [mc]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    dimsRef.current = { w, h };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawBackground(ctx, w, h);
  }, [drawBackground]);

  useEffect(() => {
    if (imageSrc) {
      const img = new window.Image();
      img.src = imageSrc;
      img.onload = () => {
        imgRef.current = img;
        resize(); // trigger a redraw with the image once loaded
      };
    }
  }, [imageSrc, resize]);

  const carveInk = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      seed: number,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(
        x,
        y,
        r * gradientInnerRadius,
        x,
        y,
        r
      );
      g.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`);
      g.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`);
      g.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`);
      ctx.fillStyle = g;

      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7);
        const px = x + Math.cos(a) * r * wob;
        const py = y + Math.sin(a) * r * wob;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    },
    [segments, wobble, gradientInnerRadius, gradientStops]
  );

  const addStamp = useCallback(
    (x: number, y: number) => {
      const stamps = stampsRef.current;
      if (stamps.length >= maxStamps) stamps.shift();
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      });
    },
    [brushSize, rVary, maxStamps]
  );

  const stampAlong = useCallback(
    (x: number, y: number) => {
      const last = lastPosRef.current;
      if (!last) {
        addStamp(x, y);
      } else {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / stampStep));
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
        }
      }
      lastPosRef.current = { x, y };
    },
    [addStamp, stampStep]
  );

  const loop = useCallback(function animationLoop() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    const now = performance.now();
    const stamps = stampsRef.current;

    drawBackground(ctx, w, h);
    ctx.globalCompositeOperation = "destination-out";

    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / lifetime;
      if (t >= 1) {
        stamps.splice(i, 1);
        continue;
      }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = rStart + (stamps[i].rmax - rStart) * ease;
      const alpha = 1 - t * t;
      carveInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, alpha);
    }

    if (stamps.length) {
      requestAnimationFrame(animationLoop);
    } else {
      runningRef.current = false;
    }
  }, [carveInk, drawBackground, lifetime, rStart]);

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(loop);
    }
  }, [loop]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const getRelativePos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if ('touches' in e) {
       return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        cursor: "none",
        ...style,
      }}
      onMouseEnter={(e) => {
        const pos = getRelativePos(e);
        lastPosRef.current = pos;
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseMove={(e) => {
        const pos = getRelativePos(e);
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onTouchStart={(e) => {
        const pos = getRelativePos(e);
        lastPosRef.current = pos;
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onTouchMove={(e) => {
        const pos = getRelativePos(e);
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseLeave={() => {
        lastPosRef.current = null;
      }}
      onTouchEnd={() => {
        lastPosRef.current = null;
      }}
    />
  );
}
