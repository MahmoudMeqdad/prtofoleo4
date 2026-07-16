export interface ShowcaseCollection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  accent: string;
  accentForeground: string;
}

/** Temporary Day 2 showcase data — not wired to the API yet. */
export const SHOWCASE_COLLECTIONS: ShowcaseCollection[] = [
  {
    id: "1",
    slug: "educational-play",
    name: "اللعب التعليمي",
    tagline: "اكتشف، تعلّم، واستمتع",
    accent: "var(--color-primary)",
    accentForeground: "var(--color-primary-foreground)",
  },
  {
    id: "2",
    slug: "character-world",
    name: "عالم الشخصيات",
    tagline: "شخصيات محبوبة لكل طفل",
    accent: "var(--color-accent)",
    accentForeground: "var(--color-accent-foreground)",
  },
  {
    id: "3",
    slug: "outdoor-adventure",
    name: "مغامرات خارجية",
    tagline: "نشاط، حركة، ومرح في الهواء الطلق",
    accent: "var(--color-secondary)",
    accentForeground: "var(--color-secondary-foreground)",
  },
  {
    id: "4",
    slug: "creative-build",
    name: "البناء والإبداع",
    tagline: "أطلق العنان للخيال",
    accent: "#38bdf8",
    accentForeground: "#0c4a6e",
  },
];
