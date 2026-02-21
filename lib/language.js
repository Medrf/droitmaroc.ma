'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('fr') // Default to French

    // Load language preference from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('legal-ai-language')
        if (saved && (saved === 'ar' || saved === 'fr')) {
            setLanguage(saved)
        }
    }, [])

    // Save language preference
    const changeLanguage = (lang) => {
        setLanguage(lang)
        localStorage.setItem('legal-ai-language', lang)
    }

    const tTranslations = {
        // Navbar
        "nav.features": { fr: "Fonctionnalités", ar: "المميزات" },
        "nav.solutions": { fr: "Solutions", ar: "الحلول" },
        "nav.about": { fr: "À propos", ar: "من نحن" },
        "nav.login": { fr: "Se connecter", ar: "تسجيل الدخول" },
        "nav.start": { fr: "Commencer", ar: "ابدأ الآن" },

        // Hero
        "hero.badge": { fr: "Intelligence juridique propulsée par l'IA", ar: "ذكاء قانوني مدعوم بالذكاء الاصطناعي" },
        "hero.title1": { fr: "La clarté juridique,", ar: "الوضوح القانوني،" },
        "hero.title2": { fr: "simplifiée.", ar: "بكل بساطة." },
        "hero.subtitle": { fr: "La plateforme d'intelligence juridique structurée dédiée au droit marocain. Recherchez, rédigez et auditez — en un seul endroit.", ar: "منصة الذكاء القانوني المخصصة للقانون المغربي. ابحث، حرّر، ودقّق — في مكان واحد." },
        "hero.cta1": { fr: "Commencer gratuitement", ar: "ابدأ مجاناً" },
        "hero.cta2": { fr: "Découvrir les fonctionnalités", ar: "اكتشف المميزات" },
        "hero.img_alt": { fr: "Interface de la plateforme loidumaroc", ar: "واجهة منصة قانون المغرب" },

        // About
        "about.label": { fr: "À propos", ar: "من نحن" },
        "about.title1": { fr: "Conçu spécifiquement", ar: "مصمم خصيصاً" },
        "about.title2": { fr: "pour le droit marocain", ar: "للقانون المغربي" },
        "about.text": { fr: "loidumaroc est une plateforme d'intelligence juridique conçue pour répondre aux besoins spécifiques des acteurs du système juridique marocain. Nous offrons un accès structuré, fiable et professionnellement formaté à la législation, la jurisprudence et les ressources juridiques marocaines.", ar: "قانون المغرب هي منصة ذكاء قانوني مصممة لتلبية الاحتياجات الخاصة بالعاملين في المنظومة القانونية المغربية. نوفر وصولاً منظماً وموثوقاً ومنسقاً بشكل احترافي للتشريعات والاجتهادات القضائية والموارد القانونية المغربية." },

        // Services
        "services.label": { fr: "Fonctionnalités", ar: "المميزات" },
        "services.title": { fr: "Tout ce dont vous avez besoin pour le travail juridique", ar: "كل ما تحتاجه للعمل القانوني" },
        "services.ai.title": { fr: "Assistant Juridique IA", ar: "مساعد قانوني بالذكاء الاصطناعي" },
        "services.ai.desc": { fr: "Obtenez des réponses juridiques précises à partir des codes, lois et jurisprudence marocains grâce à une analyse IA structurée.", ar: "احصل على إجابات قانونية دقيقة من القوانين والتشريعات والاجتهادات القضائية المغربية بفضل التحليل المنظم بالذكاء الاصطناعي." },
        "services.search.title": { fr: "Recherche de Codes Juridiques", ar: "البحث في النصوص القانونية" },
        "services.search.desc": { fr: "Naviguez dans l'ensemble de la législation marocaine avec des textes juridiques structurés, référencés et à jour.", ar: "تصفح مجموع التشريعات المغربية بنصوص قانونية منظمة ومرجعية ومحدثة." },
        "services.draft.title": { fr: "Rédaction de Contrats", ar: "صياغة العقود" },
        "services.draft.desc": { fr: "Générez des contrats professionnellement formatés, conformes aux normes juridiques et réglementaires marocaines.", ar: "أنشئ عقوداً بتنسيق احترافي متوافقة مع المعايير القانونية والتنظيمية المغربية." },
        "services.audit.title": { fr: "Audit de Contrats", ar: "تدقيق العقود" },
        "services.audit.desc": { fr: "Analysez les contrats existants pour vérifier leur conformité juridique et leur alignement avec le droit marocain.", ar: "حلل العقود الحالية للتحقق من مطابقتها القانونية وتوافقها مع القانون المغربي." },

        // Audience
        "audience.label": { fr: "Solutions", ar: "الحلول" },
        "audience.title": { fr: "Adapté à chaque besoin juridique", ar: "مُكيّف لكل حاجة قانونية" },
        "audience.individual.title": { fr: "Particuliers", ar: "الأفراد" },
        "audience.individual.desc": { fr: "Comprenez vos droits, accédez aux références juridiques et naviguez dans le droit marocain avec clarté et confiance.", ar: "افهم حقوقك، واطلع على المراجع القانونية، وتصفح القانون المغربي بوضوح وثقة." },
        "audience.pro.title": { fr: "Professionnels du Droit", ar: "المهنيون القانونيون" },
        "audience.pro.desc": { fr: "Optimisez vos recherches, rédigez des documents conformes et accédez à une jurisprudence structurée efficacement.", ar: "حسّن أبحاثك، وحرّر وثائق متوافقة، واطلع على اجتهادات قضائية منظمة بكفاءة." },
        "audience.enterprise.title": { fr: "Entreprises", ar: "الشركات" },
        "audience.enterprise.desc": { fr: "Assurez la conformité réglementaire, auditez vos contrats et gérez les risques juridiques dans le cadre du droit marocain.", ar: "تأكد من الامتثال التنظيمي، ودقق عقودك، وأدر المخاطر القانونية وفق القانون المغربي." },

        // Precision
        "precision.label": { fr: "Pourquoi loidumaroc", ar: "لماذا قانون المغرب" },
        "precision.title": { fr: "Conçu pour la précision juridique.", ar: "مصمم للدقة القانونية." },
        "precision.subtitle": { fr: "Chaque fonctionnalité est pensée avec la rigueur et l'exactitude qu'exige le travail juridique.", ar: "كل ميزة مصممة بالدقة والصرامة التي يتطلبها العمل القانوني." },
        "precision.p1": { fr: "Références juridiques structurées", ar: "مراجع قانونية منظمة" },
        "precision.p2": { fr: "Spécialisation en droit marocain", ar: "تخصص في القانون المغربي" },
        "precision.p3": { fr: "Mise en forme professionnelle", ar: "تنسيق احترافي" },
        "precision.p4": { fr: "Sécurisé et confidentiel", ar: "آمن وسري" },

        // CTA
        "cta.title1": { fr: "Accédez au droit marocain", ar: "اطلع على القانون المغربي" },
        "cta.title2": { fr: "en toute confiance.", ar: "بكل ثقة." },
        "cta.subtitle": { fr: "Rejoignez les professionnels du droit et les organisations qui utilisent déjà loidumaroc pour optimiser leurs flux juridiques.", ar: "انضم إلى المهنيين القانونيين والمؤسسات التي تستخدم بالفعل قانون المغرب لتحسين سير عملهم القانوني." },
        "cta.btn1": { fr: "Créer un compte", ar: "إنشاء حساب" },
        "cta.btn2": { fr: "Contacter l'équipe", ar: "تواصل مع الفريق" },

        // Footer
        "footer.about": { fr: "À propos", ar: "من نحن" },
        "footer.platform": { fr: "Plateforme", ar: "المنصة" },
        "footer.contact": { fr: "Contact", ar: "اتصل بنا" },
        "footer.legal": { fr: "Mentions légales", ar: "إشعارات قانونية" },
        "footer.privacy": { fr: "Politique de confidentialité", ar: "سياسة الخصوصية" },
        "footer.rights": { fr: "Tous droits réservés.", ar: "جميع الحقوق محفوظة." },
    };

    const t = (key) => {
        return tTranslations[key]?.[language] ?? (translations[language]?.[key] ?? key);
    };

    const dir = language === "ar" ? "rtl" : "ltr";

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage: changeLanguage,
            lang: language,
            setLang: changeLanguage,
            t,
            dir
        }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

