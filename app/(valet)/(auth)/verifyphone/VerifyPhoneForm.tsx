"use client";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
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
import { FormEvent, useState } from "react";

export default function VerifyPhoneForm({
  companyId,
  siteId,
  phone,
}: {
  companyId: string | null;
  siteId: string;
  phone: string;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (value.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      if (value === "123456") {
        console.log("Code verified successfully!");
        setValue("");
      } else {
        setError("Invalid code. Please try again.");
      }
      setIsSubmitting(false);
    }, 1500);
  };
  return (
    <Form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label>Vérifier votre compte</Label>
        <Description>
          Nous avons envoyé un code à votre numéro: {phone}
        </Description>
        <InputOTP
          isInvalid={!!error}
          maxLength={6}
          value={value}
          onChange={(val) => {
            setValue(val);
            setError("");
          }}
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
        <span className="field-error" data-visible={!!error} id="code-error">
          {error}
        </span>
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
          isDisabled={value.length !== 6}
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
