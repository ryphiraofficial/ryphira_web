import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const customerStories = [
  {
    id: 1,
    name: 'Adithya Mary',
    company: 'ENTERPRISE SOLUTIONS',
    quote: 'Ryphira delivered an exceptional software solution that transformed our business operations. Their team’s expertise and dedication are unmatched.',
  },
  {
    id: 2,
    name: 'Akansh S',
    company: 'TECH FOUNDER',
    quote: 'The programming education I received at Ryphira was world-class. It prepared me perfectly for launching my own tech startup.',
  },
  {
    id: 3,
    name: 'Nithin Paulson',
    company: 'DIGITAL INNOVATIONS',
    quote: 'Working with Ryphira was a game-changer. They delivered on time, within budget, and exceeded all our expectations.',
  },
  {
    id: 4,
    name: 'Sunil Kumar',
    company: 'GLOBAL PLATFORMS',
    quote: 'Ryphira’s innovative approach to software development helped us scale our platform to serve millions of users globally.',
  },
  {
    id: 5,
    name: 'Sarun K.S',
    company: 'SOFTWARE ENGINEER',
    quote: 'Thanks to Ryphira’s comprehensive training program, I successfully transitioned from marketing to software development.',
  },
  {
    id: 6,
    name: 'Sajna Sherin',
    company: 'CLOUD ARCHITECTURE',
    quote: 'The quality of code and architecture design from Ryphira is outstanding. They truly understand enterprise-level requirements.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);
  const [stepWidth, setStepWidth] = useState(340);
  
  // Total cards to cycle through
  const totalCards = customerStories.length;
  const maxStep = totalCards - 1;

  // Measure exact distance between cards for 100% accurate sliding on all screens
  useEffect(() => {
    const updateStepWidth = () => {
      if (trackRef.current && trackRef.current.children.length > 1) {
        const card0 = trackRef.current.children[0];
        const card1 = trackRef.current.children[1];
        const diff = card1.offsetLeft - card0.offsetLeft;
        if (diff > 0) {
          setStepWidth(diff);
          return;
        }
      }
      if (trackRef.current?.children[0]) {
        setStepWidth(trackRef.current.children[0].offsetWidth + 20);
      }
    };

    updateStepWidth();
    // Run after fonts/layout settle
    const timeout = setTimeout(updateStepWidth, 150);
    window.addEventListener('resize', updateStepWidth);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateStepWidth);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxStep));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxStep ? prev + 1 : 0));
  };

  // Auto-advance loop every 2.5 seconds
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxStep ? prev + 1 : 0));
    }, 2500);

    return () => clearInterval(timer);
  }, [isHovered, maxStep]);

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 md:py-32 w-full bg-white text-slate-900 font-sans antialiased selection:bg-[#5356e8] selection:text-white border-t border-slate-100 overflow-hidden"
    >
      <div className="w-full">
        
        {/* ─────────────────────────────────────────────────────────────
            SPLIT LAYOUT:
            LEFT: Pure White Background with Giant Watermark Quote + Title + Arrows
            RIGHT: Vibrant Purple/Blue Background with Floating White Testimonial Cards
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[520px] items-stretch relative"
        >
          
          {/* ─────────────────────────────────────────────────────────
              LEFT COLUMN (White Side ~32% width)
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 bg-white px-6 sm:px-12 lg:px-16 py-10 sm:py-16 flex flex-col justify-center relative z-20">
            
            {/* Giant Watermark Decorative Quote in Background */}
            <div className="absolute top-2 sm:top-6 left-4 sm:left-10 text-[#edf0ff] select-none pointer-events-none opacity-85 -z-10">
              <svg
                width="160"
                height="140"
                viewBox="0 0 100 80"
                fill="currentColor"
                className="w-28 h-24 sm:w-40 sm:h-32"
              >
                <path d="M0 48C0 21.49 17.5 0 40 0v16c-13.25 0-24 10.75-24 24h24v40H0V48zm60 0C60 21.49 77.5 0 100 0v16c-13.25 0-24 10.75-24 24h24v40H60V48z" />
              </svg>
            </div>

            {/* Heading: Customers Stories */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#5356e8] tracking-tight">
                Customers
              </h2>
              <p className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-400 tracking-tight">
                Stories
              </p>
            </div>

            {/* Arrow Navigation Buttons */}
            <div className="flex items-center gap-3 pt-8 sm:pt-10">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-800 flex items-center justify-center text-slate-700 hover:text-slate-950 transition-all cursor-pointer active:scale-95 shadow-xs"
                aria-label="Previous customer story"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#5356e8] hover:bg-[#4346d8] flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-md shadow-indigo-500/20"
                aria-label="Next customer story"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dot Indicator */}
            <div className="flex items-center gap-1.5 pt-4">
              {Array.from({ length: totalCards }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i ? 'w-6 bg-[#5356e8]' : 'w-1.5 bg-slate-200'
                  }`}
                />
              ))}
            </div>

          </div>


          {/* ─────────────────────────────────────────────────────────
              RIGHT COLUMN (Vibrant Periwinkle / Indigo-Blue ~68% width)
          ───────────────────────────────────────────────────────── */}
          <div
            className="lg:col-span-8 bg-[#5c60f5] rounded-3xl sm:rounded-none sm:rounded-l-[48px] py-10 sm:py-16 px-4 sm:pl-10 md:pl-14 lg:pl-16 sm:pr-8 overflow-hidden flex items-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Sliding Track for White Testimonial Cards */}
            <div className="w-full overflow-hidden">
              <motion.div
                ref={trackRef}
                animate={{ x: -currentIndex * stepWidth }}
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                className="flex items-center gap-4 sm:gap-6 md:gap-8 w-max will-change-transform py-4"
              >
                {customerStories.map((story, sIdx) => (
                  <motion.div
                    key={story.id}
                    onClick={() => setCurrentIndex(sIdx)}
                    whileHover={{ y: -6 }}
                    className={`w-[calc(100vw-64px)] max-w-[340px] sm:w-[320px] md:w-[350px] min-h-[190px] sm:min-h-[210px] bg-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] flex flex-col justify-start gap-3.5 sm:gap-4 shrink-0 border transition-all duration-300 cursor-pointer ${
                      currentIndex === sIdx ? 'border-indigo-400 ring-2 ring-white/50' : 'border-white/60 opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Card Top: Name + Company */}
                    <div className="flex flex-col">
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-tight">
                        {story.name}
                      </h3>
                      <span className="text-[11px] font-bold text-[#5356e8] uppercase tracking-wider mt-1">
                        {story.company}
                      </span>
                    </div>

                    {/* Card Body: Quote */}
                    <p className="text-slate-600 text-xs sm:text-sm md:text-[14px] leading-relaxed font-normal">
                      "{story.quote}"
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
