import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';

export default function HeroSAP() {
  const { lang } = useLanguage();
  const t = T[lang].hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sap-bg">

      {/* Imagen de fondo */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.24] contrast-[1.4]"
        style={{ backgroundImage: 'url(/hero-bg.png)' }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      />

      <div className="absolute inset-0 bg-grid opacity-60" />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-sap-accent2 blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute -bottom-60 -right-40 w-[600px] h-[600px] rounded-full bg-sap-accent blur-[160px] pointer-events-none"
      />

      <div className="relative z-10 container-sap text-center pt-32 pb-28">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex"
        >
          <span className="label-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-sap-accent2 animate-pulse" />
            {t.badge}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-[88px] font-bold text-sap-ink leading-[1.02] tracking-tight mb-6 text-balance"
        >
          {t.h1a}<br />
          <span className="text-sap-accent">{t.h1b}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg md:text-xl text-sap-slate max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a href="#contacto" className="btn-primary group text-base !px-8 !py-4">
            {t.cta1}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a href="#servicios" className="btn-ghost text-base">{t.cta2}</a>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-20"
        >
          {t.proof.map(text => (
            <div
              key={text}
              className="flex items-center gap-2 bg-sap-bg border border-sap-border rounded-full px-4 py-2 text-xs text-sap-slate font-medium shadow-sm"
            >
              <CheckCircle2 size={13} className="text-sap-accent2 shrink-0" />
              {text}
            </div>
          ))}
        </motion.div>

        {/* Métricas flotantes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {t.floats.map(({ label, value }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="card-sap !p-5 flex flex-col items-center"
            >
              <span className="text-3xl font-bold text-sap-accent tracking-tight">{value}</span>
              <span className="text-xs text-sap-muted mt-1 font-medium">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-sap-surface to-transparent pointer-events-none" />
    </section>
  );
}