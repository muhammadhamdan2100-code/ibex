import { cn } from "@/lib/utils";
import Container from "./Container";

type SectionTone = "black" | "graphite" | "green" | "hero" | "transparent";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: SectionTone;
  containerClassName?: string;
  /** Set false when a section owns full-bleed content (e.g. a 3D canvas). */
  useContainer?: boolean;
}

/**
 * Standard vertical-rhythm wrapper every page section should use.
 * Non-transparent tones get the layered background system (gradient glow
 * + noise texture) defined in globals.css via `data-tone` + `.bg-noise` —
 * see the `[data-tone="..."]` rules there for the actual layer recipe.
 */
export default function Section({
  children,
  className,
  id,
  tone = "transparent",
  containerClassName,
  useContainer = true,
}: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        "relative w-full py-section-mobile lg:py-section-desktop",
        tone !== "transparent" && "bg-noise",
        id && "scroll-mt-24",
        className
      )}
    >
      {useContainer ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
