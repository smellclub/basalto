import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & { variant?: "solid" | "outline" };

export function ButtonLink({ variant = "solid", className = "", children, ...props }: Props) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-3 px-7 text-xs font-medium uppercase tracking-[0.25em] transition-colors";
  const styles =
    variant === "solid"
      ? "bg-accent text-ink hover:bg-accent-hover"
      : "border border-paper/25 text-paper hover:border-accent hover:text-accent";
  return (
    <a className={`${base} ${styles} ${className}`} {...props}>
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
