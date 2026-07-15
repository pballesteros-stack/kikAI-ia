import { motion } from 'framer-motion';
import { Clock, Layers, Users, TrendingDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';

const ICONS = [Clock, Layers, Users, TrendingDown];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ProblemsSAP() {
  const { lang } = useLanguage();
  const t = T[lang].problems;

  return (
    <section className="section-pad bg-sap-bg" id="problemas">
      <div className="container-sap">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-chip mb-5 inline-flex">{t.chip}</span>
          <h2 className="section-title">{t.h2}</h2>
          <p className="section-sub mx-auto mt-4">{t.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.items.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={p.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                custom={i} variants={fadeUp}
                className="card-sap flex gap-5"
              >
                <div className="w-11 h-11 rounded-xl bg-sap-tint flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-sap-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-sap-ink mb-2 text-base">{p.title}</h3>
                  <p className="text-sm text-sap-slate leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}