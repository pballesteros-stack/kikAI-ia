import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';
import { LogoMark } from './LogoSAP';


export default function NavSAP() {
  const { lang, setLang } = useLanguage();
  const t = T[lang].nav;
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
      >
        <div className="container-sap">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex flex-col items-start group">
              <LogoMark height={46} />
              <p className="text-[10px] text-sap-muted font-medium tracking-wide mt-0.5 hidden sm:block">
                Rodrigo Herrera
              </p>
            </a>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-8">
              {t.links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-sap-slate hover:text-sap-accent font-medium transition-colors duration-200"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Language toggle */}
              <div className="flex items-center gap-1 text-xs font-bold">
                <button
                  onClick={() => setLang('es')}
                  className={`transition-colors duration-200 ${lang === 'es' ? 'text-sap-accent' : 'text-sap-muted hover:text-sap-slate'}`}
                >
                  ES
                </button>
                <span className="text-sap-border">|</span>
                <button
                  onClick={() => setLang('en')}
                  className={`transition-colors duration-200 ${lang === 'en' ? 'text-sap-accent' : 'text-sap-muted hover:text-sap-slate'}`}
                >
                  EN
                </button>
              </div>

              <a href="#contacto" className="hidden md:block btn-primary !py-2.5 !px-5">
                {t.cta}
              </a>
              <button
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Menú"
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-sap-tint transition-colors text-sap-ink"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 bg-sap-bg border-b border-sap-border shadow-lg md:hidden"
          >
            <div className="container-sap py-4 flex flex-col gap-1">
              {t.links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-2 text-sap-ink font-medium text-sm border-b border-sap-border last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-3 bg-sap-accent text-white text-sm font-semibold px-5 py-3 rounded-xl text-center"
              >
                {t.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}