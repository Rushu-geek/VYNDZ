"use client";

import { useRef, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Managing 80 vendors across a 3-day festival used to take weeks of email back-and-forth. A platform like Vyndz is exactly what the event industry needs.",
    name: "Priya Sharma",
    role: "Festival Director",
    company: "Ahmedabad Food & Music Fest",
    avatar: "PS",
    color: "orange",
    rating: 5,
  },
  {
    quote:
      "As a food vendor, finding the right events and managing all the paperwork is a nightmare. I'd love a single place to discover events and submit my documents.",
    name: "Rohan Mehta",
    role: "Food Vendor",
    company: "Spice Garden F&B",
    avatar: "RM",
    color: "blue",
    rating: 5,
  },
  {
    quote:
      "We run 20+ trade shows annually. The amount of manual coordination is staggering. A smart platform could save us thousands of hours each year.",
    name: "Anjali Patel",
    role: "Events Manager",
    company: "Gujarat Expo Group",
    avatar: "AP",
    color: "purple",
    rating: 5,
  },
];

const stats = [
  { value: "10K+", label: "Vendors on Waitlist", emoji: "🛒" },
  { value: "500+", label: "Events Planned", emoji: "🎪" },
  { value: "40hrs", label: "Avg. Time Saved/Event", emoji: "⏰" },
  { value: "98%", label: "Organizer Satisfaction Target", emoji: "⭐" },
];

const partnerCategories = [
  "🍽️ Food Festivals",
  "🖥️ Tech Conferences",
  "🏪 Trade Shows",
  "🎓 College Fests",
  "💍 Wedding Expos",
  "🎭 Cultural Events",
  "🏋️ Sports Events",
  "🎨 Art Exhibitions",
];

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      className="section-padding bg-[#0d0d1a] relative overflow-hidden"
    >
      <div className="orb orb-blue w-[400px] h-[400px] -top-20 right-0 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {stats.map(({ value, label, emoji }) => (
            <div
              key={label}
              className="glass rounded-2xl p-5 border border-white/5 text-center card-hover"
            >
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials heading */}
        <div
          className={`text-center mb-10 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="badge mx-auto mb-4">
            <span>💬 What People Are Saying</span>
          </div>
          <h2 className="section-title text-white">
            Built for Real{" "}
            <span className="gradient-text">Event Professionals</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            * Testimonials represent feedback from industry professionals during our research phase.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {testimonials.map(({ quote, name, role, company, avatar, color, rating }, i) => (
            <div
              key={name}
              className={`glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Quote icon */}
              <Quote size={24} className="text-brand-orange/40 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    color === "orange"
                      ? "bg-brand-orange/20 text-brand-orange"
                      : color === "blue"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{name}</div>
                  <div className="text-gray-500 text-xs">{role} · {company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event categories */}
        <div
          className={`transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-center text-gray-400 text-sm mb-5 font-medium uppercase tracking-wide">
            Built for every type of event
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {partnerCategories.map((cat) => (
              <span
                key={cat}
                className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-full text-sm hover:border-brand-orange/30 hover:text-white transition-colors cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
