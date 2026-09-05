import { getSupabaseServer } from "@/app/lib/supabase-server";
import { getResend, waitlistFromEmail } from "@/app/lib/resend";

type WaitlistPayload = {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validInterests = new Set(["therapist", "support"]);

export async function POST(request: Request) {
  const body: WaitlistPayload = await request.json().catch(() => ({}));

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const interest = typeof body.interest === "string" ? body.interest : "";

  if (!name || !emailPattern.test(email) || !validInterests.has(interest)) {
    return Response.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { error } = await getSupabaseServer()
    .from("waitlist")
    .insert({ name, email, interest });

  if (error) {
    if (error.code === "23505") {
      return Response.json(
        { error: "This email is already on the waitlist." },
        { status: 409 },
      );
    }

    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }

  const resend = getResend();

  if (resend) {
    const { error: emailError } = await resend.emails.send({
      from: waitlistFromEmail,
      to: email,
      subject: "You're on the Steady waitlist",
      html: `<p>Hi ${name},</p><p>You're officially on the Steady waitlist. We'll email you as soon as we're ready for you to check in, reach out, and keep going.</p><p>— The Steady team</p>`,
    });

    if (emailError) {
      console.error("Failed to send waitlist confirmation email:", emailError);
    }
  } else {
    console.warn(
      "RESEND_API_KEY not configured; skipping waitlist confirmation email.",
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
