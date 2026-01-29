"use server";

import twilio from "twilio";

export default async function sendSms(phoneNumber: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

  const client = twilio(accountSid, authToken);

  await client.messages.create({
    body: message,
    from: twilioNumber,
    to: phoneNumber,
  });
}
