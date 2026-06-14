"use client";

import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center mb-5">
              <div className="relative w-20 h-20">
                <Image
                  src="/logo-full.png"
                  alt="Vyndz"
                  fill
                  className="object-contain object-left"
                  style={{ filter: "invert(1) hue-rotate(180deg)" }}
                  sizes="80px"
                />
              </div>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Smart vendor management for modern events. Helping organizers and
              vendors connect, collaborate, and create unforgettable experiences.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-orange/50 transition-colors"
              />
              <button className="bg-brand-orange hover:bg-brand-orange-dark text-white p-2.5 rounded-xl transition-colors flex-shrink-0">
                <ArrowRight size={18} />
              </button>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
              { icon: null, href: "#", label: "Twitter", svg: "𝕏" },
              { icon: null, href: "#", label: "LinkedIn", svg: "in" },
              { icon: null, href: "#", label: "Instagram", svg: "ig" },
              { icon: Mail, href: "mailto:hello@vyndz.com", label: "Email", svg: null },
            ].map(({ icon: Icon, href, label, svg }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-orange/20 hover:border-brand-orange/40 transition-all"
              >
                {Icon ? <Icon size={16} /> : <span className="text-xs font-bold">{svg}</span>}
              </a>
            ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Vyndz Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              All systems operational
            </span>
            <span className="text-gray-600 text-sm">•</span>
            <span className="text-gray-500 text-sm">
              Made with ❤️ for event builders
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
