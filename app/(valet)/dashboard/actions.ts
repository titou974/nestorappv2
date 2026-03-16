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

export async function completeTicket(formData: FormData) {
  const ticketId = formData.get("ticketId") as string;
  const immatriculation = formData.get("immatriculation") as string;
  const photosJson = formData.get("photos") as string;
  const photos: File[] = formData.getAll("photoFiles") as File[];

  if (!ticketId) {
    return {
      status: "ERROR" as const,
      title: StringsFR.aErrorOccured,
      content: StringsFR.ourServerHasProblems,
    };
  }

  try {
    const uploadedUrls: string[] = [];

    if (photos.length > 0) {
      const { supabase } = await import("@/lib/supabase");
      const BUCKET = "ticket-photos";

      for (const file of photos) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split(".").pop() || "jpg";
        const fileName = `${ticketId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(fileName, buffer, { contentType: file.type, upsert: false });

        if (error) {
          return {
            status: "ERROR" as const,
            title: StringsFR.aErrorOccured,
            content: error.message,
          };
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
        uploadedUrls.push(publicUrl);
      }
    }

    // Existing photos already saved (URLs from Supabase)
    const existingPhotos: string[] = photosJson ? JSON.parse(photosJson) : [];

    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ...(immatriculation ? { immatriculation } : {}),
        photos: [...existingPhotos, ...uploadedUrls],
      },
    });

    return {
      status: "SUCCESS" as const,
      title: StringsFR.immatriculationSaved,
      content: StringsFR.immatriculationSavedDescription,
    };
  } catch {
    return {
      status: "ERROR" as const,
      title: StringsFR.aErrorOccured,
      content: StringsFR.ourServerHasProblems,
    };
  }
}

export async function deleteTicketPhoto(ticketId: string, url: string) {
  try {
    const { supabase } = await import("@/lib/supabase");
    const BUCKET = "ticket-photos";

    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/${BUCKET}/`);
    const filePath = pathParts[1];
    if (filePath) {
      await supabase.storage.from(BUCKET).remove([filePath]);
    }

    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    const updatedPhotos = (ticket?.photos || []).filter((p) => p !== url);

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { photos: updatedPhotos },
    });

    return { status: "SUCCESS" as const, photos: updatedPhotos };
  } catch {
    return { status: "ERROR" as const, photos: [] };
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
