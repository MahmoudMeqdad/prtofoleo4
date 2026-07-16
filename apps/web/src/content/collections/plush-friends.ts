import type { CollectionContent } from "./types";

export const plushFriends: CollectionContent = {
  id: "plush-friends",
  slug: "plush-friends",
  name: { en: "Plush Friends", ar: "أصدقاء محشوة" },
  eyebrow: { en: "Soft & Cozy", ar: "ناعم ومريح" },
  shortDescription: {
    en: "Soft companions for comfort, cuddles, and quiet imaginative play.",
    ar: "رفاق ناعمون للراحة والعناق واللعب التخيلي الهادئ.",
  },
  introduction: {
    en: "Plush Friends are made for closeness. Soft textures and friendly forms support emotional comfort and gentle storytelling.",
    ar: "أصدقاء محشوة صُمموا للقرب. ملمس ناعم وأشكال ودودة تدعم الراحة العاطفية والسرد اللطيف.",
  },
  hero: {
    desktop: "/media/home/collections/plush-friends-desktop.svg",
    mobile: "/media/home/collections/plush-friends-mobile.svg",
    type: "image",
    focalPoint: "70% 50%",
    overlayStrength: 0.35,
    textColor: "light",
  },
  theme: {
    background: "#3d2a45",
    foreground: "#ffffff",
    accent: "#ff5e8a",
  },
  sections: [
    {
      id: "comfort",
      layout: "media-left",
      title: { en: "Comfort First", ar: "الراحة أولاً" },
      description: {
        en: "Huggable forms invite calm moments — bedtime stories, quiet corners, and soft company.",
        ar: "أشكال قابلة للعناق تدعو إلى لحظات هادئة — قصص قبل النوم وزوايا هادئة ورفقة ناعمة.",
      },
      media: {
        desktop: "/media/home/collections/plush-friends-desktop.svg",
        mobile: "/media/home/collections/plush-friends-mobile.svg",
        type: "image",
        alt: {
          en: "Soft Plush Friends visual",
          ar: "صورة ناعمة لأصدقاء محشوة",
        },
      },
    },
    {
      id: "characters",
      layout: "editorial",
      title: { en: "Friendly Characters", ar: "شخصيات ودودة" },
      description: {
        en: "Each friend has a clear personality cue so children can invent names, voices, and adventures.",
        ar: "لكل صديق إشارة شخصية واضحة حتى يبتكر الأطفال الأسماء والأصوات والمغامرات.",
      },
      media: {
        desktop: "/media/home/collections/plush-friends-mobile.svg",
        type: "image",
        alt: {
          en: "Plush Friends characters",
          ar: "شخصيات أصدقاء محشوة",
        },
      },
    },
    {
      id: "everyday",
      layout: "media-right",
      title: { en: "Everyday Companions", ar: "رفاق يوميون" },
      description: {
        en: "From travel bags to living-room forts, plush friends go where children go.",
        ar: "من حقائب السفر إلى حصون غرفة المعيشة، يرافق الأصدقاء المحشون الأطفال أينما ذهبوا.",
      },
      media: {
        desktop: "/media/home/collections/plush-friends-desktop.svg",
        type: "image",
        alt: {
          en: "Everyday plush companion",
          ar: "رفيق محشو يومي",
        },
      },
    },
  ],
  relatedCollectionSlugs: ["tiny-worlds", "learning-lab", "creative-studio"],
  metaDescription: {
    en: "Meet Plush Friends — soft IPLAY companions for comfort and imaginative play.",
    ar: "تعرّف على أصدقاء محشوة — رفاق IPLAY الناعمون للراحة واللعب التخيلي.",
  },
};
