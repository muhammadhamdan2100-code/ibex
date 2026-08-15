import { ICON_MAP, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface PlaceholderMediaProps {
  iconName: IconName;
  label: string;
  className?: string;
}

/**
 * Standard "no real photography yet" visual — a premium gradient block
 * with the category icon, not a fabricated stock photo pretending to be
 * IBEX's own vehicle. Same honest pattern already used in
 * `GalleryExplorer`; centralized here so all ~100 catalog pages share one
 * definition instead of each re-implementing it.
 *
 * Takes a string icon key (lib/icons.ts) and resolves it internally,
 * rather than an already-resolved component prop — see CategoryGrid.tsx
 * for why that distinction matters even for a component like this one
 * that isn't itself a Client Component: keeping the data layer free of
 * component references everywhere is what makes the whole app safe from
 * this class of error regardless of future refactors.
 */
export default function PlaceholderMedia({ iconName, label, className }: PlaceholderMediaProps) {
  const Icon = ICON_MAP[iconName] ?? ICON_MAP.default;
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-white/10 bg-gradient-to-br from-graphite via-matte-black to-graphite p-8 text-center",
        className
      )}
    >
      <Icon size={40} strokeWidth={1.5} className="text-gold-500" aria-hidden="true" />
      <span className="font-mono text-xs uppercase tracking-widest text-steel-grey-light">
        {label} — imagery pending
      </span>
    </div>
  );
}
