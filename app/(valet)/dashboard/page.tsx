import { ROUTES } from "@/constants/routes";
import { auth } from "@/utils/auth/auth";
import getWorkSession from "@/utils/worksession/getWorkSession";
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

  console.log("work", workSession);

  return (
    <Dashboard startedAt={workSession.startedAt} siteId={workSession.siteId} />
  );
}
