import React from 'react';
import { MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import { contactInfo } from '../../data/contactData';

export default function ContactHeader() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
      {/* Main Title */}
      <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
        Let's Connect & <span className="text-[#84cc16]">Build Together</span>
      </h2>

      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mb-12">
        Have a question about our enterprise software, tech courses, or custom AI solutions? Reach out to us today.
      </p>

      {/* 3 Top Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Address Card */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:shadow-md hover:border-[#84cc16]/50 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#84cc16] text-white flex items-center justify-center mb-4 shadow-sm">
            <MapPin className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
            Our Location
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {contactInfo.address.join(' ')}
          </p>
        </div>

        {/* Phone Card */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:shadow-md hover:border-[#84cc16]/50 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#84cc16] text-white flex items-center justify-center mb-4 shadow-sm">
            <Phone className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
            Call Direct
          </h4>
          <a
            href={contactInfo.phoneLink}
            className="text-sm font-bold text-slate-800 hover:text-[#84cc16] transition-colors block mt-1"
          >
            {contactInfo.phone}
          </a>
          <span className="text-[11px] text-slate-400 font-normal">Mon - Sat: 9am - 6pm IST</span>
        </div>

        {/* Email Card */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 hover:shadow-md hover:border-[#84cc16]/50 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-[#84cc16] text-white flex items-center justify-center mb-4 shadow-sm">
            <Mail className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
            Email Inquiries
          </h4>
          <a
            href={contactInfo.emailLink}
            className="text-sm font-bold text-slate-800 hover:text-[#84cc16] transition-colors block mt-1"
          >
            {contactInfo.email}
          </a>
          <span className="text-[11px] text-slate-400 font-normal">24/7 online response</span>
        </div>
      </div>
    </div>
  );
}
