"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function HeroSection() {
  return (
    <section className="relative -mt-[var(--header-height)] overflow-hidden bg-hero-gradient pb-16 pt-[calc(var(--header-height)+2rem)] md:pb-24 md:pt-[calc(var(--header-height)+3rem)]">
      <div className="pointer-events-none absolute inset-0 hero-pattern opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -start-24 top-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-16 bottom-0 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6 text-primary-foreground"
          >
            <span className="inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              منصة ألعاب أصلية — Velvet Kids
            </span>

            <h1
              className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              عالم من المرح
              <br />
              <span className="text-secondary">يبدأ من هنا</span>
            </h1>

            <p className="max-w-xl text-lg text-white/85 md:text-xl">
              مجموعات أصلية بلمسة بصرية جريئة، تصاميم كبيرة، ومساحات واسعة —
              تجربة تسوق ممتعة للعائلات.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                size="lg"
                href="#collections"
                className="gap-2 shadow-lg"
              >
                استكشف علاماتنا
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/collections"
                className="border-white/40 bg-white/5 text-white hover:bg-white/15"
              >
                كل العلامات
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/20">
              <PlaceholderImage
                width="100%"
                height={420}
                label="Hero — Velvet Kids"
                className="w-full min-h-[280px] md:min-h-[420px] bg-white/10"
              />
            </div>
            <div
              className="absolute -bottom-4 -start-4 hidden rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground shadow-lg md:block"
              aria-hidden="true"
            >
              جديد
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
