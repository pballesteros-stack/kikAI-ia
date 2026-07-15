import { motion } from 'framer-motion';
import { UserCheck, Bolt, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';

const ICONS = [UserCheck, Bolt, BarChart3];

export default function DiferencialSAP() {
  const { lang } = useLanguage();
  const t = T[lang].diferencial;

  return (
    <section className="section-pad bg-sap-accent relative overflow-hidden" id="diferencial">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(255,255,255,0.12),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(0,0,0,0.2),transparent)] pointer-events-none" />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 text-white/[0.04] select-none pointer-events-none font-bold leading-none"
        style={{ fontSize: 'clamp(240px, 30vw, 400px)', lineHeight: 0.8 }}
        aria-hidden
      >
        "
      </div>

      <div className="relative z-10 container-sap">
        <motion.div
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 uppercase tracking-widest mb-8">
            {t.chip}
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 text-balance">
            {t.h2a}<br />
            <span className="text-white/70">{t.h2b}</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">{t.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-7 hover:bg-white/[0.16] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-12 h-12 mb-5">
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-md group-hover:bg-white/30 transition-all duration-300" />
                  <div className="relative w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-white text-base mb-3">{p.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}