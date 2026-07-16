import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: string;
  as?: ElementType;
  id?: string;
}

export function Section({
  children,
  className,
  background,
  as: Tag = "section",
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={clsx("py-12 md:py-16 lg:py-20", className)}
      style={background ? { backgroundColor: background } : undefined}
    >
      {children}
    </Tag>
  );
}
