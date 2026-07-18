import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ConnectionStatus } from "@/components/ui/StatusBadge";

export default function DesignSystemPage() {
  return (
    <>
      <Section background="var(--color-surface)">
        <Container>
          <div className="mb-8 rounded-lg border border-warning/30 bg-warning/5 p-4 text-sm text-warning">
            <strong>مراجعة داخلية:</strong> نظام التصميم — الصفحة الرئيسية العامة موجودة على{" "}
            <code className="mx-1">/</code>. هذه الصفحة غير مفهرسة.
          </div>

          <Heading level="h1" align="center" className="mb-2">
            Velvet Kids
          </Heading>
          <p className="mb-8 text-center text-muted-foreground">منصة ألعاب ومنتجات الأطفال</p>

          <ConnectionStatus />
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level="h2" className="mb-6">
            ألوان التصميم
          </Heading>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              { name: "Primary", color: "var(--color-primary)" },
              { name: "Secondary", color: "var(--color-secondary)" },
              { name: "Accent", color: "var(--color-accent)" },
              { name: "Background", color: "var(--color-background)" },
              { name: "Surface", color: "var(--color-surface)" },
              { name: "Surface Strong", color: "var(--color-surface-strong)" },
              { name: "Success", color: "var(--color-success)" },
              { name: "Warning", color: "var(--color-warning)" },
              { name: "Danger", color: "var(--color-danger)" },
              { name: "Muted", color: "var(--color-muted-foreground)" },
            ].map((swatch) => (
              <div key={swatch.name} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-full rounded-lg border border-border"
                  style={{ backgroundColor: swatch.color }}
                />
                <span className="text-xs text-muted-foreground">{swatch.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="var(--color-surface)">
        <Container>
          <Heading level="h2" className="mb-6">
            الأزرار
          </Heading>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level="h2" className="mb-6">
            الشارات (Badges)
          </Heading>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
        </Container>
      </Section>

      <Section background="var(--color-surface)">
        <Container>
          <Heading level="h2" className="mb-6">
            حقول الإدخال
          </Heading>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="الاسم" placeholder="أدخل اسمك" />
            <Input label="مع خطأ" error="هذا الحقل مطلوب" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level="h2" className="mb-6">
            البطاقة (Card)
          </Heading>
          <Card>
            <PlaceholderImage
              width="100%"
              height={160}
              label="صورة المنتج"
              className="mb-3 w-full"
            />
            <h3 className="text-lg font-semibold">اسم المنتج</h3>
          </Card>
        </Container>
      </Section>
    </>
  );
}
