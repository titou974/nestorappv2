import { ROUTES } from "@/constants/routes";
import { auth } from "@/utils/auth/auth";
import getLastWorkSession from "@/utils/dashboard/getLastWorkSession";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";
import ResponsabilityModal from "@/components/valet/ResponsabilityModal";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(ROUTES.SIGNIN);
  }

  const workSession = await getLastWorkSession(session.session.userId);

  console.log("🔍 Server - workSession:", {
    id: workSession.id,
    acceptedWorkConditions: workSession.acceptedWorkConditions,
    enableModal: workSession.site.enableValetResponsibilityModal,
    shouldShow:
      workSession.site.enableValetResponsibilityModal &&
      !workSession.acceptedWorkConditions,
  });

  return (
    <>
      <Dashboard
        startedAt={workSession.startedAt}
        siteId={workSession.siteId}
        siteName={workSession.site.name}
        workSessionId={workSession.id}
      />
      {workSession.site.enableValetResponsibilityModal &&
        !workSession.acceptedWorkConditions && (
          <ResponsabilityModal
            workSessionId={workSession.id}
            acceptedWorkConditions={workSession.acceptedWorkConditions}
          />
        )}
    </>
  );
}
