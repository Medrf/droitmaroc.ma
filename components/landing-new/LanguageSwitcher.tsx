"use client";
import { useLanguage } from "@/lib/language";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
      className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span>{lang === "fr" ? "العربية" : "Français"}</span>
    </button>
  );
};

export default LanguageSwitcher;
