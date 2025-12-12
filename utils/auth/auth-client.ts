import { createAuthClient } from "better-auth/react";
import { oneTapClient } from "better-auth/client/plugins";
import "dotenv/config";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,
  plugins: [
    oneTapClient({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      additionalOptions: {
        // Any extra options for the Google initialize method
      },
      promptOptions: {
        baseDelay: 1000, // Base delay in ms (default: 1000)
        maxAttempts: 5, // Maximum number of attempts before triggering onPromptNotification (default: 5)
      },
    }),
  ],
});
