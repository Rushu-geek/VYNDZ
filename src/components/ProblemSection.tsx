"use client";

import { useRef, useEffect, useState } from "react";
import {
  MailX,
  TableProperties,
  ClipboardX,
  FileWarning,
  MessageSquareOff,
  DollarSign,
} from "lucide-react";

const problems = [
  {
    icon: MailX,
    title: "Lost in Email Chaos",
    description:
      "Vendor communications scattered across hundreds of email threads. Nothing is trackable, nothing is findable.",
    color: "red",
  },
  {
    icon: TableProperties,
    title: "Spreadsheet Overload",
    description:
      "Managing 50+ vendors across multiple spreadsheets leads to version conflicts, errors, and sleepless nights.",
    color: "orange",
  },
  {
    icon: ClipboardX,
    title: "Manual Approval Hell",
    description:
      "Reviewing and approving vendor applications manually wastes days of your time with back-and-forth emails.",
    color: "yellow",
  },
  {
    icon: FileWarning,
    title: "Missing Documents",
    description:
      "Following up on licenses, insurance, and compliance documents becomes a full-time job in itself.",
    color: "purple",
  },
  {
    icon: MessageSquareOff,
    title: "Communication Breakdowns",
    description:
      "Vendors miss important updates. Last-minute changes cause chaos because there's no centralized channel.",
    color: "blue",
  },
  {
    icon: DollarSign,
    title: "Payment Tracking Nightmares",
    description:
      "Manually tracking booth payments, partial payments, and overdue amounts is error-prone and time-consuming.",
    color: "green",
  },
];

const colorMap: Record<string, string> = {
  red: "text-red-400 bg-red-500/10 border-red-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  green: "text-green-400 bg-green-500/10 border-green-500/20",
};

export default function ProblemSection() {
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
      id="problem"
      className="section-padding relative bg-[#080810] overflow-hidden"
    >
      {/* subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="badge mx-auto mb-4">
            <span>😤 Sound Familiar?</span>
          </div>
          <h2 className="section-title text-white">
            Event Management Is Still{" "}
            <span className="gradient-text">Largely Manual</span>
          </h2>
          <p className="section-subtitle">
            Most organizers still rely on WhatsApp messages, Excel sheets, phone
            calls, and manual payment tracking — creating chaos at every step.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map(({ icon: Icon, title, description, color }, i) => (
            <div
              key={title}
              className={`feature-card border border-white/5 hover:border-white/10 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${colorMap[color]}`}
              >
                <Icon size={22} />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block bg-brand-orange/10 border border-brand-orange/20 rounded-2xl px-8 py-5">
            <p className="text-brand-orange font-semibold text-lg">
              The average event organizer spends{" "}
              <span className="text-white">40+ hours per event</span> on manual
              vendor management.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              That&apos;s time you could spend creating better events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
