import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  type: "phone" | "email" | "tiktok";
  value: string;
  label?: string;
  className?: string;
}

/**
 * Reusable social/contact link component supporting phone, email, and TikTok.
 * Uses consistent icon styling across the website.
 */
export default function SocialLinks({ type, value, label, className }: SocialLinkProps) {
  const renderContent = () => {
    switch (type) {
      case "phone":
        return (
          <>
            <Phone size={16} className="mr-2" aria-hidden="true" />
            <span className="font-mono">{value}</span>
          </>
        );
      case "email":
        return (
          <>
            <Mail size={16} className="mr-2" aria-hidden="true" />
            <span>{value}</span>
          </>
        );
      case "tiktok":
        return (
          <>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2 h-4 w-4"
              aria-hidden="true"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.33-1.68 1.41-3.78 1.95-5.82 1.52-2.01-.43-3.84-1.63-5.04-3.3-1.4-1.89-1.43-4.3-.12-6.27 1.3-1.98 3.77-2.6 5.71-1.66.28.12.58.22.88.3v-5.3c0-.53-.04-1.06-.05-1.59 1.63-.12 3.25-.18 4.87-.07.06 1.64-.01 3.28.02 4.92z" />
            </svg>
            <span>{value}</span>
          </>
        );
      default:
        return null;
    }
  };

  if (type === "phone") {
    return (
      <a
        href={`tel:${value.replace(/\s/g, "")}`}
        className={cn(
          "flex items-center text-sm text-steel-grey-light transition-colors hover:text-gold-500",
          className
        )}
      >
        {renderContent()}
      </a>
    );
  }

  if (type === "email") {
    return (
      <a
        href={`mailto:${value}`}
        className={cn(
          "flex items-center text-sm text-steel-grey-light transition-colors hover:text-gold-500",
          className
        )}
      >
        {renderContent()}
      </a>
    );
  }

  if (type === "tiktok") {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center text-sm text-steel-grey-light transition-colors hover:text-gold-500",
          className
        )}
      >
        {renderContent()}
      </a>
    );
  }

  return null;
}