// Complete Translations for Premium Landing Page
export const translations = {
    fr: {
        // Header
        login: 'Connexion',
        signup: 'Créer un compte',
        dashboard: 'Tableau de bord',

        // Hero
        heroTitle: 'Votre assistant juridique pour le droit marocain',
        heroSubtitle: 'Un outil d\'assistance et de recherche conçu pour particuliers et professionnels.',
        heroCta: 'Commencer',
        heroCtaSecondary: 'Découvrir les services',

        // Trust Strip
        trustMoroccanLaw: 'Basé sur le droit marocain',
        trustOfficialSources: 'Références et sources officielles',
        trustPrivacy: 'Vos données ne sont pas revendues',
        trustDisclaimer: 'Informations générales — pas un conseil personnalisé',

        // Social Proof
        socialProofTitle: 'Une plateforme de confiance',

        // Services
        servicesTitle: 'Nos services',
        servicesSubtitle: 'Des outils juridiques professionnels pour vous accompagner',

        service1Title: 'Assistant juridique',
        service1Desc: 'Posez vos questions et obtenez des informations structurées sur le cadre juridique marocain.',

        service2Title: 'Recherche de lois & articles',
        service2Desc: 'Accédez aux textes juridiques marocains de manière structurée et organisée.',

        service3Title: 'Audit interactif des contrats',
        service3Desc: 'Analysez vos contrats et identifiez les points de vigilance à considérer.',

        service4Title: 'Rédaction de contrats',
        service4Desc: 'Générez des modèles contractuels structurés à adapter avant usage.',

        learnMore: 'En savoir plus',

        // Target Audience
        audienceTitle: 'Pour qui est droitmaroc ?',
        audienceSubtitle: 'Un outil adapté à vos besoins',

        individualsTitle: 'Particuliers',
        individualsDesc: 'Comprenez votre situation juridique',
        individual1: 'Comprendre un cadre juridique',
        individual2: 'Préparer une démarche administrative',
        individual3: 'S\'informer sur ses droits et obligations',
        individual4: 'Analyser un contrat avant signature',

        professionalsTitle: 'Professionnels',
        professionalsDesc: 'Optimisez votre recherche juridique',
        professional1: 'Avocats et juristes',
        professional2: 'Magistrats',
        professional3: 'Experts-comptables',
        professional4: 'Étudiants en droit',

        // How it Works
        howItWorksTitle: 'Comment ça marche ?',
        howItWorksSubtitle: 'Trois étapes simples pour commencer',

        step1Title: 'Créez votre compte',
        step1Desc: 'Inscription simple et rapide pour accéder à tous les services.',

        step2Title: 'Posez votre question',
        step2Desc: 'Recherchez une loi, analysez un contrat, ou posez une question juridique.',

        step3Title: 'Obtenez une réponse',
        step3Desc: 'Recevez une réponse structurée avec les sources disponibles.',

        howItWorksDisclaimer: 'Les informations fournies sont à titre informatif uniquement.',

        // Trust & Compliance
        trustTitle: 'Transparence et conformité',

        disclaimerTitle: 'Avertissement important',
        disclaimerText: 'droitmaroc est un outil d\'assistance juridique et de recherche. Il ne remplace pas un avocat, un juge ou un conseil juridique personnalisé. Les informations fournies sont à titre informatif et général.',

        privacyTitle: 'Confidentialité',
        privacyText: 'Vos données personnelles et documents sont traités de manière confidentielle. Nous ne revendons pas vos informations à des tiers.',

        limitsTitle: 'Ce que l\'IA ne fait pas',
        limit1: 'Ne fournit pas de conseil juridique personnalisé',
        limit2: 'Ne remplace pas la consultation d\'un avocat',
        limit3: 'N\'aide pas à des activités illégales',
        limit4: 'Ne garantit pas l\'exhaustivité des informations',

        // FAQ
        faqTitle: 'Questions fréquentes',

        faq1Q: 'Est-ce un conseil juridique ?',
        faq1A: 'Non. droitmaroc fournit des informations juridiques générales basées sur le droit marocain. Ces informations ne constituent pas un conseil juridique personnalisé et ne remplacent pas la consultation d\'un professionnel du droit.',

        faq2Q: 'Est-ce que droitmaroc remplace un avocat ?',
        faq2A: 'Non. Notre plateforme est un outil d\'assistance et de recherche. Pour toute situation juridique complexe ou personnelle, nous recommandons de consulter un avocat ou un professionnel qualifié.',

        faq3Q: 'Quelles sources utilisez-vous ?',
        faq3A: 'Nous nous basons sur les textes juridiques marocains officiels : codes, dahirs, décrets, et jurisprudence publiée. Les sources sont citées lorsqu\'elles sont disponibles.',

        faq4Q: 'Mes documents sont-ils confidentiels ?',
        faq4A: 'Oui. Les documents que vous soumettez pour analyse sont traités de manière confidentielle et ne sont pas partagés avec des tiers. Nous ne revendons pas vos données.',

        faq5Q: 'Puis-je utiliser droitmaroc en tant que professionnel ?',
        faq5A: 'Oui. Notre plateforme est conçue pour les particuliers comme pour les professionnels (avocats, juristes, magistrats, experts-comptables). Elle sert d\'outil de recherche et de préparation.',

        faq6Q: 'Le service est-il disponible en arabe ?',
        faq6A: 'Oui. L\'interface et les réponses sont disponibles en français et en arabe. Vous pouvez changer la langue à tout moment.',

        // Final CTA
        finalCtaTitle: 'Prêt à commencer ?',
        finalCtaSubtitle: 'Créez votre compte gratuitement et accédez à tous nos services.',

        // Footer
        footerTagline: 'Votre assistant juridique pour le droit marocain',
        legalNotice: 'Mentions légales',
        privacyPolicy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation',
        contact: 'Contact',
        copyright: '© 2024 droitmaroc.ma. Tous droits réservés.',
        footerDisclaimer: 'Les informations fournies sont à titre informatif et ne constituent pas un conseil juridique.',

        // Dashboard
        welcomeBack: 'Bienvenue sur droitmaroc',

        // Legacy keys for dashboard
        featuresTitle: 'Nos services',
        featuresSubtitle: 'Outils juridiques professionnels',
        feature1Title: 'Assistant juridique',
        feature1Desc: 'Un assistant pour comprendre un cadre juridique.',
        feature2Title: 'Recherche de lois',
        feature2Desc: 'Accès structuré aux textes juridiques.',
        feature3Title: 'Rédaction de contrats',
        feature3Desc: 'Modèles contractuels structurés.',
        feature4Title: 'Audit de contrats',
        feature4Desc: 'Analyse des clauses et points de vigilance.',
        disclaimer: 'droitmaroc est un outil d\'assistance juridique et de recherche. Il ne remplace pas un avocat ou un conseil juridique personnalisé.',
        home: 'Accueil',
        searchLaws: 'Rechercher',
    },
    ar: {
        // Header
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب',
        dashboard: 'لوحة التحكم',

        // Hero
        heroTitle: 'مساعدك القانوني لفهم القانون المغربي',
        heroSubtitle: 'أداة مساعدة وبحث قانوني موجهة للأفراد والمهنيين.',
        heroCta: 'ابدأ الآن',
        heroCtaSecondary: 'اكتشف الخدمات',

        // Trust Strip
        trustMoroccanLaw: 'مبني على القانون المغربي',
        trustOfficialSources: 'مراجع ومصادر رسمية',
        trustPrivacy: 'بياناتك لا تُباع للغير',
        trustDisclaimer: 'معلومات عامة — وليست استشارة شخصية',

        // Social Proof
        socialProofTitle: 'منصة موثوقة',

        // Services
        servicesTitle: 'خدماتنا',
        servicesSubtitle: 'أدوات قانونية احترافية لمرافقتك',

        service1Title: 'المساعد القانوني',
        service1Desc: 'اطرح أسئلتك واحصل على معلومات منظمة حول الإطار القانوني المغربي.',

        service2Title: 'البحث في القوانين والمواد',
        service2Desc: 'الوصول إلى النصوص القانونية المغربية بطريقة منظمة ومرتبة.',

        service3Title: 'تدقيق العقود التفاعلي',
        service3Desc: 'حلل عقودك وحدد نقاط الانتباه التي يجب مراعاتها.',

        service4Title: 'صياغة العقود',
        service4Desc: 'أنشئ نماذج عقود منظمة يجب تكييفها قبل الاستخدام.',

        learnMore: 'اعرف المزيد',

        // Target Audience
        audienceTitle: 'لمن droitmaroc؟',
        audienceSubtitle: 'أداة مكيفة حسب احتياجاتك',

        individualsTitle: 'الأفراد',
        individualsDesc: 'افهم وضعيتك القانونية',
        individual1: 'فهم الإطار القانوني',
        individual2: 'التحضير لإجراء إداري',
        individual3: 'الاطلاع على الحقوق والواجبات',
        individual4: 'تحليل عقد قبل التوقيع',

        professionalsTitle: 'المهنيون',
        professionalsDesc: 'حسّن بحثك القانوني',
        professional1: 'المحامون والقانونيون',
        professional2: 'القضاة',
        professional3: 'الخبراء المحاسبون',
        professional4: 'طلاب القانون',

        // How it Works
        howItWorksTitle: 'كيف يعمل؟',
        howItWorksSubtitle: 'ثلاث خطوات بسيطة للبدء',

        step1Title: 'أنشئ حسابك',
        step1Desc: 'تسجيل بسيط وسريع للوصول إلى جميع الخدمات.',

        step2Title: 'اطرح سؤالك',
        step2Desc: 'ابحث عن قانون، حلل عقداً، أو اطرح سؤالاً قانونياً.',

        step3Title: 'احصل على الإجابة',
        step3Desc: 'تلقَّ إجابة منظمة مع المصادر المتاحة.',

        howItWorksDisclaimer: 'المعلومات المقدمة لأغراض معلوماتية فقط.',

        // Trust & Compliance
        trustTitle: 'الشفافية والامتثال',

        disclaimerTitle: 'تنبيه مهم',
        disclaimerText: 'droitmaroc هي أداة مساعدة وبحث قانوني. لا تعوض المحامي أو القاضي أو الاستشارة القانونية الشخصية. المعلومات المقدمة لأغراض معلوماتية وعامة.',

        privacyTitle: 'السرية',
        privacyText: 'بياناتك الشخصية ووثائقك تُعالج بسرية. لا نبيع معلوماتك للغير.',

        limitsTitle: 'ما لا يفعله الذكاء الاصطناعي',
        limit1: 'لا يقدم استشارة قانونية شخصية',
        limit2: 'لا يعوض استشارة المحامي',
        limit3: 'لا يساعد في أنشطة غير قانونية',
        limit4: 'لا يضمن شمولية المعلومات',

        // FAQ
        faqTitle: 'الأسئلة الشائعة',

        faq1Q: 'هل هذه استشارة قانونية؟',
        faq1A: 'لا. droitmaroc تقدم معلومات قانونية عامة مبنية على القانون المغربي. هذه المعلومات لا تشكل استشارة قانونية شخصية ولا تعوض استشارة مهني قانوني.',

        faq2Q: 'هل تعوض droitmaroc المحامي؟',
        faq2A: 'لا. منصتنا أداة مساعدة وبحث. لأي وضعية قانونية معقدة أو شخصية، ننصح باستشارة محامٍ أو مهني مؤهل.',

        faq3Q: 'ما هي المصادر المستخدمة؟',
        faq3A: 'نعتمد على النصوص القانونية المغربية الرسمية: المدونات، الظهائر، المراسيم، والاجتهاد القضائي المنشور. المصادر تُذكر عند توفرها.',

        faq4Q: 'هل وثائقي سرية؟',
        faq4A: 'نعم. الوثائق التي ترسلها للتحليل تُعالج بسرية ولا تُشارك مع أطراف ثالثة. لا نبيع بياناتك.',

        faq5Q: 'هل يمكنني استخدام droitmaroc كمهني؟',
        faq5A: 'نعم. منصتنا مصممة للأفراد والمهنيين (محامون، قانونيون، قضاة، خبراء محاسبون). تعمل كأداة بحث وتحضير.',

        faq6Q: 'هل الخدمة متاحة بالعربية؟',
        faq6A: 'نعم. الواجهة والإجابات متاحة بالفرنسية والعربية. يمكنك تغيير اللغة في أي وقت.',

        // Final CTA
        finalCtaTitle: 'مستعد للبدء؟',
        finalCtaSubtitle: 'أنشئ حسابك مجاناً واستفد من جميع خدماتنا.',

        // Footer
        footerTagline: 'مساعدك القانوني لفهم القانون المغربي',
        legalNotice: 'إشعارات قانونية',
        privacyPolicy: 'سياسة الخصوصية',
        terms: 'شروط الاستخدام',
        contact: 'اتصل بنا',
        copyright: '© 2024 droitmaroc.ma. جميع الحقوق محفوظة.',
        footerDisclaimer: 'المعلومات المقدمة لأغراض معلوماتية ولا تشكل استشارة قانونية.',

        // Dashboard
        welcomeBack: 'مرحباً بك في droitmaroc',

        // Legacy keys for dashboard
        featuresTitle: 'خدماتنا',
        featuresSubtitle: 'أدوات قانونية احترافية',
        feature1Title: 'المساعد القانوني',
        feature1Desc: 'مساعد لفهم الإطار القانوني.',
        feature2Title: 'البحث في القوانين',
        feature2Desc: 'وصول منظم للنصوص القانونية.',
        feature3Title: 'صياغة العقود',
        feature3Desc: 'نماذج عقود منظمة.',
        feature4Title: 'تدقيق العقود',
        feature4Desc: 'تحليل البنود ونقاط الانتباه.',
        disclaimer: 'droitmaroc أداة مساعدة وبحث قانوني. لا تعوض المحامي أو الاستشارة القانونية الشخصية.',
        home: 'الرئيسية',
        searchLaws: 'البحث',
    }
}
