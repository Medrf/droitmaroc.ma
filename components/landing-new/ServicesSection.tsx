"use client";
import { motion } from "framer-motion";
import { Search, FileText, PenTool, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/language";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Search, titleKey: "services.ai.title", descKey: "services.ai.desc" },
    { icon: FileText, titleKey: "services.search.title", descKey: "services.search.desc" },
    { icon: PenTool, titleKey: "services.draft.title", descKey: "services.draft.desc" },
    { icon: ShieldCheck, titleKey: "services.audit.title", descKey: "services.audit.desc" },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            {t("services.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("services.title")}
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.titleKey}
              variants={item}
              className="group bg-card border border-border rounded-xl p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
