import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function Navbar({ onOpenModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Courses', href: '#courses' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3 sm:py-3.5'
          : 'bg-[#eaedf0]/90 backdrop-blur-sm py-4 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src={logoImg}
            alt="Ryphira Logo"
            className="h-7 sm:h-8 w-auto object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#284e51] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenModal}
            className="px-6 sm:px-7 py-2 sm:py-2.5 rounded-full bg-white text-[#1c2c36] text-xs sm:text-sm font-bold hover:bg-slate-50 hover:shadow-md transition-all shadow-xs cursor-pointer active:scale-95 border border-slate-200/90"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-900 hover:bg-slate-200/50 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 h-screen w-[280px] max-w-[85vw] bg-white border-l border-slate-200 z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-6 pt-2">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <a href="#home" onClick={() => setMobileMenuOpen(false)}>
                    <img
                      src={logoImg}
                      alt="Ryphira Logo"
                      className="h-8 w-auto object-contain"
                    />
                  </a>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-semibold text-slate-700 hover:text-[#284e51] py-2 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal();
                  }}
                  className="w-full py-3 rounded-full bg-[#284e51] text-white font-bold text-xs hover:bg-[#1f3f41] transition-all text-center shadow-md active:scale-95 cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
