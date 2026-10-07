import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import aboutBannerImg from '../assets/hero/about_woman_tablet_stylus.jpg';

export default function About({ onOpenModal }) {
  const containerRef = useRef(null);

  const highlights = [
    { label: 'Client Satisfaction', value: '99.8%' },
    { label: 'Projects Delivered', value: '2,450+' },
    { label: 'Global Partners', value: '50+' },
    { label: 'Uptime Reliability', value: '99.99%' },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-12 sm:py-16 md:py-20 w-full bg-white text-slate-900 font-sans antialiased selection:bg-[#284e51] selection:text-white"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 space-y-10 sm:space-y-14">
        
        {/* ─────────────────────────────────────────────────────────────
            MAIN PANORAMIC CARD BANNER MATCHING REFERENCE DESIGN
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px] rounded-[28px] sm:rounded-[38px] md:rounded-[48px] overflow-hidden shadow-2xl flex items-center group"
        >
          {/* Background Image */}
          <img
            src={aboutBannerImg}
            alt="Ryphira Team - Growing your brand together"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Dark Contrast Gradient Overlay on Left Side */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10 sm:to-transparent z-10" />

          {/* Content Overlay */}
          <div className="relative z-20 w-full max-w-[650px] p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between h-full">
            
            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4 my-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.12] tracking-tight">
                Let’s grow your<br />
                brand together!
              </h2>

              {/* Small Size Words / About Content Description */}
              <p className="text-white/85 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed max-w-[480px]">
                We partner with ambitious leaders and forward-thinking enterprises to architect world-class software, generative AI systems, and tech education that create lasting impact.
              </p>
            </div>

            {/* Bottom Action Pill Button */}
            <div>
              <button
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg hover:bg-slate-100 hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer group/btn"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 text-slate-900 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>


        {/* ─────────────────────────────────────────────────────────────
            METRICS & HIGHLIGHTS GRID
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#f8fafc] border border-slate-200/70 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-center hover:border-[#284e51]/40 hover:shadow-md transition-all"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
