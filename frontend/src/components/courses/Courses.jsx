import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, BookOpen } from 'lucide-react';
import { ryphiraCourses } from '../../data/coursesData';

// Image textures for masked numbers
import img01 from '../../assets/hero/tech_badge_code.jpg';
import img02 from '../../assets/hero/tech_card_ai.jpg';
import img03 from '../../assets/hero/tech_card_saas.jpg';
import img04 from '../../assets/hero/tech_card_cloud.jpg';
import img05 from '../../assets/hero/badge_lightning.jpg';
import img06 from '../../assets/hero/badge_night_sky.jpg';

const numberImages = [img01, img02, img03, img04, img05, img06];

export default function Courses({ onOpenModal }) {
  return (
    <section
      id="courses"
      className="py-16 sm:py-24 md:py-32 w-full bg-white text-slate-900 font-sans antialiased selection:bg-[#284e51] selection:text-white border-t border-slate-100"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1c2c36] tracking-tight leading-tight">
            Explore Our Courses
          </h2>
          
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Industry-standard engineering bootcamps, AI intelligence specializations, and cloud architecture certifications.
          </p>
        </div>

        {/* COURSES ALTERNATING LIST */}
        <div className="space-y-16 sm:space-y-24 md:space-y-32">
          {ryphiraCourses.map((course, idx) => {
            const isEven = idx % 2 === 1; // Alternating layout
            const numFormatted = String(idx + 1).padStart(2, '0');
            const bgImage = numberImages[idx % numberImages.length];

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center py-6 sm:py-10 ${
                  idx !== ryphiraCourses.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                
                {/* TEXT CONTENT BLOCK */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5 ${
                    isEven ? 'lg:order-2 lg:pl-6' : 'lg:order-1 lg:pr-6'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#284e51] uppercase bg-[#eaedf0] px-3 py-1 rounded-full">
                      {course.sub || 'CURRICULUM'}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#1c2c36] tracking-tight leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                    {course.desc}
                  </p>

                  {/* Chapters / Syllabus Pills */}
                  {course.chapters && course.chapters.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                      {course.chapters.slice(0, 4).map((ch, chIdx) => (
                        <span
                          key={chIdx}
                          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 transition-colors px-3 py-1.5 rounded-lg"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#284e51] shrink-0" />
                          <span>{ch}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-3 sm:pt-4">
                    <button
                      onClick={onOpenModal}
                      className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#1c2c36] hover:bg-[#284e51] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer group"
                    >
                      <span>Enroll & View Syllabus</span>
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* IMAGE-MASKED GIANT NUMBER BLOCK */}
                <div
                  className={`lg:col-span-6 flex items-center justify-center select-none ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative group cursor-pointer" onClick={onOpenModal}>
                    {/* Big Bold Masked Number */}
                    <span
                      className="block font-black text-[140px] sm:text-[200px] md:text-[260px] lg:text-[280px] xl:text-[320px] leading-none tracking-tighter transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                        filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.15))',
                      }}
                    >
                      {numFormatted}
                    </span>

                    {/* Subtle Floating Label Badge */}
                    <div className="absolute -bottom-2 right-4 sm:right-8 bg-white/95 backdrop-blur-xs border border-slate-200/80 shadow-lg px-4 py-1.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1.5 group-hover:bg-[#284e51] group-hover:text-white transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Course {numFormatted}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
