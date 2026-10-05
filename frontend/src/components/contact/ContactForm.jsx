import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Web Development',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', interest: 'Web Development', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm text-slate-900">
      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
        Send Us a Message
      </h3>
      <p className="text-xs sm:text-sm text-slate-600 mb-8">
        Fill out the form below and our engineering leads will get back to you as soon as possible.
      </p>

      {submitted ? (
        <div className="rounded-2xl border border-[#84cc16]/40 bg-[#84cc16]/10 p-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-[#84cc16] mx-auto animate-bounce" />
          <h4 className="text-xl font-bold text-slate-900">Message Sent!</h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Thank you for reaching out to Ryphira. We will respond to your inquiry shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 transition-all shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 12345 67890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 transition-all shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Area of Interest
              </label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 transition-all cursor-pointer shadow-2xs"
              >
                <option value="Web Development">Full-Stack Web Development</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Cloud & DevOps">Cloud & DevOps Infrastructure</option>
                <option value="Cyber Security">Cyber Security Services</option>
                <option value="Student Training">Course Training Program</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Message *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about your project, ideas, or questions..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 transition-all resize-none shadow-2xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-8 rounded-xl bg-[#84cc16] hover:bg-[#65a30d] text-white font-black text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      )}
    </div>
  );
}
