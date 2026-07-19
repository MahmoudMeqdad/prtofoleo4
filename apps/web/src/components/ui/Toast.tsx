"use client";

import { useEffect } from "react";

export function Toast({
  message,
  visible,
  onDismiss,
}: {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(onDismiss, 2400);
    return () => window.clearTimeout(timer);
  }, [visible, onDismiss]);

  if (!visible || !message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[220] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-full bg-foreground px-5 py-3 text-center text-sm font-semibold text-white shadow-lg transition-opacity duration-200"
    >
      {message}
    </div>
  );
}
