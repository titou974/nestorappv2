import { authClient } from "./auth-client";

export const handleGoogleSignIn = async (companyId: string, siteId: string) => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/dashboard?companyId=${companyId}&siteId=${siteId}`,
      additionalData: {
        companyId: companyId,
      },
    });
  } catch (error) {
    throw new Error("Failed to log with Google");
  }
};
