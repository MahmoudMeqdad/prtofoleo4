import type { LocalizedString } from "../locale";

type Faq = { question: LocalizedString; answer: LocalizedString };

export const dropshippingContent = {
  metaTitle: {
    en: "Dropshipping | IPLAY Partners",
    ar: "الدروب شيبنج | شركاء IPLAY",
  } satisfies LocalizedString,
  metaDescription: {
    en: "Learn how IPLAY dropshipping will work for marketers — process, benefits, and what is coming next.",
    ar: "تعرّف على كيف سيعمل دروب شيبنج IPLAY للمسوّقين — العملية والمزايا وما هو قادم.",
  } satisfies LocalizedString,
  heroTitle: { en: "IPLAY Dropshipping", ar: "دروب شيبنج IPLAY" },
  heroSubtitle: {
    en: "An informational overview for marketers. Registration is not open yet.",
    ar: "نظرة تعريفية للمسوّقين. التسجيل غير متاح بعد.",
  },
  whatHeading: { en: "What It Is", ar: "ما هو" },
  whatBody: {
    en: "IPLAY dropshipping will let approved marketers promote selected products and submit customer orders without holding inventory themselves.",
    ar: "سيتيح دروب شيبنج IPLAY للمسوّقين المعتمدين الترويج لمنتجات مختارة وإرسال طلبات العملاء دون الاحتفاظ بمخزون بأنفسهم.",
  },
  howHeading: { en: "How It Works", ar: "كيف يعمل" },
  howBody: {
    en: "You choose products, share them with your audience, collect orders, and earn after successful delivery — once accounts are active.",
    ar: "تختار المنتجات، تشاركها مع جمهورك، تجمع الطلبات، وتربح بعد التسليم الناجح — عندما تُفعَّل الحسابات.",
  },
  benefitsHeading: { en: "Benefits for Marketers", ar: "مزايا للمسوّقين" },
  benefits: [
    {
      en: "No need to stock products yourself",
      ar: "لا حاجة لتخزين المنتجات بنفسك",
    },
    {
      en: "Access to IPLAY brand storytelling assets",
      ar: "الوصول إلى أصول سرد مجموعات IPLAY",
    },
    {
      en: "Clear product presentation for campaigns",
      ar: "عرض منتج واضح للحملات",
    },
    {
      en: "Focus on marketing while fulfillment is handled separately",
      ar: "التركيز على التسويق بينما تتم التلبية بشكل منفصل",
    },
  ],
  processHeading: { en: "Five-Step Process", ar: "عملية من خمس خطوات" },
  process: [
    { en: "Apply", ar: "قدّم طلباً" },
    { en: "Get Approved", ar: "احصل على الموافقة" },
    { en: "Choose Products", ar: "اختر المنتجات" },
    { en: "Submit Customer Orders", ar: "أرسل طلبات العملاء" },
    { en: "Earn After Delivery", ar: "اربح بعد التسليم" },
  ],
  contentHeading: { en: "Product Content Support", ar: "دعم محتوى المنتجات" },
  contentBody: {
    en: "Approved marketers will receive product imagery and brand messaging designed for social and storefront use — without inventing unauthorized claims.",
    ar: "سيحصل المسوّقون المعتمدون على صور المنتجات ورسائل العلامات المصممة للاستخدام الاجتماعي والواجهات — دون اختراع ادعاءات غير مصرّح بها.",
  },
  profitHeading: { en: "Orders and Profit Concept", ar: "مفهوم الطلبات والربح" },
  profitBody: {
    en: "Profit is earned after a customer order is delivered successfully. Exact commercial terms will be shared when registration opens.",
    ar: "يُحتسب الربح بعد تسليم طلب العميل بنجاح. ستُشارك الشروط التجارية الدقيقة عند فتح التسجيل.",
  },
  faqHeading: { en: "Frequently Asked Questions", ar: "أسئلة شائعة" },
  faqs: [
    {
      question: {
        en: "Can I register today?",
        ar: "هل يمكنني التسجيل اليوم؟",
      },
      answer: {
        en: "Not yet. Account registration is coming soon. This page is informational only.",
        ar: "ليس بعد. تسجيل الحسابات قادم قريباً. هذه الصفحة تعريفية فقط.",
      },
    },
    {
      question: {
        en: "Do I need to buy stock?",
        ar: "هل أحتاج لشراء مخزون؟",
      },
      answer: {
        en: "Dropshipping is designed so marketers do not hold inventory. Details will be confirmed at launch.",
        ar: "الدروب شيبنج مصمم بحيث لا يحتفظ المسوّق بمخزون. ستُؤكَّد التفاصيل عند الإطلاق.",
      },
    },
    {
      question: {
        en: "Is WhatsApp ordering available now?",
        ar: "هل طلب واتساب متاح الآن؟",
      },
      answer: {
        en: "Not in this phase. Contact us for general questions; order tools will arrive later.",
        ar: "ليس في هذه المرحلة. تواصل معنا للأسئلة العامة؛ أدوات الطلب ستأتي لاحقاً.",
      },
    },
  ] satisfies Faq[],
  ctaHeading: {
    en: "Registration Coming Soon",
    ar: "التسجيل قريباً",
  },
  ctaBody: {
    en: "Marketer accounts are not active yet. Follow IPLAY updates or contact us with partnership questions.",
    ar: "حسابات المسوّقين غير مفعّلة بعد. تابع تحديثات IPLAY أو تواصل معنا بأسئلة الشراكة.",
  },
  ctaDisabled: {
    en: "Registration Coming Soon",
    ar: "التسجيل قريباً",
  },
  contactCta: { en: "Contact Us", ar: "تواصل معنا" },
};
