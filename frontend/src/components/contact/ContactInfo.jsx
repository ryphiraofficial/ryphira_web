import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { contactInfo } from '../../data/contactData';

export default function ContactInfo() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-lg space-y-8 text-slate-900">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#84cc16] tracking-tight mb-3">
          Get In Touch
        </h2>
        <p className="text-sm text-slate-600 font-normal leading-relaxed">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Contact Details List */}
      <div className="space-y-6">
        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-[#84cc16] text-white flex items-center justify-center shrink-0 shadow-md">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 leading-snug">Address</h4>
            <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1">
              {contactInfo.address.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#84cc16] text-white flex items-center justify-center shrink-0 shadow-md">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 leading-snug">Phone</h4>
            <a
              href={contactInfo.phoneLink}
              className="text-xs sm:text-sm text-slate-700 font-medium hover:text-[#84cc16] transition-colors mt-0.5 block"
            >
              {contactInfo.phone}
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#84cc16] text-white flex items-center justify-center shrink-0 shadow-md">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 leading-snug">Email</h4>
            <a
              href={contactInfo.emailLink}
              className="text-xs sm:text-sm text-slate-700 font-medium hover:text-[#84cc16] transition-colors mt-0.5 block"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-base font-bold text-slate-900 mb-4">Follow Us</h4>
        <div className="flex items-center gap-3">
          {/* Instagram */}
          <a
            href={contactInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-[#84cc16] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href={contactInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-11 h-11 rounded-full bg-[#84cc16] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={contactInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full bg-[#84cc16] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
