'use client'

import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { LanguageProvider } from '@/lib/language'

export default function RootLayout({ children }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <html lang="fr" dir="ltr" suppressHydrationWarning>
                <head>
                    <title>droitmaroc.ma | Informations Juridiques Marocaines</title>
                    <meta name="description" content="Plateforme d'informations juridiques générales basées sur le cadre juridique marocain. Guides juridiques, audit de contrats, rédaction de documents." />
                    <meta name="keywords" content="droit marocain, قانون مغربي, informations juridiques, contrats, audit, droitmaroc" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href="https://droitmaroc.ma" />
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
