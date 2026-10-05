import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function GetStartedModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'software',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 overflow-hidden">
        {/* Ambient Green Soft Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-slate-900 hover:bg-gray-200 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Request Received!</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Our enterprise solution architect will review your project requirements and connect within 2 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16a34a] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Let's Build Together
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Empower Your Business
              </h3>
              <p className="text-sm text-slate-500">
                Partner with Ryphira for scalable software, cloud infrastructure, and edtech solutions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Solution Category</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-slate-900 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition"
                >
                  <option value="software">Custom Software & Web Application</option>
                  <option value="mobile">Mobile App Development</option>
                  <option value="education">Tech Education & Certification</option>
                  <option value="ai-cloud">AI Integration & Cloud DevOps</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Overview</label>
                <textarea
                  rows="3"
                  placeholder="Briefly describe your goals, budget, or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-[#22c55e] hover:bg-[#16a34a] transition-all duration-200 shadow-md shadow-green-500/20 flex items-center justify-center gap-2 group"
              >
                <span>Submit Audit Request</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>NDAs & Enterprise Privacy Standards Guaranteed</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
