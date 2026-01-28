import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware, oneTap } from "better-auth/plugins";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types/site";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import twilio from "twilio";
import { StringsFR } from "@/constants/fr_string";
import { createWorkSession } from "@/app/(valet)/(auth)/actions";

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
        required: false,
        input: true,
      },
      role: {
        type: "string",
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
            createWorkSession(siteId, ctx.context.newSession?.user.id);
          }
        }
      }
    }),
  },
  plugins: [
    oneTap(),
    nextCookies(),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, ctx) => {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

        const client = twilio(accountSid, authToken);

        try {
          await client.messages.create({
            body: StringsFR.smsVerification + code,
            from: twilioNumber,
            to: phoneNumber,
          });
        } catch (error) {
          throw new Error(
            "Erreur lors de la validation du numéro",
            error as ErrorOptions,
          );
        }
      },
    }),
  ],
});
