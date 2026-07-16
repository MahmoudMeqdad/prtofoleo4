import type { CollectionContent } from "./types";

export const outdoorFun: CollectionContent = {
  id: "outdoor-fun",
  slug: "outdoor-fun",
  name: { en: "Outdoor Fun", ar: "مرح في الهواء الطلق" },
  shortDescription: {
    en: "Active play designed for fresh air, movement, and shared laughter outside.",
    ar: "لعب نشط مصمم للهواء الطلق والحركة والضحك المشترك في الخارج.",
  },
  introduction: {
    en: "Outdoor Fun brings energy outdoors. These pieces encourage running, aiming, balancing, and cooperating under open sky.",
    ar: "مرح في الهواء الطلق ينقل الطاقة إلى الخارج. تشجّع هذه القطع على الجري والتصويب والتوازن والتعاون تحت السماء المفتوحة.",
  },
  hero: {
    desktop: "/media/home/collections/outdoor-fun-desktop.svg",
    poster: "/media/home/collections/outdoor-fun-poster.svg",
    type: "image",
    focalPoint: "center 35%",
    overlayStrength: 0.5,
    textColor: "light",
  },
  theme: {
    background: "#0f3d2e",
    foreground: "#ffffff",
    accent: "#ffcc33",
  },
  sections: [
    {
      id: "move",
      layout: "media-left",
      title: { en: "Move Freely", ar: "تحرك بحرية" },
      description: {
        en: "Outdoor play stretches bodies and attention. Simple rules leave space for invented games.",
        ar: "اللعب في الخارج يمدّد الأجسام والانتباه. قواعد بسيطة تترك مساحة لألعاب مبتكرة.",
      },
      media: {
        desktop: "/media/home/collections/outdoor-fun-desktop.svg",
        type: "image",
        alt: {
          en: "Outdoor Fun movement visual",
          ar: "صورة حركة لمرح في الهواء الطلق",
        },
      },
    },
    {
      id: "together",
      layout: "media-right",
      title: { en: "Play Together", ar: "العبوا معاً" },
      description: {
        en: "Shared outdoor moments build teamwork — taking turns, cheering, and trying again.",
        ar: "لحظات اللعب المشتركة في الخارج تبني روح الفريق — التناوب والتشجيع والمحاولة من جديد.",
      },
      media: {
        desktop: "/media/home/collections/outdoor-fun-poster.svg",
        type: "image",
        alt: {
          en: "Friends playing outdoors",
          ar: "أصدقاء يلعبون في الخارج",
        },
      },
    },
    {
      id: "daylight",
      layout: "full-media",
      title: { en: "Daylight Adventures", ar: "مغامرات في ضوء النهار" },
      description: {
        en: "Sunshine and open space turn ordinary afternoons into memorable play.",
        ar: "أشعة الشمس والمساحات المفتوحة تحوّل الظهيرات العادية إلى لعب لا يُنسى.",
      },
      media: {
        desktop: "/media/home/collections/outdoor-fun-desktop.svg",
        type: "image",
        alt: {
          en: "Daylight outdoor play scene",
          ar: "مشهد لعب خارجي في ضوء النهار",
        },
      },
    },
  ],
  relatedCollectionSlugs: ["action-zone", "creative-studio", "plush-friends"],
  metaDescription: {
    en: "Explore Outdoor Fun — active IPLAY toys for movement and outdoor play.",
    ar: "اكتشف مرح في الهواء الطلق — ألعاب IPLAY النشطة للحركة واللعب الخارجي.",
  },
};
