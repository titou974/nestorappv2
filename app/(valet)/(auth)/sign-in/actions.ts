"use server";

import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import { emailSchema, passwordSchema } from "@/constants/validations";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import z from "zod";

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export async function login(
  siteId: string,
  initialState: any,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = schema.safeParse(data);

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
      const userId = responseLogin.user.id;
      await prisma.workSession.create({
        data: {
          siteId: siteId,
          userId: userId,
          createdAt: new Date(),
        },
      });
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

export async function loginWithGoogle(
  siteId: string,
  companyId: string | null,
) {
  let redirectGoogleUrl: string;
  try {
    const data = await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: buildRouteWithParams(ROUTES.DASHBOARD, {
          siteId: siteId,
          companyId: companyId,
        }),
      },
      returnHeaders: true,
    });

    if (!data.response.url) {
      return {
        title: StringsFR.oupsError,
        content: StringsFR.registerErrorDescription,
        status: "ERROR" as const,
      };
    }

    redirectGoogleUrl = data.response.url;
  } catch (error) {
    if (error instanceof APIError) {
      console.log("errorApiSignUp", error.body);
      return {
        title: StringsFR.oupsError,
        content: StringsFR.registerErrorDescription,
        status: "ERROR" as const,
      };
    }
    return {
      title: StringsFR.oupsError,
      content: StringsFR.registerErrorDescription,
      status: "ERROR" as const,
    };
  }
  redirect(redirectGoogleUrl);
}
