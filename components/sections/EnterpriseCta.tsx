import { ArrowRight, Phone, Mail, MessageCircle, FileText } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

interface EnterpriseCtaProps {
  title?: string;
  description?: string;
}

/**
 * Large enterprise CTA block — "Request Consultation / Call CEO / Email
 * Company / WhatsApp / Get Quotation" per the brief. Phone/email/WhatsApp
 * now use real `tel:`/`mailto:`/`wa.me` links — the number and both
 * addresses were provided directly in the Phase 7 brief, replacing the
 * "pending confirmation" placeholders used since Phase 6.
 */
export default function EnterpriseCta({
  title = "Let's discuss your project",
  description = "Request a consultation, ask a question, or get a quotation — every enquiry reaches the same team.",
}: EnterpriseCtaProps) {
  const phoneDigits = COMPANY.contact.mobile.replace(/[^\d]/g, "");
  return (
    <Section tone="green">
      <div className="flex flex-col items-start gap-6">
        <div>
          <h2 className="font-display text-2xl text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-md text-sm text-steel-grey-light">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" variant="premium">
            Request Consultation
            <ArrowRight size={16} className="transition-transform duration-fast group-hover:translate-x-1" />
          </Button>
          <Button href={`tel:${COMPANY.contact.mobile.replace(/\s/g, "")}`} variant="secondary" size="sm">
            <Phone size={15} aria-hidden="true" /> Call
          </Button>
          <Button href={`mailto:${COMPANY.contact.primaryEmail}`} variant="secondary" size="sm">
            <Mail size={15} aria-hidden="true" /> Email
          </Button>
          <Button href={`https://wa.me/${phoneDigits}`} variant="secondary" size="sm" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={15} aria-hidden="true" /> WhatsApp
          </Button>
          <Button href="/quotation" variant="secondary" size="sm">
            <FileText size={15} aria-hidden="true" /> Get Quotation
          </Button>
        </div>
      </div>
    </Section>
  );
}
