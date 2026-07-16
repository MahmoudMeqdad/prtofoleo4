"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDictionary } from "@/providers/LocaleProvider";

export function EditorialIntro() {
  const reducedMotion = useReducedMotion();
  const dictionary = useDictionary();

  const headingMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.6 },
      };

  const bodyMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.6, delay: 0.15 },
      };

  return (
    <section className="bg-background py-20 md:py-28 lg:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <motion.div {...headingMotion}>
            <h2
              className="text-start text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {dictionary.editorial.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </motion.div>

          <motion.div
            className="flex max-w-prose flex-col gap-5 text-start text-base leading-relaxed text-muted-foreground md:text-lg lg:justify-center"
            {...bodyMotion}
          >
            {dictionary.editorial.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
