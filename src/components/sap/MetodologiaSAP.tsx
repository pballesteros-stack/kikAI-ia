import { motion } from 'framer-motion';
import { Search, Map, Play, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';

const ICONS = [Search, Map, Play, TrendingUp];

export default function MetodologiaSAP() {
  const { lang } = useLanguage();
  const t = T[lang].metodologia;

  return (
    <section className="section-pad bg-sap-bg" id="metodologia">
      <div className="container-sap">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="label-chip mb-5 inline-flex">{t.chip}</span>
          <h2 className="section-title">{t.h2}</h2>
          <p className="section-sub mx-auto mt-4">{t.sub}</p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-11 left-[12.5%] right-[12.5%] h-px">
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-sap-border via-sap-accent2/50 to-sap-border origin-left"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {t.steps.map((step, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div
                    className="relative z-10 w-[88px] h-[88px] rounded-full bg-gradient-to-br from-sap-accent2 to-sap-accent group-hover:scale-105 transition-transform duration-300 flex items-center justify-center mb-6"
                    style={{ boxShadow: '0 8px 24px 0 rgb(var(--sap-accent) / 0.25)' }}
                  >
                    <Icon size={28} className="text-white" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-sap-bg border-2 border-sap-border text-sap-accent text-[11px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="font-bold text-sap-ink text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-sap-slate leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}