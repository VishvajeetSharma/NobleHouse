import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";

export const VelocityText = ({ items = [] }) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={targetRef}
      className="h-[300vh] bg-neutral-50 text-neutral-950"
    >
      <div className="sticky top-80 flex flex-col justify-center gap-10 h-auto overflow-hidden">
        {items.map((line, index) => {
          // alternate direction
          const direction = index % 2 === 0 ? -1 : 1;

          const xRaw = useTransform(
            scrollYProgress,
            [0, 1],
            [0, direction * 2000],
          );

          const x = useSpring(xRaw, {
            stiffness: 200,
            damping: 40,
          });

          return (
            <motion.p
              key={index}
              style={{ x }}
              className="whitespace-nowrap text-4xl md:text-6xl font-bold uppercase"
            >
              {line}
            </motion.p>
          );
        })}
      </div>
    </section>
  );
};
