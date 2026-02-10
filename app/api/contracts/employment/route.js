import { EMPLOYMENT_CONTRACT_PROMPT, EMPLOYMENT_CONTRACT_PROMPT_AR, EMPLOYMENT_WATERMARK, EMPLOYMENT_DISCLAIMER } from '@/lib/employmentContracts'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function POST(request) {
    try {
        const body = await request.json()
        const { contractType, details, language = 'fr' } = body

        // Validate required fields
        if (!contractType || contractType.trim().length < 2) {
            return Response.json(
                {
                    error: language === 'ar'
                        ? 'يرجى تحديد نوع عقد العمل'
                        : 'Veuillez préciser le type de contrat de travail'
                },
                { status: 400 }
            )
        }

        // Check if API key exists
        if (!process.env.GROQ_API_KEY) {
            return Response.json({
                contract: getMockEmploymentContract(language, contractType, details),
                disclaimer: EMPLOYMENT_DISCLAIMER[language],
                watermark: EMPLOYMENT_WATERMARK[language]
            })
        }

        // Select prompt based on language
        const systemPrompt = language === 'ar' ? EMPLOYMENT_CONTRACT_PROMPT_AR : EMPLOYMENT_CONTRACT_PROMPT

        // Build user prompt
        const userPrompt = language === 'ar'
            ? `أنشئ عقد شغل كامل واحترافي من النوع التالي:\n\nنوع العقد: ${contractType}\n\nتفاصيل إضافية: ${details || 'لا توجد تفاصيل إضافية'}\n\nأنشئ العقد الكامل الآن مع جميع المواد. استخدم [يُستكمل] للمعلومات الناقصة.`
            : `Générez un contrat de travail complet et professionnel du type suivant:\n\nType de contrat: ${contractType}\n\nDétails supplémentaires: ${details || 'Aucun détail supplémentaire'}\n\nGénérez le contrat COMPLET maintenant avec tous les articles. Utilisez [À compléter] pour les informations manquantes.`

        // Call Groq API
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile', // Updated to supported model
                max_tokens: 2000,         // Contract settings: 2000 tokens
                temperature: 0.25,        // Specific legal creativity balance
                top_p: 0.95,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ]
            })
        })

        if (!response.ok) {
            const error = await response.text()
            console.error('Groq API Error:', error)
            return Response.json({
                contract: getMockEmploymentContract(language, contractType, details),
                disclaimer: EMPLOYMENT_DISCLAIMER[language],
                watermark: EMPLOYMENT_WATERMARK[language]
            })
        }

        const data = await response.json()
        const generatedContract = data.choices?.[0]?.message?.content || ''

        return Response.json({
            contract: generatedContract,
            disclaimer: EMPLOYMENT_DISCLAIMER[language],
            watermark: EMPLOYMENT_WATERMARK[language]
        })

    } catch (error) {
        console.error('Employment Contract Error:', error)
        return Response.json(
            { error: 'Erreur lors de la génération du contrat | حدث خطأ أثناء إنشاء العقد' },
            { status: 500 }
        )
    }
}

