import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

/** Base glassmorphic card used for service tiles, stat blocks, certification tiles, etc. */
export default function Card({ children, className, interactive = false, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-lg p-6 lg:p-8",
        interactive &&
          "transition-all duration-fast ease-standard hover:border-gold-500/40 hover:-translate-y-1",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
