import { CONTRACT_SYSTEM_PROMPT, DISCLAIMERS, WATERMARKS } from '@/lib/contracts'

// OpenRouter API endpoint
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function POST(request) {
    try {
        const body = await request.json()

        const {
            contractRequest,
            language = 'fr'
        } = body

        // Validate required fields
        if (!contractRequest || contractRequest.trim().length < 5) {
            return Response.json(
                {
                    error: language === 'ar'
                        ? 'يرجى وصف نوع العقد المطلوب'
                        : 'Veuillez décrire le type de contrat souhaité'
                },
                { status: 400 }
            )
        }

        // Check if API key exists
        if (!process.env.OPENROUTER_API_KEY) {
            // Return mock contract for demo
            return Response.json({
                contract: getMockContract(language, contractRequest),
                disclaimer: DISCLAIMERS[language],
                watermark: WATERMARKS[language]
            })
        }

        // --- CREDIT CHECK ---
        const { currentUser } = await import('@clerk/nextjs/server')
        const { deductCredits } = await import('@/lib/credits')

        const user = await currentUser()

        if (user) {
            const deduction = await deductCredits(user.id, 3, 'contract_gen') // Cost: 3 credits

            if (!deduction.success) {
                if (deduction.error === 'PAYWALL') {
                    return Response.json(
                        {
                            error: language === 'ar' ? 'نفذت رصيدك اليومي' : 'Crédits quotidiens épuisés',
                            code: 'PAYWALL'
                        },
                        { status: 402 }
                    )
                }
            }
        }

        // Build user prompt
        const userPrompt = `Generate a complete professional contract for the following request:

"${contractRequest}"

Language: ${language === 'ar' ? 'Arabic (العربية الفصحى)' : 'French'}

Generate the FULL contract now with all articles. Use placeholders for any missing specific information.`

        // Call OpenRouter API
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://Loidumaroc.ma', // Optional, for OpenRouter rankings
                'X-Title': 'Moroccan Legal AI', // Optional
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-001',
                messages: [
                    { role: 'system', content: CONTRACT_SYSTEM_PROMPT },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.25,
                top_p: 0.95,
                max_tokens: 4000
            })
        })

        if (!response.ok) {
            const error = await response.text()
            console.error('OpenRouter API Error:', error)
            throw new Error(`API request failed: ${error}`)
        }

        const data = await response.json()
        const generatedContract = data.choices?.[0]?.message?.content || ''

        return Response.json({
            contract: generatedContract,
            disclaimer: DISCLAIMERS[language],
            watermark: WATERMARKS[language]
        })

    } catch (error) {
        console.error('Contract Generation Error:', error)
        return Response.json(
            {
                error: `Une erreur s'est produite lors de la génération du contrat | حدث خطأ أثناء إنشاء العقد. Détails: ${error.message}`
            },
            { status: 500 }
        )
    }
}

