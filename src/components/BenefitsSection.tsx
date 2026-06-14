"use client";

import { useRef, useEffect, useState } from "react";
import {
  Rocket,
  FlaskConical,
  Tag,
  Lightbulb,
  Bell,
  Star,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: Rocket,
    title: "Priority Access",
    description:
      "Be first in line when Vyndz launches. Get access before the general public.",
    highlight: "First 500 signups",
  },
  {
    icon: FlaskConical,
    title: "Beta Testing",
    description:
      "Shape the product. Test new features before anyone else and provide direct feedback.",
    highlight: "Closed beta group",
  },
  {
    icon: Tag,
    title: "Founding Member Pricing",
    description:
      "Lock in exclusive early-adopter pricing — never pay full price, forever.",
    highlight: "Up to 60% off",
  },
  {
    icon: Lightbulb,
    title: "Influence the Roadmap",
    description:
      "Vote on features, submit ideas, and help build the platform that solves your exact problems.",
    highlight: "Direct product input",
  },
  {
    icon: Bell,
    title: "Exclusive Launch Updates",
    description:
      "Get behind-the-scenes updates, sneak peeks, and launch announcements before anyone else.",
    highlight: "Insider access",
  },
  {
    icon: Star,
    title: "Founding Member Badge",
    description:
      "Get recognized as a founding member with a special badge on your profile and priority support.",
    highlight: "Lifetime recognition",
  },
];

export default function BenefitsSection() {
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
      id="benefits"
      className="section-padding bg-[#080810] relative overflow-hidden"
    >
      {/* Gradient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(232,98,42,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="badge mx-auto mb-4">
            <span>🎁 Early Access Perks</span>
          </div>
          <h2 className="section-title text-white">
            Join Early, Get{" "}
            <span className="gradient-text">Exclusive Benefits</span>
          </h2>
          <p className="section-subtitle">
            Early access members get lifetime perks that won&apos;t be available
            after launch. Don&apos;t miss your window.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {benefits.map(({ icon: Icon, title, description, highlight }, i) => (
            <div
              key={title}
              className={`group relative glass rounded-2xl p-6 border border-white/5 hover:border-brand-orange/20 transition-all duration-500 overflow-hidden ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-orange/15 border border-brand-orange/25 flex items-center justify-center">
                    <Icon size={20} className="text-brand-orange" />
                  </div>
                  <span className="text-xs bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-2.5 py-1 rounded-full">
                    {highlight}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Counter banner */}
        <div
          className={`rounded-2xl overflow-hidden transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ background: "linear-gradient(135deg, #1a0a00 0%, #2d1005 50%, #1a0a00 100%)", border: "1px solid rgba(232,98,42,0.3)" }}
        >
          <div className="p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-brand-orange text-sm font-semibold">Limited Spots Available</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Only <span className="text-brand-orange">347 spots</span> remaining
              </h3>
              <p className="text-gray-400 text-sm">
                Out of 500 founding member slots. Join before they&apos;re gone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Progress */}
              <div className="w-full sm:w-48">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>153 claimed</span>
                  <span>500 total</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-full"
                    style={{ width: "30.6%" }} />
                </div>
              </div>
              <button
                onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                Claim Your Spot <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
