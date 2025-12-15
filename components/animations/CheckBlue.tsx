import Lottie, { LottieRef } from "lottie-react";
import checkAnimation from "@/assets/checkinputblue.json";

export default function CheckAnimationBlue({
  lottieRef,
}: {
  lottieRef: LottieRef | undefined;
}) {
  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={checkAnimation}
      className="w-8 h-8 z-10 absolute right-1 top-px"
      autoPlay={false}
      loop={false}
    />
  );
}
