"use server";
import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import { verificationCodeSchema } from "@/constants/validations";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

export default async function verifyPhoneNumber(
  siteId: string,
  userId: string,
  phone: string,
  initialState: any,
  formData: FormData,
) {
  const code = formData.get("code");
  const validatedField = verificationCodeSchema.safeParse(code);

  if (!validatedField.success) {
    return {
      title: StringsFR.codeIsLessThan6Characters,
      content: StringsFR.codeIsLessThan6CharactersDescription,
      status: "ERROR" as const,
    };
  }

  try {
    const data = await auth.api.verifyPhoneNumber({
      body: {
        phoneNumber: phone,
        code: code as string,
        disableSession: false,
        updatePhoneNumber: false,
      },
    });

    if (data.status === true) {
      await prisma.workSession.create({
        data: {
          siteId: siteId,
          userId: userId,
          createdAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.log("error", error);
    if (error instanceof APIError) {
      if (error?.body?.code === "INVALID_OTP") {
        return {
          title: StringsFR.phoneNumberVerificationError,
          content: StringsFR.phoneNumberVerificationErrorDescription,
          status: "ERROR" as const,
        };
      }
      if (
        error?.body?.code === "OTP_NOT_FOUND" ||
        error?.body?.code === "TOO_MANY_ATTEMPTS"
      ) {
        return {
          title: StringsFR.codeExpiratedError,
          content: StringsFR.codeExpiratedErrorDescription,
          status: "ERROR" as const,
        };
      }
    }
    return {
      title: StringsFR.oupsError,
      content: StringsFR.phoneNumberVerificationBugError,
      status: "ERROR" as const,
    };
  }
  redirect(ROUTES.DASHBOARD);
}
