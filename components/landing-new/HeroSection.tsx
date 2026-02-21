import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
const dashboardMockup = "/assets/dashboard-mockup.png";
import { useLanguage } from "@/lib/language";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-dark bg-grid relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium hero-card-bg border rounded-full px-4 py-1.5 text-hero-muted">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {t("hero.badge")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-3xl mb-6"
        >
          {t("hero.title1")}{" "}
          <span className="text-primary">{t("hero.title2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl hero-muted max-w-xl mb-10 leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity glow-primary"
          >
            {t("hero.cta1")} <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 hero-card-bg border border-hero-border font-medium text-sm px-6 py-3 rounded-lg hover:border-hero-muted/50 transition-colors text-hero-foreground"
          >
            {t("hero.cta2")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-xl overflow-hidden border border-hero-border glow-primary"
        >
          <img
            src={dashboardMockup}
            alt={t("hero.img_alt")}
            className="w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hero-bg/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
