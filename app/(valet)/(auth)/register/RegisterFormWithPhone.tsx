"use client";
import { useState, useRef, useActionState } from "react";
import { resetFieldError } from "@/lib/resetFieldError";
import { LottieRefCurrentProps } from "lottie-react";
import { frenchPhoneNumberSchema } from "@/constants/validations";
import {
  Form,
  Button,
  InputGroup,
  Label,
  TextField,
  Spinner,
} from "@heroui/react";
import { ArrowRightIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { StringsFR } from "@/constants/fr_string";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { withCallbacks, toastCallback } from "@/lib/toastCallback";
import { registerWithPhone } from "./actions";
import { initialState } from "@/constants/states";

export default function RegisterFormWithPhone({
  companyId,
  siteId,
}: {
  companyId: string | null;
  siteId: string;
}) {
  const router = useRouter();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [displayAnimation, setDisplayAnimation] = useState<boolean>();
  const [phoneNumber, setPhoneNumber] = useState<string>();

  const [state, formAction, pending] = useActionState(
    withCallbacks(
      registerWithPhone.bind(null, siteId, companyId),
      toastCallback(() => {}),
    ),
    initialState,
  );

  const handleFieldValidation = (value: string) => {
    setPhoneNumber(value);
    // resetFieldError(state, "0");
    const isValid = frenchPhoneNumberSchema.safeParse(value).success;

    if (!displayAnimation && isValid) {
      setDisplayAnimation(true);
      queueMicrotask(() => {
        lottieRef.current?.play();
      });
    } else if (!isValid && displayAnimation) {
      setDisplayAnimation(false);
      queueMicrotask(() => {
        lottieRef.current?.stop();
      });
    }
  };
  return (
    <Form action={formAction}>
      <TextField
        name="phonenumber"
        isRequired
        className="max-w-sm"
        onChange={(e) => handleFieldValidation(e)}
      >
        <Label>{StringsFR.phoneNumber}</Label>
        <InputGroup>
          <InputGroup.Prefix className="text-foreground border-r-2 border-foreground/20 mr-2">
            +33
          </InputGroup.Prefix>
          <InputGroup.Input
            className="w-full"
            type="tel"
            value={phoneNumber}
            name="phonenumber"
          />
          <InputGroup.Suffix>
            <PhoneIcon className="text-foreground/60 w-4 h-4" />
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
      <FooterBarLayout>
        <Button type="submit" className="w-full" isPending={pending}>
          {({ isPending }) =>
            isPending ? (
              <>
                <p>{StringsFR.isRegistering}</p>
                <Spinner color="current" size="sm" />
              </>
            ) : (
              <>
                <p>{StringsFR.createYourAccount}</p>
                <ArrowRightIcon width={20} />
              </>
            )
          }
        </Button>
        <Button
          className="w-full"
          variant="ghost"
          onClick={() =>
            router.push(
              buildRouteWithParams(ROUTES.SIGNIN, {
                site: siteId,
              }),
            )
          }
        >
          {StringsFR.login}
          <ArrowRightIcon width={20} />
        </Button>
      </FooterBarLayout>
    </Form>
  );
}
