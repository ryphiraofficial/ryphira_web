import React from 'react';

export default function CourseHero({ heroTitle, uiMode }) {
  return (
    <div
      className={`absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 flex flex-wrap items-center justify-center gap-x-3 text-center px-6 transition-all duration-700 pointer-events-none ${
        uiMode === 'hero' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <span className="text-5xl sm:text-[120px] lg:text-[140px] font-black tracking-tighter text-slate-300/70 leading-none select-none uppercase font-sans">
        {heroTitle}
      </span>
    </div>
  );
}
