import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, Linkedin, Clock, ArrowRight, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';

const TRUST_ICONS = [Clock, CheckCircle2, ArrowRight];

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

export default function CTAFinalSAP() {
  const { lang } = useLanguage();
  const t = T[lang].cta;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:  form.name,
          from_email: form.email,
          company:    form.company,
          message:    form.message,
        },
        EMAILJS_KEY
      );
      setSent(true);
    } catch {
      setError('No se pudo enviar el mensaje. Por favor intenta de nuevo o escríbenos directamente.');
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    'w-full bg-sap-bg border border-sap-border rounded-xl px-4 py-3 text-sm text-sap-ink placeholder-sap-muted focus:outline-none focus:ring-2 focus:ring-sap-accent2/40 focus:border-sap-accent2 transition-all duration-200';

  return (
    <section className="section-pad bg-sap-bg" id="contacto">
      <div className="container-sap">
        <div className="grid lg:grid-cols-[1fr_1.1fr] rounded-3xl overflow-hidden border border-sap-border"
             style={{ boxShadow: '0 20px 80px 0 rgb(var(--sap-accent) / 0.10)' }}>

          {/* Panel izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-sap-accent p-10 lg:p-14 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_100%,rgba(255,255,255,0.12),transparent)] pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 uppercase tracking-widest mb-8">
                {t.badge}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5 whitespace-pre-line">
                {t.h2}
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10">{t.sub}</p>

              <ul className="flex flex-col gap-4 mb-12">
                {t.trust.map((text, i) => {
                  const Icon = TRUST_ICONS[i];
                  return (
                    <li key={text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-white/70" />
                      </div>
                      <span className="text-sm text-white/70 font-medium">{text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative z-10 flex flex-col gap-3 border-t border-white/15 pt-8">
              <a
                href="mailto:rodrigo@abapcloud.cl"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <Mail size={15} />
                rodrigo@abapcloud.cl
              </a>
              <a
                href="https://linkedin.com"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={15} />
                linkedin.com/in/rodrigoarce
              </a>
            </div>
          </motion.div>

          {/* Panel derecho — formulario */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-sap-surface p-10 lg:p-14 flex flex-col justify-center"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-sap-tint border border-sap-border flex items-center justify-center">
                  <CheckCircle2 size={30} className="text-sap-accent2" />
                </div>
                <h3 className="text-xl font-bold text-sap-ink">{t.success.title}</h3>
                <p className="text-sap-slate text-sm max-w-sm leading-relaxed">{t.success.body}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-sap-slate uppercase tracking-wide">{t.form.name}</label>
                    <input id="contact-name" required type="text" placeholder={t.form.namePh}
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-sap-slate uppercase tracking-wide">{t.form.email}</label>
                    <input id="contact-email" required type="email" placeholder={t.form.emailPh}
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className={inputClass} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-sap-slate uppercase tracking-wide">{t.form.company}</label>
                  <input id="contact-company" type="text" placeholder={t.form.companyPh}
                    value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                    className={inputClass} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-sap-slate uppercase tracking-wide">
                    {t.form.challenge}
                  </label>
                  <textarea id="contact-message" rows={4}
                    placeholder={t.form.challengePh}
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`} />
                </div>

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={sending} className="btn-primary self-start group !px-8 !py-4 text-base mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
                  {sending ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      {t.form.submit}
                      <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}