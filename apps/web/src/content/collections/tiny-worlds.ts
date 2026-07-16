import type { CollectionContent } from "./types";

export const tinyWorlds: CollectionContent = {
  id: "tiny-worlds",
  slug: "tiny-worlds",
  name: { en: "Tiny Worlds", ar: "عوالم صغيرة" },
  eyebrow: { en: "Collection 01", ar: "المجموعة 01" },
  shortDescription: {
    en: "Miniature scenes that invite children to invent stories at their fingertips.",
    ar: "مشاهد مصغّرة تدعو الأطفال لابتكار قصص بين أيديهم.",
  },
  introduction: {
    en: "Tiny Worlds is where imagination shrinks and expands at once. Small figures, thoughtful details, and open-ended play spaces help children build narratives that feel entirely their own.",
    ar: "عوالم صغيرة هي المساحة التي يتقلص فيها الخيال ويتسع في آن واحد. شخصيات دقيقة وتفاصيل مدروسة ومساحات لعب مفتوحة تساعد الأطفال على بناء سردهم الخاص.",
  },
  hero: {
    desktop: "/media/home/collections/tiny-worlds-desktop.svg",
    mobile: "/media/home/collections/tiny-worlds-mobile.svg",
    type: "image",
    focalPoint: "center 40%",
    overlayStrength: 0.45,
    textColor: "light",
  },
  theme: {
    background: "#1a1630",
    foreground: "#ffffff",
    accent: "#6c4cff",
  },
  sections: [
    {
      id: "scale",
      layout: "media-left",
      title: {
        en: "Play at a Smaller Scale",
        ar: "لعب بمقياس أصغر",
      },
      description: {
        en: "Compact sets make room for focus. Children arrange, rearrange, and revisit scenes as their stories grow.",
        ar: "المجموعات المدمجة تمنح مساحة للتركيز. يرتّب الأطفال المشاهد ويعيدون ترتيبها كلما نمت قصصهم.",
      },
      media: {
        desktop: "/media/home/collections/tiny-worlds-desktop.svg",
        mobile: "/media/home/collections/tiny-worlds-mobile.svg",
        type: "image",
        alt: {
          en: "Tiny Worlds collection visual",
          ar: "صورة بصرية لمجموعة عوالم صغيرة",
        },
      },
    },
    {
      id: "stories",
      layout: "media-right",
      title: {
        en: "Stories Without a Script",
        ar: "قصص بلا نص جاهز",
      },
      description: {
        en: "There is no single correct ending. Each play session can become a new adventure, quiet or wild.",
        ar: "لا توجد نهاية واحدة صحيحة. كل جلسة لعب يمكن أن تصبح مغامرة جديدة، هادئة أو جريئة.",
      },
      media: {
        desktop: "/media/home/collections/tiny-worlds-mobile.svg",
        type: "image",
        alt: {
          en: "Story-driven miniature play",
          ar: "لعب مصغّر قائم على القصص",
        },
      },
    },
    {
      id: "detail",
      layout: "editorial",
      title: {
        en: "Details That Reward Attention",
        ar: "تفاصيل تكافئ الانتباه",
      },
      description: {
        en: "Color, texture, and character cues invite longer looking and deeper pretend play — without overwhelm.",
        ar: "الألوان والملمس وإشارات الشخصيات تدعو إلى نظر أطول ولعب تخيلي أعمق دون إرباك.",
      },
      media: {
        desktop: "/media/home/collections/tiny-worlds-desktop.svg",
        type: "image",
        alt: {
          en: "Detail-focused Tiny Worlds scene",
          ar: "مشهد تفصيلي من عوالم صغيرة",
        },
      },
    },
  ],
  relatedCollectionSlugs: ["creative-studio", "plush-friends", "learning-lab"],
  metaDescription: {
    en: "Explore Tiny Worlds — miniature play sets that spark storytelling and imagination from IPLAY.",
    ar: "اكتشف عوالم صغيرة — مجموعات لعب مصغّرة تلهم السرد والخيال من IPLAY.",
  },
};
