import { Resend } from "resend";

export const waitlistFromEmail =
  process.env.WAITLIST_FROM_EMAIL ?? "Steady <onboarding@resend.dev>";

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}
