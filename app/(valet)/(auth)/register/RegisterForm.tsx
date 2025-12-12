"use client";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import { RegisterValet, PlayAnimationInput } from "@/types/site";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  Button,
  FieldError,
  Input,
  Label,
  Separator,
  Spinner,
  TextField,
} from "@heroui/react";
import { useActionState, useRef, useState } from "react";
import { Form } from "@heroui/react";
import { LottieRefCurrentProps } from "lottie-react";
import CheckAnimation from "@/components/animations/Check";
import {
  nameSchema,
  frenchPhoneNumberSchema,
  passwordSchema,
} from "@/constants/validations";
import { INITIAL_ANIMATION_STATE, initialState } from "@/constants/states";
import register from "./actions";
import { Icon } from "@iconify/react";
import { handleGoogleSignIn } from "@/utils/auth/authActions";

export default function RegisterForm({
  companyId,
  siteId,
}: {
  companyId: string;
  siteId: string;
}) {
  console.log("companyid", companyId);
  const [formData, setFormData] = useState<RegisterValet>({});
  const [displayAnimation, setDisplayAnimation] = useState<PlayAnimationInput>(
    INITIAL_ANIMATION_STATE
  );

  const lottieRefName = useRef<LottieRefCurrentProps>(null);
  const lottieRefPhone = useRef<LottieRefCurrentProps>(null);
  const lottieRefPassword = useRef<LottieRefCurrentProps>(null);

  const lottieRefs = {
    name: lottieRefName,
    phoneNumber: lottieRefPhone,
    password: lottieRefPassword,
  };

  const [state, formAction, pending] = useActionState(
    register.bind(null, companyId),
    initialState
  );

  const handleFieldValidation = (
    field: keyof PlayAnimationInput,
    value: string,
    schema: typeof nameSchema | typeof frenchPhoneNumberSchema
  ) => {
    const isValid = schema.safeParse(value).success;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (!displayAnimation[field] && isValid) {
      setDisplayAnimation((prev) => ({
        ...prev,
        [field]: true,
      }));
      queueMicrotask(() => {
        lottieRefs[field].current?.play();
      });
    } else if (!isValid && displayAnimation[field]) {
      setDisplayAnimation((prev) => ({
        ...prev,
        [field]: false,
      }));
      queueMicrotask(() => {
        lottieRefs[field].current?.stop();
      });
    }
  };

  return (
    <div className="space-y-6">
      <Form className="space-y-4" action={formAction}>
        <TextField
          name="name"
          isRequired
          isInvalid={
            (!!formData.name && !nameSchema.safeParse(formData.name).success) ||
            !!state?.errors.fieldErrors.name
          }
        >
          <Label className="inline-flex items-center">{StringsFR.name}</Label>
          <div className="relative w-full">
            <Input
              className="w-full"
              placeholder={StringsFR.namePlaceholder}
              value={formData.name}
              onChange={(e) =>
                handleFieldValidation("name", e.target.value, nameSchema)
              }
            />
            {displayAnimation.name && (
              <CheckAnimation lottieRef={lottieRefName} />
            )}
          </div>
          <FieldError>{StringsFR.nameError}</FieldError>
        </TextField>
        <TextField
          type="tel"
          name="phone"
          isRequired
          isInvalid={
            (!!formData.phoneNumber &&
              !frenchPhoneNumberSchema.safeParse(formData.phoneNumber)
                .success) ||
            !!state?.errors.fieldErrors.phone
          }
        >
          <Label>{StringsFR.phoneNumber}</Label>
          <div className="relative w-full">
            <Input
              placeholder={StringsFR.phonePlaceholder}
              className="w-full"
              value={formData.phoneNumber}
              onChange={(e) =>
                handleFieldValidation(
                  "phoneNumber",
                  e.target.value,
                  frenchPhoneNumberSchema
                )
              }
            />
            {displayAnimation.phoneNumber && (
              <CheckAnimation lottieRef={lottieRefPhone} />
            )}
          </div>
          <FieldError>{StringsFR.frenchPhoneNumberError}</FieldError>
        </TextField>
        <TextField
          isRequired
          type="password"
          name="password"
          isInvalid={
            (!!formData.password &&
              !passwordSchema.safeParse(formData.password).success) ||
            !!state?.errors.fieldErrors.password
          }
        >
          <Label>{StringsFR.password}</Label>
          <div className="relative w-full">
            <Input
              className="w-full"
              placeholder={StringsFR.passwordPlaceholder}
              value={formData.password}
              onChange={(e) => {
                handleFieldValidation(
                  "password",
                  e.target.value,
                  passwordSchema
                );
              }}
            />
            {displayAnimation.password && (
              <CheckAnimation lottieRef={lottieRefPhone} />
            )}
          </div>
          <FieldError>{StringsFR.passwordError}</FieldError>
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
          <Button className="w-full" variant="ghost">
            {StringsFR.login}
            <ArrowRightIcon width={20} />
          </Button>
        </FooterBarLayout>
      </Form>
      <Separator />
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="tertiary"
          onClick={() => handleGoogleSignIn(companyId, siteId)}
        >
          <Icon icon="devicon:google" />
          Avec Google
        </Button>
        <Button variant="tertiary">
          <Icon icon="ion:logo-apple" />
          Avec Apple
        </Button>
      </div>
    </div>
  );
}
