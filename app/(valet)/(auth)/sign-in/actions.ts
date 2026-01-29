"use server";

import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import {
  emailSchema,
  passwordSchema,
  schemaLoginWithEmail,
  schemaLoginWithPhone,
  schemaRegisterWithPhone,
} from "@/constants/validations";
import { auth } from "@/utils/auth/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import z from "zod";
import { createWorkSession } from "../../actions";
import { formatPhoneNumber } from "@/lib/formatPhoneNumber";

export async function login(
  siteId: string,
  initialState: any,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = schemaLoginWithEmail.safeParse(data);

  if (!validatedFields.success) {
    return {
      title: StringsFR.fieldError,
      content: StringsFR.fieldErrorDescription,
      errors: z.flattenError(validatedFields.error),
    };
  }

  try {
    const { response: responseLogin } = await auth.api.signInEmail({
      returnHeaders: true,
      body: {
        email: data.email as string,
        password: data.password as string,
      },
    });

    if (responseLogin.user) {
      await createWorkSession(siteId, responseLogin.user.id);
    }
  } catch (error) {
    if (error instanceof APIError) {
      if (error.statusCode === 401) {
        return {
          title: StringsFR.wrongMailorPassword,
          content: StringsFR.wrongMailOrPasswordDescription,
          status: "ERROR" as const,
        };
      }
    }
    return {
      title: StringsFR.oupsError,
      content: StringsFR.loginErrorDescription,
      status: "ERROR" as const,
    };
  }
  redirect(ROUTES.DASHBOARD);
}

export async function loginWithPhone(
  siteId: string,
  initialState: any,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = schemaLoginWithPhone.safeParse(data);

  if (!validatedFields.success) {
    return {
      title: StringsFR.fieldError,
      content: StringsFR.fieldErrorDescription,
      errors: z.flattenError(validatedFields.error),
    };
  }

  const phoneNumber = formatPhoneNumber(data.phone as string);

  try {
    const responseLogin = await auth.api.signInPhoneNumber({
      body: {
        phoneNumber,
        password: data.password as string,
        rememberMe: true,
      },
    });
    console.log("responseLogin", responseLogin);
    if (responseLogin.user) {
      await createWorkSession(siteId, responseLogin.user.id);
    }
  } catch (error) {
    if (error instanceof APIError) {
      if (error.statusCode === 401) {
        return {
          title: StringsFR.wrongPhoneOrPassword,
          content: StringsFR.wrongPhoneOrPasswordDescription,
          status: "ERROR" as const,
        };
      }
    }
    return {
      title: StringsFR.oupsError,
      content: StringsFR.loginErrorDescription,
      status: "ERROR" as const,
    };
  }
  redirect(ROUTES.DASHBOARD);
}
