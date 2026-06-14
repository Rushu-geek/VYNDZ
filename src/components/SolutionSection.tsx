"use client";

import { useRef, useEffect, useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  FolderOpen,
  MapPin,
  CreditCard,
  Bell,
  BarChart3,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Vendor Applications",
    description:
      "Custom application forms with configurable fields. Collect all the info you need — upfront.",
    color: "orange",
  },
  {
    icon: CheckCircle2,
    title: "Approval Workflows",
    description:
      "Multi-stage approval pipelines. Review, shortlist, approve, or decline vendors in a few clicks.",
    color: "green",
  },
  {
    icon: FolderOpen,
    title: "Document Management",
    description:
      "Vendors upload licenses, insurance, and compliance docs directly. Automated reminders handle follow-ups.",
    color: "blue",
  },
  {
    icon: MapPin,
    title: "Booth Allocation",
    description:
      "Interactive floor plan. Drag-and-drop booth assignment with conflict detection built in.",
    color: "purple",
  },
  {
    icon: CreditCard,
    title: "Payment Tracking",
    description:
      "Collect and track booth fees online. See payment status, send reminders, and reconcile instantly.",
    color: "yellow",
  },
  {
    icon: Bell,
    title: "Messaging & Notifications",
    description:
      "Broadcast updates, send targeted messages, and keep every vendor in the loop automatically.",
    color: "pink",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Real-time insights into applications, revenue, booth occupancy, and vendor performance.",
    color: "cyan",
  },
  {
    icon: Zap,
    title: "Instant Onboarding",
    description:
      "Get your event live in minutes. Import vendor lists, set up forms, and start accepting applications.",
    color: "red",
  },
];

const colorMap: Record<string, { bg: string; icon: string; glow: string }> = {
  orange: { bg: "bg-orange-500/10 border-orange-500/20", icon: "text-orange-400", glow: "group-hover:shadow-orange-500/10" },
  green: { bg: "bg-green-500/10 border-green-500/20", icon: "text-green-400", glow: "group-hover:shadow-green-500/10" },
  blue: { bg: "bg-blue-500/10 border-blue-500/20", icon: "text-blue-400", glow: "group-hover:shadow-blue-500/10" },
  purple: { bg: "bg-purple-500/10 border-purple-500/20", icon: "text-purple-400", glow: "group-hover:shadow-purple-500/10" },
  yellow: { bg: "bg-yellow-500/10 border-yellow-500/20", icon: "text-yellow-400", glow: "group-hover:shadow-yellow-500/10" },
  pink: { bg: "bg-pink-500/10 border-pink-500/20", icon: "text-pink-400", glow: "group-hover:shadow-pink-500/10" },
  cyan: { bg: "bg-cyan-500/10 border-cyan-500/20", icon: "text-cyan-400", glow: "group-hover:shadow-cyan-500/10" },
  red: { bg: "bg-red-500/10 border-red-500/20", icon: "text-red-400", glow: "group-hover:shadow-red-500/10" },
};

export default function SolutionSection() {
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

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-padding relative bg-[#0d0d1a] overflow-hidden"
    >
      {/* Decorative orbs */}
      <div className="orb orb-orange w-[500px] h-[500px] top-0 right-0 opacity-10 pointer-events-none" />
      <div className="orb orb-blue w-[400px] h-[400px] bottom-0 left-0 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="badge mx-auto mb-4">
            <span>✨ The Vyndz Platform</span>
          </div>
          <h2 className="section-title text-white">
            Everything You Need to{" "}
            <span className="gradient-text">Run Vendor Operations</span>
          </h2>
          <p className="section-subtitle">
            From applications to approvals, payments to communications — Vyndz
            replaces your entire vendor management stack with one elegant
            platform.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, description, color }, i) => {
            const c = colorMap[color];
            return (
              <div
                key={title}
                className={`group relative glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-xl ${c.glow} ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(232,98,42,0.05) 0%, transparent 70%)" }}
                />

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-4 ${c.bg}`}
                >
                  <Icon size={20} className={c.icon} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
          >
            Get Early Access
            <Zap size={18} />
          </button>
          <p className="text-gray-500 text-sm mt-3">
            Free during beta · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
