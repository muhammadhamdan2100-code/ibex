import { cn } from "@/lib/utils";

type ContainerTag = "div" | "section" | "article" | "main" | "span" | "header" | "footer" | "nav";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: ContainerTag;
}

/** Enforces the site-wide max-width (1440px) and responsive horizontal gutters. */
export default function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-container px-5 lg:px-12",
        className
      )}
    >
      {children}
    </Tag>
  );
}
