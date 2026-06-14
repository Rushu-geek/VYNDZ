"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function FinalCTA() {
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
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a00 50%, #0d0d1a 100%)" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb orb-orange w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Logo */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="relative w-28 h-28">
            <Image
              src="/logo-full.png"
              alt="Vyndz"
              fill
              className="object-contain"
              style={{ filter: "invert(1) hue-rotate(180deg)" }}
              sizes="112px"
            />
          </div>
        </div>

        <div
          className={`transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="badge mx-auto mb-6">
            <Sparkles size={14} />
            <span>The future of event vendor management</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Ready to Transform How
            <br />
            <span className="gradient-text">You Manage Events?</span>
          </h2>

          <p className="text-xl text-gray-300 mb-4 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of event professionals already on the Vyndz waitlist.
            Be part of the movement to make event management smarter, faster, and
            simpler.
          </p>

          <p className="text-gray-500 text-sm mb-10">
            &ldquo;Making Event Management Simpler, Faster &amp; Smarter.&rdquo;
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={scrollToWaitlist}
              className="btn-primary flex items-center justify-center gap-2 text-lg px-10 py-5 rounded-2xl"
            >
              <Sparkles size={20} />
              Join the Waitlist — Free
              <ArrowRight size={20} />
            </button>
            <button
              onClick={scrollToWaitlist}
              className="btn-secondary flex items-center justify-center gap-2 text-lg px-10 py-5 rounded-2xl"
            >
              Request Early Access
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {[
              { icon: "✅", text: "Free to join" },
              { icon: "🔒", text: "Privacy protected" },
              { icon: "🚀", text: "Early access guaranteed" },
              { icon: "💰", text: "Founding member pricing" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-gray-400">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
