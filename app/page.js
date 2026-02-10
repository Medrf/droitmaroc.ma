'use client'

import LandingHeader from '@/components/landing/LandingHeader'
import LandingHero from '@/components/landing/LandingHero'
import Services from '@/components/landing/Services'
import TargetAudience from '@/components/landing/TargetAudience'
import HowItWorks from '@/components/landing/HowItWorks'
import TrustCompliance from '@/components/landing/TrustCompliance'
import FAQ from '@/components/landing/FAQ'
import FinalCTA from '@/components/landing/FinalCTA'
import LandingFooter from '@/components/landing/LandingFooter'
import { useLanguage } from '@/lib/language'

export default function LandingPage() {
    const { language } = useLanguage()

    return (
        <div className={`min-h-screen bg-background ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
            <LandingHeader />
            <main>
                <LandingHero />
                <Services />
                <TargetAudience />
                <HowItWorks />
                <TrustCompliance />
                <FAQ />
                <FinalCTA />
            </main>
            <LandingFooter />
        </div>
    )
}
