"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useDictionary } from "@/providers/LocaleProvider";

interface ComingSoonControlProps {
  label: string;
  className?: string;
  children: ReactNode;
}

/** Accessible control that opens a coming-soon dialog instead of navigating. */
export function ComingSoonControl({
  label,
  className,
  children,
}: ComingSoonControlProps) {
  const dictionary = useDictionary();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={label}
        className={className}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="fixed inset-0 m-auto max-w-sm rounded-xl border border-border bg-white p-6 text-foreground shadow-xl backdrop:bg-black/40"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <h2 id={titleId} className="text-lg font-bold">
          {dictionary.comingSoon.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {dictionary.comingSoon.description}
        </p>
        <button
          type="button"
          className="mt-5 inline-flex min-h-10 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setOpen(false)}
        >
          {dictionary.comingSoon.close}
        </button>
      </dialog>
    </>
  );
}
