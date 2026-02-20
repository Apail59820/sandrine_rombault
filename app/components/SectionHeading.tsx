import { cn } from "@/app/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  showUnderline?: boolean;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  showUnderline = true,
  className,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {eyebrow && <p className="section-heading-eyebrow">{eyebrow}</p>}
      <h2 className="section-heading-title">{title}</h2>
      {showUnderline && <div className="section-heading-underline" />}
    </div>
  );
}
