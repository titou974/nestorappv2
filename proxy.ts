import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./utils/auth/auth";
import { ROUTES } from "./constants/routes";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/done"],
};
