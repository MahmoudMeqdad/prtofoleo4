"use client";

import { Reveal } from "./Reveal";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqList({ heading, items }: { heading: string; items: FaqItem[] }) {
  return (
    <section className="px-6 py-20 sm:px-10 md:px-16">
      <Reveal className="mx-auto max-w-3xl">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
          {heading}
        </h2>
        <div className="mt-10 space-y-6">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-border pb-5">
              <summary className="cursor-pointer list-none text-lg font-semibold marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span
                    className="text-muted-foreground transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
