"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, ChevronDown, Users, BarChart3, Calendar } from "lucide-react";
const stats = [
  { value: "10K+", label: "Vendors Ready", icon: Users },
  { value: "500+", label: "Events Planned", icon: Calendar },
  { value: "40hrs", label: "Saved Per Event", icon: BarChart3 },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen hero-bg noise-bg overflow-hidden flex items-center"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Glow orbs */}
      <div className="orb orb-orange w-[600px] h-[600px] -top-40 -right-40" />
      <div className="orb orb-blue w-[400px] h-[400px] -bottom-20 -left-20" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
        style={{
          background:
            "radial-gradient(circle, #E8622A 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="badge mb-6 w-fit">
              <Sparkles size={14} />
              <span>Now accepting early access requests</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Stop Managing Event Vendors with{" "}
              <span className="gradient-text">Spreadsheets</span> and Endless Emails
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl">
              Vyndz simplifies vendor applications, approvals, payments, booth
              assignments, and communications —{" "}
              <strong className="text-white">all in one platform.</strong>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={scrollToWaitlist}
                className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                Join the Waitlist
                <ArrowRight size={18} />
              </button>
              <button
                onClick={scrollToWaitlist}
                className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                Request Early Access
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center">
                    <Icon size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{value}</div>
                    <div className="text-xs text-gray-400">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard mockup */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={24} className="text-gray-400" />
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="relative animate-float">
      {/* Main card */}
      <div className="glass rounded-2xl p-1 shadow-2xl shadow-black/50">
        {/* Top bar */}
        <div className="bg-[#0f0f1f] rounded-xl overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-gray-500 text-center">
                app.vyndz.com/dashboard
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold text-sm">
                  TechFest 2026
                </div>
                <div className="text-gray-500 text-xs">Vendor Overview</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/20">
                  Live
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Applications", value: "142", change: "+12", color: "blue" },
                { label: "Approved", value: "98", change: "+5", color: "green" },
                { label: "Revenue", value: "₹4.2L", change: "+8%", color: "orange" },
              ].map(({ label, value, change, color }) => (
                <div
                  key={label}
                  className="dashboard-card p-3 rounded-xl"
                >
                  <div className="text-gray-400 text-xs mb-1">{label}</div>
                  <div className="text-white font-bold text-lg">{value}</div>
                  <div
                    className={`text-xs ${
                      color === "green"
                        ? "text-green-400"
                        : color === "orange"
                        ? "text-brand-orange"
                        : "text-blue-400"
                    }`}
                  >
                    {change} this week
                  </div>
                </div>
              ))}
            </div>

            {/* Vendor list */}
            <div className="dashboard-card rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
                Recent Vendors
              </div>
              <div className="space-y-2">
                {[
                  { name: "Spice Garden F&B", type: "Food & Bev", status: "approved", booth: "A-12" },
                  { name: "TechGadgets Co.", type: "Exhibitor", status: "pending", booth: "B-05" },
                  { name: "FreshBrew Coffee", type: "Food & Bev", status: "approved", booth: "A-08" },
                  { name: "Event Merch Hub", type: "Merchandise", status: "review", booth: "C-03" },
                ].map(({ name, type, status, booth }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between py-1.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-brand-orange/20 flex items-center justify-center text-brand-orange text-xs font-bold">
                        {name[0]}
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">
                          {name}
                        </div>
                        <div className="text-gray-500 text-xs">{type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-xs">{booth}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          status === "approved"
                            ? "bg-green-500/15 text-green-400 border border-green-500/20"
                            : status === "pending"
                            ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                            : "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bars */}
            <div className="dashboard-card rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">
                Booth Occupancy
              </div>
              <div className="space-y-2.5">
                {[
                  { zone: "Zone A – Food", pct: 85 },
                  { zone: "Zone B – Exhibits", pct: 62 },
                  { zone: "Zone C – Merch", pct: 40 },
                ].map(({ zone, pct }) => (
                  <div key={zone}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">{zone}</span>
                      <span className="text-white">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 shadow-lg animate-pulse-slow">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white text-xs font-medium">
            New application received!
          </span>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="text-brand-orange">💰</div>
          <span className="text-white text-xs font-medium">
            ₹12,400 collected today
          </span>
        </div>
      </div>
    </div>
  );
}
