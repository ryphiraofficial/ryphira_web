import React from 'react';
import logoImg from '../../assets/logo.png';

export default function FooterBrand() {
  return (
    <div className="space-y-4">
      {/* Logo & Name - Clean White Theme */}
      <div className="flex items-center gap-3">
        <img
          src={logoImg}
          alt="Ryphira Logo"
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* Bio */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm font-normal">
        Empowering global enterprises, startups, and developers with state-of-the-art AI systems, full-stack software, cloud engineering, and career training.
      </p>
    </div>
  );
}
