import clsx from "clsx";

interface PlaceholderImageProps {
  width?: number | string;
  height?: number | string;
  label?: string;
  className?: string;
}

export function PlaceholderImage({
  width = 400,
  height = 300,
  label = "Velvet Kids",
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-lg bg-surface-strong text-muted-foreground",
        className,
      )}
      style={{ width, height }}
    >
      <div className="flex flex-col items-center gap-2">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="text-muted-foreground"
        >
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M16 20L24 14L32 20V30C32 31.1046 31.1046 32 30 32H18C16.8954 32 16 31.1046 16 30V20Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="text-xs font-medium">{label}</span>
      </div>
    </div>
  );
}
