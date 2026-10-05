import React from 'react';
import { clientTestimonials } from '../../data/testimonialsData';

export default function TestimonialCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-8 mb-16">
      {clientTestimonials.map((t) => (
        <div
          key={t.id}
          className="relative bg-emerald-50/50 border border-emerald-200/60 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-emerald-400/80 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            {/* Header: Circle Avatar + Name + Stars */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#22c55e] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                {t.initials}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                  {t.name}
                </h4>
                <div className="flex items-center gap-0.5 text-amber-400 text-sm mt-0.5">
                  {[...Array(t.stars)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
              "{t.quote}"
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
