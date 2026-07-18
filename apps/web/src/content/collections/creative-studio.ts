import type { CollectionContent } from "./types";

export const creativeStudio: CollectionContent = {
  id: "creative-studio",
  slug: "creative-studio",
  name: { en: "Creative Studio", ar: "استوديو الإبداع" },
  eyebrow: { en: "Collection 02", ar: "المجموعة 02" },
  shortDescription: {
    en: "Tools and toys that turn ideas into color, shape, and joyful making.",
    ar: "أدوات وألعاب تحوّل الأفكار إلى لون وشكل وصنع مبهج.",
  },
  introduction: {
    en: "Creative Studio celebrates making. From first scribbles to bold builds, this collection supports children who learn by creating with their hands.",
    ar: "استوديو الإبداع يحتفي بفعل الصنع. من أول خطوط الرسم إلى التركيب الجريء، تدعم هذه المجموعة الأطفال الذين يتعلمون عبر أيديهم.",
  },
  hero: {
    desktop: "/media/home/collections/creative-studio-desktop.svg",
    mobile: "/media/home/collections/creative-studio-mobile.svg",
    type: "image",
    focalPoint: "center 55%",
    overlayStrength: 0.2,
    textColor: "dark",
  },
  theme: {
    background: "#f4f0ea",
    foreground: "#171717",
    accent: "#ff5e8a",
  },
  sections: [
    {
      id: "make",
      layout: "media-right",
      title: { en: "Make Something New", ar: "اصنع شيئاً جديداً" },
      description: {
        en: "Open-ended materials encourage experimentation. Mistakes become part of the design process.",
        ar: "المواد المفتوحة تشجّع على التجريب. والأخطاء تصبح جزءاً من عملية التصميم.",
      },
      media: {
        desktop: "/media/home/collections/creative-studio-desktop.svg",
        mobile: "/media/home/collections/creative-studio-mobile.svg",
        type: "image",
        alt: {
          en: "Creative Studio making activity",
          ar: "نشاط صنع من استوديو الإبداع",
        },
      },
    },
    {
      id: "color",
      layout: "full-media",
      title: { en: "Color First", ar: "اللون أولاً" },
      description: {
        en: "Bright palettes and clear forms help young creators express mood before words catch up.",
        ar: "لوحات ألوان زاهية وأشكال واضحة تساعد الصغار على التعبير عن المزاج قبل أن تلحق الكلمات.",
      },
      media: {
        desktop: "/media/home/collections/creative-studio-mobile.svg",
        type: "image",
        alt: {
          en: "Colorful Creative Studio visual",
          ar: "صورة ملونة لاستوديو الإبداع",
        },
      },
    },
    {
      id: "share",
      layout: "centered",
      title: { en: "Share the Process", ar: "شارك العملية" },
      description: {
        en: "Creative play is richer when families and friends join the table — not only for the finished piece.",
        ar: "اللعب الإبداعي يصبح أغنى عندما تنضم العائلة والأصدقاء إلى الطاولة — وليس فقط من أجل النتيجة النهائية.",
      },
      media: {
        desktop: "/media/home/collections/creative-studio-desktop.svg",
        type: "image",
        alt: {
          en: "Shared creative play",
          ar: "لعب إبداعي مشترك",
        },
      },
    },
  ],
  relatedCollectionSlugs: ["tiny-worlds", "learning-lab", "outdoor-fun"],
  metaDescription: {
    en: "Discover Creative Studio — Velvet Kids toys that invite children to draw, build, and invent.",
    ar: "اكتشف استوديو الإبداع — ألعاب Velvet Kids التي تدعو الأطفال للرسم والبناء والابتكار.",
  },
};
