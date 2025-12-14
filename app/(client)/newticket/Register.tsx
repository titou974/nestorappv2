import Navbar from "@/components/Navbar";
import { QrCodeIcon } from "@heroicons/react/20/solid";
import { StringsFR } from "@/constants/fr_string";

export default function Register() {
  return (
    <>
      <Navbar
        subtitle={StringsFR.create}
        title={StringsFR.yourTicket}
        transparent
      />
      <div className="flex w-full flex-col justify-center gap-8">
        <div className="mx-auto flex flex-[0.5_1_auto] w-full items-center justify-center text-center">
          <p className={`mr-4 text-center text-[26px] font-bold`}>
            {StringsFR.scanQrCode}
          </p>
          <div className="w-[40px] text-primary">
            <QrCodeIcon />
          </div>
        </div>
        <div className="text-center text-base text-foreground">
          <p>{StringsFR.toCreateTicket}</p>
        </div>
      </div>
      <div className="mb-20"></div>
    </>
  );
}
