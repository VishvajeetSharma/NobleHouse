import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "../../utils/acertunity";

export interface ParticleOrbitContainerProps {
  className?: string;
  style?: React.CSSProperties;
  particleCount?: number;
  radius?: number;
  particleSpeed?: number;
  radiusScale?: number;
  intensity?: number;
  fadeOpacity?: number;
  colorRange?: [number, number];
  disabled?: boolean;
  followMouse?: boolean;
  autoColors?: boolean;
  particleSize?: number;
  children: React.ReactNode;
}

interface Particle {
  size: number;
  position: { x: number; y: number };
  offset: { x: number; y: number };
  shift: { x: number; y: number };
  speed: number;
  targetSize: number;
  fillColor: string;
  orbit: number;
  hue: number;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

const ParticleOrbitContainer: React.FC<ParticleOrbitContainerProps> = ({
  className,
  style,
  particleCount = 80,
  radius = 200,
  particleSpeed = 0.04,
  radiusScale = 3,
  intensity = 1.5,
  fadeOpacity = 0.2,
  colorRange = [0, 360],
  disabled = false,
  followMouse = true,
  autoColors = true,
  particleSize = 5,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    isDown: false,
    radiusScale: 1,
  });
  const colorTimerRef = useRef(0);

  const generateColor = useCallback(
    (hue?: number) => {
      const h =
        hue ?? colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]);
      // Super bright colors
      return `hsl(${h}, 90%, 70%)`;
    },
    [colorRange],
  );

  const createParticles = useCallback(
    (initialX: number, initialY: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const hue =
          colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]);
        particles.push({
          size: particleSize + Math.random() * 4,
          position: { x: initialX, y: initialY },
          offset: {
            x: Math.random() * Math.PI * 2,
            y: Math.random() * Math.PI * 2,
          },
          shift: {
            x: initialX + (Math.random() - 0.5) * 300,
            y: initialY + (Math.random() - 0.5) * 300,
          },
          speed: particleSpeed + Math.random() * particleSpeed,
          targetSize: particleSize + Math.random() * 5,
          fillColor: generateColor(hue),
          orbit: radius * (0.2 + Math.random() * 1.5),
          hue,
          trail: [],
        });
      }
      return particles;
    },
    [
      particleCount,
      particleSpeed,
      particleSize,
      radius,
      generateColor,
      colorRange,
    ],
  );

  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    mouseRef.current.x = rect.width / 2;
    mouseRef.current.y = rect.height / 2;

    particlesRef.current = createParticles(
      mouseRef.current.x,
      mouseRef.current.y,
    );
  }, [createParticles]);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const getRelativeMousePosition = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!followMouse) return;
      const { x, y } = getRelativeMousePosition(event.clientX, event.clientY);
      mouseRef.current.x = Math.max(0, Math.min(x, canvas.width));
      mouseRef.current.y = Math.max(0, Math.min(y, canvas.height));
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!followMouse || event.touches.length === 0) return;
      const { x, y } = getRelativeMousePosition(
        event.touches[0].clientX,
        event.touches[0].clientY,
      );
      mouseRef.current.x = Math.max(0, Math.min(x, canvas.width));
      mouseRef.current.y = Math.max(0, Math.min(y, canvas.height));
    };

    const handleResize = () => {
      updateCanvasDimensions();
    };

    const draw = () => {
      if (!context || !canvas) return;

      if (autoColors) {
        colorTimerRef.current += 0.016;
        if (colorTimerRef.current >= 1) {
          colorTimerRef.current = 0;
          particlesRef.current.forEach((particle) => {
            particle.hue =
              colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]);
            particle.fillColor = generateColor(particle.hue);
          });
        }
      }

      const targetScale = mouseRef.current.isDown ? radiusScale : 1;
      mouseRef.current.radiusScale +=
        (targetScale - mouseRef.current.radiusScale) * 0.1;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];

        // Update position with full intensity everywhere
        particle.offset.x += particle.speed * intensity;
        particle.offset.y += particle.speed * intensity;

        particle.shift.x +=
          (mouseRef.current.x - particle.shift.x) *
          particle.speed *
          intensity *
          0.4;
        particle.shift.y +=
          (mouseRef.current.y - particle.shift.y) *
          particle.speed *
          intensity *
          0.4;

        const orbitRadius =
          particle.orbit * mouseRef.current.radiusScale * intensity;
        particle.position.x =
          particle.shift.x + Math.cos(i + particle.offset.x) * orbitRadius;
        particle.position.y =
          particle.shift.y + Math.sin(i + particle.offset.y) * orbitRadius;

        // Don't clamp - let particles go anywhere in the container
        // This ensures empty areas also get particles

        // Trail with high visibility
        particle.trail.push({
          x: particle.position.x,
          y: particle.position.y,
          alpha: 1,
        });

        const maxTrailLength = Math.max(20, Math.floor(80 * intensity));
        if (particle.trail.length > maxTrailLength) {
          particle.trail.shift();
        }

        // Draw bright trail
        for (let j = 1; j < particle.trail.length; j++) {
          const prev = particle.trail[j - 1];
          const curr = particle.trail[j];
          const alpha = (j / particle.trail.length) * fadeOpacity * 30;

          context.beginPath();
          context.strokeStyle = particle.fillColor;
          context.lineWidth = particle.size * 0.8 * (j / particle.trail.length);
          context.globalAlpha = alpha;
          context.moveTo(prev.x, prev.y);
          context.lineTo(curr.x, curr.y);
          context.stroke();
        }

        // Draw main particle (bigger and brighter)
        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.globalAlpha = 1;
        context.arc(
          particle.position.x,
          particle.position.y,
          particle.size * 0.8,
          0,
          Math.PI * 2,
        );
        context.fill();

        // Outer glow (stronger)
        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.globalAlpha = 0.6;
        context.arc(
          particle.position.x,
          particle.position.y,
          particle.size * 1.5,
          0,
          Math.PI * 2,
        );
        context.fill();

        // Inner bright core (white)
        context.beginPath();
        context.fillStyle = "white";
        context.globalAlpha = 0.9;
        context.arc(
          particle.position.x,
          particle.position.y,
          particle.size * 0.4,
          0,
          Math.PI * 2,
        );
        context.fill();

        // Extra glow layer
        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.globalAlpha = 0.3;
        context.arc(
          particle.position.x,
          particle.position.y,
          particle.size * 2,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      context.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    updateCanvasDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasDimensions();
    });
    resizeObserver.observe(container);

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchstart", handleMouseDown);
    container.addEventListener("touchend", handleMouseUp);
    window.addEventListener("resize", handleResize);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchstart", handleMouseDown);
      container.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    disabled,
    followMouse,
    particleCount,
    radius,
    particleSpeed,
    radiusScale,
    intensity,
    fadeOpacity,
    colorRange,
    autoColors,
    particleSize,
    updateCanvasDimensions,
    createParticles,
    generateColor,
  ]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{
        ...style,
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Children component */}
      <div className="relative z-0">{children}</div>

      {/* Canvas overlay - covers ENTIRE area including empty spaces */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 25,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};

export default ParticleOrbitContainer;
