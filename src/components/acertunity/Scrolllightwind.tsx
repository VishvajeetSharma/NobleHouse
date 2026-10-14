import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const col1Images = [
  "https://images.pexels.com/photos/10324713/pexels-photo-10324713.jpeg?cs=srgb&dl=pexels-taha-samet-arslan-10324713.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w",
  "https://images.pexels.com/photos/10533885/pexels-photo-10533885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940%20940w",
  "https://images.pexels.com/photos/10253213/pexels-photo-10253213.jpeg?cs=srgb&dl=pexels-beepin-10253213.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w",
];

const col2Images = [
  "https://images.pexels.com/photos/10050979/pexels-photo-10050979.jpeg?cs=srgb&dl=pexels-%D0%B8%D0%BB%D1%8C%D1%8F-%D0%BF%D0%B0%D1%85%D0%BE%D0%BC%D0%BE%D0%B2-10050979.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w",
  "https://images.pexels.com/photos/1128660/pexels-photo-1128660.jpeg?cs=srgb&dl=pexels-nur-andi-ravsanjani-gusma-1128660.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w",
  "https://images.pexels.com/photos/9699293/pexels-photo-9699293.jpeg?cs=srgb&dl=pexels-lada-rezantseva-9699293.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w",
];

const col3Images = [
  "https://images.pexels.com/photos/6405575/pexels-photo-6405575.jpeg?cs=srgb&dl=pexels-daria-sannikova-6405575.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w",
  "https://images.pexels.com/photos/10162526/pexels-photo-10162526.jpeg?cs=srgb&dl=pexels-svetlana%F0%9F%8E%9E-10162526.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w",
  "https://images.pexels.com/photos/4394807/pexels-photo-4394807.jpeg?cs=srgb&dl=pexels-woodysmedia-4394807.jpg&fm=jpg?auto=compress&cs=tinysrgb&h=650&w=940%20940w",
];

export default function Scroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const additionalY = { val: 0 };
    let additionalYAnim: gsap.core.Tween | null = null;
    let colProgress = [0, 0, 0];

    const cols = gsap.utils.toArray(".scroll-col", galleryRef.current);

    const updateOffset = (time: number, deltaTime: number) => {
      const dtSec = deltaTime / 1000;

      cols.forEach((col: any, i: number) => {
        const columnHeight = col.clientHeight || 1000;
        const halfHeight = columnHeight / 2;
        const speedPerSec = halfHeight / 20;

        const direction = i % 2 !== 0 ? 1 : -1;

        colProgress[i] +=
          direction * speedPerSec * dtSec - direction * additionalY.val;

        let wrappedY = 0;
        if (direction === 1) {
          wrappedY = gsap.utils.wrap(0, halfHeight, colProgress[i]);
        } else {
          wrappedY = gsap.utils.wrap(-halfHeight, 0, colProgress[i]);
        }

        const items = Array.from(col.children) as HTMLElement[];
        items.forEach((item) => {
          gsap.set(item, { y: wrappedY });
        });
      });
    };

    gsap.ticker.add(updateOffset);

    const imagesScrollerTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        if (velocity > 0) {
          if (additionalYAnim) additionalYAnim.kill();
          additionalY.val = -velocity / 2000;
          additionalYAnim = gsap.to(additionalY, { val: 0 });
        }
        if (velocity < 0) {
          if (additionalYAnim) additionalYAnim.kill();
          additionalY.val = -velocity / 3000;
          additionalYAnim = gsap.to(additionalY, { val: 0 });
        }
      },
    });

    return () => {
      gsap.ticker.remove(updateOffset);
      imagesScrollerTrigger.kill();
      if (additionalYAnim) additionalYAnim.kill();
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-black via-[#063B4A] to-black  selection:bg-none">
      <style>{`
        .scroll-gallery-container {
          min-height: 500vh;
          width: 100%;
          position: relative;
        }
        .scroll-gallery-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }
        .scroll-gallery-title {
          font-weight: 800;
          font-size: clamp(3vw, 2rem, 4rem);
          text-align: center;
          z-index: 999;
          mix-blend-mode: difference;
          pointer-events: none;
          color: white;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          text-transform: uppercase;
        }
        .scroll-gallery {
          z-index: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        @media (max-width: 768px) {
          .scroll-gallery {
            width: 160%;
          }
        }
        .scroll-col {
          display: flex;
          flex: 1;
          flex-direction: column;
          width: 100%;
          align-self: flex-start;
          justify-self: flex-start;
        }
        .scroll-col:nth-child(2) {
          align-self: flex-end;
          justify-self: flex-end;
        }
        .scroll-image-wrapper {
          width: 100%;
          filter: saturate(0);
          padding: 1rem;
          transition: filter 0.3s ease-out;
        }
        .scroll-image-wrapper:hover {
          z-index: 999999 !important;
          filter: saturate(1);
        }
        .scroll-image {
          transition: transform 0.3s ease-out;
          overflow: hidden;
          box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12);
          width: 100%;
          border-radius: 0.5rem;
        }
      `}</style>

      <section ref={containerRef} className="scroll-gallery-container">
        <div className="scroll-gallery-sticky bg-background">
          <h1 className="scroll-gallery-title"> </h1>

          <div ref={galleryRef} className="scroll-gallery">
            {/* Column 1 */}
            <div className="scroll-col">
              {[...col1Images, ...col1Images].map((src, idx) => (
                <div key={`col1-${idx}`} className="scroll-image-wrapper">
                  <img src={src} alt="" className="scroll-image" />
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="scroll-col">
              {[...col2Images, ...col2Images].map((src, idx) => (
                <div key={`col2-${idx}`} className="scroll-image-wrapper">
                  <img src={src} alt="" className="scroll-image" />
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="scroll-col">
              {[...col3Images, ...col3Images].map((src, idx) => (
                <div key={`col3-${idx}`} className="scroll-image-wrapper">
                  <img src={src} alt="" className="scroll-image" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
