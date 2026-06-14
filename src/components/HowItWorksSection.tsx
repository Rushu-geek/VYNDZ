"use client";

import { useRef, useEffect, useState } from "react";

const steps = [
  {
    step: "01",
    emoji: "🚀",
    title: "Create or Discover an Event",
    organizer: {
      heading: "Organizers",
      points: [
        "Create your event profile in minutes",
        "Set up custom vendor application forms",
        "Configure booth layouts and pricing",
        "Publish and start accepting applications",
      ],
    },
    vendor: {
      heading: "Vendors",
      points: [
        "Browse upcoming events in your area",
        "Filter by event type, size, and dates",
        "View available booths and stall prices",
        "Express interest with a single click",
      ],
    },
  },
  {
    step: "02",
    emoji: "⚙️",
    title: "Manage Vendor Onboarding",
    organizer: {
      heading: "Organizers",
      points: [
        "Review incoming vendor applications",
        "Request additional documents if needed",
        "Approve, waitlist, or decline with notes",
        "Assign booths via interactive floor plan",
      ],
    },
    vendor: {
      heading: "Vendors",
      points: [
        "Complete the application form quickly",
        "Upload required documents in one place",
        "Receive instant status updates",
        "Pay booth fees securely online",
      ],
    },
  },
  {
    step: "03",
    emoji: "🎉",
    title: "Run a Successful Event",
    organizer: {
      heading: "Organizers",
      points: [
        "Send announcements to all vendors at once",
        "Track payments and outstanding balances",
        "Access real-time analytics and reports",
        "Build lasting relationships with top vendors",
      ],
    },
    vendor: {
      heading: "Vendors",
      points: [
        "Receive event-day briefings automatically",
        "Access your booth details and schedule",
        "Get post-event summaries and feedback",
        "Build a portfolio to attract future events",
      ],
    },
  },
];

export default function HowItWorksSection() {
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
      id="how-it-works"
      className="section-padding bg-[#0d0d1a] relative overflow-hidden"
    >
      <div className="orb orb-orange w-[400px] h-[400px] -top-20 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="badge mx-auto mb-4">
            <span>🔄 Simple Process</span>
          </div>
          <h2 className="section-title text-white">
            How <span className="gradient-text">Vyndz</span> Works
          </h2>
          <p className="section-subtitle">
            A simple, transparent workflow for both organizers and vendors — from
            event creation to successful participation.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map(({ step, emoji, title, organizer, vendor }, i) => (
            <div
              key={step}
              className={`group relative transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-8 top-full h-8 w-px bg-gradient-to-b from-brand-orange/40 to-transparent hidden lg:block" />
              )}

              <div className="glass rounded-2xl border border-white/5 hover:border-brand-orange/20 transition-all duration-300 p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                  {/* Step indicator */}
                  <div className="flex items-start gap-4 lg:w-64 flex-shrink-0">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-2xl flex-shrink-0">
                        {emoji}
                      </div>
                    </div>
                    <div>
                      <div className="text-brand-orange font-mono font-bold text-sm mb-1">
                        Step {step}
                      </div>
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {title}
                      </h3>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden lg:block w-px bg-white/5" />

                  {/* Two columns */}
                  <div className="flex-1 grid sm:grid-cols-2 gap-6">
                    {[organizer, vendor].map(({ heading, points }, j) => (
                      <div key={heading}>
                        <div
                          className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                            j === 0
                              ? "bg-brand-orange/10 text-brand-orange border border-brand-orange/20"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          }`}
                        >
                          {j === 0 ? "🏟️" : "🛒"} {heading}
                        </div>
                        <ul className="space-y-2.5">
                          {points.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2.5"
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${
                                  j === 0 ? "bg-brand-orange" : "bg-blue-400"
                                }`}
                              />
                              <span className="text-gray-300 text-sm">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Result callout */}
        <div
          className={`mt-10 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="rounded-2xl p-6 lg:p-8 text-center"
            style={{ background: "linear-gradient(135deg, rgba(232,98,42,0.1) 0%, rgba(232,98,42,0.03) 100%)", border: "1px solid rgba(232,98,42,0.2)" }}>
            <div className="text-4xl mb-3">🎊</div>
            <p className="text-white font-semibold text-xl mb-2">
              The result: faster, more organized, fully transparent event management
            </p>
            <p className="text-gray-400 text-sm">
              Eliminating manual steps for everyone involved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
