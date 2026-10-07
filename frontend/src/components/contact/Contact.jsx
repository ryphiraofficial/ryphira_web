import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { contactInfo } from '../../data/contactData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const addressText = Array.isArray(contactInfo?.address)
    ? contactInfo.address.join(' ')
    : contactInfo?.address || 'Palakkad, Kerala';

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 md:py-32 w-full bg-white text-slate-900 font-sans antialiased selection:bg-black selection:text-white border-t border-slate-100"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
        
        {/* 2-COLUMN WIREFRAME GRID MATCHING REFERENCE DESIGN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ─────────────────────────────────────────────────────────
              LEFT COLUMN: Header, Contact Info & Socials
          ───────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col space-y-8 sm:space-y-10"
          >
            
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
              Get in touch
            </h2>

            <div className="space-y-6 sm:space-y-8 text-sm sm:text-base">
              
              {/* Email */}
              <div className="space-y-1">
                <span className="text-xs sm:text-sm text-slate-400 font-medium block">
                  Email:
                </span>
                <a
                  href={contactInfo?.emailLink || 'mailto:ryphira.official@gmail.com'}
                  className="font-bold text-slate-900 hover:text-slate-600 transition-colors text-base sm:text-lg block"
                >
                  {contactInfo?.email || 'ryphira.official@gmail.com'}
                </a>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <span className="text-xs sm:text-sm text-slate-400 font-medium block">
                  Phone:
                </span>
                <a
                  href={contactInfo?.phoneLink || 'tel:+918547865694'}
                  className="font-bold text-slate-900 hover:text-slate-600 transition-colors text-base sm:text-lg block"
                >
                  {contactInfo?.phone || '+91 85478 65694'}
                </a>
              </div>

              {/* Address */}
              <div className="space-y-1 max-w-[340px]">
                <span className="text-xs sm:text-sm text-slate-400 font-medium block">
                  Address:
                </span>
                <p className="font-semibold text-slate-800 leading-relaxed text-sm sm:text-base">
                  {addressText}
                </p>
              </div>

              {/* Follow Us Social Icons */}
              <div className="space-y-3 pt-2">
                <span className="text-xs sm:text-sm text-slate-400 font-medium block">
                  Follow us
                </span>
                <div className="flex items-center gap-3">
                  {/* Instagram */}
                  <a
                    href={contactInfo?.instagramUrl || 'https://instagram.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-sm cursor-pointer"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={contactInfo?.whatsappUrl || 'https://wa.me/918547865694'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-sm cursor-pointer"
                    aria-label="WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={contactInfo?.linkedinUrl || 'https://www.linkedin.com/in/ryphiraprivatelimited'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-sm cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-black text-white hover:bg-slate-800 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-sm cursor-pointer"
                    aria-label="X"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </motion.div>


          {/* ─────────────────────────────────────────────────────────
              RIGHT COLUMN: Clean Form Layout
          ───────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7 pt-2 lg:pt-4"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Your Name & Email address (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                
                {/* Your Name */}
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs sm:text-sm font-semibold text-slate-700 block">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full bg-[#f1f3f5] text-slate-900 placeholder:text-slate-400 text-sm sm:text-base px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border-0 focus:ring-2 focus:ring-black focus:outline-none transition-all"
                  />
                </div>

                {/* Email address */}
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs sm:text-sm font-semibold text-slate-700 block">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email address"
                    className="w-full bg-[#f1f3f5] text-slate-900 placeholder:text-slate-400 text-sm sm:text-base px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border-0 focus:ring-2 focus:ring-black focus:outline-none transition-all"
                  />
                </div>

              </div>

              {/* Row 2: Message (Full Width Textarea) */}
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs sm:text-sm font-semibold text-slate-700 block">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write something...."
                  className="w-full bg-[#f1f3f5] text-slate-900 placeholder:text-slate-400 text-sm sm:text-base p-5 rounded-2xl sm:rounded-3xl border-0 focus:ring-2 focus:ring-black focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Row 3: Send Message Pill Button */}
              <div>
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full bg-black hover:bg-slate-800 text-white font-bold py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400 animate-bounce" />
                      <span>Message Sent Successfully</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </div>

            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
