import { NextResponse } from "next/server";

/**
 * Quotation request endpoint — same real-validation-now,
 * real-delivery-later pattern as /api/contact. See that route's comments
 * for the full reasoning; not repeated here.
 */

const MAX_FIELD_LENGTH = 2000;

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

  const honeypot = sanitize(form.get("website"));
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: sanitize(form.get("name")),
    email: sanitize(form.get("email")),
    vehicleType: sanitize(form.get("vehicleType")),
    customization: sanitize(form.get("customization")),
    estimatedBudget: sanitize(form.get("estimatedBudget")),
    expectedDelivery: sanitize(form.get("expectedDelivery")),
    projectNotes: sanitize(form.get("projectNotes")),
  };

  if (!data.name || !data.email || !data.vehicleType) {
    return NextResponse.json({ ok: false, error: "Please fill in your name, email, and vehicle type." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  // TODO (needs a real API key — none exists in this project): deliver
  // via email provider or CRM webhook.
  // eslint-disable-next-line no-console
  console.info("[api/quotation] request received:", data);

  return NextResponse.json({ ok: true });
}
