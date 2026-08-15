import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Reusable heading block. `eyebrow` should only be used where it encodes
 * real information (a section label, a registry term) — not as decoration.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-steel-grey-light text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
