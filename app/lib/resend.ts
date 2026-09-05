import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY environment variable.");
}

export const resend = new Resend(resendApiKey);

export const waitlistFromEmail =
  process.env.WAITLIST_FROM_EMAIL ?? "Steady <onboarding@resend.dev>";
