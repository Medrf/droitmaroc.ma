import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { LanguageProvider } from '@/lib/language'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata = {
    title: {
        template: '%s | Loidumaroc.ma',
        default: 'Loidumaroc.ma | L\'Assistant Juridique IA Marocain (المساعد القانوني المغربي)',
    },
    description: 'La première plateforme d\'intelligence artificielle juridique au Maroc. Obtenez des réponses précises sur le Code du travail, Code pénal, et générez des contrats professionnels en quelques secondes. | أول منصة للذكاء الاصطناعي القانوني في المغرب.',
    keywords: [
        'Droit Marocain', 'Maroc', 'Intelligence Artificielle', 'IA Juridique', 'Avocat IA',
        'Contrats', 'Code du travail', 'Code pénal', 'CF', 'DOC', 'Juriste',
        'قانون مغربي', 'ذكاء اصطناعي', 'عقود', 'مدونة الأسرة', 'مدونة الشغل', 'المحامي الذكي'
    ],
    authors: [{ name: 'Loidumaroc.ma Team' }],
    creator: 'Loidumaroc.ma',
    publisher: 'Loidumaroc.ma',
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
        title: 'Loidumaroc.ma | L\'Assistant Juridique IA Marocain',
        description: 'Votre expert juridique disponible 24/7. Réponses instantanées sur le droit marocain, génération de contrats et audit juridique par IA.',
        url: 'https://Loidumaroc.ma',
        siteName: 'Loidumaroc.ma',
        locale: 'fr_MA',
        type: 'website',
        images: [
            {
                url: '/logo.png', // Ideally should be a 1200x630 OG image, using logo as fallback
                width: 800,
                height: 600,
                alt: 'Loidumaroc.ma Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Loidumaroc.ma | L\'IA Juridique Marocaine',
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
                <body className="antialiased bg-background text-foreground min-h-screen">
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                        <LanguageProvider>
                            {children}
                        </LanguageProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider >
    )
}
