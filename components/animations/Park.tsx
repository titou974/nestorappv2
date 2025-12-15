"use client";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { ReactNode, useRef } from "react";
import parkAnimation from "@/assets/park.json";

export default function ParkAnimation({ children }: { children: ReactNode }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <span className="z-50 w-screen md:w-full absolute md:static top-[42%] left-1/2 transform md:transform-none md:translate-0 -translate-x-1/2 -translate-y-1/2 sm:w-full flex flex-col items-center gap-4">
      <Lottie
        lottieRef={lottieRef}
        animationData={parkAnimation}
        loop={false}
        autoplay={true}
        className="w-full"
      />
      {children}
    </span>
  );
}
