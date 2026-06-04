"use client";

import { MapPin, Phone, Mail } from "lucide-react";

// Custom Facebook Icon SVG
function FacebookIcon({ size = 16, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// Custom Instagram Icon SVG
function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function TopBar() {
  return (
    <div className="hidden md:block bg-slate-50 border-b border-slate-200/60 text-slate-600 text-xs py-2.5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
        {/* Contact Info */}
        <div className="flex items-center gap-6">
          <a
            href="https://maps.google.com/?q=Rua+Lopes+Trovão,+115+-+Massaranduba,+Salvador,+BA,+Brazil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-brand-green transition-colors"
          >
            <MapPin size={14} className="text-brand-blue" />
            <span>Rua Lopes Trovão, 115 - Massaranduba, Salvador, BA</span>
          </a>
          <a href="tel:7130141351" className="flex items-center gap-1.5 hover:text-brand-green transition-colors">
            <Phone size={14} className="text-brand-blue" />
            <span>(71) 3014-1351</span>
          </a>
          <a href="mailto:beijaflor.massaranduba@gmail.com" className="flex items-center gap-1.5 hover:text-brand-green transition-colors">
            <Mail size={14} className="text-brand-blue" />
            <span>beijaflor.massaranduba@gmail.com</span>
          </a>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com/beijaflor.massaranduba"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-brand-blue transition-all hover:-translate-y-0.5"
            aria-label="Facebook do Projeto"
          >
            <FacebookIcon size={16} />
          </a>
          <a
            href="https://instagram.com/beijaflor.massaranduba"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-brand-blue transition-all hover:-translate-y-0.5"
            aria-label="Instagram do Projeto"
          >
            <InstagramIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
