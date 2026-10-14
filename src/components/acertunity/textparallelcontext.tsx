"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imgs from "../../assets/Images/imgs.png";
import imgb from "../../assets/Images/imgsb.png";
import imgc from "../../assets/Images/imgsc.png";
import { SVGMaskEffectDemo } from "./SVGMaskEffectDemo";

/* 🔹 TYPES */
type TextParallaxContentProps = {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
};

type OverlayCopyProps = {
  subheading: string;
  heading: string;
};

type StickyImageProps = {
  imgUrl: string;
};

type ExampleContentProps = {
  img: string;
};

/* 🔹 MAIN */
export const TextParallaxContentExample = () => {
  return (
    <div className="bg-linear-to-r from-black via-[#063B4A] to-black">
      <TextParallaxContent
        imgUrl="https://i.pinimg.com/1200x/d6/94/1c/d6941cceffd6a56c0230cf05982987f4.jpg"
        subheading="Collaborate"
        heading="Built for all of us."
      >
        <ExampleContent img={imgs} />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://i.pinimg.com/1200x/f0/33/33/f033332b613e12e313f6f2b2d8b3d72a.jpg"
        subheading="Quality"
        heading="Never compromise."
      >
        <ExampleContent img={imgb} />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://i.pinimg.com/1200x/9e/e2/b1/9ee2b171a9f038a5863b2e7515d8bf7e.jpg"
        subheading="Modern"
        heading="Dress for the best."
      >
        <ExampleContent img={imgc} />
      </TextParallaxContent>
    </div>
  );
};

/* 🔹 CONST */
const IMG_PADDING = 0;

/* 🔹 WRAPPER */
const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: TextParallaxContentProps) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

/* 🔹 STICKY IMAGE */
const StickyImage = ({ imgUrl }: StickyImageProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      className="sticky z-0 overflow-hidden w-full"
    >
      <motion.div
        className="absolute inset-0 bg-black/70"
        style={{ opacity }}
      />
    </motion.div>
  );
};

/* 🔹 OVERLAY TEXT */
const OverlayCopy = ({ subheading, heading }: OverlayCopyProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{ y, opacity }}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-xl md:text-3xl text-center">{subheading}</p>
      <p className="text-4xl md:text-7xl font-bold text-center">{heading}</p>
    </motion.div>
  );
};

/* 🔹 CONTENT */
const ExampleContent = ({ img }: ExampleContentProps) => {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2 h-162.5">
          <img
            src={img}
            className="w-full h-full object-cover rounded-2xl"
            alt="fashion"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 h-87.5 flex items-center justify-center">
          <SVGMaskEffectDemo />
        </div>
      </div>
    </div>
  );
};
