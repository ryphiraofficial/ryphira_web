import React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function TeamCard({ item, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full h-[370px] cursor-pointer rounded-2xl p-6 text-center bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white shadow-2xl transition-all duration-300 flex flex-col items-center justify-between relative overflow-hidden border-2",
        isActive
          ? "border-[#22c55e] shadow-emerald-900/40"
          : "border-slate-800 opacity-85 hover:opacity-100"
      )}
    >
      {/* Glow Backdrop */}
      <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#22c55e]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Category Tag */}
      <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
        {item.category}
      </span>

      {/* Member Initials Avatar */}
      <div className="w-16 h-16 rounded-full bg-[#22c55e] text-white font-black text-xl flex items-center justify-center shadow-lg border-2 border-white/20 my-2 shrink-0">
        {item.initials}
      </div>

      {/* Member Name & Role */}
      <div className="px-1">
        <h3 className="text-xl font-black text-white tracking-tight leading-snug">
          {item.title}
        </h3>
        <span className="block mt-1 text-xs font-bold text-[#16a34a]">
          {item.role}
        </span>
      </div>

      {/* Description Paragraph */}
      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mt-1 px-1">
        {item.description}
      </p>
    </div>
  );
}
