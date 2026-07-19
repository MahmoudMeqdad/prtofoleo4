export function CartSkeleton() {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]" aria-hidden>
      <div className="space-y-4">
        {[0, 1].map((index) => (
          <div
            key={index}
            className="grid animate-pulse grid-cols-[88px_1fr] gap-4 rounded-xl border border-border bg-white p-4 md:grid-cols-[112px_1fr] md:gap-5 md:p-5"
          >
            <div className="aspect-square rounded-lg bg-surface-strong" />
            <div className="space-y-3 py-1">
              <div className="h-5 w-2/3 rounded bg-surface-strong" />
              <div className="h-4 w-1/3 rounded bg-surface-strong" />
              <div className="h-4 w-1/4 rounded bg-surface-strong" />
              <div className="mt-4 h-11 w-36 rounded-full bg-surface-strong" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-xl border border-border bg-surface" />
    </div>
  );
}
