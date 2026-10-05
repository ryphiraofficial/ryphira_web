import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Team Portrait Assets
import team1 from '../../assets/hero/team/team_1.jpg';
import team2 from '../../assets/hero/team/team_2.jpg';
import team3 from '../../assets/hero/team/team_3.jpg';
import team4 from '../../assets/hero/team/team_4.jpg';
import team5 from '../../assets/hero/team/team_5.jpg';
import team6 from '../../assets/hero/team/team_6.jpg';

export const teamMembers = [
  {
    id: 0,
    name: 'Elena Rostova',
    role: 'Lead Architect',
    image: team2,
  },
  {
    id: 1,
    name: 'Randal Boucher',
    role: 'UI Designer',
    image: team1,
  },
  {
    id: 2,
    name: 'Sophia Chen',
    role: 'AI Researcher',
    image: team3,
  },
  {
    id: 3,
    name: 'Marcus Vance',
    role: 'DevOps Engineer',
    image: team4,
  },
  {
    id: 4,
    name: 'Arya Sterling',
    role: 'Fullstack Lead',
    image: team5,
  },
  {
    id: 5,
    name: 'David Thorne',
    role: 'Security Engineer',
    image: team6,
  },
];

export default function Team({ onOpenModal }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const activeMember = teamMembers[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance loop every 2.5 seconds
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section
      id="team"
      className="py-16 sm:py-24 md:py-32 w-full bg-white text-slate-900 font-sans antialiased selection:bg-[#284e51] selection:text-white border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        
        {/* TOP HEADER WITH ARROW NAVIGATION BUTTONS */}
        <div className="flex items-center justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#c2410c] uppercase">
              Our Instructors & Engineers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1c2c36] tracking-tight mt-1">
              Meet Our Team
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-300 hover:border-slate-900 flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-all cursor-pointer active:scale-95 shadow-xs group"
              aria-label="Previous team member"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1c2c36] hover:bg-[#284e51] flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-md group"
              aria-label="Next team member"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            EXACT REFERENCE WIREFRAME CONTAINER
            Focused Large Height Card + Top Info + Bottom Thumbnail Row
        ───────────────────────────────────────────────────────────── */}
        <div
          className="w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* DESKTOP / TABLET VIEW */}
          <div className="hidden md:flex items-end gap-5 lg:gap-7 w-full">
            
            {/* 1. TALL FOCUSED CARD (Dynamic Height & Scaled Layout) */}
            <motion.div
              layout
              key={activeMember.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-[320px] lg:w-[380px] xl:w-[420px] h-[480px] lg:h-[540px] xl:h-[580px] rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl shrink-0 bg-slate-100 relative group cursor-pointer"
              onClick={() => onOpenModal && onOpenModal()}
            >
              <img
                src={activeMember.image}
                alt={activeMember.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>


            {/* 2. RIGHT SECTION: MEMBER DETAILS ON TOP + THUMBNAILS AT BOTTOM */}
            <div className="flex-1 flex flex-col justify-between h-[480px] lg:h-[540px] xl:h-[580px] pl-3 lg:pl-6 min-w-0">
              
              {/* TOP: ACTIVE MEMBER NAME & ROLE ONLY */}
              <div className="pt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="space-y-1.5 max-w-[560px]"
                  >
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c2c36] tracking-tight">
                      {activeMember.name}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-500 font-medium">
                      {activeMember.role}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* BOTTOM: ROW OF ALL OTHER MEMBERS AS THUMBNAILS */}
              <div className="flex items-end gap-3 lg:gap-4 pt-6 overflow-hidden">
                {teamMembers.map((member, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <motion.div
                      key={member.id}
                      layout
                      onClick={() => setActiveIndex(idx)}
                      className={`rounded-[20px] lg:rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 bg-slate-100 shrink-0 ${
                        isActive
                          ? 'w-[100px] lg:w-[120px] h-[190px] lg:h-[220px] ring-3 ring-[#1c2c36] shadow-xl opacity-100 scale-102'
                          : 'flex-1 min-w-[70px] max-w-[130px] h-[170px] lg:h-[200px] opacity-75 hover:opacity-100 hover:scale-102 shadow-sm'
                      }`}
                      title={`Select ${member.name}`}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </motion.div>
                  );
                })}
              </div>

            </div>

          </div>


          {/* MOBILE VIEW */}
          <div className="md:hidden flex flex-col space-y-6">
            
            {/* Active Large Card */}
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[380px] rounded-[28px] overflow-hidden shadow-xl bg-slate-100"
            >
              <img
                src={activeMember.image}
                alt={activeMember.name}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>

            {/* Active Details: Name & Role Only */}
            <div className="space-y-1 px-1">
              <h3 className="text-xl font-bold text-slate-900">
                {activeMember.name}
              </h3>
              <p className="text-sm text-slate-500">
                {activeMember.role}
              </p>
            </div>

            {/* Thumbnail selector row */}
            <div className="grid grid-cols-6 gap-2 pt-2">
              {teamMembers.map((member, idx) => (
                <div
                  key={member.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-20 rounded-xl overflow-hidden cursor-pointer transition-all ${
                    activeIndex === idx ? 'ring-2 ring-[#1c2c36] scale-105 opacity-100' : 'opacity-60'
                  }`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
