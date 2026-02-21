"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/language";

const PrecisionSection = () => {
  const { t } = useLanguage();

  const points = [
    t("precision.p1"),
    t("precision.p2"),
    t("precision.p3"),
    t("precision.p4"),
  ];

  return (
    <section className="hero-dark bg-grid relative overflow-hidden py-24 px-6">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            {t("precision.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("precision.title")}
          </h2>
          <p className="hero-muted text-lg leading-relaxed">
            {t("precision.subtitle")}
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
        >
          {points.map((point) => (
            <li key={point} className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
              </div>
              <span className="text-lg">{point}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default PrecisionSection;
