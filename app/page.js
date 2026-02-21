'use client'

import Navbar from "@/components/landing-new/Navbar";
import HeroSection from "@/components/landing-new/HeroSection";
import AboutSection from "@/components/landing-new/AboutSection";
import ServicesSection from "@/components/landing-new/ServicesSection";
import AudienceSection from "@/components/landing-new/AudienceSection";
import PrecisionSection from "@/components/landing-new/PrecisionSection";
import CtaSection from "@/components/landing-new/CtaSection";
import Footer from "@/components/landing-new/Footer";
import { useLanguage } from "@/lib/language";

export default function LandingPage() {
    const { language } = useLanguage();

    return (
        <div className={`min-h-screen bg-background text-foreground ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
            <Navbar />
            <main>
                <HeroSection />
                <AboutSection />
                <div id="services">
                    <ServicesSection />
                </div>
                <AudienceSection />
                <PrecisionSection />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
