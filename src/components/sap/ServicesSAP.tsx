import { motion } from 'framer-motion';
import {
  Code2, Cloud, MonitorSmartphone, Workflow, Database, Bot,
  LayoutGrid, ShieldCheck, Webhook, ClipboardCheck, Network,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';

const ICONS = [
  Code2, Cloud, MonitorSmartphone, Workflow, Database, Bot,
  LayoutGrid, ShieldCheck, Webhook, ClipboardCheck, Network,
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: (i % 6) * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ServicesSAP() {
  const { lang } = useLanguage();
  const t = T[lang].services;

  return (
    <section className="section-pad bg-sap-surface" id="servicios">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={s.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                custom={i} variants={fadeUp}
                className="card-sap flex flex-col hover:-translate-y-1.5 transition-transform duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-sap-tint flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-sap-accent" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-sap-muted">{s.number}</span>
                </div>
                <h3 className="text-lg font-bold text-sap-ink mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-sap-slate leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
