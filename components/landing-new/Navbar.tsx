"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
const logo = "/assets/logo.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/language";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.solutions"), href: "#solutions" },
    { label: t("nav.about"), href: "#about" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-hero-bg/80 backdrop-blur-xl border-b border-hero-border"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="loidumaroc" className="h-12 w-auto object-contain brightness-0 invert" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-hero-muted hover:text-hero-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#"
            className="text-sm text-hero-muted hover:text-hero-foreground transition-colors px-4 py-2"
          >
            {t("nav.login")}
          </a>
          <a
            href="#"
            className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {t("nav.start")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-hero-foreground"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-hero-bg border-b border-hero-border px-6 pb-6"
        >
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-hero-muted hover:text-hero-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <LanguageSwitcher />
            <a
              href="#"
              className="block w-full text-center text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-lg"
            >
              {t("nav.start")}
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
