"use client";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import {
  LoginValetWithPhone,
  PlayAnimationInputLoginWithPhone,
} from "@/types/site";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  Button,
  FieldError,
  Input,
  InputGroup,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import { useActionState, useRef, useState } from "react";
import { Form } from "@heroui/react";
import { LottieRefCurrentProps } from "lottie-react";
import CheckAnimation from "@/components/animations/Check";
import {
  passwordSchema,
  frenchPhoneNumberSchema,
} from "@/constants/validations";
import {
  INITIAL_ANIMATION_STATE_LOGIN_WITH_PHONE,
  initialState,
} from "@/constants/states";
import { login } from "./actions";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import { withCallbacks, toastCallback } from "@/lib/toastCallback";

export default function LoginFormWithPhone({ siteId }: { siteId: string }) {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginValetWithPhone>({});
  const [displayAnimation, setDisplayAnimation] =
    useState<PlayAnimationInputLoginWithPhone>(
      INITIAL_ANIMATION_STATE_LOGIN_WITH_PHONE,
    );

  const lottieRefPhone = useRef<LottieRefCurrentProps>(null);
  const lottieRefPassword = useRef<LottieRefCurrentProps>(null);

  const lottieRefs = {
    phone: lottieRefPhone,
    password: lottieRefPassword,
  };

  const [state, formAction, pending] = useActionState(
    withCallbacks(
      login.bind(null, siteId),
      toastCallback(() => {}),
    ),
    initialState,
  );

  const handleFieldValidation = (
    field: keyof PlayAnimationInputLoginWithPhone,
    value: string,
    schema: typeof frenchPhoneNumberSchema | typeof passwordSchema,
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
    <Form className="space-y-4" action={formAction}>
      <TextField isRequired name="phone" type="tel" className="w-full">
        <Label>{StringsFR.phoneNumber}</Label>
        <div className="relative w-full">
          <InputGroup>
            <InputGroup.Prefix className="text-foreground border-r-2 border-foreground/20 mr-2">
              {StringsFR.frenchNumberPrefix}
            </InputGroup.Prefix>
            <InputGroup.Input
              className="w-full"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                handleFieldValidation(
                  "phone",
                  e.target.value,
                  frenchPhoneNumberSchema,
                )
              }
              name="phone"
            />
            {displayAnimation.phone && (
              <CheckAnimation lottieRef={lottieRefPhone} />
            )}
          </InputGroup>
        </div>
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
                <p>{StringsFR.isLoggedIn}</p>
                <Spinner color="current" size="sm" />
              </>
            ) : (
              <>
                <p>{StringsFR.login}</p>
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
              buildRouteWithParams(ROUTES.REGISTER, {
                site: siteId,
              }),
            )
          }
        >
          {StringsFR.createYourAccount}
          <ArrowRightIcon width={20} />
        </Button>
      </FooterBarLayout>
    </Form>
  );
}
