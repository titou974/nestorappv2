"use server";
import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import {
  frenchPhoneNumberSchema,
  verificationCodeSchema,
} from "@/constants/validations";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signout({ workSessionId }: { workSessionId: string }) {
  const endSessionTime = new Date();

  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    await prisma.workSession.update({
      where: {
        id: workSessionId,
      },
      data: {
        endAt: endSessionTime,
      },
    });
  } catch (error) {
    throw error;
  }

  redirect(ROUTES.DONE.replace("[id]", workSessionId));
}

export async function addPhoneNumber(_initialState: any, formData: FormData) {
  const phone = formData.get("phone") as string;

  const validatedField = frenchPhoneNumberSchema.safeParse(phone);
  if (!validatedField.success) {
    return {
      title: StringsFR.phoneNumberError,
      content: StringsFR.phoneNumberErrorDescription,
      status: "ERROR" as const,
    };
  }

  const formattedPhone = validatedField.data;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return {
      title: StringsFR.oupsError,
      content: StringsFR.registerErrorDescription,
      status: "ERROR" as const,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      phoneNumber: formattedPhone,
      NOT: { id: session.user.id },
    },
  });

  if (existingUser) {
    return {
      title: StringsFR.phoneNumberAlreadyExists,
      content: StringsFR.phoneNumberAlreadyExistsDescription,
      status: "ERROR" as const,
    };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        phoneNumber: formattedPhone,
        phoneNumberVerified: false,
      },
    });

    await auth.api.sendPhoneNumberOTP({
      body: { phoneNumber: formattedPhone },
    });

    return { title: "", content: "", status: "SUCCESS" as const };
  } catch {
    return {
      title: StringsFR.oupsError,
      content: StringsFR.registerErrorDescription,
      status: "ERROR" as const,
    };
  }
}

export async function verifyAddedPhone(
  phone: string,
  _initialState: any,
  formData: FormData,
) {
  const code = formData.get("code") as string;

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
        code,
        disableSession: false,
        updatePhoneNumber: false,
      },
    });

    if (data.status === true) {
      return {
        title: StringsFR.phoneNumberVerified,
        content: StringsFR.phoneNumberVerifiedDescription,
        status: "SUCCESS" as const,
      };
    }

    return {
      title: StringsFR.oupsError,
      content: StringsFR.phoneNumberVerificationBugError,
      status: "ERROR" as const,
    };
  } catch (error) {
    if (error instanceof APIError) {
      if (error?.body?.code === "INVALID_OTP") {
        return {
          title: StringsFR.phoneNumberVerificationError,
          content: StringsFR.VerificationErrorDescription,
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
}

export async function acceptWorkConditions({
  workSessionId,
}: {
  workSessionId: string;
}) {
  try {
    await prisma.workSession.update({
      where: {
        id: workSessionId,
      },
      data: {
        acceptedWorkConditions: true,
      },
    });
  } catch (error) {
    throw error;
  }
}
