import { type ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface SectionProps {
  id?: string;
  variant?: "page" | "warm" | "cool" | "charcoal";
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
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
      id={id}
      className={cn("section-padding", variantClasses[variant], className)}
    >
      {children}
    </section>
  );
}
