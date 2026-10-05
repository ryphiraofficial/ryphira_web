import React from 'react';

export default function CourseDetailPanel({
  dpRef,
  uiMode,
  selectedCfg,
  onOpenModal,
}) {
  return (
    <div
      ref={dpRef}
      className={`absolute right-0 top-0 bottom-0 z-40 w-full sm:w-[480px] bg-transparent p-8 sm:p-12 flex flex-col justify-center space-y-6 transition-all duration-500 overflow-y-auto ${
        uiMode === 'detail'
          ? 'translate-x-0 opacity-100 pointer-events-auto'
          : 'translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Course Title */}
      <h3 className="text-4xl sm:text-5xl font-black text-[#22c55e] leading-tight tracking-tight">
        {selectedCfg?.title}
      </h3>

      {/* Description */}
      <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
        {selectedCfg?.desc}
      </p>

      {/* Star Rating Line */}
      <div className="flex items-center gap-4 text-sm font-semibold text-slate-600 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-1 text-[#22c55e] text-base">
          {[...Array(selectedCfg?.stars ?? 5)].map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <span className="text-slate-300">|</span>
        <span className="italic text-slate-700 font-medium">Goodreads / Ryphira</span>
        <span className="ml-auto text-slate-500 font-mono">
          {selectedCfg?.year ?? '2025'}
        </span>
      </div>

      {/* Get Started Button */}
      <div className="pt-2">
        <button
          onClick={() => onOpenModal && onOpenModal()}
          className="px-8 py-3.5 rounded-full bg-[#22c55e] text-white font-bold text-base hover:bg-[#16a34a] transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
