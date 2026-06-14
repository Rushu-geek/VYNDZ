"use client";

import { useRef, useEffect, useState, FormEvent } from "react";
import { Shield, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { insertVendor, insertOrganizer } from "@/lib/supabase";

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = "vendor" | "organizer";

type VendorForm = {
  name: string; city: string; email: string; phone: string;
  whatsapp: string; brand: string; category: string;
  instagram: string; source: string; referral: string;
};
type OrgForm = {
  name: string; city: string; email: string; phone: string;
  whatsapp: string; orgname: string; eventType: string;
  stalls: string; frequency: string; source: string; referral: string;
};

const emptyVendor: VendorForm = {
  name:"", city:"", email:"", phone:"", whatsapp:"",
  brand:"", category:"", instagram:"", source:"", referral:"",
};
const emptyOrg: OrgForm = {
  name:"", city:"", email:"", phone:"", whatsapp:"",
  orgname:"", eventType:"", stalls:"", frequency:"", source:"", referral:"",
};

// ── Validators ────────────────────────────────────────────────────────────────
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v: string) => /^[\+\d\s\-()\d]{8,15}$/.test(v.trim());

// ── Shared sub-components ─────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-white/8" />
      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

function Field({
  label, optional, error, children,
}: { label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[11.5px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
        {label}
        {optional && <span className="normal-case text-[10px] font-normal text-gray-600 ml-1.5">optional</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-[11px] mt-1">{error}</p>
      )}
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full bg-[#1C1C2E] border ${err ? "border-red-500/60 focus:ring-red-500/20" : "border-[#252538] focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"} text-gray-100 placeholder-gray-600 rounded-lg px-3.5 py-3 text-sm outline-none transition-all duration-200 focus:ring-4`;

const selectCls = (err?: string) =>
  `w-full bg-[#1C1C2E] border ${err ? "border-red-500/60" : "border-[#252538] focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"} text-gray-100 rounded-lg px-3.5 py-3 text-sm outline-none transition-all duration-200 focus:ring-4 appearance-none cursor-pointer`;

// ── Stats & social proof (left panel) ─────────────────────────────────────────
const stats = [
  { num: "500+", label: "On Waitlist" },
  { num: "Gujarat", label: "Launching First" },
  { num: "Free", label: "Early Access" },
];

const avatars = [
  { letter: "P", bg: "#FF6B00" },
  { letter: "R", bg: "#9B59B6" },
  { letter: "A", bg: "#3498DB" },
  { letter: "M", bg: "#1ABC9C" },
  { letter: "S", bg: "#E74C3C" },
];

// ── Success screen ─────────────────────────────────────────────────────────────
function SuccessScreen({ tab }: { tab: Tab }) {
  return (
    <div className="text-center py-12 px-4 animate-fade-up">
      <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/50 flex items-center justify-center mx-auto mb-5 text-3xl">
        🎉
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">You&apos;re on the list!</h3>
      <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto mb-6">
        {tab === "vendor"
          ? "We've saved your spot on the Vyndz vendor waitlist. We'll reach out on WhatsApp or email as soon as early access opens in your city."
          : "We've saved your spot on the Vyndz organizer waitlist. We'll reach out on WhatsApp or email as soon as early access opens in your city."}
      </p>
      <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold px-4 py-2 rounded-full">
        {tab === "vendor" ? "🛍️ Vendor" : "🎪 Organizer"} — Early Access
      </div>
    </div>
  );
}

// ── VENDOR FORM ───────────────────────────────────────────────────────────────
function VendorFormPanel() {
  const [form, setForm] = useState<VendorForm>(emptyVendor);
  const [errors, setErrors] = useState<Partial<VendorForm>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = (k: keyof VendorForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e: Partial<VendorForm> = {};
    if (!form.name.trim())       e.name     = "Please enter your full name";
    if (!form.city.trim())       e.city     = "Please enter your city";
    if (!isEmail(form.email))    e.email    = "Please enter a valid email";
    if (!isPhone(form.phone))    e.phone    = "Please enter a valid phone number";
    if (!form.brand.trim())      e.brand    = "Please enter your brand name";
    if (!form.category)          e.category = "Please select a category";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerError("");
    try {
      await insertVendor({
        name: form.name.trim(),
        city: form.city.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim() || undefined,
        brand: form.brand.trim(),
        category: form.category,
        instagram: form.instagram.trim() || undefined,
        source: form.source || undefined,
        referral: form.referral.trim() || undefined,
      });
      setStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      // Friendly duplicate email message
      setServerError(
        msg.includes("duplicate") || msg.includes("unique")
          ? "This email is already on the waitlist! We'll be in touch soon."
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

  if (status === "success") return <SuccessScreen tab="vendor" />;

  return (
    <>
      <div className="mb-1">
        <p className="text-[13px] text-gray-400 leading-relaxed">
          Get early access to discover events, book stalls and grow your brand on Vyndz.
        </p>
      </div>

      {/* Server error banner */}
      {status === "error" && serverError && (
        <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/25 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <SectionDivider label="Personal Info" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full Name" error={errors.name}>
            <input className={inputCls(errors.name)} type="text" value={form.name}
              onChange={set("name")} placeholder="Priya Shah" autoComplete="name" />
          </Field>
          <Field label="City" error={errors.city}>
            <input className={inputCls(errors.city)} type="text" value={form.city}
              onChange={set("city")} placeholder="Ahmedabad" />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Email" error={errors.email}>
            <input className={inputCls(errors.email)} type="email" value={form.email}
              onChange={set("email")} placeholder="priya@email.com" autoComplete="email" />
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <input className={inputCls(errors.phone)} type="tel" value={form.phone}
              onChange={set("phone")} placeholder="+91 98765 43210" />
          </Field>
        </div>

        <Field label="WhatsApp Number" optional error={errors.whatsapp}>
          <input className={inputCls()} type="tel" value={form.whatsapp}
            onChange={set("whatsapp")} placeholder="+91 98765 43210 (if different from phone)" />
        </Field>

        <SectionDivider label="Your Brand" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Brand / Business Name" error={errors.brand}>
            <input className={inputCls(errors.brand)} type="text" value={form.brand}
              onChange={set("brand")} placeholder="The Spice Box" />
          </Field>
          <Field label="Category" error={errors.category}>
            <div className="relative">
              <select className={selectCls(errors.category)} value={form.category} onChange={set("category")}>
                <option value="" disabled>Select your category</option>
                {["Food & Beverage","Fashion & Apparel","Handmade & Crafts",
                  "Home Decor","Beauty & Wellness","Electronics & Gadgets",
                  "Books & Stationery","Plants & Garden","Other"].map(o =>
                  <option key={o} className="bg-[#161625]">{o}</option>)}
              </select>
              <ChevronIcon />
            </div>
          </Field>
        </div>

        <Field label="Instagram Handle" optional>
          <input className={inputCls()} type="text" value={form.instagram}
            onChange={set("instagram")} placeholder="@thespicebox" />
        </Field>

        <SectionDivider label="A bit more" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="How did you hear about us?">
            <div className="relative">
              <select className={selectCls()} value={form.source} onChange={set("source")}>
                <option value="" disabled>Select source</option>
                {["Instagram","Friend / Word of mouth","At an Event","LinkedIn","WhatsApp","Other"].map(o =>
                  <option key={o} className="bg-[#161625]">{o}</option>)}
              </select>
              <ChevronIcon />
            </div>
          </Field>
          <Field label="Referred by" optional>
            <input className={inputCls()} type="text" value={form.referral}
              onChange={set("referral")} placeholder="Name or code" />
          </Field>
        </div>

        <SubmitBtn loading={status === "loading"} label="Reserve My Spot" />
      </form>
    </>
  );
}

// ── ORGANIZER FORM ─────────────────────────────────────────────────────────────
function OrganizerFormPanel() {
  const [form, setForm] = useState<OrgForm>(emptyOrg);
  const [errors, setErrors] = useState<Partial<OrgForm>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set = (k: keyof OrgForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e: Partial<OrgForm> = {};
    if (!form.name.trim())     e.name      = "Please enter your full name";
    if (!form.city.trim())     e.city      = "Please enter your city";
    if (!isEmail(form.email))  e.email     = "Please enter a valid email";
    if (!isPhone(form.phone))  e.phone     = "Please enter a valid phone number";
    if (!form.orgname.trim())  e.orgname   = "Please enter your organization or event name";
    if (!form.eventType)       e.eventType = "Please select an event type";
    if (!form.stalls)          e.stalls    = "Please select a stall range";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerError("");
    try {
      await insertOrganizer({
        name: form.name.trim(),
        city: form.city.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim() || undefined,
        orgname: form.orgname.trim(),
        event_type: form.eventType,
        stalls: form.stalls,
        frequency: form.frequency || undefined,
        source: form.source || undefined,
        referral: form.referral.trim() || undefined,
      });
      setStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setServerError(
        msg.includes("duplicate") || msg.includes("unique")
          ? "This email is already on the waitlist! We'll be in touch soon."
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

  if (status === "success") return <SuccessScreen tab="organizer" />;

  return (
    <>
      <div className="mb-1">
        <p className="text-[13px] text-gray-400 leading-relaxed">
          Get early access to list your events, manage stalls and onboard vendors through Vyndz.
        </p>
      </div>

      {/* Server error banner */}
      {status === "error" && serverError && (
        <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/25 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <SectionDivider label="Personal Info" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full Name" error={errors.name}>
            <input className={inputCls(errors.name)} type="text" value={form.name}
              onChange={set("name")} placeholder="Rahul Mehta" autoComplete="name" />
          </Field>
          <Field label="City" error={errors.city}>
            <input className={inputCls(errors.city)} type="text" value={form.city}
              onChange={set("city")} placeholder="Surat" />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Email" error={errors.email}>
            <input className={inputCls(errors.email)} type="email" value={form.email}
              onChange={set("email")} placeholder="rahul@events.com" autoComplete="email" />
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <input className={inputCls(errors.phone)} type="tel" value={form.phone}
              onChange={set("phone")} placeholder="+91 98765 43210" />
          </Field>
        </div>

        <Field label="WhatsApp Number" optional>
          <input className={inputCls()} type="tel" value={form.whatsapp}
            onChange={set("whatsapp")} placeholder="+91 98765 43210 (if different from phone)" />
        </Field>

        <SectionDivider label="Your Events" />

        <Field label="Organization / Event Name" error={errors.orgname}>
          <input className={inputCls(errors.orgname)} type="text" value={form.orgname}
            onChange={set("orgname")} placeholder="Urban Flea Ahmedabad" />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Type of Events" error={errors.eventType}>
            <div className="relative">
              <select className={selectCls(errors.eventType)} value={form.eventType} onChange={set("eventType")}>
                <option value="" disabled>Select event type</option>
                {["Flea Market / Pop-up","Food Festival","Trade Expo / B2B",
                  "Cultural / Community Event","Corporate / Brand Activation",
                  "College / Campus Event","Craft & Artisan Fair","Other"].map(o =>
                  <option key={o} className="bg-[#161625]">{o}</option>)}
              </select>
              <ChevronIcon />
            </div>
          </Field>
          <Field label="Expected Stalls per Event" error={errors.stalls}>
            <div className="relative">
              <select className={selectCls(errors.stalls)} value={form.stalls} onChange={set("stalls")}>
                <option value="" disabled>Select range</option>
                {["1 – 10 stalls","11 – 25 stalls","26 – 50 stalls",
                  "51 – 100 stalls","100+ stalls"].map(o =>
                  <option key={o} className="bg-[#161625]">{o}</option>)}
              </select>
              <ChevronIcon />
            </div>
          </Field>
        </div>

        <SectionDivider label="A bit more" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="How often do you organize?">
            <div className="relative">
              <select className={selectCls()} value={form.frequency} onChange={set("frequency")}>
                <option value="" disabled>Select frequency</option>
                {["Monthly or more","Every few months","Quarterly",
                  "Annually","Planning my first event"].map(o =>
                  <option key={o} className="bg-[#161625]">{o}</option>)}
              </select>
              <ChevronIcon />
            </div>
          </Field>
          <Field label="How did you hear about us?">
            <div className="relative">
              <select className={selectCls()} value={form.source} onChange={set("source")}>
                <option value="" disabled>Select source</option>
                {["Instagram","Friend / Word of mouth","At an Event",
                  "LinkedIn","WhatsApp","Other"].map(o =>
                  <option key={o} className="bg-[#161625]">{o}</option>)}
              </select>
              <ChevronIcon />
            </div>
          </Field>
        </div>

        <Field label="Referred by" optional>
          <input className={inputCls()} type="text" value={form.referral}
            onChange={set("referral")} placeholder="Name or code" />
        </Field>

        <SubmitBtn loading={status === "loading"} label="Reserve My Spot" />
      </form>
    </>
  );
}

// ── Reusable helpers ──────────────────────────────────────────────────────────
function ChevronIcon() {
  return (
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path d="M1 1l5 5 5-5" stroke="#7A7A9A" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full mt-2 flex items-center justify-center gap-2.5 bg-[#FF6B00] hover:bg-[#E55A00] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-[15px] px-6 py-3.5 rounded-lg transition-all duration-200 hover:shadow-[0_8px_24px_rgba(255,107,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 group"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : null}
      <span>{loading ? "Saving your spot…" : label}</span>
      {!loading && (
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      )}
    </button>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function WaitlistForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("vendor");

  // For animated sliding indicator
  const vendorBtnRef  = useRef<HTMLButtonElement>(null);
  const orgBtnRef     = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: "4px", width: "0px" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const btn = activeTab === "vendor" ? vendorBtnRef.current : orgBtnRef.current;
    const vendorBtn = vendorBtnRef.current;
    if (!btn) return;
    setIndicatorStyle({
      left: activeTab === "vendor" ? "4px" : `${(vendorBtn?.offsetWidth ?? 0) + 4}px`,
      width: `${btn.offsetWidth}px`,
    });
  }, [activeTab]);

  // Re-measure on resize
  useEffect(() => {
    const handleResize = () => {
      const btn = activeTab === "vendor" ? vendorBtnRef.current : orgBtnRef.current;
      const vendorBtn = vendorBtnRef.current;
      if (!btn) return;
      setIndicatorStyle({
        left: activeTab === "vendor" ? "4px" : `${(vendorBtn?.offsetWidth ?? 0) + 4}px`,
        width: `${btn.offsetWidth}px`,
      });
    };
    window.addEventListener("resize", handleResize);
    // Fire once to init
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #110a00 50%, #0d0d1a 100%)" }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      {/* Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,107,0,0.1) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT PANEL ──────────────────────────────────────────────── */}
          <div
            className={`lg:sticky lg:top-24 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
              Early Access — Beta
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5">
              India&apos;s event<br />marketplace is<br />
              <span className="text-[#FF6B00] relative">
                almost here.
                <span className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-[#FF6B00] rounded opacity-40" />
              </span>
            </h2>

            <p className="text-gray-400 text-[16px] leading-relaxed mb-10 max-w-md">
              Whether you&apos;re a vendor looking for your next stall or an organizer who wants to fill every space — Vyndz is built for you. Be first in line.
            </p>

            {/* Stats */}
            <div className="flex items-stretch gap-6 sm:gap-8 mb-10">
              {stats.map(({ num, label }, i) => (
                <>
                  <div key={label}>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#FF6B00] tracking-tight">{num}</div>
                    <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">{label}</div>
                  </div>
                  {i < stats.length - 1 && (
                    <div key={`div-${i}`} className="w-px bg-[#252538] self-stretch" />
                  )}
                </>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {avatars.map(({ letter, bg }, i) => (
                  <div
                    key={letter + i}
                    className="w-8 h-8 rounded-full border-2 border-[#0d0d1a] flex items-center justify-center text-[13px] font-bold text-white"
                    style={{ background: bg, marginLeft: i === 0 ? 0 : "-8px" }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                <span className="text-white font-semibold">Vendors &amp; organizers</span> from Ahmedabad are already on the list.
              </p>
            </div>

            {/* Feature list */}
            <div className="mt-10 space-y-3">
              {[
                { icon: "✅", text: "Free to join — always" },
                { icon: "🔒", text: "Your data stays private" },
                { icon: "🚀", text: "Priority access at launch" },
                { icon: "💰", text: "Founding member pricing locked in" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-gray-400 text-sm">
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL — FORM CARD ──────────────────────────────────── */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className="relative rounded-3xl overflow-hidden border border-[#252538]"
              style={{ background: "#161625" }}
            >
              {/* Orange top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, #FF6B00, transparent)" }} />

              <div className="p-6 sm:p-8">

                {/* ── Toggle ─────────────────────────────────────────────── */}
                <div className="relative flex bg-[#0E0E1A] border border-[#252538] rounded-full p-1 mb-7">
                  {/* Sliding indicator */}
                  <div
                    className="absolute top-1 bottom-1 rounded-full bg-[#FF6B00] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                  />
                  <button
                    ref={vendorBtnRef}
                    onClick={() => setActiveTab("vendor")}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold transition-colors duration-200 ${
                      activeTab === "vendor" ? "text-white" : "text-gray-500"
                    }`}
                  >
                    🛍️ I&apos;m a Vendor
                  </button>
                  <button
                    ref={orgBtnRef}
                    onClick={() => setActiveTab("organizer")}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold transition-colors duration-200 ${
                      activeTab === "organizer" ? "text-white" : "text-gray-500"
                    }`}
                  >
                    🎪 I&apos;m an Organizer
                  </button>
                </div>

                {/* ── Form title ─────────────────────────────────────────── */}
                <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                  {activeTab === "vendor" ? "Join as a Vendor" : "Join as an Organizer"}
                </h3>

                {/* ── Form panels ────────────────────────────────────────── */}
                <div key={activeTab}>
                  {activeTab === "vendor"
                    ? <VendorFormPanel />
                    : <OrganizerFormPanel />}
                </div>

                {/* Privacy note */}
                <p className="text-center text-[11.5px] text-gray-600 mt-5 leading-relaxed">
                  <Shield size={11} className="inline mr-1 -mt-0.5" />
                  Your information is private and will never be shared.<br />
                  We&apos;ll only contact you about Vyndz early access.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
