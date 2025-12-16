import HomeSection from "@/components/home/HomeSection";
import { ROUTES } from "@/constants/routes";
import { auth } from "@/utils/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(ROUTES.DASHBOARD);
  }
  return <HomeSection />;
}
