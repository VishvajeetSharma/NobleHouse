"use client";
import React, { useRef, useEffect, useCallback } from "react";

// --- Types ---
export interface SliderItemData {
  title: string;
  num: string;
  imageUrl: string;
  data?: any;
}

interface ThreeDSliderProps {
  items: SliderItemData[];
  speedWheel?: number;
  speedDrag?: number;
  containerStyle?: React.CSSProperties;
  onItemClick?: (item: SliderItemData, index: number) => void;
}

// --- Item ---
const SliderItem = React.forwardRef(({ item, onClick }: any, ref: any) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="absolute top-1/2 left-1/2 cursor-pointer select-none rounded-xl 
        shadow-2xl bg-black transform-origin-[0%_100%] pointer-events-auto
        w-[clamp(130px,25vw,240px)] 
h-[clamp(180px,32vw,320px)]
        -translate-x-1/2 -translate-y-1/2 overflow-hidden will-change-transform"
    >
      <div className="slider-item-content absolute inset-0 z-10 transition-opacity duration-300">
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/400" />

        {/* Title */}
        <div className="absolute z-10 text-white bottom-5 left-5 text-[clamp(20px,3vw,30px)]">
          {item.title}
        </div>

        {/* Number */}
        <div className="absolute z-10 text-white top-3 left-5 text-[clamp(20px,10vw,80px)]">
          {item.num}
        </div>

        {/* Image */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
    </div>
  );
});

SliderItem.displayName = "SliderItem";

// --- Main ---
const ThreeDSlider: React.FC<ThreeDSliderProps> = ({
  items,
  speedWheel = 0.05,
  speedDrag = -0.15,
  containerStyle,
  onItemClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const progress = useRef(50);
  const target = useRef(50);

  const isDown = useRef(false);
  const startX = useRef(0);

  const raf = useRef<number | null>(null);
  const numItems = items.length;

  // --- Animation ---
  const update = useCallback(() => {
    progress.current += (target.current - progress.current) * 0.1;

    const active = (progress.current / 100) * (numItems - 1);

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const ratio = (i - active) / (numItems - 1 || 1);

      const tx = ratio * 600;
      const ty = ratio * 70;
      const rot = ratio * 60;

      const dist = Math.abs(i - active);
      const z = numItems - dist;
      const opacity = Math.max(0, Math.min(1, (z / numItems) * 3 - 2));

      el.style.transform = `translate3d(${tx}%, ${ty}%, 0) rotate(${rot}deg)`;
      el.style.zIndex = String(Math.round(z * 10));

      const inner = el.querySelector(".slider-item-content") as HTMLElement;
      if (inner) inner.style.opacity = String(opacity);
    });
  }, [numItems]);

  useEffect(() => {
    const loop = () => {
      update();
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [update]);

  // --- Controls ---
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      target.current = Math.max(
        0,
        Math.min(100, target.current + e.deltaY * speedWheel),
      );
    },
    [speedWheel],
  );

  const handleDown = (e: MouseEvent | TouchEvent) => {
    isDown.current = true;
    startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDown.current) return;

    const x = "touches" in e ? e.touches[0].clientX : e.clientX;

    const diff = (x - startX.current) * speedDrag;

    target.current = Math.max(0, Math.min(100, target.current + diff));

    startX.current = x;
  };

  const handleUp = () => {
    isDown.current = false;
  };

  // --- Events ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("mousedown", handleDown);
    el.addEventListener("touchstart", handleDown);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleUp);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("mousedown", handleDown);
      el.removeEventListener("touchstart", handleDown);

      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [handleWheel]);

  // --- Click ---
  const handleClick = (item: SliderItemData, index: number) => {
    target.current = (index / (numItems - 1 || 1)) * 100;
    onItemClick?.(item, index);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] overflow-hidden bg-gradient-to-r from-black via-[#063B4A] to-black"
    >
      {items.map((item, i) => (
        <SliderItem
          key={i}
          ref={(el: any) => (itemRefs.current[i] = el)}
          item={item}
          onClick={() => handleClick(item, i)}
        />
      ))}

      {/* Static UI */}
      <div className="absolute inset-0 pointer-events-none"></div>
    </div>
  );
};

export default ThreeDSlider;
