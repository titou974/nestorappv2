"use client";
import { useState, useRef, useActionState } from "react";
import { resetFieldError } from "@/lib/resetFieldError";
import { LottieRefCurrentProps } from "lottie-react";
import {
  frenchPhoneNumberSchema,
  nameSchema,
  passwordSchema,
} from "@/constants/validations";
import {
  Form,
  Button,
  InputGroup,
  Label,
  TextField,
  Spinner,
  Input,
} from "@heroui/react";
import { ArrowRightIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { StringsFR } from "@/constants/fr_string";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { withCallbacks, toastCallback } from "@/lib/toastCallback";
import { registerWithPhone } from "./actions";
import { INITIAL_ANIMATION_STATE, initialState } from "@/constants/states";
import { PlayAnimationInput, RegisterValetWithPhoneNumber } from "@/types/site";
import CheckAnimation from "@/components/animations/Check";

export default function RegisterFormWithPhone({
  companyId,
  siteId,
}: {
  companyId: string | null;
  siteId: string;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterValetWithPhoneNumber>({});

  const [displayAnimation, setDisplayAnimation] = useState<PlayAnimationInput>(
    INITIAL_ANIMATION_STATE,
  );

  const lottieRefName = useRef<LottieRefCurrentProps>(null);
  const lottieRefPhone = useRef<LottieRefCurrentProps>(null);
  const lottieRefPassword = useRef<LottieRefCurrentProps>(null);

  const lottieRefs = {
    name: lottieRefName,
    email: lottieRefPhone,
    password: lottieRefPassword,
  };

  const [state, formAction, pending] = useActionState(
    withCallbacks(
      registerWithPhone.bind(null, siteId, companyId),
      toastCallback(() => {}),
    ),
    initialState,
  );

  const handleFieldValidation = (
    field: keyof PlayAnimationInput,
    value: string,
    schema:
      | typeof nameSchema
      | typeof frenchPhoneNumberSchema
      | typeof passwordSchema,
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
    <Form action={formAction}>
      <TextField
        isRequired
        name="phonenumber"
        className="w-full"
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
      <TextField
        name="name"
        isRequired
        isInvalid={
          (!!formData.name && !nameSchema.safeParse(formData.name).success) ||
          !!state?.errors?.fieldErrors.name
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
        isRequired
        type="password"
        name="password"
        isInvalid={
          (!!formData.password &&
            !passwordSchema.safeParse(formData.password).success) ||
          !!state?.errors?.fieldErrors.password
        }
      >
        <Label>{StringsFR.password}</Label>
        <div className="relative w-full">
          <Input
            className="w-full"
            placeholder={StringsFR.passwordPlaceholder}
            value={formData.password}
            onChange={(e) => {
              handleFieldValidation("password", e.target.value, passwordSchema);
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
