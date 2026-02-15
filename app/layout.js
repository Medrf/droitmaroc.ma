import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { LanguageProvider } from '@/lib/language'

export const metadata = {
    title: {
        template: '%s | DroitMaroc.ma',
        default: 'DroitMaroc.ma | L\'Assistant Juridique IA Marocain (المساعد القانوني المغربي)',
    },
    description: 'La première plateforme d\'intelligence artificielle juridique au Maroc. Obtenez des réponses précises sur le Code du travail, Code pénal, et générez des contrats professionnels en quelques secondes. | أول منصة للذكاء الاصطناعي القانوني في المغرب.',
    keywords: [
        'Droit Marocain', 'Maroc', 'Intelligence Artificielle', 'IA Juridique', 'Avocat IA',
        'Contrats', 'Code du travail', 'Code pénal', 'CF', 'DOC', 'Juriste',
        'قانون مغربي', 'ذكاء اصطناعي', 'عقود', 'مدونة الأسرة', 'مدونة الشغل', 'المحامي الذكي'
    ],
    authors: [{ name: 'DroitMaroc.ma Team' }],
    creator: 'DroitMaroc.ma',
    publisher: 'DroitMaroc.ma',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: '/logo.png',
        shortcut: '/logo.png',
        apple: '/logo.png',
    },
    openGraph: {
        title: 'DroitMaroc.ma | L\'Assistant Juridique IA Marocain',
        description: 'Votre expert juridique disponible 24/7. Réponses instantanées sur le droit marocain, génération de contrats et audit juridique par IA.',
        url: 'https://droitmaroc.ma',
        siteName: 'DroitMaroc.ma',
        locale: 'fr_MA',
        type: 'website',
        images: [
            {
                url: '/logo.png', // Ideally should be a 1200x630 OG image, using logo as fallback
                width: 800,
                height: 600,
                alt: 'DroitMaroc.ma Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DroitMaroc.ma | L\'IA Juridique Marocaine',
        description: 'L\'expert juridique IA pour le Maroc. Réponses fiables et contrats instantanés.',
        images: ['/logo.png'],
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({ children }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <html lang="fr" dir="ltr" suppressHydrationWarning>
                <head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet" />
                </head>
                <body className="antialiased bg-slate-900 text-slate-100 min-h-screen">
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </body>
            </html>
        </ClerkProvider >
    )
}
