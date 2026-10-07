import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Code2, Cpu, Cloud } from 'lucide-react';

// Brand & Tech Assets
import heroTechImg from '../assets/hero/hero_tech_transparent.png';
import techCardCloud from '../assets/hero/tech_card_cloud.jpg';
import techCardAi from '../assets/hero/tech_card_ai.jpg';
import techCardSaas from '../assets/hero/tech_card_saas.jpg';
import techBadgeCode from '../assets/hero/tech_badge_code.jpg';
import badgeLightning from '../assets/hero/badge_lightning.jpg';
import badgeNightSky from '../assets/hero/badge_night_sky.jpg';
import badgeMountain from '../assets/hero/badge_mountain.jpg';

export default function Hero({ onOpenModal }) {
  const [email, setEmail] = useState('alex@company.com');
  const [submitted, setSubmitted] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        if (onOpenModal) onOpenModal();
        setSubmitted(false);
      }, 700);
    }
  };

  const featuredSolutions = [
    {
      id: 1,
      title: 'Cloud Architecture Monitor',
      category: 'Ryphira DevOps',
      tag: 'Real-time',
      image: techCardCloud,
      icon: Cloud,
    },
    {
      id: 2,
      title: 'AI Neural Engine',
      category: 'Ryphira AI Labs',
      tag: 'v2.4 LLM',
      image: techCardAi,
      icon: Cpu,
    },
    {
      id: 3,
      title: 'SaaS Analytics Platform',
      category: 'Ryphira Engineering',
      tag: 'Scale',
      image: techCardSaas,
      icon: Code2,
    },
  ];

  const popularServices = [
    {
      rank: 1,
      title: 'Custom Software & Web Apps',
      metric: '2,450+ projects delivered',
    },
    {
      rank: 2,
      title: 'Generative AI & LLM Systems',
      metric: '1,820+ models deployed',
    },
    {
      rank: 3,
      title: 'Cloud Architecture & DevOps',
      metric: '99.99% uptime guaranteed',
    },
  ];

  return (
    <section id="home" className="w-full bg-white font-sans antialiased text-slate-900 selection:bg-[#284e51] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          UPPER HERO CARD WITH SOFT LIGHT-GRAY BACKGROUND & ROUNDED BOTTOM
      ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#eaedf0] rounded-b-[36px] sm:rounded-b-[50px] md:rounded-b-[64px] pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 overflow-hidden relative">
        <div className="max-w-[1360px] mx-auto">

          {/* HERO MAIN BODY: 2 COLUMNS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative">
            
            {/* LEFT COLUMN: Main Typography, Subtitle & Email Input */}
            <div className="lg:col-span-6 flex flex-col justify-center z-10 pt-2 sm:pt-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px] font-extrabold text-[#1c2c36] leading-[1.08] tracking-tight"
              >
                Software<br />
                that helps you<br />
                scale faster
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-[430px] mt-4 sm:mt-6"
              >
                We engineer scalable custom software, generative AI systems, and cloud architectures engineered to accelerate enterprise growth.
              </motion.p>

              {/* Email Input Bar with Dot Matrix Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mt-8 sm:mt-12 max-w-[480px]"
              >
                {/* Dot Matrix Decoration Behind Input */}
                <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 grid grid-cols-6 gap-2 sm:gap-2.5 opacity-30 pointer-events-none -z-10">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-slate-500" />
                  ))}
                </div>

                {/* Floating White Pill Input Form */}
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-full p-2 sm:p-2.5 pl-6 sm:pl-8 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100/90 flex items-center justify-between gap-3 relative z-10"
                >
                  <div className="flex flex-col flex-1 min-w-0 pr-2">
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-normal">
                      Your work email
                    </span>
                    <input
                      id="hero-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      required
                      className="text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none bg-transparent w-full truncate placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#284e51] hover:bg-[#1f3f41] text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all shrink-0 cursor-pointer shadow-md shadow-[#284e51]/20 hover:shadow-lg active:scale-95 flex items-center gap-1.5"
                  >
                    {submitted ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300 animate-bounce" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <span>Get Started</span>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Transparent Tech Cutout, Curved Lines & Floating Circular Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center mt-8 lg:mt-0 min-h-[380px] sm:min-h-[460px] md:min-h-[520px]">
              
              {/* SVG Sound Wave / Tech Connection Curved Lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                <svg
                  viewBox="0 0 720 460"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full max-w-[850px] opacity-70"
                >
                  {/* Wave Line 1 */}
                  <path
                    d="M -40 150 C 120 75, 230 230, 420 160 C 560 100, 680 170, 760 140"
                    stroke="#94a3b8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Wave Line 2 */}
                  <path
                    d="M -40 175 C 130 100, 240 255, 430 185 C 570 125, 690 195, 760 165"
                    stroke="#94a3b8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Wave Line 3 */}
                  <path
                    d="M -40 200 C 140 125, 250 280, 440 210 C 580 150, 700 220, 760 190"
                    stroke="#94a3b8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* 4 Floating Circular Badges */}
              
              {/* Badge 1: Top-Left (Code Syntax Screen) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-6 sm:left-10 top-6 sm:top-8 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-white shadow-xl overflow-hidden z-20 cursor-pointer hover:scale-110 transition-transform bg-slate-900"
                title="TypeScript & React Stack"
              >
                <img
                  src={techBadgeCode}
                  alt="Code Syntax"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>

              {/* Badge 2: Bottom-Left (Lightning Cloud Matrix) */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute left-2 sm:left-4 top-[50%] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-xl overflow-hidden z-20 cursor-pointer hover:scale-110 transition-transform bg-slate-900"
                title="High-Speed Processing"
              >
                <img
                  src={badgeLightning}
                  alt="Cloud Speed"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>

              {/* Badge 3: Top-Right (Cosmic Network Nodes) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute right-10 sm:right-16 top-4 sm:top-6 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full border-2 border-white shadow-xl overflow-hidden z-20 cursor-pointer hover:scale-110 transition-transform bg-slate-900"
                title="Global Distributed Architecture"
              >
                <img
                  src={badgeNightSky}
                  alt="Global Network"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>

              {/* Badge 4: Bottom-Right (Peak Scale) */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                className="absolute right-0 sm:right-4 top-[50%] w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full border-2 border-white shadow-xl overflow-hidden z-20 cursor-pointer hover:scale-110 transition-transform bg-slate-900"
                title="Enterprise Scaling"
              >
                <img
                  src={badgeMountain}
                  alt="Enterprise Scale"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>

              {/* Center Focal Photo: Transparent Cutout of Engineer with Laptop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative z-10 max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[510px] pointer-events-none"
              >
                <img
                  src={heroTechImg}
                  alt="Ryphira Software Engineer building scalable software"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>
            </div>

          </div>

        </div>
      </div>


      {/* ─────────────────────────────────────────────────────────────
          BOTTOM SECTION ON CLEAN WHITE BACKGROUND:
          Featured Solutions (Left) & Popular Services (Right)
      ───────────────────────────────────────────────────────────── */}
      <div id="services" className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
        >
          
          {/* LEFT: Featured Solutions (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col">
            <h2 className="text-lg sm:text-xl font-bold text-[#1c2c36] tracking-tight mb-5 sm:mb-6">
              Featured Solutions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {featuredSolutions.map((item) => {
                const isActive = activeCard === item.id;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -4 }}
                    className="group cursor-pointer flex flex-col"
                    onClick={() => {
                      setActiveCard(isActive ? null : item.id);
                      if (onOpenModal) onOpenModal();
                    }}
                  >
                    {/* Thumbnail with Tag Badge */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-sm group-hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                      
                      {/* Hover Arrow Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <ArrowUpRight className="w-5 h-5 text-[#284e51]" />
                        </div>
                      </div>

                      {/* Tag Pill in Bottom Right */}
                      <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/10">
                        {item.tag}
                      </div>
                    </div>

                    {/* Metadata */}
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-2.5 group-hover:text-[#284e51] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {item.category}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Popular Services (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col pl-0 lg:pl-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#1c2c36] tracking-tight mb-5 sm:mb-6">
              Popular Services
            </h2>

            <div className="flex flex-col gap-4 sm:gap-5">
              {popularServices.map((service) => (
                <div
                  key={service.rank}
                  className="flex items-center gap-4 group cursor-pointer p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                  onClick={() => onOpenModal && onOpenModal()}
                >
                  {/* Number Badge (1), (2), (3) */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-300 group-hover:border-[#284e51] group-hover:text-[#284e51] flex items-center justify-center text-xs sm:text-sm font-semibold text-slate-700 shrink-0 transition-colors">
                    {service.rank}
                  </div>

                  {/* Title & Metrics */}
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#284e51] transition-colors truncate">
                      {service.title}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                      {service.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
