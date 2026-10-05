import React from 'react';
import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import FooterBottom from './FooterBottom';

export default function Footer() {
  return (
    <footer id="footer" className="relative w-full bg-white text-slate-900 border-t border-slate-200 pt-20 pb-12 px-6 sm:px-12 overflow-hidden z-10">
      {/* Background Watermark Text */}
      <div className="absolute bottom-4 right-4 pointer-events-none select-none opacity-[0.03]">
        <span className="text-[120px] sm:text-[180px] font-black tracking-tighter text-slate-900 leading-none font-sans uppercase">
          RYPHIRA
        </span>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <FooterBrand />
          </div>
          <div className="lg:col-span-6">
            <FooterLinks />
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <FooterBottom />
      </div>
    </footer>
  );
}
