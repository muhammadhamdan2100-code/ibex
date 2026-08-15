"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input, { Textarea, Select, FileInput } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import {
  PROJECT_TYPES, VEHICLE_CATEGORIES, BUDGET_RANGES, TIMELINES, CONTACT_METHODS, INQUIRY_TYPES,
} from "@/lib/data/contact-options";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldLabel = "eyebrow mb-2 block";

/**
 * Full enterprise inquiry form, posting to /api/contact (see that route
 * for what's real vs. still needing a real email provider/API key).
 * Includes a honeypot field ("website") for spam protection — hidden
 * from sighted users via CSS and from screen readers via aria-hidden,
 * present in the DOM for bots that fill every field they can find.
 */
export default function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const projectType = String(form.get("projectType") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !phone || !company || !projectType || !message) {
      setState("error");
      setErrorMessage("Please fill in your name, email, phone, organization, project type, and message.");
      return;
    }
    if (!emailValid) {
      setState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: form });
      const result = await res.json();
      if (result.ok) {
        setState("success");
        formEl.reset();
      } else {
        setState("error");
        setErrorMessage(result.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setErrorMessage("Could not reach the server. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — real users never see this field. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={fieldLabel}>Name</label>
          <Input id="name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="company" className={fieldLabel}>Organization</label>
          <Input id="company" name="company" type="text" required />
        </div>
        <div>
          <label htmlFor="email" className={fieldLabel}>Email</label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="phone" className={fieldLabel}>Phone</label>
          <Input id="phone" name="phone" type="tel" required />
        </div>
        <div>
          <label htmlFor="country" className={fieldLabel}>Country</label>
          <Input id="country" name="country" type="text" />
        </div>
        <div>
          <label htmlFor="city" className={fieldLabel}>City</label>
          <Input id="city" name="city" type="text" />
        </div>
        <div>
          <label htmlFor="projectType" className={fieldLabel}>Project Type</label>
          <Select id="projectType" name="projectType" defaultValue="" required>
            <option value="" disabled>Select project type</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div>
          <label htmlFor="vehicleCategory" className={fieldLabel}>Vehicle Category</label>
          <Select id="vehicleCategory" name="vehicleCategory" defaultValue="">
            <option value="" disabled>Select vehicle category</option>
            {VEHICLE_CATEGORIES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div>
          <label htmlFor="budget" className={fieldLabel}>Budget</label>
          <Select id="budget" name="budget" defaultValue="">
            <option value="" disabled>Select budget range</option>
            {BUDGET_RANGES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div>
          <label htmlFor="timeline" className={fieldLabel}>Timeline</label>
          <Select id="timeline" name="timeline" defaultValue="">
            <option value="" disabled>Select timeline</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div>
          <label htmlFor="preferredContact" className={fieldLabel}>Preferred Contact Method</label>
          <Select id="preferredContact" name="preferredContact" defaultValue="">
            <option value="" disabled>Select method</option>
            {CONTACT_METHODS.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div>
          <label htmlFor="inquiryType" className={fieldLabel}>Inquiry Type</label>
          <Select id="inquiryType" name="inquiryType" defaultValue="">
            <option value="" disabled>Select inquiry type</option>
            {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={fieldLabel}>Message</label>
        <Textarea id="message" name="message" rows={5} required />
      </div>

      <div>
        <label htmlFor="attachment" className={fieldLabel}>
          File Upload <span className="normal-case text-steel-grey-light">(optional — drawings, specs, reference images)</span>
        </label>
        <FileInput id="attachment" name="attachment" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
      </div>

      <Button type="submit" disabled={state === "submitting"} className={cn(state === "submitting" && "opacity-70")}>
        {state === "submitting" && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {state === "submitting" ? "Sending…" : "Send Inquiry"}
      </Button>

      <p role="status" aria-live="polite" className="text-sm">
        {state === "success" && <span className="text-success">Thank you — your inquiry has been recorded.</span>}
        {state === "error" && <span className="text-danger">{errorMessage}</span>}
      </p>
    </form>
  );
}
