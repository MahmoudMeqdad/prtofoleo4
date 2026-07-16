"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { ShowcaseCollection } from "@/config/collections";

interface CollectionCardProps {
  collection: ShowcaseCollection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-lg"
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: collection.accent }}
        aria-hidden="true"
      />
      <Link href="/collections" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl">
        <PlaceholderImage
          width="100%"
          height={220}
          label={collection.name}
          className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="flex flex-col gap-2 p-5">
          <span
            className="inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{
              backgroundColor: collection.accent,
              color: collection.accentForeground,
            }}
          >
            مجموعة
          </span>
          <h3
            className="text-xl font-bold md:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {collection.name}
          </h3>
          <p className="text-sm text-muted-foreground">{collection.tagline}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:-translate-x-0.5">
            اكتشف المزيد
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
