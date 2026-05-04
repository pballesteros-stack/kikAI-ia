import { SITE, PRODUCT_SPECS } from '../config/site';

export const ProductEnd = () => {
  return (
    <footer className="relative min-h-[50vh] w-full bg-KIKIAI-black border-t border-KIKIAI-cream/10 flex flex-col justify-between py-12 px-6">

      <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden">
        {/* Large watermark brand name */}
        <h1 className="font-headline text-[15vw] leading-none text-KIKIAI-cream opacity-10 uppercase tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mix-blend-overlay">
          {SITE.name}
        </h1>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm font-body tracking-[0.2em] uppercase text-KIKIAI-cream/60">
          <div className="flex flex-col gap-2">
            <h4 className="text-KIKIAI-orange mb-4 font-bold">SPECS</h4>
            {PRODUCT_SPECS.map(({ label, value }) => (
              <span key={label}>{label}: {value}</span>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-KIKIAI-orange mb-4 font-bold">LEGAL</h4>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
            <span>Not actual AI inside</span>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-KIKIAI-orange mb-4 font-bold">SOCIALS</h4>
            <span>Instagram</span>
            <span>Twitter / X</span>
            <span>LinkedIn</span>
            <span>MySpace</span>
          </div>

          <div className="flex flex-col justify-end items-end h-full">
            <div className="w-24 h-24 border border-KIKIAI-cream/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <span className="text-[10px]">DIAGRAM A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-end border-t border-KIKIAI-cream/10 pt-8 mt-12 font-body text-xs text-KIKIAI-cream/40 px-4">
        <div>{SITE.copyright}</div>
        <div>{SITE.footerCredit}</div>
      </div>

    </footer>
  );
};
