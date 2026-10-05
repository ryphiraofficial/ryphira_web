import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { googleReviewsData } from '../../data/testimonialsData';

export default function GoogleReviews() {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleNext = () => {
    setScrollIndex((prev) => (prev + 1) % googleReviewsData.reviews.length);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight text-center mb-8">
        What Our Customers Say
      </h2>

      {/* Google Banner */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="text-xl sm:text-2xl font-bold font-sans tracking-tight">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
            <span className="text-slate-800 ml-1.5 font-bold">Reviews</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700 ml-2">
            <span>{googleReviewsData.score}</span>
            <div className="flex items-center gap-0.5 text-amber-400 text-sm">
              <span>★</span><span>★</span><span>★</span><span className="text-slate-300">★</span><span className="text-slate-300">★</span>
            </div>
            <span className="text-slate-400 font-mono text-xs">({googleReviewsData.totalReviews})</span>
          </div>
        </div>

        <a
          href={googleReviewsData.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 rounded-full bg-[#2563eb] text-white font-bold text-xs hover:bg-[#1d4ed8] transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
        >
          Review us on Google
        </a>
      </div>

      {/* Google Review Cards Grid / Carousel */}
      <div className="relative flex items-center gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {googleReviewsData.reviews.map((r, idx) => (
            <div
              key={r.id}
              className="bg-slate-50/60 border border-slate-200/70 rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {r.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-slate-900">{r.name}</span>
                      {r.verified && (
                        <span className="w-3.5 h-3.5 rounded-full bg-[#2563eb] text-white text-[9px] font-black flex items-center justify-center">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-normal">{r.timeAgo}</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400 text-xs mb-2">
                  {[...Array(r.stars)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="text-xs text-slate-700 font-normal leading-relaxed">
                  {r.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Next Arrow */}
        <button
          onClick={handleNext}
          className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full bg-slate-600 text-white shadow-md hover:bg-slate-700 transition-all cursor-pointer shrink-0"
          aria-label="Next reviews"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
