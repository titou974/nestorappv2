"use server";

import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
} from "@/constants/validations";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import z from "zod";

const schema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export default async function register(
  companyId: string,
  siteId: string,
  initialState: any,
  formData: FormData
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

  await checkIfUserExist(data.email as string, data.password as string, siteId);

  try {
    const { response: responseRegister } = await auth.api.signUpEmail({
      returnHeaders: true,
      body: {
        email: data.email as string,
        name: data.name as string,
        password: data.password as string,
        companyId: companyId,
      },
    });

    if (responseRegister.user) {
      const userId = responseRegister.user.id;
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

async function checkIfUserExist(
  email: string,
  password: string,
  siteId: string
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
