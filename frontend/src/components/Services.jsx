import React from 'react';

export default function Services({ onOpenModal, isDarkTheme }) {
  return (
    <section
      id="services"
      className={`relative py-28 transition-colors duration-500 ${
        isDarkTheme
          ? 'bg-black text-white border-t border-white/10'
          : 'bg-gray-50 text-slate-900 border-t border-gray-100'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#22c55e]">
              Ryphira Solutions
            </span>
            <h2
              className={`text-3xl sm:text-5xl font-bold tracking-tight leading-tight ${
                isDarkTheme ? 'text-white' : 'text-slate-900'
              }`}
            >
              Architecting modern software & tech education.
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed pt-2 ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>
              We develop high-performance software applications and train the next generation of technology leaders.
            </p>
            <div className="pt-4">
              <button
                onClick={onOpenModal}
                className="px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#22c55e] hover:bg-[#16a34a] transition-all shadow-md shadow-green-500/20"
              >
                Start A Project
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className={`p-8 rounded-2xl transition-all shadow-sm ${
                isDarkTheme
                  ? 'bg-white/5 border border-white/10 hover:border-emerald-500/40 text-white'
                  : 'bg-white border border-gray-200/70 hover:border-emerald-300 text-slate-900'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                Custom Software
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>
                Scalable web and mobile applications tailored to drive business growth and operational efficiency.
              </p>
            </div>

            <div
              className={`p-8 rounded-2xl transition-all shadow-sm ${
                isDarkTheme
                  ? 'bg-white/5 border border-white/10 hover:border-emerald-500/40 text-white'
                  : 'bg-white border border-gray-200/70 hover:border-emerald-300 text-slate-900'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                Tech Education
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>
                World-class programming training programs transforming learners into industry-ready software engineers.
              </p>
            </div>

            <div
              className={`p-8 rounded-2xl transition-all shadow-sm ${
                isDarkTheme
                  ? 'bg-white/5 border border-white/10 hover:border-emerald-500/40 text-white'
                  : 'bg-white border border-gray-200/70 hover:border-emerald-300 text-slate-900'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                AI Systems
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>
                Machine learning pipelines and automated data processing solutions for complex enterprise demands.
              </p>
            </div>

            <div
              className={`p-8 rounded-2xl transition-all shadow-sm ${
                isDarkTheme
                  ? 'bg-white/5 border border-white/10 hover:border-emerald-500/40 text-white'
                  : 'bg-white border border-gray-200/70 hover:border-emerald-300 text-slate-900'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
                Cloud DevOps
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-slate-600'}`}>
                High-availability cloud architecture with continuous threat protection and sub-15ms latency.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
