import { UserRole } from "@/generated/prisma/enums";
import { authClient } from "./auth-client";
import { RegisterValetData } from "@/types/site";

export const handleGoogleSignIn = async (companyId: string, siteId: string) => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/dashboard?companyId=${companyId}&siteId=${siteId}`,
      additionalData: {
        companyId: companyId,
        role: UserRole.VALET,
      },
    });
  } catch (error) {
    console.error("Google sign in error:", error);
  }
};
