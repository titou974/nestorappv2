import { buildRouteWithParams } from "@/lib/buildroutewithparams";
import { authClient } from "./auth-client";
import { ROUTES } from "@/constants/routes";

export const handleGoogleSignIn = async (
  companyId: string | null,
  siteId: string
) => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: buildRouteWithParams(ROUTES.DASHBOARD, {
        siteId: siteId,
        companyId: companyId,
      }),
      additionalData: {
        companyId: companyId,
      },
    });
  } catch (error) {
    throw new Error("Failed to log with Google");
  }
};