function getMockEmploymentContract(language, contractType, details) {
    if (language === 'ar') {
        return `نموذج عقد – تم إنشاؤه تلقائياً – يجب تكييفه قبل التوقيع

═══════════════════════════════════════════════════════════════

عقد شغل ${contractType.includes('محدد') ? 'محدد المدة' : 'غير محدد المدة'}

═══════════════════════════════════════════════════════════════

المادة 1: تعريف الأطراف

المشغل:
التسمية: [يُستكمل]
الشكل القانوني: [يُستكمل: شركة ذات مسؤولية محدودة، شركة مساهمة، إلخ]
المقر الاجتماعي: [يُستكمل]
السجل التجاري: [يُستكمل]
الممثل القانوني: [يُستكمل]
يُشار إليه فيما بعد بـ "المشغل"

الأجير:
الاسم الكامل: [يُستكمل]
رقم البطاقة الوطنية: [يُستكمل]
العنوان: [يُستكمل]
تاريخ الازدياد: [يُستكمل]
الوضعية العائلية: [يُستكمل]
يُشار إليه فيما بعد بـ "الأجير"

───────────────────────────────────────────────────────────────

المادة 2: المراجع القانونية

يخضع هذا العقد لمقتضيات مدونة الشغل المغربية (القانون رقم 65-99) والنصوص التنظيمية المتخذة لتطبيقها.

───────────────────────────────────────────────────────────────

المادة 3: موضوع العقد والوظيفة

يُوظف الأجير للقيام بمهام: [يُستكمل: المسمى الوظيفي]

تشمل المهام الرئيسية:
- [يُستكمل]
- [يُستكمل]
- [يُستكمل]
${details ? `\nتفاصيل إضافية: ${details}` : ''}

───────────────────────────────────────────────────────────────

المادة 4: مكان العمل

يُمارس الأجير عمله بـ: [يُستكمل: عنوان مقر العمل]

───────────────────────────────────────────────────────────────

المادة 5: مدة العقد

نوع العقد: ${contractType.includes('محدد') ? 'محدد المدة' : 'غير محدد المدة'}
تاريخ بدء العمل: [يُستكمل]
${contractType.includes('محدد') ? 'تاريخ انتهاء العقد: [يُستكمل]' : ''}

───────────────────────────────────────────────────────────────

المادة 6: فترة الاختبار

تُحدد فترة الاختبار بـ: [يُستكمل] أشهر
يمكن لأي من الطرفين إنهاء العقد خلال فترة الاختبار دون إشعار مسبق ودون تعويض.

───────────────────────────────────────────────────────────────

المادة 7: وقت العمل والمواعيد

مدة العمل الأسبوعية: [يُستكمل] ساعة (في حدود 44 ساعة أسبوعياً)
أيام العمل: من [يُستكمل] إلى [يُستكمل]
أوقات العمل: من [يُستكمل] إلى [يُستكمل]

───────────────────────────────────────────────────────────────

المادة 8: الأجر

الراتب الشهري الإجمالي: [يُستكمل] درهم
طريقة الأداء: [يُستكمل: تحويل بنكي / شيك / نقداً]
تاريخ الأداء: [يُستكمل: نهاية كل شهر]

العلاوات:
- علاوة الأقدمية: حسب مدونة الشغل
- [يُستكمل: علاوات أخرى إن وجدت]

───────────────────────────────────────────────────────────────

المادة 9: الإجازات والتغيبات

يستفيد الأجير من:
- إجازة سنوية مؤدى عنها: يوم ونصف عن كل شهر عمل فعلي
- أيام العطل الرسمية المحددة قانوناً
- رخص التغيب المنصوص عليها في مدونة الشغل

───────────────────────────────────────────────────────────────

المادة 10: الحماية الاجتماعية

يُسجل الأجير لدى الصندوق الوطني للضمان الاجتماعي (CNSS).
يستفيد من التغطية الصحية الإجبارية (AMO).

───────────────────────────────────────────────────────────────

المادة 11: الالتزامات المهنية

يلتزم الأجير بـ:
- تنفيذ مهامه بإخلاص وعناية
- احترام النظام الداخلي للمقاولة
- الحفاظ على ممتلكات المشغل
- التقيد بتعليمات المسؤولين

───────────────────────────────────────────────────────────────

المادة 12: السرية والتحفظ

يلتزم الأجير بالحفاظ على سرية جميع المعلومات المتعلقة بالمقاولة.
يستمر هذا الالتزام بعد انتهاء علاقة الشغل.

───────────────────────────────────────────────────────────────

المادة 13: إنهاء العقد

يمكن إنهاء العقد وفقاً لمقتضيات مدونة الشغل:
- بالاستقالة مع احترام أجل الإخطار
- بالفصل مع احترام المسطرة القانونية
- باتفاق الطرفين

أجل الإخطار: حسب الأقدمية وفقاً للقانون

───────────────────────────────────────────────────────────────

المادة 14: القانون المطبق والاختصاص القضائي

يخضع هذا العقد للقانون المغربي.
تختص المحاكم المغربية بالنظر في أي نزاع قد ينشأ عنه.

───────────────────────────────────────────────────────────────

المادة 15: لغة العقد

حُرر هذا العقد باللغة العربية.

───────────────────────────────────────────────────────────────

المادة 16: التوقيعات

حُرر في نسختين أصليتين، لكل طرف نسخة.

المكان: [يُستكمل]
التاريخ: [يُستكمل]

المشغل                                    الأجير
الختم والتوقيع                            قرأت ووافقت
                                          التوقيع

═══════════════════════════════════════════════════════════════

هذه الوثيقة نموذج عقد للاستخدام الإعلامي.

نموذج عقد – تم إنشاؤه تلقائياً – يجب تكييفه قبل التوقيع`
    }

    return `Modèle de contrat – Généré automatiquement – À adapter avant signature

═══════════════════════════════════════════════════════════════

CONTRAT DE TRAVAIL À DURÉE ${contractType.toLowerCase().includes('déterminée') || contractType.toLowerCase().includes('cdd') ? 'DÉTERMINÉE' : 'INDÉTERMINÉE'}

═══════════════════════════════════════════════════════════════

ARTICLE 1 : IDENTIFICATION DES PARTIES

L'EMPLOYEUR :
Dénomination sociale : [À compléter]
Forme juridique : [À compléter : SARL, SA, etc.]
Siège social : [À compléter]
Registre de Commerce : [À compléter]
Identifiant Fiscal : [À compléter]
Représenté par : [À compléter], en qualité de [À compléter]
Ci-après dénommé « l'Employeur »

LE SALARIÉ :
Nom et prénom : [À compléter]
CIN : [À compléter]
Adresse : [À compléter]
Date de naissance : [À compléter]
Situation familiale : [À compléter]
Ci-après dénommé « le Salarié »

───────────────────────────────────────────────────────────────

ARTICLE 2 : RÉFÉRENCES LÉGALES

Le présent contrat est régi par les dispositions du Code du travail marocain (Loi n° 65-99) et ses textes d'application.

───────────────────────────────────────────────────────────────

ARTICLE 3 : OBJET DU CONTRAT ET FONCTION

Le Salarié est engagé en qualité de : [À compléter : intitulé du poste]

Ses principales fonctions comprennent :
- [À compléter]
- [À compléter]
- [À compléter]
${details ? `\nDétails supplémentaires : ${details}` : ''}

───────────────────────────────────────────────────────────────

ARTICLE 4 : LIEU DE TRAVAIL

Le Salarié exercera ses fonctions à : [À compléter : adresse du lieu de travail]

───────────────────────────────────────────────────────────────

ARTICLE 5 : DURÉE DU CONTRAT

Type de contrat : ${contractType.toLowerCase().includes('déterminée') || contractType.toLowerCase().includes('cdd') ? 'Contrat à Durée Déterminée (CDD)' : 'Contrat à Durée Indéterminée (CDI)'}
Date de prise d'effet : [À compléter]
${contractType.toLowerCase().includes('déterminée') || contractType.toLowerCase().includes('cdd') ? 'Date de fin : [À compléter]' : ''}

───────────────────────────────────────────────────────────────

ARTICLE 6 : PÉRIODE D'ESSAI

La période d'essai est fixée à : [À compléter] mois
Pendant cette période, chaque partie peut mettre fin au contrat sans préavis ni indemnité.

Pour les cadres : 3 mois renouvelables une fois
Pour les employés : 1 mois et demi renouvelable une fois
Pour les ouvriers : 15 jours renouvelables une fois

───────────────────────────────────────────────────────────────

ARTICLE 7 : TEMPS DE TRAVAIL ET HORAIRES

Durée hebdomadaire de travail : [À compléter] heures (maximum légal : 44 heures)
Jours de travail : du [À compléter] au [À compléter]
Horaires : de [À compléter] à [À compléter]

───────────────────────────────────────────────────────────────

ARTICLE 8 : RÉMUNÉRATION

Salaire mensuel brut : [À compléter] dirhams
Mode de paiement : [À compléter : virement bancaire / chèque / espèces]
Périodicité : [À compléter : fin de chaque mois]

Primes et avantages :
- Prime d'ancienneté : selon le Code du travail
- [À compléter : autres primes éventuelles]

───────────────────────────────────────────────────────────────

ARTICLE 9 : CONGÉS ET ABSENCES

Le Salarié bénéficie de :
- Congés payés : 1,5 jour ouvrable par mois de travail effectif
- Jours fériés légaux
- Permissions d'absence prévues par le Code du travail

───────────────────────────────────────────────────────────────

ARTICLE 10 : PROTECTION SOCIALE

Le Salarié est affilié à la Caisse Nationale de Sécurité Sociale (CNSS).
Il bénéficie de l'Assurance Maladie Obligatoire (AMO).

───────────────────────────────────────────────────────────────

ARTICLE 11 : OBLIGATIONS PROFESSIONNELLES

Le Salarié s'engage à :
- Exécuter ses fonctions avec loyauté et diligence
- Respecter le règlement intérieur de l'entreprise
- Préserver les biens et équipements de l'Employeur
- Se conformer aux directives de sa hiérarchie

───────────────────────────────────────────────────────────────

ARTICLE 12 : CONFIDENTIALITÉ ET DISCRÉTION

Le Salarié s'engage à maintenir la confidentialité de toutes les informations relatives à l'entreprise.
Cette obligation perdure après la fin de la relation de travail.

───────────────────────────────────────────────────────────────

ARTICLE 13 : RÉSILIATION DU CONTRAT

Le contrat peut être résilié conformément aux dispositions du Code du travail :
- Par démission avec respect du préavis
- Par licenciement selon la procédure légale
- Par accord mutuel des parties

Préavis : selon l'ancienneté conformément à la loi

───────────────────────────────────────────────────────────────

ARTICLE 14 : DROIT APPLICABLE ET JURIDICTION COMPÉTENTE

Le présent contrat est soumis au droit marocain.
Les tribunaux marocains compétents sont seuls habilités à connaître de tout litige.

───────────────────────────────────────────────────────────────

ARTICLE 15 : LANGUE DU CONTRAT

Le présent contrat est rédigé en langue française.

───────────────────────────────────────────────────────────────

ARTICLE 16 : SIGNATURES

Fait en deux exemplaires originaux, un pour chaque partie.

Lieu : [À compléter]
Date : [À compléter]

L'EMPLOYEUR                               LE SALARIÉ
Cachet et signature                       Lu et approuvé
                                          Signature

═══════════════════════════════════════════════════════════════

Ce document est un modèle contractuel à usage informatif.

Modèle de contrat – Généré automatiquement – À adapter avant signature`
}
