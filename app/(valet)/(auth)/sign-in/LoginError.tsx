import FooterBarLayout from "@/components/layouts/footerbarlayout";
import Navbar from "@/components/Navbar";
import { StringsFR } from "@/constants/fr_string";
import { ArrowRightIcon, QrCodeIcon } from "@heroicons/react/20/solid";
import { Button } from "@heroui/react";

export default function LoginError() {
  return (
    <>
      <Navbar subtitle={StringsFR.scan} title={StringsFR.qrCode} />
      <div className="relative flex w-full flex-col justify-center gap-6 flex-[0.5_1_auto]">
        <div className="mx-auto flex w-full items-center justify-center text-center text-foreground">
          <p className={`mr-4 text-center text-[26px] font-bold`}>
            {StringsFR.qrCodeError}
          </p>
          <div className="w-10 text-primary">
            <QrCodeIcon />
          </div>
        </div>
        <div className="text-center text-base text-foreground">
          <p>{StringsFR.retry}</p>
        </div>
      </div>
      <FooterBarLayout>
        <Button isDisabled size="lg" className="w-full">
          {StringsFR.login}
          <ArrowRightIcon width={20} />
        </Button>
        <Button isDisabled className="w-full" variant="ghost">
          {StringsFR.createYourAccount}
          <ArrowRightIcon width={20} />
        </Button>
      </FooterBarLayout>
    </>
  );
}
