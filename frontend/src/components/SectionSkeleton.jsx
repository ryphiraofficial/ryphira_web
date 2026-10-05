import React from 'react';

export default function SectionSkeleton() {
  return (
    <div className="w-full py-20 px-6 max-w-6xl mx-auto flex flex-col items-center justify-center space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-slate-200/60 rounded-full" />
      <div className="h-4 w-80 bg-slate-200/40 rounded-full" />
      <div className="h-64 w-full bg-slate-100/60 rounded-3xl mt-8" />
    </div>
  );
}
