import type { ReactNode } from "react";
import clsx from "clsx";

type Level = "h1" | "h2" | "h3" | "h4";
type Align = "start" | "center" | "end";

interface HeadingProps {
  level?: Level;
  align?: Align;
  children: ReactNode;
  className?: string;
}

const levelStyles: Record<Level, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
  h2: "text-3xl md:text-4xl lg:text-5xl font-bold",
  h3: "text-2xl md:text-3xl font-semibold",
  h4: "text-xl md:text-2xl font-semibold",
};

const alignStyles: Record<Align, string> = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
};

export function Heading({
  level: Tag = "h2",
  align = "start",
  children,
  className,
}: HeadingProps) {
  return (
    <Tag
      className={clsx(levelStyles[Tag], alignStyles[align], className)}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </Tag>
  );
}
