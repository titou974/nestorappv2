import EmailTemplate from "@/emails/EmailTemplate";
import { EmailTicketProps } from "@/types/site";
import { render } from "@react-email/components";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(req: NextRequest) {
  const { email, siteName, scannedAt, ticketPrice, ticketNumber, companyCgu } =
    (await req.json()) as EmailTicketProps;

  try {
    const data = await resend.emails.send({
      from: `Nestor App <${process.env.RESEND_MAIL}>`,
      to: [email],
      subject: "Votre ticket",
      html: await render(
        EmailTemplate({
          siteName,
          scannedAt,
          ticketPrice,
          ticketNumber,
          companyCgu,
          email,
        }),
        {
          pretty: true,
        }
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error sending email..." },
      { status: 500 }
    );
  }
}
