import type { CollectionContent } from "./types";

export const learningLab: CollectionContent = {
  id: "learning-lab",
  slug: "learning-lab",
  name: { en: "Learning Lab", ar: "مختبر التعلم" },
  eyebrow: { en: "Collection 06", ar: "المجموعة 06" },
  shortDescription: {
    en: "Curious play that grows skills through discovery, not drills.",
    ar: "لعب فضولي ينمّي المهارات عبر الاكتشاف لا عبر التلقين.",
  },
  introduction: {
    en: "Learning Lab turns questions into play. Children explore patterns, cause and effect, and early problem-solving through hands-on discovery.",
    ar: "مختبر التعلم يحوّل الأسئلة إلى لعب. يستكشف الأطفال الأنماط والسبب والنتيجة وحل المشكلات المبكر عبر الاكتشاف العملي.",
  },
  hero: {
    desktop: "/media/home/collections/learning-lab-desktop.svg",
    mobile: "/media/home/collections/learning-lab-mobile.svg",
    type: "image",
    focalPoint: "center 60%",
    overlayStrength: 0.15,
    textColor: "dark",
  },
  theme: {
    background: "#eef4ff",
    foreground: "#151515",
    accent: "#6c4cff",
  },
  sections: [
    {
      id: "curious",
      layout: "media-right",
      title: { en: "Stay Curious", ar: "ابقَ فضولياً" },
      description: {
        en: "Prompts invite questions. Children lead the exploration while adults stay nearby as guides.",
        ar: "إشارات تدعو إلى الأسئلة. يقود الأطفال الاستكشاف بينما يبقى الكبار قريبين كمرشدين.",
      },
      media: {
        desktop: "/media/home/collections/learning-lab-desktop.svg",
        mobile: "/media/home/collections/learning-lab-mobile.svg",
        type: "image",
        alt: {
          en: "Learning Lab curiosity visual",
          ar: "صورة فضول لمختبر التعلم",
        },
      },
    },
    {
      id: "hands",
      layout: "media-left",
      title: { en: "Hands-On Discovery", ar: "اكتشاف عملي" },
      description: {
        en: "Touch, sort, stack, and test. Skills grow through repetition that still feels like play.",
        ar: "المس ورتّب وكدّس وجرّب. تنمو المهارات عبر التكرار الذي يبقى شعوراً باللعب.",
      },
      media: {
        desktop: "/media/home/collections/learning-lab-mobile.svg",
        type: "image",
        alt: {
          en: "Hands-on learning toys",
          ar: "ألعاب تعلم عملية",
        },
      },
    },
    {
      id: "grow",
      layout: "editorial",
      title: { en: "Grow With Play", ar: "انمُ مع اللعب" },
      description: {
        en: "Learning Lab pieces are designed to stay interesting as abilities expand — from first tries to confident play.",
        ar: "قطع مختبر التعلم مصممة لتبقى مثيرة مع نمو القدرات — من أولى المحاولات إلى اللعب الواثق.",
      },
      media: {
        desktop: "/media/home/collections/learning-lab-desktop.svg",
        type: "image",
        alt: {
          en: "Growing with Learning Lab",
          ar: "النمو مع مختبر التعلم",
        },
      },
    },
  ],
  relatedCollectionSlugs: ["creative-studio", "tiny-worlds", "plush-friends"],
  metaDescription: {
    en: "Visit Learning Lab — Velvet Kids toys that grow curiosity through playful discovery.",
    ar: "زر مختبر التعلم — ألعاب Velvet Kids التي تنمّي الفضول عبر الاكتشاف الممتع.",
  },
};
