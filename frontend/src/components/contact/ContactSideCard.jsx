import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';
import { contactInfo } from '../../data/contactData';

export default function ContactSideCard() {
  return (
    <div className="space-y-6">
      {/* Map Directions Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-7 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#84cc16]/20 rounded-full blur-2xl pointer-events-none" />
        <h4 className="text-lg font-extrabold text-white mb-2">Visit Our Headquarters</h4>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          Located at Gandhi Sevanam Building, Pathiripala, Palakkad.
        </p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=RYPHIRA+PVT+LTD+Palakkad+Kerala"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#84cc16] text-white font-bold text-xs hover:bg-[#65a30d] transition-all shadow-md group-hover:scale-105"
        >
          Open Directions on Maps <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Social Handles Box */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-7 shadow-sm">
        <h4 className="text-base font-bold text-slate-900 mb-4">Connect With Us</h4>
        <div className="flex items-center gap-3">
          {/* Instagram */}
          <a
            href={contactInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-12 h-12 rounded-2xl bg-[#84cc16] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
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
            className="w-12 h-12 rounded-2xl bg-[#84cc16] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
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
            className="w-12 h-12 rounded-2xl bg-[#84cc16] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-center gap-3">
        <Clock className="w-5 h-5 text-[#84cc16] shrink-0" />
        <span className="text-xs text-slate-600 font-medium">
          Office Hours: <strong className="text-slate-900">Mon - Sat, 9:00 AM - 6:00 PM IST</strong>
        </span>
      </div>
    </div>
  );
}
