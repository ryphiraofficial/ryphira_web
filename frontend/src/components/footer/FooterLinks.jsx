import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FooterLinks() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Team', href: '#team' },
    { name: 'Course Library', href: '#courses' },
    { name: 'Contact', href: '#contact' },
  ];

  const technologies = [
    'AI & Neural Networks',
    'Full-Stack Web Development',
    'Cloud DevOps & Kubernetes',
    'Cyber Security & Zero Trust',
    'Enterprise Software',
    'Student Training Programs',
  ];

  return (
    <div className="grid grid-cols-2 gap-8 sm:gap-12">
      {/* Quick Links Column */}
      <div>
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5">
          Navigation
        </h4>
        <ul className="space-y-3 text-xs font-medium text-slate-600">
          {quickLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="inline-flex items-center gap-1 hover:text-slate-900 hover:translate-x-1 transition-all duration-300"
              >
                {link.name} <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies Column */}
      <div>
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5">
          Capabilities
        </h4>
        <ul className="space-y-3 text-xs font-medium text-slate-600">
          {technologies.map((item) => (
            <li key={item} className="hover:text-slate-900 transition-colors">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
