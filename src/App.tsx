import { LanguageProvider } from './context/LanguageContext';
import NavSAP        from './components/sap/NavSAP';
import HeroSAP       from './components/sap/HeroSAP';
import ValorSAP      from './components/sap/ValorSAP';
import GaleriaSAP    from './components/sap/GaleriaSAP';
import ProblemsSAP   from './components/sap/ProblemsSAP';
import ServicesSAP   from './components/sap/ServicesSAP';
import DiferencialSAP from './components/sap/DiferencialSAP';
import MetodologiaSAP from './components/sap/MetodologiaSAP';
import CasosUsoSAP    from './components/sap/CasosUsoSAP';
import FAQSAP         from './components/sap/FAQSAP';
import CTAFinalSAP   from './components/sap/CTAFinalSAP';
import FooterSAP     from './components/sap/FooterSAP';
import ThemeToggle   from './components/sap/ThemeToggle';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-sap-bg">
        <NavSAP />
        <main>
          <HeroSAP />
          <ValorSAP />
          <GaleriaSAP />
          <ProblemsSAP />
          <ServicesSAP />
          <DiferencialSAP />
          <MetodologiaSAP />
          <CasosUsoSAP />
          <FAQSAP />
          <CTAFinalSAP />
        </main>
        <FooterSAP />
        <ThemeToggle />
      </div>
    </LanguageProvider>
  );
}

export default App;