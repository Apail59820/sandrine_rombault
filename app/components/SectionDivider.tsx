import { cn } from "@/app/lib/utils";

interface SectionDividerProps {
  variant?: "wave" | "steps" | "line";
  className?: string;
  flip?: boolean;
}

export function SectionDivider({
  variant = "wave",
  className,
  flip = false,
}: SectionDividerProps) {
  const dividerMap = {
    wave: (
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,160 L0,160 Z"
        />
      </svg>
    ),
    steps: (
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0 120 L180 80 L360 120 L540 80 L720 120 L900 80 L1080 120 L1260 80 L1440 120 L1440 160 L0 160 Z"
        />
      </svg>
    ),
    line: (
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <line
          x1="0"
          y1="60"
          x2="1440"
          y2="60"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="240" cy="60" r="6" fill="currentColor" />
        <circle cx="720" cy="60" r="6" fill="currentColor" />
        <circle cx="1200" cy="60" r="6" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <div
      className={cn(
        "section-divider divider-draw",
        flip && "rotate-180",
        className,
      )}
      aria-hidden="true"
    >
      {dividerMap[variant]}
    </div>
  );
}
