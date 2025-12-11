"use client";
import FooterBarLayout from "@/components/layouts/footerbarlayout";
import { StringsFR } from "@/constants/fr_string";
import { RegisterValet, PlayAnimationInput } from "@/types/site";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRef, useState } from "react";
import { Form } from "@heroui/react";
import { LottieRefCurrentProps } from "lottie-react";
import CheckAnimation from "@/components/animations/Check";
import { nameSchema, frenchPhoneNumberSchema } from "@/constants/validations";
import { INITIAL_ANIMATION_STATE } from "@/constants/states";

export default function RegisterForm() {
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
    <Form className="space-y-4">
      <TextField
        isRequired
        isInvalid={
          !!formData.name && !nameSchema.safeParse(formData.name).success
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
        isInvalid={
          !!formData.phoneNumber &&
          !frenchPhoneNumberSchema.safeParse(formData.phoneNumber).success
        }
      >
        <Label>{StringsFR.phoneNumber}</Label>
        <div className="relative w-full">
          <Input
            type="tel"
            placeholder="+33 6 01 01 01 01"
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

      <TextField isRequired>
        <Label>{StringsFR.password}</Label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
        <Description>
          Votre mot de passe doit contenir au moins 6 caractères
        </Description>
      </TextField>

      <FooterBarLayout>
        <Button type="submit" size="lg" className="w-full">
          {StringsFR.createYourAccount}
          <ArrowRightIcon width={20} />
        </Button>
        <Button className="w-full" variant="ghost">
          {StringsFR.login}
          <ArrowRightIcon width={20} />
        </Button>
      </FooterBarLayout>
    </Form>
  );
}
