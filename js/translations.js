"use strict";

const TRANSLATIONS = Object.freeze({
  fa: Object.freeze({
    navServices: "خدمات",
    navProcess: "فرآیند همکاری",
    navWhy: "مزیت رقابتی",
    navContact: "ارتباط",
    navbarCTA: "شروع همکاری",
    mobileNavigationTitle: "منوی اصلی",
    heroBadge: "طراحی سایت و توسعه نرم‌افزار برای کسب‌وکارها",
    heroTitle: "طراحی سایت و نرم‌افزار اختصاصی",
    heroTitleHighlight: "برای رشد کسب‌وکار شما",
    heroDescriptionDesktop:
      "آریا با طراحی سایت، فروشگاه اینترنتی و توسعه نرم‌افزار اختصاصی، راهکارهای دیجیتال متناسب با نیاز و مسیر رشد برندها ارائه می‌دهد.",

    heroDescription: [
      "طراحی سایت حرفه‌ای برای برند شما",
      "حضور حرفه‌ای‌تر در گوگل",
      "کنار برند شما برای رقابت دیجیتال",
      "نرم‌افزار اختصاصی، متناسب با نیاز کسب‌وکار شما",
    ],
    heroCtaPrimary: "دریافت مشاوره رایگان",
    heroCtaSecondary: "مشاهده خدمات",

    marqueeEnterprise: "نرم افزارهای سازمانی",
    marqueeAutomation: "اتوماسیون اداری",
    marqueeMedical: "سیستم های پزشکی",
    marqueeCommerce: "فروشگاه های دیجیتال",
    marqueeCRM: "CRM اختصاصی",
    marqueeERP: "ERP سازمانی",

    trustBadge: "چرا کسب وکارها آریا را انتخاب می کنند؟",
    trustTitle: "راهکارهای نرم افزاری قابل اعتماد برای رشد بلندمدت",
    trustSubtitle:
      "راهکارهای نرم افزاری ما بر پایه نیازهای واقعی کسب وکارها طراحی می شوند؛ با تمرکز بر پایداری، مقیاس پذیری و توسعه ای که بتواند همراه رشد آینده شما حرکت کند.",
    trustPillar1Title: "متناسب با کسب وکار شما",
    trustPillar1Desc:
      "هر پروژه بر اساس اهداف، فرآیندها و نیازهای واقعی کسب وکار شما طراحی می شود؛ نه بر اساس قالب های آماده و راهکارهای عمومی.",
    trustPillar2Title: "فناوری‌های پایدار و مقیاس‌پذیر",
    trustPillar2Desc:
      "راهکارها با استفاده از فناوری‌های مدرن و معماری‌های استاندارد توسعه می‌یابند تا پاسخگوی نیازهای امروز و رشد آینده کسب‌وکار شما باشند.",
    trustPillar3Title: "همکاری بلندمدت",
    trustPillar3Desc:
      "از مرحله تحلیل و طراحی تا توسعه، استقرار و بهبودهای آینده، در کنار شما خواهیم بود تا فناوری به یک مزیت رقابتی پایدار تبدیل شود.",

    servicesBadge: "راهکارهای آریا",
    servicesTitle: "خدمات دیجیتال برای هر نوع کسب‌وکار",
    servicesSubtitle:
      "از طراحی سایت حرفه‌ای و فروشگاه اینترنتی تا نرم‌افزارهای اختصاصی، راهکارهایی متناسب با نیاز، حوزه فعالیت و اهداف کسب‌وکار شما را طراحی و توسعه می‌دهیم.",
    service1Title: "نرم‌افزارهای اختصاصی",
    service1Desc:
      "نرم‌افزارهایی متناسب با فرآیندها و نیازهای خاص کسب‌وکار شما؛ برای افزایش بهره‌وری، کاهش کارهای تکراری و ایجاد مزیت رقابتی.",
    service2Title: "طراحی سایت حرفه‌ای",
    service2Desc:
      "طراحی سایت‌های مدرن، سریع و واکنش‌گرا برای معرفی کسب‌وکار، جذب مشتری و ساخت یک حضور حرفه‌ای در فضای دیجیتال.",
    service3Title: "فروشگاه اینترنتی",
    service3Desc:
      "فروشگاه‌های اینترنتی حرفه‌ای با تجربه کاربری مناسب، مدیریت آسان و زیرساختی آماده برای رشد و توسعه کسب‌وکار شما.",
    service4Title: "سامانه‌ها و سیستم‌های اختصاصی",
    service4Desc:
      "طراحی و توسعه سامانه‌های اختصاصی برای مدیریت فرآیندها، اطلاعات و عملیات کسب‌وکارها و سازمان‌ها.",

    processBadge: "فرآیند همکاری",
    processTitle: "مسیری شفاف از ایده تا راهکار نهایی",
    processSubtitle:
      "هر پروژه با شناخت دقیق نیازهای کسب‌وکار آغاز می‌شود و با توسعه، استقرار و پشتیبانی مستمر ادامه پیدا می‌کند.",
    process1Title: "شناخت و تحلیل",
    process1Desc:
      "اهداف، چالش‌ها و نیازهای کسب‌وکار شما را بررسی می‌کنیم تا تصویری دقیق از مسیر پیش رو به دست آوریم.",
    process2Title: "طراحی راهکار",
    process2Desc:
      "معماری، قابلیت‌ها و مسیر اجرای پروژه را متناسب با اهداف و اولویت‌های کسب‌وکار طراحی می‌کنیم.",
    process3Title: "توسعه و استقرار",
    process3Desc:
      "راهکار موردنظر با فناوری‌های مدرن توسعه یافته و پس از آزمایش و بهینه‌سازی آماده بهره‌برداری می‌شود.",
    process4Title: "پشتیبانی و توسعه آینده",
    process4Desc:
      "پس از راه‌اندازی نیز در کنار شما خواهیم بود تا راهکار توسعه پیدا کند و همراه رشد کسب‌وکار باقی بماند.",

    whyBadge: "مزیت همکاری با آریا",
    whyTitle: "فراتر از توسعه نرم‌افزار، یک شریک فناوری برای رشد کسب‌وکار",
    whySubtitle:
      "هدف ما صرفاً تحویل یک پروژه نیست؛ بلکه ایجاد راهکارهایی است که بتوانند در بلندمدت به رشد، بهره‌وری و توسعه کسب‌وکار شما کمک کنند.",
    why1Title: "تمرکز بر نتایج واقعی کسب‌وکار",
    why1Desc:
      "هر تصمیم فنی با در نظر گرفتن اهداف تجاری، بهره‌وری و رشد بلندمدت کسب‌وکار شما اتخاذ می‌شود.",
    why2Title: "معماری آماده رشد",
    why2Desc:
      "راهکارها به گونه‌ای طراحی می‌شوند که بتوانند همراه توسعه آینده کسب‌وکار بدون بازطراحی‌های پرهزینه رشد کنند.",
    why3Title: "ارتباط مستقیم و شفاف",
    why3Desc:
      "فرآیندها، تصمیم‌ها و وضعیت پروژه همواره شفاف و قابل پیگیری هستند.",
    why4Title: "همراهی فراتر از تحویل پروژه",
    why4Desc:
      "پس از راه‌اندازی نیز در کنار شما می‌مانیم تا راهکار توسعه پیدا کند و ارزش بیشتری ایجاد کند.",

    faqBadge: "سوالات متداول",
    faqTitle: "پاسخ به سوالات پیش از شروع همکاری",
    faqSubtitle:
      "پاسخ به برخی از سوالاتی که معمولاً پیش از انتخاب راهکار و آغاز پروژه مطرح می‌شوند.",
    faq1Question: "آیا خدمات آریا برای کسب‌وکار من مناسب است؟",
    faq1Answer:
      "راهکارهای ما برای طیف گسترده‌ای از کسب‌وکارها، از استارتاپ‌ها و فروشگاه‌های اینترنتی تا شرکت‌ها و سازمان‌ها قابل ارائه هستند. هر پروژه بر اساس نیازهای واقعی همان کسب‌وکار طراحی می‌شود.",
    faq2Question: "هزینه پروژه چگونه تعیین می‌شود؟",
    faq2Answer:
      "هزینه هر پروژه به اهداف، امکانات موردنیاز، پیچیدگی راهکار و زمان توسعه بستگی دارد. پس از بررسی نیازها، پیشنهاد و برآورد شفاف ارائه می‌شود.",
    faq3Question: "مدت زمان اجرای پروژه چقدر است؟",
    faq3Answer:
      "زمان اجرا به نوع پروژه و دامنه نیازمندی‌ها بستگی دارد. پس از مرحله تحلیل، برنامه زمانی مشخص و قابل پیگیری ارائه خواهد شد.",
    faq4Question: "آیا پس از راه‌اندازی پشتیبانی نیز ارائه می‌شود؟",
    faq4Answer:
      "بله. همکاری با تحویل پروژه پایان نمی‌یابد. خدمات پشتیبانی، بهبود و توسعه‌های آینده متناسب با نیاز هر پروژه قابل ارائه است.",

    ctaBadge: "شروع همکاری",
    ctaTitle: "برای کسب و کار شما راهکاری ارزشمند می سازیم",
    ctaDescription:
      "ایده خود را با ما در میان بگذارید. در اولین گفتگو نیازهای پروژه را بررسی می کنیم و بهترین مسیر همکاری را پیشنهاد می دهیم.",
    ctaPrimaryButton: "شروع همکاری",

    contactBadge: "ارتباط با تیم آریا",
    contactTitle: "بیایید درباره پروژه شما گفتگو کنیم",
    contactSubtitle:
      "برای شروع همکاری یا طرح پرسش، از طریق اطلاعات زیر با ما در ارتباط باشید.",
    contactConversationTitle: "شروع همکاری",
    contactConversationDescription:
      "برای شروع همکاری و دریافت مشاوره، با ما تماس بگیرید",
    contactButton: "تماس با ما",
    contactEmailLabel: "ایمیل",
    contactPhoneLabel: "تلفن",
    contactLocationLabel: "موقعیت",
    contactLocationValue: "تهران، ایران",
    contactAvailabilityLabel: "وضعیت همکاری",
    contactAvailabilityValue: "آماده پذیرش پروژه",

    footerCompanyTitle: "شرکت",
    footerCompanyProcess: "فرآیند همکاری",
    footerCompanyWhy: "چرا آریا",
    footerCompanyFaq: "سوالات متداول",
    footerCompanyContact: "تماس با ما",

    footerSolutionsTitle: "راهکارها",
    footerSolutionWebsite: "طراحی وب سایت",
    footerSolutionEcommerce: "فروشگاه اینترنتی",
    footerSolutionCustomSoftware: "نرم افزارهای سفارشی",
    footerSolutionEnterprise: "راهکارهای سازمانی",

    footerContactTitle: "ارتباط",
    footerLocation: "تهران، ایران",
    footerCopyright: "تمامی حقوق محفوظ است.",
  }),

  en: Object.freeze({
    navServices: "Services",
    navProcess: "Our Process",
    navWhy: "Why Arya",
    navContact: "Contact",
    navbarCTA: "Start Your Project",
    mobileNavigationTitle: "Main navigation",
    heroBadge: "Software Solutions for Modern Businesses",
    heroTitle: "Software Solutions",
    heroTitleHighlight: "Built for Business Growth",
    heroDescriptionDesktop:
      "Arya builds professional websites, e-commerce experiences, and custom software tailored to the needs and growth of modern brands.",

    heroDescription: [
      "Professional websites for your brand",
      "A stronger presence on Google",
      "By your side for digital competition",
      "Custom software tailored to your business needs",
    ],
    heroCtaPrimary: "Get Started",
    heroCtaSecondary: "View Solutions",

    marqueeEnterprise: "Enterprise Software",
    marqueeAutomation: "Office Automation",
    marqueeMedical: "Healthcare Systems",
    marqueeCommerce: "E-commerce Platforms",
    marqueeCRM: "Custom CRM",
    marqueeERP: "Enterprise ERP",

    trustBadge: "Why Businesses Choose Arya",
    trustTitle: "Reliable Technology for Long-Term Growth",
    trustSubtitle:
      "Our software solutions are built around real business needs, with a focus on reliability, scalability, and long-term growth.",
    trustPillar1Title: "Tailored to Your Business",
    trustPillar1Desc:
      "Every solution is designed around your unique goals, workflows, and business requirements—not generic templates or one-size-fits-all products.",
    trustPillar2Title: "Scalable & Future-Ready Technology",
    trustPillar2Desc:
      "Built with modern technologies and proven architectures to support your business today and scale with you tomorrow.",
    trustPillar3Title: "Long-Term Partnership",
    trustPillar3Desc:
      "From planning and development to deployment and future improvements, we partner with you to turn technology into a lasting competitive advantage.",

    servicesBadge: "What We Build",
    servicesTitle: "Software Solutions That Drive Business Growth",
    servicesSubtitle:
      "From professional websites and e-commerce platforms to custom software and enterprise systems, we build solutions that help businesses grow, improve efficiency, and accelerate digital transformation.",
    service1Title: "Custom Business Software",
    service1Desc:
      "Tailor-made software built around your unique workflows, goals, and business needs to boost productivity, automate repetitive tasks, and create long-term competitive value.",
    service2Title: "Professional Business Websites",
    service2Desc:
      "Fast, modern, and responsive websites that showcase your brand, attract new customers, and support sustainable business growth.",
    service3Title: "E-commerce Solutions",
    service3Desc:
      "Scalable online stores and e-commerce platforms designed to deliver outstanding user experiences, simplify management, and grow with your business.",
    service4Title: "Enterprise Platforms & Systems",
    service4Desc:
      "Scalable enterprise applications that streamline operations, unify business data, and improve organizational performance.",

    processBadge: "Our Process",
    processTitle: "A Clear Path from Idea to Solution",
    processSubtitle:
      "Every project begins with a deep understanding of your business and continues through development, deployment, and ongoing support.",
    process1Title: "Discovery & Analysis",
    process1Desc:
      "We take the time to understand your business goals, challenges, and requirements to build a clear roadmap for success.",
    process2Title: "Solution Design",
    process2Desc:
      "We design the architecture, features, and implementation strategy to align with your business objectives and priorities.",
    process3Title: "Development & Deployment",
    process3Desc:
      "Your solution is built using modern technologies, thoroughly tested, optimized, and prepared for a successful launch.",
    process4Title: "Ongoing Support & Growth",
    process4Desc:
      "After launch, we continue to support and enhance your solution so it evolves alongside your business.",

    whyBadge: "Why Arya",
    whyTitle:
      "More Than Software Development—Your Technology Partner for Growth",
    whySubtitle:
      "We don't just deliver software. We build long-term technology solutions that help your business grow, improve efficiency, and create lasting value.",
    why1Title: "Business-Driven Results",
    why1Desc:
      "Every technical decision is guided by your business goals, operational efficiency, and long-term growth.",
    why2Title: "Built to Scale",
    why2Desc:
      "Our solutions are designed to grow with your business, reducing the need for costly redesigns as your requirements evolve.",
    why3Title: "Clear & Transparent Communication",
    why3Desc:
      "You'll always have clear visibility into project progress, decisions, and every stage of development.",
    why4Title: "Partnership Beyond Delivery",
    why4Desc:
      "Our commitment continues after launch with ongoing support and continuous improvements that maximize your solution's long-term value.",

    faqBadge: "Frequently Asked Questions",
    faqTitle: "Everything You Need to Know Before Getting Started",
    faqSubtitle:
      "Find answers to the questions most businesses ask before starting a software project with Arya.",
    faq1Question: "Are Arya's services the right fit for my business?",
    faq1Answer:
      "Our solutions are designed for businesses of all sizes—from startups and e-commerce stores to established companies and enterprises. Every project is tailored to your unique business needs.",
    faq2Question: "How is the project cost determined?",
    faq2Answer:
      "Project pricing depends on your goals, required features, project complexity, and development timeline. After understanding your requirements, we provide a clear proposal and transparent estimate.",
    faq3Question: "How long does a project take?",
    faq3Answer:
      "The timeline depends on the project's scope and requirements. After the discovery phase, we'll provide a clear project roadmap and estimated delivery schedule.",
    faq4Question: "Do you provide support after launch?",
    faq4Answer:
      "Yes. Our partnership doesn't end at delivery. We offer ongoing support, maintenance, and future enhancements tailored to your project's evolving needs.",

    ctaBadge: "Let's Build Together",
    ctaTitle: "Let's Build the Right Solution for Your Business",
    ctaDescription:
      "Tell us about your project. We'll discuss your goals, understand your requirements, and recommend the best path to bring your idea to life.",
    ctaPrimaryButton: "Start Your Project",

    contactBadge: "Get in Touch",
    contactTitle: "Let's Talk About Your Project",
    contactSubtitle:
      "Whether you're planning a new project or have a question, we'd love to hear from you.",
    contactConversationTitle: "Start a Conversation",
    contactConversationDescription:
      "Send us an email and tell us about your project. We'll review your requirements and get back to you as soon as possible.",
    contactButton: "Send an Email",
    contactEmailLabel: "Email",
    contactPhoneLabel: "Phone",
    contactLocationLabel: "Location",
    contactLocationValue: "Tehran, Iran",
    contactAvailabilityLabel: "Availability",
    contactAvailabilityValue: "Open for New Projects",

    footerCompanyTitle: "Company",
    footerCompanyProcess: "Our Process",
    footerCompanyWhy: "Why Arya",
    footerCompanyFaq: "FAQ",
    footerCompanyContact: "Contact Us",

    footerSolutionsTitle: "Solutions",
    footerSolutionWebsite: "Website Development",
    footerSolutionEcommerce: "E-commerce Solutions",
    footerSolutionCustomSoftware: "Custom Software",
    footerSolutionEnterprise: "Enterprise Solutions",

    footerContactTitle: "Contact",
    footerLocation: "Tehran, Iran",
    footerCopyright: "All rights reserved.",
  }),
});
