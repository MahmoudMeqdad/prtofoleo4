import type { LocalizedString } from "../locale";

type Faq = { question: LocalizedString; answer: LocalizedString };

export const wholesaleContent = {
  metaTitle: {
    en: "Wholesale | Velvet Kids Traders",
    ar: "الجملة | تجار Velvet Kids",
  } satisfies LocalizedString,
  metaDescription: {
    en: "Learn about Velvet Kids wholesale — who it is for, pricing tiers, MOQ, MAP, and the ordering process.",
    ar: "تعرّف على جملة Velvet Kids — لمن هي، مستويات التسعير، الحد الأدنى للكمية، حماية السعر، وعملية الطلب.",
  } satisfies LocalizedString,
  heroTitle: { en: "Velvet Kids Wholesale", ar: "جملة Velvet Kids" },
  heroSubtitle: {
    en: "For retailers and traders preparing to stock Velvet Kids brands. Wholesale accounts are coming soon.",
    ar: "لتجار التجزئة والجملة المستعدين لتوفير مجموعات Velvet Kids. حسابات الجملة قادمة قريباً.",
  },
  whoHeading: { en: "Who Wholesale Is For", ar: "لمن هي الجملة" },
  whoBody: {
    en: "Wholesale is intended for shops, distributors, and traders who want to offer Velvet Kids products to their customers with clear commercial terms.",
    ar: "الجملة موجّهة للمتاجر والموزّعين والتجار الذين يريدون تقديم منتجات Velvet Kids لعملائهم بشروط تجارية واضحة.",
  },
  tiersHeading: { en: "Pricing-Tier Concept", ar: "مفهوم مستويات التسعير" },
  tiersBody: {
    en: "Velvet Kids plans clear tiers that reflect order volume. Exact prices stay private until trader accounts are approved.",
    ar: "تخطط Velvet Kids لمستويات واضحة تعكس حجم الطلب. تبقى الأسعار الدقيقة خاصة حتى اعتماد حسابات التجار.",
  },
  moqHeading: { en: "MOQ Explained", ar: "شرح الحد الأدنى للكمية" },
  moqBody: {
    en: "Minimum order quantities help keep supply predictable. MOQ will vary by product and tier and will be shown inside future trader tools — not as public price lists.",
    ar: "الحد الأدنى للكمية يساعد على استقرار التوريد. سيختلف حسب المنتج والمستوى وسيظهر داخل أدوات التجار مستقبلاً — وليس كقوائم أسعار عامة.",
  },
  levelsHeading: {
    en: "Retail, Light Wholesale, and Bulk",
    ar: "التجزئة والجملة الخفيفة والجملة الكبيرة",
  },
  levels: [
    {
      title: { en: "Retail", ar: "التجزئة" },
      body: {
        en: "Customer-facing availability when public shopping opens.",
        ar: "توفر للعملاء عندما يُفتح التسوق العام.",
      },
    },
    {
      title: { en: "Light Wholesale", ar: "جملة خفيفة" },
      body: {
        en: "Smaller wholesale quantities for growing shops.",
        ar: "كميات جملة أصغر للمتاجر النامية.",
      },
    },
    {
      title: { en: "Bulk Wholesale", ar: "جملة كبيرة" },
      body: {
        en: "Larger volumes for established traders and distributors.",
        ar: "أحجام أكبر للتجار والموزّعين الراسخين.",
      },
    },
  ],
  benefitsHeading: { en: "Benefits for Traders", ar: "مزايا للتجار" },
  benefits: [
    {
      en: "Access to curated Velvet Kids brands",
      ar: "الوصول إلى مجموعات Velvet Kids المنتقاة",
    },
    {
      en: "Clear commercial structure when accounts open",
      ar: "هيكل تجاري واضح عند فتح الحسابات",
    },
    {
      en: "Brand storytelling assets for store presentation",
      ar: "أصول سرد العلامة لعرض المتجر",
    },
    {
      en: "MAP guidance to protect fair retail pricing",
      ar: "إرشاد MAP لحماية تسعير التجزئة العادل",
    },
  ],
  mapHeading: { en: "MAP Price Protection", ar: "حماية سعر MAP" },
  mapBody: {
    en: "Minimum Advertised Price (MAP) guidance helps partners avoid race-to-the-bottom discounting that harms the brand and other traders. Full MAP rules will be shared with approved accounts.",
    ar: "إرشاد الحد الأدنى لسعر الإعلان (MAP) يساعد الشركاء على تجنب خصومات مدمرة تضر بالعلامة وبقية التجار. ستُشارك قواعد MAP الكاملة مع الحسابات المعتمدة.",
  },
  processHeading: { en: "Basic Ordering Process", ar: "عملية الطلب الأساسية" },
  process: [
    { en: "Request a wholesale account", ar: "اطلب حساب جملة" },
    { en: "Review assortment and terms", ar: "راجع التشكيلة والشروط" },
    { en: "Place an order meeting MOQ", ar: "قدّم طلباً يستوفي الحد الأدنى" },
    { en: "Receive fulfillment updates", ar: "استلم تحديثات التلبية" },
  ],
  faqHeading: { en: "Frequently Asked Questions", ar: "أسئلة شائعة" },
  faqs: [
    {
      question: {
        en: "Are wholesale prices public?",
        ar: "هل أسعار الجملة عامة؟",
      },
      answer: {
        en: "No. Private trader pricing will be available only to approved wholesale accounts.",
        ar: "لا. تسعير التجار الخاص سيكون متاحاً فقط لحسابات الجملة المعتمدة.",
      },
    },
    {
      question: {
        en: "Can I open an account now?",
        ar: "هل يمكنني فتح حساب الآن؟",
      },
      answer: {
        en: "Wholesale accounts are coming soon. Contact us for partnership interest.",
        ar: "حسابات الجملة قادمة قريباً. تواصل معنا إذا كنت مهتماً بالشراكة.",
      },
    },
  ] satisfies Faq[],
  ctaHeading: {
    en: "Wholesale Accounts Coming Soon",
    ar: "حسابات الجملة قريباً",
  },
  ctaBody: {
    en: "Trader tools and private pricing are not active yet. We welcome early conversation via contact.",
    ar: "أدوات التجار والتسعير الخاص غير مفعّلة بعد. نرحب بمحادثة مبكرة عبر صفحة التواصل.",
  },
  ctaDisabled: {
    en: "Wholesale Accounts Coming Soon",
    ar: "حسابات الجملة قريباً",
  },
  contactCta: { en: "Contact Us", ar: "تواصل معنا" },
};
