"use server";
import { ROUTES } from "@/constants/routes";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth/auth";
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
    console.log("error", error);
  }
}
