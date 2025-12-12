import { UserRole } from "@/generated/prisma/enums";
import { authClient } from "./auth-client";

export const handleGoogleSignIn = async (companyId: string, siteId: string) => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/dashboard?companyId=${companyId}&restaurantId=${siteId}`,
      additionalData: {
        companyId: companyId,
        role: UserRole.VALET,
      },
    });
  } catch (error) {
    console.error("Google sign in error:", error);
  }
};
