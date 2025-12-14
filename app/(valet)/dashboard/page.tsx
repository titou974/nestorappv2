import { ROUTES } from "@/constants/routes";
import { auth } from "@/utils/auth/auth";
import getWorkSession from "@/utils/dashboard/getWorkSession";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(ROUTES.SIGNIN);
  }

  const workSession = await getWorkSession(session.session.userId);

  return (
    <Dashboard
      startedAt={workSession.startedAt}
      siteId={workSession.siteId}
      siteName={workSession.site.name}
    />
  );
}
