import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-24">
      <Heading level="h1" align="center" className="mb-4">
        404
      </Heading>
      <p className="mb-8 text-muted-foreground">The page you are looking for does not exist.</p>
      <Button href="/en">Back to Home</Button>
    </Container>
  );
}
