"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface InkRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function InkReveal({ children, className }: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Fill with light background
      ctx.fillStyle = "#fdfdfd"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add a subtle grid/path pattern to the covering layer
      ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Scratch effect function
    const draw = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 80, 0, Math.PI * 2); // 80px brush size
      ctx.fill();
    };

    const handleMouseMove = (e: MouseEvent) => {
      draw(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      draw(e);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden cursor-crosshair", className)}>
      {/* Background Content (Revealed) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {children}
      </div>

      {/* Covering Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 touch-none pointer-events-auto"
      />
    </div>
  );
}
