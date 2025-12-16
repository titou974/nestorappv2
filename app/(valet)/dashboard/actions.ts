"use server";
import { ROUTES } from "@/constants/routes";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function signout({
  startedAt,
  siteId,
  workSessionId,
}: {
  startedAt: Date;
  siteId: string;
  workSessionId: string;
}) {
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
