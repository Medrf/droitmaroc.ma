import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language";

const CtaSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-28 px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
          {t("cta.title1")}
          <br />
          {t("cta.title2")}
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
          {t("cta.subtitle")}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-7 py-3.5 rounded-lg hover:opacity-90 transition-opacity glow-primary"
          >
            {t("cta.btn1")} <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-border font-medium text-sm px-7 py-3.5 rounded-lg hover:bg-secondary transition-colors text-foreground"
          >
            {t("cta.btn2")}
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
