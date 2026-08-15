"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input, { Textarea, Select, FileInput } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { VEHICLE_CATEGORIES, TIMELINES, BUDGET_RANGES } from "@/lib/data/contact-options";

type SubmitState = "idle" | "submitting" | "success" | "error";
const fieldLabel = "eyebrow mb-2 block";

export default function QuotationForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const vehicleType = String(form.get("vehicleType") ?? "").trim();

    if (!name || !email || !vehicleType) {
      setState("error");
      setErrorMessage("Please fill in your name, email, and vehicle type.");
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/quotation", { method: "POST", body: form });
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
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="q-website">Website</label>
        <input id="q-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className={fieldLabel}>Name</label>
          <Input id="q-name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="q-email" className={fieldLabel}>Email</label>
          <Input id="q-email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="vehicleType" className={fieldLabel}>Vehicle Type</label>
          <Select id="vehicleType" name="vehicleType" required defaultValue="">
            <option value="" disabled>Select vehicle type</option>
            {VEHICLE_CATEGORIES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div>
          <label htmlFor="estimatedBudget" className={fieldLabel}>Estimated Budget</label>
          <Select id="estimatedBudget" name="estimatedBudget" defaultValue="">
            <option value="" disabled>Select budget range</option>
            {BUDGET_RANGES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="customization" className={fieldLabel}>Customization Requirements</label>
          <Textarea id="customization" name="customization" rows={3} />
        </div>
        <div>
          <label htmlFor="expectedDelivery" className={fieldLabel}>Expected Delivery</label>
          <Select id="expectedDelivery" name="expectedDelivery" defaultValue="">
            <option value="" disabled>Select timeline</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>
        <div>
          <label htmlFor="attachment" className={fieldLabel}>
            File Attachment <span className="normal-case text-steel-grey-light">(optional)</span>
          </label>
          <FileInput id="attachment" name="attachment" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
        </div>
      </div>

      <div>
        <label htmlFor="projectNotes" className={fieldLabel}>Project Notes</label>
        <Textarea id="projectNotes" name="projectNotes" rows={4} />
      </div>

      <Button type="submit" disabled={state === "submitting"} className={cn(state === "submitting" && "opacity-70")}>
        {state === "submitting" && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {state === "submitting" ? "Sending…" : "Request Quotation"}
      </Button>

      <p role="status" aria-live="polite" className="text-sm">
        {state === "success" && <span className="text-success">Thank you — your quotation request has been recorded.</span>}
        {state === "error" && <span className="text-danger">{errorMessage}</span>}
      </p>
    </form>
  );
}
