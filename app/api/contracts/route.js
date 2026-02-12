import { CONTRACT_DRAFTER_PROMPT_FR } from '@/lib/contractPrompts'

// Gemini API endpoint (native)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

export async function POST(request) {
    try {
        const { description, language = 'fr' } = await request.json()

        if (!description || typeof description !== 'string') {
            return Response.json(
                { error: 'Description is required' },
                { status: 400 }
            )
        }

        // Check if API key is configured
        if (!process.env.GEMINI_API_KEY) {
            return Response.json({
                contract: getMockContract(description, language)
            })
        }

        // Call Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: description }] }],
                systemInstruction: { parts: [{ text: CONTRACT_DRAFTER_PROMPT_FR }] },
                generationConfig: {
                    maxOutputTokens: 8192,
                    temperature: 0.3
                }
            })
        })

        if (!response.ok) {
            const error = await response.text()
            console.error('Gemini API Error:', error)
            return Response.json({
                contract: getMockContract(description, language)
            })
        }

        const data = await response.json()
        const contract = data.candidates?.[0]?.content?.parts?.[0]?.text || getMockContract(description, language)

        return Response.json({ contract })

    } catch (error) {
        console.error('Contract API Error:', error)
        return Response.json(
            { error: 'Erreur lors de la génération du contrat' },
            { status: 500 }
        )
    }
}

function getMockContract(description, language) {
    const isArabic = language === 'ar' || /[\u0600-\u06FF]/.test(description)

    if (isArabic) {
        return `نموذج عقد تم إنشاؤه بالذكاء الاصطناعي – يجب التحقق منه قبل التوقيع

═══════════════════════════════════════════════════════════════
عقد [يُستكمل نوع العقد]
═══════════════════════════════════════════════════════════════

بين الموقعين أدناه:

الطرف الأول:
السيد/السيدة: [يُستكمل]
العنوان: [يُستكمل]
رقم البطاقة الوطنية: [يُستكمل]
يشار إليه فيما بعد بـ "الطرف الأول"

الطرف الثاني:
السيد/السيدة: [يُستكمل]
العنوان: [يُستكمل]
رقم البطاقة الوطنية: [يُستكمل]
يشار إليه فيما بعد بـ "الطرف الثاني"

تم الاتفاق على ما يلي:

المادة 1: موضوع العقد
[يُستكمل وصف الموضوع بناءً على: ${description}]

المادة 2: التزامات الطرف الأول
[يُستكمل]

المادة 3: التزامات الطرف الثاني
[يُستكمل]

المادة 4: المدة
يسري هذا العقد ابتداءً من تاريخ توقيعه لمدة [يُستكمل].

المادة 5: المقابل المالي
[يُستكمل]

المادة 6: السرية
يلتزم الطرفان بالحفاظ على سرية جميع المعلومات المتعلقة بهذا العقد.

المادة 7: القانون الواجب التطبيق
يخضع هذا العقد للقانون المغربي، وتختص المحاكم المغربية بالنظر في أي نزاع ينشأ عنه.

المادة 8: الإنهاء
يمكن لأي من الطرفين إنهاء هذا العقد بإشعار كتابي مدته [يُستكمل] يوماً.

حُرر في [يُستكمل المدينة]، بتاريخ [يُستكمل]
في نسختين أصليتين.

الطرف الأول                    الطرف الثاني
[التوقيع]                      [التوقيع]

═══════════════════════════════════════════════════════════════

هذه الوثيقة نموذج عقد تم إعداده تلقائياً، ويُنصح بالتحقق منه قبل الاستعمال.

نموذج عقد تم إنشاؤه بالذكاء الاصطناعي – يجب التحقق منه قبل التوقيع`
    }

    return `MODÈLE DE CONTRAT – GÉNÉRÉ PAR IA – À VÉRIFIER AVANT SIGNATURE

═══════════════════════════════════════════════════════════════
CONTRAT DE [À COMPLÉTER]
═══════════════════════════════════════════════════════════════

ENTRE LES SOUSSIGNÉS :

PARTIE 1 :
Monsieur/Madame : [À compléter]
Adresse : [À compléter]
CIN : [À compléter]
Ci-après dénommé(e) « la Première Partie »

ET

PARTIE 2 :
Monsieur/Madame : [À compléter]
Adresse : [À compléter]
CIN : [À compléter]
Ci-après dénommé(e) « la Deuxième Partie »

IL A ÉTÉ CONVENU CE QUI SUIT :

ARTICLE 1 : OBJET DU CONTRAT
[À compléter selon la description : ${description}]

ARTICLE 2 : OBLIGATIONS DE LA PREMIÈRE PARTIE
[À compléter]

ARTICLE 3 : OBLIGATIONS DE LA DEUXIÈME PARTIE
[À compléter]

ARTICLE 4 : DURÉE
Le présent contrat prend effet à compter de sa signature pour une durée de [À compléter].

ARTICLE 5 : CONDITIONS FINANCIÈRES
[À compléter]

ARTICLE 6 : CONFIDENTIALITÉ
Les parties s'engagent à considérer comme strictement confidentielles toutes les informations relatives au présent contrat.

ARTICLE 7 : DONNÉES PERSONNELLES
Les parties s'engagent à respecter la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.

ARTICLE 8 : DROIT APPLICABLE ET JURIDICTION COMPÉTENTE
Le présent contrat est régi par le droit marocain. Tout litige sera soumis aux tribunaux marocains compétents.

ARTICLE 9 : RÉSILIATION
Chaque partie peut résilier le contrat moyennant un préavis écrit de [À compléter] jours.

ARTICLE 10 : FORCE MAJEURE
Aucune des parties ne sera tenue responsable de l'inexécution de ses obligations en cas de force majeure.

Fait à [À compléter], le [À compléter]
En deux exemplaires originaux.

PREMIÈRE PARTIE                    DEUXIÈME PARTIE
[Signature]                        [Signature]

═══════════════════════════════════════════════════════════════

Ce document est un modèle contractuel rédigé automatiquement. Il est recommandé de le faire vérifier avant utilisation.

MODÈLE DE CONTRAT – GÉNÉRÉ PAR IA – À VÉRIFIER AVANT SIGNATURE`
}
