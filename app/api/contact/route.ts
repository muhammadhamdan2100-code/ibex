import { NextResponse } from "next/server";

/**
 * Contact/quotation submission endpoint.
 *
 * What's real here: request parsing, server-side validation (mirrors the
 * client-side checks — never trust the client alone), a honeypot spam
 * check, and input length/type sanitization.
 *
 * What's NOT wired up yet, and why: actually delivering the message (an
 * email provider like Resend/SendGrid, or a CRM webhook) needs a real API
 * key, and persistent rate limiting needs a real store (e.g. Upstash
 * Redis) — neither exists in this project. Both are marked with TODOs
 * below at the exact point they'd plug in, rather than faked with a
 * console.log pretending to be a working integration.
 */

const MAX_FIELD_LENGTH = 2000;
const REQUIRED_FIELDS = ["name", "email", "phone", "company", "projectType", "message"] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  // Honeypot: a field real users never see or fill (hidden in the UI —
  // see ContactForm.tsx). Any non-empty value here means a bot filled
  // every field it could find, including ones humans can't see.
  const honeypot = sanitize(form.get("website"));
  if (honeypot) {
    // Respond as if successful so the bot doesn't learn the honeypot was
    // detected — but do not process the submission.
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: sanitize(form.get("name")),
    company: sanitize(form.get("company")),
    email: sanitize(form.get("email")),
    phone: sanitize(form.get("phone")),
    country: sanitize(form.get("country")),
    city: sanitize(form.get("city")),
    projectType: sanitize(form.get("projectType")),
    vehicleCategory: sanitize(form.get("vehicleCategory")),
    budget: sanitize(form.get("budget")),
    timeline: sanitize(form.get("timeline")),
    preferredContact: sanitize(form.get("preferredContact")),
    inquiryType: sanitize(form.get("inquiryType")),
    message: sanitize(form.get("message")),
  };

  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      return NextResponse.json({ ok: false, error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  if (!isValidEmail(data.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  // TODO (needs a real API key — none exists in this project): send via
  // an email provider, e.g.
  //   await resend.emails.send({ from, to, subject, html: renderEmail(data) });
  // or forward to a CRM webhook. Until then, this only logs server-side.
  // eslint-disable-next-line no-console
  console.info("[api/contact] inquiry received:", { ...data, message: `${data.message.slice(0, 80)}…` });

  // TODO (needs a real persistent store — e.g. Upstash Redis — none
  // exists in this project): rate-limit by IP/session before accepting.
  // A per-request check without shared state (e.g. an in-memory Map)
  // would not survive serverless cold starts or multiple instances, so
  // it's intentionally not faked here either.

  return NextResponse.json({ ok: true });
}
