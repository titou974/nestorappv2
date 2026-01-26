"use client";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import { withCallbacks, toastCallback } from "@/lib/toastCallback";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Description,
  Form,
  InputOTP,
  Label,
  Link,
  Spinner,
} from "@heroui/react";
import { useActionState, useState } from "react";
import verifyPhoneNumber from "./actions";
import { initialState } from "@/constants/states";

export default function VerifyPhoneForm({
  companyId,
  siteId,
  phone,
}: {
  companyId: string | null;
  siteId: string;
  phone: string;
}) {
  const [code, setCode] = useState("");
  const [state, formAction, pending] = useActionState(
    withCallbacks(
      verifyPhoneNumber.bind(null, siteId, companyId, phone),
      toastCallback(() => {}),
    ),
    initialState,
  );

  return (
    <Form className="flex w-full flex-col gap-4" action={formAction}>
      <div className="flex flex-col gap-2">
        <Label>Vérifier votre compte</Label>
        <Description>
          Nous avons envoyé un code à votre numéro: {phone}
        </Description>
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(val) => setCode(val)}
          name="code"
        >
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
      </div>
      <div className="flex items-center gap-[5px] px-1 pt-1">
        <p className="text-sm text-muted">Vous n&apos;avez pas reçu le code?</p>
        <Link className="text-foreground underline" href="#">
          Renvoyer
        </Link>
      </div>
      <FooterBarLayout>
        <Button
          type="submit"
          className="w-full"
          isDisabled={code.length !== 6}
          isPending={pending}
        >
          {({ isPending }) =>
            isPending ? (
              <>
                <p>{StringsFR.verifying}</p>
                <Spinner color="current" size="sm" />
              </>
            ) : (
              <>
                <p>{StringsFR.verifyYourNumber}</p>
                <ArrowRightIcon width={20} />
              </>
            )
          }
        </Button>
      </FooterBarLayout>
    </Form>
  );
}
