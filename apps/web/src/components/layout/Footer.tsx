import Link from "next/link";
import { Container } from "../ui/Container";

const MAIN_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "علاماتنا" },
  { href: "/products", label: "المنتجات" },
];

const SERVICE_LINKS = [
  { href: "/dropshipping", label: "دروب شيبينج" },
  { href: "/wholesale", label: "الجملة" },
  { href: "/about", label: "حول" },
  { href: "/contact", label: "اتصل بنا" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "سياسة الخصوصية" },
  { href: "/terms", label: "شروط الاستخدام" },
  { href: "/returns", label: "سياسة الإرجاع" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-2xl font-bold text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              IPLAY
            </Link>
            <p className="text-sm text-muted-foreground">
              منصة متكاملة لألعاب ومنتجات الأطفال. نقدم أفضل المنتجات بأسعار
              تنافسية مع خدمات دروب شيبينج والجملة.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">روابط رئيسية</h4>
            <div className="flex flex-col gap-2">
              {MAIN_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">خدمات</h4>
            <div className="flex flex-col gap-2">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold">قانوني</h4>
            <div className="flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">
                واتساب: +966500000000
              </p>
              <p className="text-xs text-muted-foreground">
                بريد: info@iplay.com
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} IPLAY. جميع الحقوق محفوظة.
        </div>
      </Container>
    </footer>
  );
}
