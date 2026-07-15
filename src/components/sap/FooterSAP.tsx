import { Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { T } from '../../i18n/translations';
import { LogoMarkDark } from './LogoSAP';

export default function FooterSAP() {
  const { lang } = useLanguage();
  const t = T[lang].footer;
  const nav = T[lang].nav;

  return (
    <footer className="bg-sap-deep text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex flex-col gap-3 mb-4">
              <LogoMarkDark height={38} />
              <p className="text-white/50 text-xs font-medium">Rodrigo Herrera</p>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">{t.brandDesc}</p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">{t.navTitle}</p>
            <ul className="flex flex-col gap-3">
              {nav.links.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/40 hover:text-white transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">{t.contactTitle}</p>
            <div className="flex flex-col gap-3">
              <a href="mailto:rodrigo@abapcloud.cl"
                className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors duration-200">
                <Mail size={15} className="text-sap-accent2" />
                rodrigo@abapcloud.cl
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors duration-200">
                <Linkedin size={15} className="text-sap-accent2" />
                linkedin.com/in/rodrigoarce
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Rodrigo Herrera — ABAPCLOUD. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-white/20">{t.copy}</p>
        </div>
      </div>
    </footer>
  );
}