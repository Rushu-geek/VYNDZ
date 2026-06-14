"use client";

import { useRef, useEffect, useState } from "react";
import {
  Clock,
  LayoutDashboard,
  TrendingUp,
  Search,
  Zap,
  FileCheck,
  ArrowRight,
} from "lucide-react";

export default function AudienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="audience"
      className="section-padding bg-[#080810] relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="badge mx-auto mb-4">
            <span>🎯 Built for Both Sides</span>
          </div>
          <h2 className="section-title text-white">
            Whether You&apos;re an{" "}
            <span className="gradient-text">Organizer or a Vendor</span>,<br />
            Vyndz Was Built for You
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Organizer card */}
          <div
            className={`group relative rounded-3xl p-8 border border-brand-orange/20 transition-all duration-700 overflow-hidden ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ background: "linear-gradient(135deg, rgba(232,98,42,0.08) 0%, rgba(232,98,42,0.03) 100%)" }}
          >
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-orange rounded-full filter blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center mb-6 text-3xl">
                🏟️
              </div>

              <div className="badge mb-5">For Event Organizers</div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Run your entire vendor operation from one dashboard
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Perfect for festivals, conferences, trade shows, exhibitions, and
                corporate events.
              </p>

              <ul className="space-y-3.5 mb-8">
                {[
                  { icon: Clock, text: "Save 40+ hours of manual work per event" },
                  { icon: LayoutDashboard, text: "Centralized vendor management hub" },
                  { icon: TrendingUp, text: "Real-time analytics and event insights" },
                  { icon: FileCheck, text: "Automated document collection and compliance" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-brand-orange/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={13} className="text-brand-orange" />
                    </div>
                    <span className="text-gray-300 text-sm">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Event types */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Festivals", "Conferences", "Trade Shows", "Exhibitions", "Community Events", "Corporate Events"].map((type) => (
                  <span
                    key={type}
                    className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <button
                onClick={scrollToWaitlist}
                className="btn-primary flex items-center gap-2 w-full justify-center"
              >
                Join as Organizer <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Vendor card */}
          <div
            className={`group relative rounded-3xl p-8 border border-blue-500/20 transition-all duration-700 overflow-hidden ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.03) 100%)", transitionDelay: "150ms" }}
          >
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500 rounded-full filter blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6 text-3xl">
                🛒
              </div>

              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-5">
                For Vendors
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Discover events and manage your applications effortlessly
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Perfect for food vendors, exhibitors, sponsors, merchandisers, and
                event service providers.
              </p>

              <ul className="space-y-3.5 mb-8">
                {[
                  { icon: Search, text: "Discover relevant events near you" },
                  { icon: Zap, text: "Apply to events in under 5 minutes" },
                  { icon: FileCheck, text: "Simplified document submission" },
                  { icon: LayoutDashboard, text: "Track all applications in one place" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={13} className="text-blue-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Vendor types */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Food & Beverage", "Exhibitors", "Sponsors", "Merchandise", "Service Providers"].map((type) => (
                  <span
                    key={type}
                    className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <button
                onClick={scrollToWaitlist}
                className="flex items-center gap-2 w-full justify-center border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
              >
                Join as Vendor <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
