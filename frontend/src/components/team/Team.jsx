import React from 'react';
import { motion } from 'framer-motion';

export const teamSections = [
  {
    category: 'Leadership & Board',
    members: [
      {
        id: '01',
        name: 'Vishnu Hari',
        role: 'Founder & Chairman',
        focus: 'Strategic Growth & Innovation',
      },
      {
        id: '02',
        name: 'Saharsh Krishna C',
        role: 'Founder & CEO',
        focus: 'Operations & Product Strategy',
      },
      {
        id: '03',
        name: 'Sreenandhan P.P',
        role: 'Founder & Vice Chairman',
        focus: 'Corporate Governance & Vision',
      },
      {
        id: '04',
        name: 'Bharath Chandran',
        role: 'Founder & CFO',
        focus: 'Financial Strategy & Capital Allocation',
      },
    ],
  },
  {
    category: 'Management',
    members: [
      {
        id: '05',
        name: 'Mohammed Farsin',
        role: 'Manager - Development',
        focus: 'Technical Leadership & System Architecture',
      },
      {
        id: '06',
        name: 'Deepu A',
        role: 'Manager - Operations',
        focus: 'Project Delivery & Operational Workflows',
      },
    ],
  },
  {
    category: 'Engineering & QA',
    members: [
      {
        id: '07',
        name: 'Arya TR',
        role: 'Senior Developer',
        focus: 'Full-Stack Web & Frontend Systems',
      },
      {
        id: '08',
        name: 'Vaideesh S',
        role: 'Senior Developer',
        focus: 'Django, Python & High-Performance APIs',
      },
     
      {
        id: '09',
        name: 'Mridul',
        role: 'Junior Developer',
        focus: 'Full-Stack Development & React APIs',
      },
      {
        id: '10',
        name: 'Rizaal Rahman',
        role: 'Junior Developer',
        focus: 'Frontend & Full-Stack Development',
      },
    ],
  },
];

// Flat list for any consumer expecting teamMembers array
export const teamMembers = teamSections.flatMap((s) => s.members);

export default function Team() {
  return (
    <section
      id="team"
      className="py-16 sm:py-24 md:py-32 w-full bg-white text-slate-900 font-sans antialiased border-t border-slate-100"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-2 border-b border-slate-200/80 pb-6"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#c2410c] uppercase">
            Our Instructors & Engineers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1c2c36] tracking-tight">
            Meet Our Team
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl">
            Our leadership, operational management, and engineering team powering scalable software solutions and education.
          </p>
        </motion.div>

        {/* Grouped Horizontal Rows */}
        <div className="space-y-12">
          {teamSections.map((section, sIdx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: sIdx * 0.1, ease: 'easeOut' }}
              className="space-y-4"
            >
              
              {/* Category Subheading */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
                  {section.category}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {section.members.length} members
                </span>
              </div>

              {/* Roster Rows (Clean, static typography list - no hover effects) */}
              <div className="divide-y divide-slate-100">
                {section.members.map((member) => (
                  <div
                    key={member.id}
                    className="py-3.5 sm:py-4 grid grid-cols-1 md:grid-cols-12 gap-1 sm:gap-4 items-center"
                  >
                    {/* Index & Name */}
                    <div className="md:col-span-5 flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400 w-6">
                        {member.id}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-slate-900">
                        {member.name}
                      </span>
                    </div>

                    {/* Role */}
                    <div className="md:col-span-4 pl-9 md:pl-0">
                      <span className="text-xs sm:text-sm font-medium text-slate-600">
                        {member.role}
                      </span>
                    </div>

                    {/* Focus / Domain */}
                    <div className="md:col-span-3 pl-9 md:pl-0 md:text-right">
                      <span className="text-xs text-slate-400 font-normal">
                        {member.focus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
