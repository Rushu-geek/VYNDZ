"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Vyndz?",
    answer:
      "Vyndz is a smart vendor management platform for modern events. It helps event organizers streamline vendor applications, approvals, document collection, booth assignments, payment tracking, and communications — all from a single dashboard. Vendors use Vyndz to discover events, apply quickly, and manage their documents and status updates in one place.",
  },
  {
    question: "When will Vyndz launch?",
    answer:
      "We're currently in pre-launch with a closed beta planned for Q3 2026. Waitlist members will get early access invitations before the public launch. Join the waitlist to secure your founding member spot and be among the first to use the platform.",
  },
  {
    question: "Is Vyndz suitable for all types of events?",
    answer:
      "Yes! Vyndz is designed to work for a wide range of events including festivals, conferences, trade shows, exhibitions, food events, corporate events, community gatherings, wedding expos, college fests, and more. Whether you manage 5 vendors or 500, Vyndz scales to your needs.",
  },
  {
    question: "How much will Vyndz cost?",
    answer:
      "Pricing details will be announced closer to the public launch. However, founding members who join the waitlist will receive exclusive early-adopter pricing — significantly discounted compared to regular pricing. We plan to offer a free tier for small events and paid plans for organizers with advanced needs.",
  },
  {
    question: "Can both vendors and organizers use Vyndz?",
    answer:
      "Absolutely. Vyndz is built for both sides of the marketplace. Organizers get a powerful dashboard to manage their entire vendor operation. Vendors get a dedicated portal to discover events, apply, submit documents, track their application status, and receive communications — all in one place.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! During the beta phase, all features will be available for free. After the public launch, we'll offer a free plan with core features and premium plans for power users. Founding members will receive a special pricing package that won't be available to later signups.",
  },
  {
    question: "How do I get access to the beta?",
    answer:
      "Simply join the waitlist using the form on this page. Waitlist members will receive beta invitations in order of signup. The sooner you join, the earlier you'll get access. We'll send you an email with instructions when your spot is ready.",
  },
  {
    question: "What happens to my data if I sign up?",
    answer:
      "We take privacy seriously. Your data is only used to send you relevant updates about Vyndz. We never sell or share your information with third parties. You can unsubscribe from our communications at any time.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      id="faq"
      className="section-padding bg-[#080810] relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="badge mx-auto mb-4">
            <span>❓ FAQ</span>
          </div>
          <h2 className="section-title text-white">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about Vyndz. Can&apos;t find your answer?{" "}
            <a href="mailto:hello@vyndz.com" className="text-brand-orange hover:underline">
              Reach out to us.
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map(({ question, answer }, i) => (
            <div
              key={question}
              className={`glass rounded-2xl border transition-all duration-500 overflow-hidden ${
                openIndex === i
                  ? "border-brand-orange/30"
                  : "border-white/5 hover:border-white/10"
              } ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium text-sm sm:text-base pr-4">
                  {question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-brand-orange" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-5 pb-5 pt-0">
                  <div className="h-px bg-white/5 mb-4" />
                  <p className="text-gray-400 text-sm leading-relaxed">{answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
