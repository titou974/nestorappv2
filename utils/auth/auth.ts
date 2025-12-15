import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware, oneTap } from "better-auth/plugins";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types/site";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      companyId: {
        type: "string",
        required: true,
        input: true,
      },
      role: {
        type: "string", // Better Auth uses string type
        required: true,
        defaultValue: UserRole.VALET,
        input: false,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.includes("/callback/:id")) {
        console.log("🔍 Callback detected", ctx.context.newSession?.user);

        const location = ctx?.context?.responseHeaders?.get("location");

        if (location && ctx.context.newSession?.user.id) {
          const url = new URL(location, process.env.BASE_URL);
          const companyId = url.searchParams.get("companyId");
          const siteId = url.searchParams.get("siteId");

          if (companyId) {
            await prisma.user.update({
              where: { id: ctx.context.newSession?.user.id },
              data: {
                companyId: companyId,
              },
            });
          }

          if (siteId) {
            await prisma.workSession.create({
              data: {
                siteId: siteId,
                userId: ctx.context.newSession?.user.id,
              },
            });
          }
        }
      }
    }),
  },
  plugins: [
    oneTap(),
    inferAdditionalFields({
      user: {
        companyId: {
          type: "string",
          required: true,
          input: true,
        },
        phone: {
          type: "string",
          required: false,
          input: true,
        },
      },
    }),
    nextCookies(),
  ],
});
