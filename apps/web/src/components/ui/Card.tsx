import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-border bg-surface p-4 shadow-sm",
        hover && "transition-shadow hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
