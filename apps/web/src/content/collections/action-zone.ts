import type { CollectionContent } from "./types";

export const actionZone: CollectionContent = {
  id: "action-zone",
  slug: "action-zone",
  name: { en: "Action Zone", ar: "منطقة الحركة" },
  shortDescription: {
    en: "High-energy play for racing, launching, and bold indoor adventures.",
    ar: "لعب عالي الطاقة للسباق والإطلاق والمغامرات الجريئة في الداخل.",
  },
  introduction: {
    en: "Action Zone is built for motion. Fast cycles of try, cheer, and retry keep play lively while staying age-appropriate and clear.",
    ar: "منطقة الحركة مبنية على الحركة. دورات سريعة من المحاولة والتشجيع وإعادة المحاولة تبقي اللعب حيوياً مع وضوح مناسب للعمر.",
  },
  hero: {
    desktop: "/media/home/collections/action-zone-desktop.svg",
    type: "image",
    focalPoint: "center 45%",
    overlayStrength: 0.55,
    textColor: "light",
  },
  theme: {
    background: "#1c1c1c",
    foreground: "#ffffff",
    accent: "#e30613",
  },
  sections: [
    {
      id: "speed",
      layout: "full-media",
      title: { en: "Feel the Pace", ar: "اشعر بالإيقاع" },
      description: {
        en: "Quick feedback loops help children stay engaged — launch, watch, adjust, go again.",
        ar: "حلقات تغذية راجعة سريعة تساعد الأطفال على البقاء منخرطين — أطلق، راقب، عدّل، ثم أعد.",
      },
      media: {
        desktop: "/media/home/collections/action-zone-desktop.svg",
        type: "image",
        alt: {
          en: "Action Zone high-energy visual",
          ar: "صورة عالية الطاقة لمنطقة الحركة",
        },
      },
    },
    {
      id: "challenge",
      layout: "media-left",
      title: { en: "Friendly Challenges", ar: "تحديات ودية" },
      description: {
        en: "Challenges feel exciting, not punishing. Progress is visible and celebration is shared.",
        ar: "التحديات مثيرة لا قاسية. التقدّم واضح والاحتفال مشترك.",
      },
      media: {
        desktop: "/media/home/collections/action-zone-desktop.svg",
        type: "image",
        alt: {
          en: "Action challenge play",
          ar: "لعب تحدٍّ في منطقة الحركة",
        },
      },
    },
    {
      id: "replay",
      layout: "centered",
      title: { en: "Built to Replay", ar: "مصمم لإعادة اللعب" },
      description: {
        en: "Short sessions stack easily — perfect for after-school energy and weekend marathons.",
        ar: "جلسات قصيرة تتراكم بسهولة — مثالية لطاقة ما بعد المدرسة وماراثونات نهاية الأسبوع.",
      },
      media: {
        desktop: "/media/home/collections/action-zone-desktop.svg",
        type: "image",
        alt: {
          en: "Replayable action play",
          ar: "لعب حركة قابل للتكرار",
        },
      },
    },
  ],
  relatedCollectionSlugs: ["outdoor-fun", "tiny-worlds", "creative-studio"],
  metaDescription: {
    en: "Enter Action Zone — energetic Velvet Kids toys for fast, playful challenges.",
    ar: "ادخل منطقة الحركة — ألعاب Velvet Kids النشطة للتحديات السريعة والممتعة.",
  },
};
