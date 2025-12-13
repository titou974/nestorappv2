"use server";

import { StringsFR } from "@/constants/fr_string";
import { ROUTES } from "@/constants/routes";
import { emailSchema, passwordSchema } from "@/constants/validations";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth/auth";
import { redirect } from "next/navigation";
import z from "zod";

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export default async function login(
  siteId: string,
  initialState: any,
  formData: FormData
) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error),
    };
  }

  try {
    const { headers, response: responseRegister } = await auth.api.signInEmail({
      returnHeaders: true,
      body: {
        email: data.email as string,
        password: data.password as string,
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
    return {
      message: StringsFR.registerError,
      status: "ERROR" as const,
    };
  }
  redirect(ROUTES.DASHBOARD);
}
