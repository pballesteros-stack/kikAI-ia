import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ValorSAP() {
  const { lang } = useLanguage();
  const t = T[lang].valor;

  return (
    <section className="section-pad bg-sap-surface" id="valor">
      <div className="container-sap">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
              <span className="label-chip mb-6 inline-flex">{t.chip}</span>
            </motion.div>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              custom={1} variants={fadeUp}
              className="section-title mb-6 text-balance"
            >
              {t.h2a}{' '}
              <span className="text-sap-accent">{t.h2b}</span>
            </motion.h2>
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              custom={2} variants={fadeUp}
              className="section-sub mb-8"
            >
              {t.body}
            </motion.p>
            <motion.a
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              custom={3} variants={fadeUp}
              href="#contacto" className="btn-primary inline-flex"
            >
              {t.cta}
            </motion.a>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {t.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                custom={i + 1} variants={fadeUp}
                className="card-sap flex flex-col justify-between gap-3"
              >
                <span className="text-4xl lg:text-5xl font-bold text-sap-accent tracking-tight">
                  {s.value}
                </span>
                <span className="text-sm text-sap-slate font-medium leading-snug">{s.label}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}