"use client";

import React, { useRef } from "react";
import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";

const SECTION_HEIGHT = 1500;

export default function SmoothScrollHero() {
  return (
    <div className="relative">
      <div className="absolute  inset-0 -z-10">
        <img
          src="https://plus.unsplash.com/premium_photo-1703343321301-13aa146af466?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover"
        />

        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <ReactLenis
        root
        options={{
          lerp: 0.08,
        }}
      >
        <Hero />
      </ReactLenis>
    </div>
  );
}
// ---------------- NAV ----------------
const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      <SiSpacex className="text-3xl mix-blend-difference" />

      <button
        onClick={() => {
          document
            .getElementById("launch-schedule")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex items-center gap-1 text-xs text-zinc-400"
      >
        LAUNCH SCHEDULE <FiArrowRight />
      </button>
    </nav>
  );
};

// ---------------- HERO ----------------
const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 " />
    </div>
  );
};

// ---------------- CENTER IMAGE ----------------
const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"],
  );

  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0],
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://i.pinimg.com/1200x/9e/e2/b1/9ee2b171a9f038a5863b2e7515d8bf7e.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

// ---------------- PARALLAX ----------------
const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://i.pinimg.com/1200x/cc/f0/87/ccf08760e9179666998a4bf4d5f1ba50.jpg"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://i.pinimg.com/736x/83/3b/4f/833b4f8cb77340529a9cc6660243d847.jpg"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://i.pinimg.com/736x/ca/54/59/ca545912e9459bb74eb17e17dcbdca94.jpg
"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://i.pinimg.com/736x/c4/a4/e2/c4a4e24f5c7b123851da58355dee561a.jpg"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

// ---------------- PARALLAX ITEM ----------------
const ParallaxImg = ({
  className,
  src,
  start,
  end,
}: {
  className?: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${-end}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);

  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      ref={ref}
      className={className}
      style={{ transform, opacity }}
    />
  );
};

// ---------------- SCHEDULE ----------------
const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mb-20 text-4xl font-black uppercase"
      >
        Launch Schedule
      </motion.h1>

      <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
      <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
      <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
    </section>
  );
};

const ScheduleItem = ({
  title,
  date,
  location,
}: {
  title: string;
  date: string;
  location: string;
}) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 pb-6"
    >
      <div>
        <p className="text-xl text-white">{title}</p>
        <p className="text-sm text-zinc-500">{date}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-zinc-500">
        {location} <FiMapPin />
      </div>
    </motion.div>
  );
};
