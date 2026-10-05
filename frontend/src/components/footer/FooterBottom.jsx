import React from 'react';

export default function FooterBottom() {
  return (
    <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
      <div className="flex items-center gap-2">
        <span>© {new Date().getFullYear()} RYPHIRA PVT LTD. All rights reserved.</span>
      </div>
      <div className="flex items-center gap-6">
        <a href="#privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
        <span className="text-slate-300">•</span>
        <a href="#terms" className="hover:text-slate-900 transition-colors">Terms of Service</a>
        <span className="text-slate-300">•</span>
        <a href="#security" className="hover:text-slate-900 transition-colors">Security</a>
      </div>
    </div>
  );
}
