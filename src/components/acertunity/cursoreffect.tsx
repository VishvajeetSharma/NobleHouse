"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "../../utils/acertunity";

interface GooeyCursorProps {
  className?: string;
  color?: string;
  size?: number;
  tailLength?: number;
  lag?: number;
  explosionFactor?: number;
  blendMode?: "difference" | "normal" | "multiply" | "screen" | "overlay";
  zIndex?: number;
}

export default function GooeyCursor({
  className,
  color = "#fff",
  size = 24,
  tailLength = 20,
  lag = 0.2,
  explosionFactor = 40,
  blendMode = "difference",
  zIndex = 50,
}: GooeyCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = cursorRef.current?.parentElement;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId: number;

    const cursorHistory = Array.from({ length: tailLength }, () => ({
      x: 0,
      y: 0,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onClick = () => {
      for (let i = 0; i < tailLength; i++) {
        cursorHistory[i].x +=
          Math.random() * explosionFactor * 2 - explosionFactor;
        cursorHistory[i].y +=
          Math.random() * explosionFactor * 2 - explosionFactor;
      }
    };

    // ✅ Attach events
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);

    const update = () => {
      cursorHistory.shift();
      cursorHistory.push({ x: mouseX, y: mouseY });

      for (let i = 0; i < tailLength; i++) {
        const current = cursorHistory[i];
        const next = cursorHistory[i + 1] || current;

        current.x += (next.x - current.x) * lag;
        current.y += (next.y - current.y) * lag;

        const el = circleRefs.current[i];
        if (el) {
          el.style.transform = `translate(${current.x}px, ${current.y}px) scale(${i / tailLength})`;
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    // ✅ CLEANUP (important fix)
    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [tailLength, lag, explosionFactor]);

  return (
    <>
      {/* Goo Filter */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Cursor */}
      <div
        ref={cursorRef}
        className={cn("absolute top-0 left-0 pointer-events-none", className)}
        style={{
          width: size,
          height: size,
          zIndex,
          mixBlendMode: blendMode,
          filter: "url(#goo)",
        }}
      >
        {Array.from({ length: tailLength }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              circleRefs.current[i] = el;
            }}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </>
  );
}
