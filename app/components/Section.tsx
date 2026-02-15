import { type ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface SectionProps {
  variant?: "page" | "warm" | "cool" | "charcoal";
  className?: string;
  children: ReactNode;
}

export function Section({
  variant = "page",
  className,
  children,
}: SectionProps) {
  const variantClasses = {
    page: "bg-surface-page",
    warm: "section-warm",
    cool: "section-cool",
    charcoal: "section-charcoal",
  };

  return (
    <section
      className={cn("section-padding", variantClasses[variant], className)}
    >
      {children}
    </section>
  );
}
