import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { BRAND_LOGO_SRC, BRAND_NAME } from "@/config/brand";

interface BrandLogoProps {
  href: string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

export function BrandLogo({ href, className, priority = false, onClick }: BrandLogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        "brand-logo shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
      aria-label={BRAND_NAME}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt={BRAND_NAME}
        width={160}
        height={72}
        priority={priority}
        className="brand-logo__image"
      />
    </Link>
  );
}
