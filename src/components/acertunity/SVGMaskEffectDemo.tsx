"use client";
import { MaskContainer } from "./svg-mask-effect";

export function SVGMaskEffectDemo() {
  return (
    <div className="flex h-[20rem] w-full items-center justify-center overflow-hidden">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-100 dark:text-white">
            Fashion is more than just clothing—it’s a reflection of your
            personality
          </p>
        }
        className="h-[20rem]  text-white dark:text-black"
      >
        Discover the power of{" "}
        <span className="text-blue-500">modern fashion styles</span> with unique
        designs and timeless trends, enhanced by
        <span className="text-blue-500">confidence and individuality</span>.
      </MaskContainer>
    </div>
  );
}
