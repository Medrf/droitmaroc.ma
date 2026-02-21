"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            {t("about.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
            {t("about.title1")}
            <br />
            {t("about.title2")}
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("about.text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
