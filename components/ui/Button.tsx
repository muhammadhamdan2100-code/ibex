"use client";

import { forwardRef, Ref } from "react";
import Link from "next/link";
import { cn, prefersReducedMotion } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "premium";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;
type ButtonEl = HTMLButtonElement | HTMLAnchorElement;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-gold text-matte-black shadow-gold hover:brightness-110 active:brightness-95",
  secondary:
    "bg-graphite text-white border border-white/10 hover:border-gold-500/60 hover:bg-graphite/80",
  ghost: "bg-transparent text-white hover:text-gold-500",
  outline:
    "bg-transparent text-white border border-white/20 hover:border-gold-500 hover:text-gold-500",
  premium:
    "btn-gradient-border group bg-graphite/70 backdrop-blur-glass text-white hover:text-gold-300",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

/**
 * Enterprise CTA button. Renders as <Link> when `href` is provided,
 * otherwise as a native <button>.
 *
 * Micro-interaction: subtle hover and active states for premium feel.
 */
const Button = forwardRef<ButtonEl, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, forwardedRef) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-md font-body font-medium tracking-wide transition-all duration-fast ease-standard focus-visible:outline-2",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if ("href" in props && props.href) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={forwardedRef as Ref<HTMLAnchorElement>}
          className={classes}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={forwardedRef as Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonAsButton)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
