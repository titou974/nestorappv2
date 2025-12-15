import SessionDone from "./SessionDone";
import getWorkSession from "@/utils/dashboard/getWorkSession";

export default async function PageSessionDone({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workSession = await getWorkSession(id);
  return (
    <SessionDone
      siteId={workSession.site.id}
      siteName={workSession.site.name}
      sessionName={workSession.user.name}
    />
  );
}
