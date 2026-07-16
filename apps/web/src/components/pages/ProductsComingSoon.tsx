"use client";

import { Reveal } from "./Reveal";

interface ProductsComingSoonProps {
  heading: string;
  body: string;
}

export function ProductsComingSoon({ heading, body }: ProductsComingSoonProps) {
  return (
    <section className="px-6 py-20 sm:px-10 md:px-16">
      <Reveal className="mx-auto max-w-3xl border border-border bg-surface px-8 py-14 text-center md:px-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          IPLAY
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
          {heading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {body}
        </p>
      </Reveal>
    </section>
  );
}
