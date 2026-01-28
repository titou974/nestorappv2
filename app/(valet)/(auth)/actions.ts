"use server";

import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

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

export async function createWorkSession(siteId: string, userId: string) {
  await prisma.workSession.create({
    data: {
      siteId: siteId,
      userId: userId,
      createdAt: new Date(),
    },
  });
}

export async function sendOtp(phoneNumber: string) {
  try {
    await auth.api.sendPhoneNumberOTP({
      body: {
        phoneNumber: phoneNumber, // required
      },
    });
  } catch (error) {
    throw new Error(
      "erreur sur l'inscription avec le numéro",
      error as ErrorOptions,
    );
  }
}
