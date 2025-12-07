"use client";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef } from "react";
import confettiAnimation from "@/assets/confetti.json";

export default function ConfettiAnimation() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <span className="z-50 absolute top-40 pointer-events-none">
      <Lottie
        lottieRef={lottieRef}
        animationData={confettiAnimation}
        loop={false}
        autoplay={true}
        className="w-40 h-40 z-50"
      />
    </span>
  );
}
