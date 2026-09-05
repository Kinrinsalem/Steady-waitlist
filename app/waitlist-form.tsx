"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type Interest = "therapist" | "support";

type WaitlistFormState = {
  name: string;
  email: string;
  interest: Interest | null;
};

const initialFormState: WaitlistFormState = {
  name: "",
  email: "",
  interest: null,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [form, setForm] = useState<WaitlistFormState>(initialFormState);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    const field = event.target.name as "name" | "email";

    setForm((current) => ({ ...current, [field]: event.target.value }));
    setSubmitted(false);

    if (field === "email" && emailError) {
      setEmailError("");
    }
  }

  function handleInterestChange(event: ChangeEvent<HTMLInputElement>) {
    const interest = event.target.value as Interest;

    setForm((current) => ({ ...current, interest }));
    setSubmitted(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();

    setFormError("");

    if (!emailPattern.test(email)) {
      setEmailError("Enter a valid email address.");
      setSubmitted(false);
      return;
    }

    if (!name || !form.interest) {
      setFormError("Fill in your name and pick one option below.");
      setSubmitted(false);
      return;
    }

    setForm((current) => ({ ...current, name, email }));
    setEmailError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest: form.interest }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setFormError(data.error ?? "Something went wrong. Please try again.");
        setSubmitted(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("Something went wrong. Please try again.");
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit} noValidate>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[#343833]"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleTextChange}
          placeholder="Your name"
          className="mt-3 w-full border-0 border-b border-[#aaa69c] bg-transparent px-0 pb-3 text-[0.95rem] text-[#222622] outline-none transition-colors placeholder:text-[#9b978f] focus:border-[#222622] focus:ring-0"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#343833]"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          onChange={handleTextChange}
          placeholder="you@example.com"
          aria-describedby={emailError ? "email-error" : undefined}
          aria-invalid={Boolean(emailError)}
          className={`mt-3 w-full border-0 border-b bg-transparent px-0 pb-3 text-[0.95rem] text-[#222622] outline-none transition-colors placeholder:text-[#9b978f] focus:ring-0 ${
            emailError
              ? "border-[#9d3e34] focus:border-[#9d3e34]"
              : "border-[#aaa69c] focus:border-[#222622]"
          }`}
        />
        {emailError ? (
          <p
            id="email-error"
            role="alert"
            className="mt-2 text-xs text-[#9d3e34]"
          >
            {emailError}
          </p>
        ) : null}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-[#343833]">
          I&apos;m interested as a
        </legend>
        <div className="mt-4 grid gap-3.5">
          <label className="grid cursor-pointer grid-cols-[1fr_1.25rem] items-center gap-3 text-[0.95rem] text-[#5f605b]">
            <span>Therapist</span>
            <span className="relative h-5 w-5">
              <input
                name="interest"
                value="therapist"
                type="radio"
                checked={form.interest === "therapist"}
                onChange={handleInterestChange}
                className="peer sr-only"
              />
              <span className="pointer-events-none absolute inset-0 grid place-items-center rounded-sm border border-[#8c8c84] bg-transparent peer-checked:border-[#222622] peer-checked:bg-[#222622] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#222622]">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 fill-none stroke-[#f3ecdd]"
                  style={{ opacity: form.interest === "therapist" ? 1 : 0 }}
                >
                  <path
                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </label>
          <label className="grid cursor-pointer grid-cols-[1fr_1.25rem] items-center gap-3 text-[0.95rem] text-[#5f605b]">
            <span>Person seeking support</span>
            <span className="relative h-5 w-5">
              <input
                name="interest"
                value="support"
                type="radio"
                checked={form.interest === "support"}
                onChange={handleInterestChange}
                className="peer sr-only"
              />
              <span className="pointer-events-none absolute inset-0 grid place-items-center rounded-sm border border-[#8c8c84] bg-transparent peer-checked:border-[#222622] peer-checked:bg-[#222622] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#222622]">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 fill-none stroke-[#f3ecdd]"
                  style={{ opacity: form.interest === "support" ? 1 : 0 }}
                >
                  <path
                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      {formError ? (
        <p role="alert" className="text-xs text-[#9d3e34]">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="flex min-h-13 w-full items-center justify-center bg-[#222622] px-6 py-3.5 text-[0.95rem] font-medium text-[#f3ecdd] transition-colors hover:bg-[#344138] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#222622] active:bg-[#16221c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitted
          ? "You're on the list"
          : submitting
            ? "Joining…"
            : "Join the waitlist"}
      </button>

      <p className="sr-only" aria-live="polite">
        {submitted ? "You're on the waitlist." : ""}
      </p>
    </form>
  );
}
