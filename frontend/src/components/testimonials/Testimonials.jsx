import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Avatars from assets
import avatar1 from '../../assets/hero/team/team_1.jpg';
import avatar2 from '../../assets/hero/team/team_2.jpg';
import avatar3 from '../../assets/hero/team/team_3.jpg';
import avatar4 from '../../assets/hero/team/team_4.jpg';
import avatar5 from '../../assets/hero/team/team_5.jpg';
import avatar6 from '../../assets/hero/team/team_6.jpg';

export const customerStories = [
  {
    id: 1,
    name: 'Andrew Norris',
    company: 'ADROLL',
    avatar: avatar1,
    quote: 'Huge fan of Ryphira, it helps us embed, translate and point users to our platform with ease. Amazingly responsive engineering team too. Happy customer, let us work together more!',
  },
  {
    id: 2,
    name: 'Hilda Griffith',
    company: 'DELL ENTERPRISE',
    avatar: avatar2,
    quote: 'Support is both attractive and highly adaptable. Architecture quality is exactly what our business has been lacking. Ryphira is the most valuable tech resource we have EVER invested in.',
  },
  {
    id: 3,
    name: 'Cora Adkins',
    company: 'STAPLES DIGITAL',
    avatar: avatar3,
    quote: 'It’s just amazing. 24/7 dedicated engineering support, both attractive UI and highly scalable cloud backend. The technical execution from Ryphira is absolutely awesome.',
  },
  {
    id: 4,
    name: 'David Miller',
    company: 'FINTECH VENTURES',
    avatar: avatar4,
    quote: 'The generative AI pipelines and real-time LLM integration transformed our analytics dashboard completely. We reduced our development cycle by over 60%.',
  },
  {
    id: 5,
    name: 'Sarah Jenkins',
    company: 'NEXUS CLOUD',
    avatar: avatar5,
    quote: 'Zero-downtime deployment and microservices architecture exceeded all our expectations. The team is dedicated, communicative, and exceptionally skilled.',
  },
  {
    id: 6,
    name: 'Michael Chang',
    company: 'SYNAPSE AI',
    avatar: avatar6,
    quote: 'Ryphira delivers enterprise-grade software standards from day one. Their hands-on tech guidance and developer bootcamp training are unmatched in the industry.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Total cards to cycle through
  const totalCards = customerStories.length;
  const maxStep = totalCards - 1;

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
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[520px] items-stretch relative">
          
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
            className="lg:col-span-8 bg-[#5c60f5] rounded-l-[32px] sm:rounded-l-[48px] py-10 sm:py-16 pl-6 sm:pl-10 md:pl-14 lg:pl-16 pr-6 sm:pr-10 overflow-hidden flex items-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Sliding Track for White Testimonial Cards */}
            <div className="w-full overflow-hidden">
              <motion.div
                animate={{ x: `-${currentIndex * 340}px` }}
                transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                className="flex items-center gap-6 sm:gap-8 w-max will-change-transform py-4"
              >
                {customerStories.map((story, sIdx) => (
                  <motion.div
                    key={story.id}
                    onClick={() => setCurrentIndex(sIdx)}
                    whileHover={{ y: -6 }}
                    className={`w-[280px] sm:w-[320px] md:w-[350px] h-[250px] sm:h-[270px] bg-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] flex flex-col justify-between shrink-0 border transition-all duration-300 cursor-pointer ${
                      currentIndex === sIdx ? 'border-indigo-400 ring-2 ring-white/50' : 'border-white/60 opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Card Top: Avatar + Name + Company */}
                    <div className="flex items-center gap-3.5">
                      <img
                        src={story.avatar}
                        alt={story.name}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-xs ring-2 ring-slate-100"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug truncate">
                          {story.name}
                        </h3>
                        <span className="text-[10px] font-bold text-[#5356e8] uppercase tracking-wider block">
                          {story.company}
                        </span>
                      </div>
                    </div>

                    {/* Card Body: Quote */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-5 font-normal pt-2">
                      "{story.quote}"
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
