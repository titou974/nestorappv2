"use server";
import { StringsFR } from "@/constants/fr_string";
import { verificationCodeSchema } from "@/constants/validations";
import { auth } from "@/utils/auth/auth";
import { APIError } from "better-auth/api";

export default async function verifyPhoneNumber(
  siteId: string,
  companyId: string | null,
  phone: string,
  initialState: any,
  formData: FormData,
) {
  const code = formData.get("code");
  const validatedField = verificationCodeSchema.safeParse(code);
  console.log("code", code, phone);

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
        updatePhoneNumber: true,
      },
    });
    console.log("phoneVerif", data);
  } catch (error) {
    console.log("error", error.body);
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
}
