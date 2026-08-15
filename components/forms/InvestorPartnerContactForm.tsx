"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Send, CheckCircle, Loader2 } from "lucide-react";

interface ContactFormState {
  name: string;
  organization: string;
  email: string;
  phone: string;
  interestType: string;
  message: string;
}

export function InvestorPartnerContactForm() {
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    organization: "",
    email: "",
    phone: "",
    interestType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const interestTypes = [
    { value: "investor", label: "Investor" },
    { value: "strategic-partner", label: "Strategic Partner" },
    { value: "technology-partner", label: "Technology Partner" },
    { value: "manufacturing-partner", label: "Manufacturing Partner" },
    { value: "distribution-partner", label: "Distribution Partner" },
    { value: "institutional-partner", label: "Institutional Partner" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({
      name: "",
      organization: "",
      email: "",
      phone: "",
      interestType: "",
      message: "",
    });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSuccess) {
    return (
      <Card className="flex flex-col items-center justify-center p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-success mb-6">
          <CheckCircle size={32} />
        </div>
        <h3 className="font-display text-2xl text-white mb-2">Thank You!</h3>
        <p className="text-steel-grey-light max-w-md">
          We have received your inquiry. Our team will review your submission and contact you shortly.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-6"
        >
          Submit Another Inquiry
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl text-white">Get In Touch</h2>
        <p className="mt-2 text-steel-grey-light">
          Discuss investment opportunities or explore partnership possibilities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="eyebrow mb-2 block">
              Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
          <div>
            <label htmlFor="organization" className="eyebrow mb-2 block">
              Organization *
            </label>
            <Input
              id="organization"
              name="organization"
              type="text"
              value={formState.organization}
              onChange={handleChange}
              placeholder="Organization name"
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="eyebrow mb-2 block">
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
          <div>
            <label htmlFor="phone" className="eyebrow mb-2 block">
              Phone *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formState.phone}
              onChange={handleChange}
              placeholder="+92 XXX XXXXXXX"
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </div>

        <div>
          <label htmlFor="interestType" className="eyebrow mb-2 block">
            Interest Type *
          </label>
          <select
            id="interestType"
            name="interestType"
            value={formState.interestType}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
          >
            <option value="">Select your interest type</option>
            {interestTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="eyebrow mb-2 block">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            placeholder="Tell us about your investment or partnership proposal..."
            rows={5}
            required
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors resize-none"
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Inquiry
            </>
          )}
        </Button>

        <p className="text-xs text-steel-grey-light/60 text-center">
          Your information is secure. We will not share it with any third parties.
        </p>
      </form>
    </Card>
  );
}
