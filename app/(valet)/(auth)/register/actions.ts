"use server";

import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import {
  emailSchema,
  frenchPhoneNumberSchema,
  nameSchema,
  passwordSchema,
} from "@/constants/validations";
import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth/auth";
import { APIError } from "better-auth/api";
import { phoneNumber } from "better-auth/plugins";
import { redirect } from "next/navigation";
import z from "zod";
import { createWorkSession, sendOtp } from "../../actions";
import { formatPhoneNumber } from "@/lib/formatPhoneNumber";

const schemaRegisterWithMail = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const schemaRegisterWithPhone = z.object({
  name: nameSchema,
  phone: frenchPhoneNumberSchema,
  password: passwordSchema,
});

export async function register(
  siteId: string,
  companyId: string | null,
  initialState: any,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = schemaRegisterWithMail.safeParse(data);

  if (!validatedFields.success) {
    return {
      title: StringsFR.fieldError,
      content: StringsFR.fieldErrorDescription,
      errors: z.flattenError(validatedFields.error),
    };
  }

  await checkIfUserExist(data.email as string, data.password as string, siteId);

  try {
    const { response: responseRegister } = await auth.api.signUpEmail({
      returnHeaders: true,
      body: {
        email: data.email as string,
        name: data.name as string,
        password: data.password as string,
        companyId,
      },
    });

    if (responseRegister.user) {
      await createWorkSession(siteId, responseRegister.user.id);
    }
  } catch (error) {
    if (error instanceof APIError) {
      if (error.statusCode === 422) {
        return {
          title: StringsFR.userAlreadyExist,
          content: StringsFR.userAlreadyExistDescription,
          status: "ERROR" as const,
        };
      }
    }
    return {
      title: StringsFR.oupsError,
      content: StringsFR.registerErrorDescription,
      status: "ERROR" as const,
    };
  }
  redirect(ROUTES.DASHBOARD);
}

export async function registerWithPhone(
  siteId: string,
  companyId: string | null,
  initialState: any,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = schemaRegisterWithPhone.safeParse(data);

  if (!validatedFields.success) {
    return {
      title: StringsFR.fieldError,
      content: StringsFR.fieldErrorDescription,
      errors: z.flattenError(validatedFields.error),
    };
  }

  const phoneNumber = formatPhoneNumber(data.phone as string);

  try {
    const { response: responseRegister } = await auth.api.signUpEmail({
      returnHeaders: true,
      body: {
        email: `${phoneNumber}@nestorappvalet.com`,
        phoneNumber,
        name: data.name as string,
        password: data.password as string,
        companyId,
      },
    });

    if (!responseRegister.user) {
      return {
        title: StringsFR.oupsError,
        content: StringsFR.registerErrorDescription,
        status: "ERROR" as const,
      };
    }

    await sendOtp(phoneNumber as string);
  } catch (error) {
    console.log("error", error);
    return {
      title: StringsFR.oupsError,
      content: StringsFR.registerErrorDescription,
      status: "ERROR" as const,
    };
  }
  redirect(
    buildRouteWithParams(ROUTES.VERIFY_PHONE, {
      site: siteId,
    }),
  );
}

async function checkIfUserExist(
  email: string,
  password: string,
  siteId: string,
) {
  let workSession;
  try {
    const existingAccount = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
    });
    if (existingAccount?.id) {
      const responseLogin = await auth.api.signInEmail({
        body: {
          email: email as string,
          password: password as string,
        },
      });
      if (responseLogin.user) {
        workSession = await prisma.workSession.create({
          data: {
            siteId: siteId,
            userId: responseLogin.user.id,
            createdAt: new Date(),
          },
        });
      } else {
        return {
          title: StringsFR.userAlreadyExist,
          content: StringsFR.userAlreadyExistDescription,
          status: "ERROR" as const,
        };
      }
    }
  } catch {
    return {
      title: StringsFR.userAlreadyExist,
      content: StringsFR.userAlreadyExistDescription,
      status: "ERROR" as const,
    };
  }
  if (workSession) {
    redirect(ROUTES.DASHBOARD);
  }
}
