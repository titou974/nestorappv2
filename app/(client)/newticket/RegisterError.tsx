import Navbar from "@/components/navbar";
import { QrCodeIcon } from "@heroicons/react/20/solid";
import { StringsFR } from "@/constants/fr_string";

export default function RegisterError() {
  return (
    <>
      <Navbar
        subtitle={StringsFR.create}
        title={StringsFR.yourTicket}
        isLoading={false}
        transparent
      />
      <div className="flex w-full flex-col flex-[0.5_1_auto] justify-center gap-8">
        <div className="mx-auto flex w-full items-center justify-center text-center">
          <p className={`mr-4 text-center text-[26px] font-bold`}>
            {StringsFR.qrCodeError}
          </p>
          <div className="w-[40px] text-primary">
            <QrCodeIcon />
          </div>
        </div>
        <div className="text-center text-base text-foreground">
          <p>{StringsFR.retry}</p>
        </div>
      </div>
    </>
  );
}
