import { motion } from "framer-motion";
import { User, Briefcase, Building2 } from "lucide-react";
import { useLanguage } from "@/lib/language";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AudienceSection = () => {
  const { t } = useLanguage();

  const audiences = [
    { icon: User, titleKey: "audience.individual.title", descKey: "audience.individual.desc" },
    { icon: Briefcase, titleKey: "audience.pro.title", descKey: "audience.pro.desc" },
    { icon: Building2, titleKey: "audience.enterprise.title", descKey: "audience.enterprise.desc" },
  ];

  return (
    <section id="solutions" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            {t("audience.label")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("audience.title")}
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {audiences.map((a) => (
            <motion.div
              key={a.titleKey}
              variants={item}
              className="text-center p-8 rounded-xl border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <a.icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {t(a.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(a.descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AudienceSection;
