const logo = "/assets/logo.png";
import { useLanguage } from "@/lib/language";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12 px-6 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex items-center gap-2">
          <img src={logo} alt="loidumaroc" className="h-12 w-auto object-contain" />
        </div>
        <nav className="flex flex-wrap gap-8 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">{t("footer.about")}</a>
          <a href="#features" className="hover:text-foreground transition-colors">{t("footer.platform")}</a>
          <a href="#" className="hover:text-foreground transition-colors">{t("footer.contact")}</a>
          <a href="#" className="hover:text-foreground transition-colors">{t("footer.legal")}</a>
          <a href="#" className="hover:text-foreground transition-colors">{t("footer.privacy")}</a>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} loidumaroc. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
