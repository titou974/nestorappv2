"use client";
import Image from "next/image";
import styles from "@/components/style";
import { QrCodeIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { Roboto_Mono } from "next/font/google";
import TypewriterComponent from "typewriter-effect";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });
export default function HomeSection() {
  const router = useRouter();
  return (
    <main
      data-theme="nestor"
      className="relative h-screen w-full bg-accent text-accent-foreground"
    >
      <section
        className={`${styles.padding} mx-auto flex h-full max-w-screen-sm flex-col justify-center gap-8`}
      >
        <div className={`relative mx-auto ${roboto_mono.className}`}>
          <div className="absolute right-5 top-1">
            <div className="relative h-[120px] w-[330px] min-w-[330px] rounded-full border-[2px] border-white bg-[#1b2e35] px-5 py-5 shadow-xl">
              <TypewriterComponent
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(50)
                    .changeDeleteSpeed(10)
                    .typeString(`${StringsFR.introductionTexts[0]}`)
                    .pauseFor(5000)
                    .deleteAll(1)
                    .typeString(
                      `<strong>${StringsFR.introductionTexts[1]}</strong>`
                    )
                    .pauseFor(10000)
                    .deleteAll(1)
                    .start();
                }}
                options={{
                  delay: 100,
                  loop: true,
                }}
              />
            </div>
          </div>
          <Image
            src="/nestor.png"
            width={400}
            height={400}
            alt="Nestor during his job"
          />
        </div>
        <div className="flex w-full flex-col items-center gap-20 text-base">
          <div className="flex w-full flex-col gap-5 items-center">
            <div className="mx-auto flex w-full items-center justify-center text-center">
              <p className={`mr-4 text-center text-base font-bold`}>
                {StringsFR.scanQrCode}
              </p>
              <div className="w-[40px]">
                <QrCodeIcon />
              </div>
            </div>
            <div className="text-center font-bold">
              <p>{StringsFR.or}</p>
            </div>
            <Button
              onClick={() => router.push(ROUTES.NEW_TICKET)}
              size="lg"
              className="text-primary w-full"
              variant="secondary"
            >
              {StringsFR.createYourTicket}
              <ArrowRightIcon width={20} />
            </Button>
            <Button
              onClick={() => router.push(ROUTES.SIGNIN)}
              className="w-full"
              variant="primary"
            >
              {StringsFR.iAmValet}
              <ArrowRightIcon width={20} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