function getMockContract(language, contractRequest) {
    if (language === 'ar') {
        return `وثيقة تم إنشاؤها بالذكاء الاصطناعي – نسخة غير معتمدة

═══════════════════════════════════════════════════════════════

عقد ${contractRequest}

═══════════════════════════════════════════════════════════════

المادة الأولى: تعريف الأطراف

الطرف الأول:
الاسم/التسمية: [يُستكمل: الاسم الكامل أو التسمية التجارية]
الشكل القانوني: [يُستكمل: شركة ذات مسؤولية محدودة، شخص ذاتي، إلخ]
العنوان: [يُستكمل: العنوان الكامل]
السجل التجاري: [يُستكمل: رقم السجل التجاري]
الممثل القانوني: [يُستكمل: اسم الممثل القانوني]
المشار إليه فيما بعد بـ "الطرف الأول"

الطرف الثاني:
الاسم/التسمية: [يُستكمل: الاسم الكامل أو التسمية التجارية]
الشكل القانوني: [يُستكمل: شركة ذات مسؤولية محدودة، شخص ذاتي، إلخ]
العنوان: [يُستكمل: العنوان الكامل]
السجل التجاري: [يُستكمل: رقم السجل التجاري]
الممثل القانوني: [يُستكمل: اسم الممثل القانوني]
المشار إليه فيما بعد بـ "الطرف الثاني"

───────────────────────────────────────────────────────────────

المادة الثانية: موضوع العقد

يهدف هذا العقد إلى تحديد الشروط والأحكام المتعلقة بـ ${contractRequest}.

[يُستكمل: وصف تفصيلي لموضوع العقد]

───────────────────────────────────────────────────────────────

المادة الثالثة: الثمن وشروط الأداء

المبلغ الإجمالي: [يُستكمل: المبلغ بالأرقام والحروف] درهم مغربي
طريقة الأداء: [يُستكمل: نقداً، شيك، تحويل بنكي]
جدول الأداء: [يُستكمل: دفعة واحدة، أقساط شهرية، إلخ]

───────────────────────────────────────────────────────────────

المادة الرابعة: المدة والسريان

يدخل هذا العقد حيز التنفيذ ابتداءً من تاريخ توقيعه.
المدة: [يُستكمل: محددة/غير محددة]
تاريخ البدء: [يُستكمل: التاريخ]
تاريخ الانتهاء: [يُستكمل: التاريخ أو "غير محدد"]

───────────────────────────────────────────────────────────────

المادة الخامسة: التزامات الطرف الأول

يلتزم الطرف الأول بما يلي:
- [يُستكمل: الالتزام الأول]
- [يُستكمل: الالتزام الثاني]
- [يُستكمل: الالتزام الثالث]

───────────────────────────────────────────────────────────────

المادة السادسة: التزامات الطرف الثاني

يلتزم الطرف الثاني بما يلي:
- [يُستكمل: الالتزام الأول]
- [يُستكمل: الالتزام الثاني]
- [يُستكمل: الالتزام الثالث]

───────────────────────────────────────────────────────────────

المادة السابعة: التسليم والتنفيذ

مكان التسليم/التنفيذ: [يُستكمل: العنوان]
تاريخ التسليم: [يُستكمل: التاريخ]
شروط القبول: [يُستكمل: معايير القبول]

───────────────────────────────────────────────────────────────

المادة الثامنة: المسؤولية والضمانات

يضمن كل طرف تنفيذ التزاماته بحسن نية ووفقاً لقواعد المهنة.
مدة الضمان: [يُستكمل: المدة إن وجدت]
حدود المسؤولية: [يُستكمل: السقف الأقصى للتعويض]

───────────────────────────────────────────────────────────────

المادة التاسعة: السرية

يتعهد الطرفان بالحفاظ على سرية جميع المعلومات المتبادلة في إطار هذا العقد.
تسري هذا الالتزام لمدة [يُستكمل: المدة] بعد انتهاء العقد.

───────────────────────────────────────────────────────────────

المادة العاشرة: الملكية الفكرية

تظل جميع حقوق الملكية الفكرية المتعلقة بـ [يُستكمل: الموضوع] ملكاً لـ [يُستكمل: الطرف المعني].

───────────────────────────────────────────────────────────────

المادة الحادية عشرة: حماية المعطيات الشخصية

يلتزم الطرفان باحترام المقتضيات المتعلقة بحماية المعطيات الشخصية وفقاً للقانون المغربي رقم 09-08.

───────────────────────────────────────────────────────────────

المادة الثانية عشرة: الإنهاء

يمكن إنهاء هذا العقد في الحالات التالية:
- باتفاق الطرفين
- بإخطار كتابي مسبق بمدة [يُستكمل: المدة]
- في حالة إخلال جوهري بالالتزامات

───────────────────────────────────────────────────────────────

المادة الثالثة عشرة: القوة القاهرة

لا يُسأل أي طرف عن عدم تنفيذ التزاماته في حالة القوة القاهرة وفقاً للقانون المغربي.

───────────────────────────────────────────────────────────────

المادة الرابعة عشرة: الإشعارات

ترسل جميع الإشعارات والمراسلات إلى العناوين المذكورة أعلاه.
تعتبر المراسلة مستلمة خلال [يُستكمل: المدة] من تاريخ الإرسال.

───────────────────────────────────────────────────────────────

المادة الخامسة عشرة: القانون المطبق والاختصاص القضائي

يخضع هذا العقد للقانون المغربي.
في حالة نزاع، تكون المحاكم المغربية المختصة هي الوحيدة المؤهلة للبت فيه.

───────────────────────────────────────────────────────────────

المادة السادسة عشرة: لغة العقد

حُرر هذا العقد باللغة العربية.

───────────────────────────────────────────────────────────────

المادة السابعة عشرة: التوقيعات

حُرر في نسختين أصليتين، لكل طرف نسخة.

المكان: [يُستكمل: المدينة]
التاريخ: [يُستكمل: التاريخ]

الطرف الأول                              الطرف الثاني
الاسم:                                   الاسم:
التوقيع:                                 التوقيع:

═══════════════════════════════════════════════════════════════

وثيقة تم إنشاؤها بالذكاء الاصطناعي – نسخة غير معتمدة

هذا العقد نموذج تم إنشاؤه تلقائياً لأغراض معلوماتية فقط ولا يُعتبر استشارة قانونية.`
    }

    return `DOCUMENT GÉNÉRÉ PAR IA – VERSION NON CERTIFIÉE

═══════════════════════════════════════════════════════════════

CONTRAT DE ${contractRequest.toUpperCase()}

═══════════════════════════════════════════════════════════════

ARTICLE 1 : IDENTIFICATION DES PARTIES

PREMIÈRE PARTIE :
Dénomination : [À compléter : nom complet ou raison sociale]
Forme juridique : [À compléter : SARL, SA, personne physique, etc.]
Adresse : [À compléter : adresse complète]
Registre de Commerce : [À compléter : numéro RC]
Identifiant Fiscal : [À compléter : numéro IF]
Représentant légal : [À compléter : nom du représentant]
Ci-après dénommée "la Première Partie"

DEUXIÈME PARTIE :
Dénomination : [À compléter : nom complet ou raison sociale]
Forme juridique : [À compléter : SARL, SA, personne physique, etc.]
Adresse : [À compléter : adresse complète]
Registre de Commerce : [À compléter : numéro RC]
Identifiant Fiscal : [À compléter : numéro IF]
Représentant légal : [À compléter : nom du représentant]
Ci-après dénommée "la Deuxième Partie"

───────────────────────────────────────────────────────────────

ARTICLE 2 : OBJET DU CONTRAT

Le présent contrat a pour objet de définir les termes et conditions relatifs à ${contractRequest}.

[À compléter : description détaillée de l'objet du contrat]

───────────────────────────────────────────────────────────────

ARTICLE 3 : PRIX ET MODALITÉS FINANCIÈRES

Montant total : [À compléter : montant en chiffres et en lettres] dirhams marocains
Mode de paiement : [À compléter : espèces, chèque, virement bancaire]
Échéancier : [À compléter : paiement unique, mensualités, etc.]

───────────────────────────────────────────────────────────────

ARTICLE 4 : DURÉE ET ENTRÉE EN VIGUEUR

Le présent contrat entre en vigueur à compter de sa signature.
Durée : [À compléter : déterminée/indéterminée]
Date de début : [À compléter : date]
Date de fin : [À compléter : date ou "indéterminée"]

───────────────────────────────────────────────────────────────

ARTICLE 5 : OBLIGATIONS DE LA PREMIÈRE PARTIE

La Première Partie s'engage à :
- [À compléter : obligation 1]
- [À compléter : obligation 2]
- [À compléter : obligation 3]

───────────────────────────────────────────────────────────────

ARTICLE 6 : OBLIGATIONS DE LA DEUXIÈME PARTIE

La Deuxième Partie s'engage à :
- [À compléter : obligation 1]
- [À compléter : obligation 2]
- [À compléter : obligation 3]

───────────────────────────────────────────────────────────────

ARTICLE 7 : LIVRAISON / EXÉCUTION / RÉCEPTION

Lieu de livraison/exécution : [À compléter : adresse]
Date de livraison : [À compléter : date]
Conditions de réception : [À compléter : critères d'acceptation]

───────────────────────────────────────────────────────────────

ARTICLE 8 : RESPONSABILITÉ ET GARANTIES

Chaque partie garantit l'exécution de ses obligations de bonne foi et conformément aux règles de l'art.
Durée de garantie : [À compléter : durée si applicable]
Plafond de responsabilité : [À compléter : montant maximum des dommages]

───────────────────────────────────────────────────────────────

ARTICLE 9 : CONFIDENTIALITÉ

Les parties s'engagent à maintenir la confidentialité de toutes les informations échangées dans le cadre du présent contrat.
Cette obligation perdure pendant une durée de [À compléter : durée] après la fin du contrat.

───────────────────────────────────────────────────────────────

ARTICLE 10 : PROPRIÉTÉ INTELLECTUELLE

Tous les droits de propriété intellectuelle relatifs à [À compléter : objet] demeurent la propriété de [À compléter : partie concernée].

───────────────────────────────────────────────────────────────

ARTICLE 11 : PROTECTION DES DONNÉES PERSONNELLES

Les parties s'engagent à respecter les dispositions relatives à la protection des données personnelles conformément à la loi marocaine n° 09-08.

───────────────────────────────────────────────────────────────

ARTICLE 12 : RÉSILIATION

Le présent contrat peut être résilié dans les cas suivants :
- Par accord mutuel des parties
- Par notification écrite préalable d'une durée de [À compléter : durée]
- En cas de manquement grave aux obligations

───────────────────────────────────────────────────────────────

ARTICLE 13 : FORCE MAJEURE

Aucune partie ne sera tenue responsable de l'inexécution de ses obligations en cas de force majeure telle que définie par le droit marocain.

───────────────────────────────────────────────────────────────

ARTICLE 14 : NOTIFICATIONS

Toutes les notifications et correspondances seront adressées aux adresses mentionnées ci-dessus.
Une notification sera réputée reçue dans un délai de [À compléter : durée] à compter de son envoi.

───────────────────────────────────────────────────────────────

ARTICLE 15 : DROIT APPLICABLE ET JURIDICTION COMPÉTENTE

Le présent contrat est soumis au droit marocain.
En cas de litige, les tribunaux marocains compétents seront seuls habilités à en connaître.

───────────────────────────────────────────────────────────────

ARTICLE 16 : LANGUE DU CONTRAT

Le présent contrat est rédigé en langue française.

───────────────────────────────────────────────────────────────

ARTICLE 17 : SIGNATURES

Fait en deux exemplaires originaux, un pour chaque partie.

Lieu : [À compléter : ville]
Date : [À compléter : date]

La Première Partie                       La Deuxième Partie
Nom :                                    Nom :
Signature :                              Signature :

═══════════════════════════════════════════════════════════════

DOCUMENT GÉNÉRÉ PAR IA – VERSION NON CERTIFIÉE

Ce contrat est un modèle généré automatiquement à titre informatif. Il ne constitue pas une consultation juridique.`
}
