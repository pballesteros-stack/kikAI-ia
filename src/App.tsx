import { Navigation, HeroKikAI, ConceptSection, PortabilityCarousel, ThermalSection, GripSection, ProductEnd } from './components';

function App() {
  return (
    <div className="min-h-screen">
      {/* Cinematic film grain overlay — defined in index.css */}
      <div className="film-grain" />

      <Navigation />

      <main>
        <HeroKikAI />
        <ConceptSection />
        <PortabilityCarousel />
        <ThermalSection />
        <GripSection />
      </main>

      <ProductEnd />
    </div>
  );
}

export default App;
