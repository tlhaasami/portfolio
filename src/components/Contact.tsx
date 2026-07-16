"use client";

import React, { useState, useEffect, useRef } from "react";
import { prefixAsset, getPrefix } from "@/utils/prefixAsset";
import SafeImage from "@/components/ui/SafeImage";
import portfolioDataStatic from "@/data/portfolioData.json";

const DEFAULT_PORTFOLIO_FALLBACK = {
  contactSubheading: "WE'RE HERE TO HELP YOU",
  contactHeading: "Discuss Your Project & Engineering Needs",
  contactParagraph: "Are you looking for high-performance systems, robust automation workflows, or backend integrations tailored to your requirements? Reach out to start a conversation.",
  contactEmail: "talha.sami.dev@gmail.com",
  contactPhone: "+92 300 1234567",
  contactInterests: [
    "Frontend Development",
    "Backend Systems",
    "DevOps & Cloud Architecture",
    "Workflow Automation",
    "Full-Stack Project",
    "Consulting / General Inquiry"
  ],
  socials: [] as any[]
};

export default function Contact() {
  const [data, setData] = useState<any>({
    ...DEFAULT_PORTFOLIO_FALLBACK,
    ...portfolioDataStatic
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        setData({
          ...DEFAULT_PORTFOLIO_FALLBACK,
          ...portfolioDataStatic,
          ...parsed
        });

        const interests = parsed.contactInterests || portfolioDataStatic.contactInterests || DEFAULT_PORTFOLIO_FALLBACK.contactInterests;
        if (interests && interests.length > 0) {
          setFormData((prev) => ({
            ...prev,
            interest: interests[0]
          }));
        }
      } else {
        const interests = portfolioDataStatic.contactInterests || DEFAULT_PORTFOLIO_FALLBACK.contactInterests;
        if (interests && interests.length > 0) {
          setFormData((prev) => ({
            ...prev,
            interest: interests[0]
          }));
        }
      }
    } catch (e) {
      console.error("Error parsing contact settings:", e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      const stored = localStorage.getItem("contact-inquiries");
      const inquiries = stored ? JSON.parse(stored) : [];
      inquiries.push({
        ...formData,
        date: new Date().toISOString()
      });
      localStorage.setItem("contact-inquiries", JSON.stringify(inquiries));
    } catch (err) {
      console.error("Error saving inquiry:", err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      const interests = data.contactInterests || DEFAULT_PORTFOLIO_FALLBACK.contactInterests;
      setFormData({
        name: "",
        email: "",
        interest: (interests && interests.length > 0) ? interests[0] : "",
        message: ""
      });
    }, 4500);
  };

  const visibleSocials = (data.socials || []).filter((s: any) => s.visible);
  const interestOptions = data.contactInterests || DEFAULT_PORTFOLIO_FALLBACK.contactInterests;

  return (
    <section
      id="contact"
      className="relative bg-transparent text-neutral-900 dark:text-white py-24 overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-200/10 dark:bg-zinc-900/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1300px] xl:max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Main Grid Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info Text & Social Links (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-550 dark:text-zinc-400 uppercase mb-3 block font-bold">
                {data.contactSubheading || "WE'RE HERE TO HELP YOU"}
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
                {data.contactHeading || "Discuss Your Project Needs"}
              </h2>
              <p className="mt-4 text-neutral-500 dark:text-neutral-450 font-sans leading-relaxed text-sm md:text-base">
                {data.contactParagraph || "Are you looking for high-performance software engineering, cloud architecture, or API automation? Reach out to start a conversation."}
              </p>
            </div>

            {/* Email & Phone Contact Rows */}
            <div className="space-y-3 font-sans text-sm -mx-3">
              {data.contactEmail && (
                <div className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-neutral-200/50 dark:hover:border-zinc-850 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/25 transition-all duration-300 group/item">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-900/60 border border-neutral-200/50 dark:border-zinc-800/40 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform duration-300">
                    <svg className="w-4 h-4 stroke-neutral-700 dark:stroke-neutral-300 fill-none" strokeWidth="2" viewBox="0 0 24 24">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-455 dark:text-neutral-500">E-mail</div>
                    <a href={`mailto:${data.contactEmail}`} className="text-neutral-800 dark:text-neutral-200 hover:underline font-medium">
                      {data.contactEmail}
                    </a>
                  </div>
                </div>
              )}

              {data.contactPhone && (
                <div className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-neutral-200/50 dark:hover:border-zinc-850 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/25 transition-all duration-300 group/item">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-900/60 border border-neutral-200/50 dark:border-zinc-800/40 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform duration-300">
                    <svg className="w-4 h-4 stroke-neutral-700 dark:stroke-neutral-300 fill-none" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-455 dark:text-neutral-500">Phone number</div>
                    <a href={`tel:${data.contactPhone}`} className="text-neutral-800 dark:text-neutral-200 hover:underline font-medium">
                      {data.contactPhone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Social Profile Links */}
            {visibleSocials.length > 0 && (
              <div className="pt-6 border-t border-neutral-150 dark:border-zinc-900/60 space-y-3.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 dark:text-neutral-500 block pl-0.5">
                  Find me on tech platforms:
                </span>
                <div className="flex flex-wrap gap-3">
                  {visibleSocials.map((social: any) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-neutral-50 dark:bg-zinc-900/40 border border-neutral-200/50 dark:border-zinc-800/50 flex items-center justify-center hover:border-neutral-350 dark:hover:border-zinc-700 hover:bg-neutral-100/30 dark:hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 group"
                      title={social.name}
                    >
                      {social.logo && social.logo !== "null" && social.logo !== "" ? (
                        <SafeImage
                          src={prefixAsset(social.logo)}
                          alt={social.name}
                          fallback={
                            <span className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-450">
                              {social.name.substring(0, 2).toUpperCase()}
                            </span>
                          }
                          className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-125 flex items-center justify-center"
                        />
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-neutral-500 dark:text-neutral-455">
                          {social.name.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Card Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative bg-neutral-50/55 dark:bg-zinc-950/45 border border-neutral-200/50 dark:border-zinc-800/50 rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-zinc-800 transition-all duration-500 backdrop-blur-md">
              
              {submitted ? (
                /* Success Message State */
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-black dark:text-white border border-neutral-200/50 dark:border-zinc-800/50 shadow-inner">
                    <svg className="w-8 h-8 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-neutral-550 dark:text-neutral-400 font-sans text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out, {formData.name}. I have logged your message and will get back to you shortly.
                  </p>
                </div>
              ) : (
                /* Form Inputs State */
                <form onSubmit={handleSubmit} className="space-y-6 font-sans text-sm">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="form-name" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 pl-0.5">
                      Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4.5 py-4 bg-neutral-100/35 dark:bg-zinc-900/15 border border-neutral-200/50 dark:border-zinc-800/40 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-zinc-950 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-black/5 dark:focus:ring-white/5 dark:text-white transition-all duration-300 placeholder-neutral-400/85"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="form-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 pl-0.5">
                      Email
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4.5 py-4 bg-neutral-100/35 dark:bg-zinc-900/15 border border-neutral-200/50 dark:border-zinc-800/40 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-zinc-950 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-black/5 dark:focus:ring-white/5 dark:text-white transition-all duration-300 placeholder-neutral-400/85"
                    />
                  </div>

                  {/* Dropdown Select (Project Category) */}
                  <div className="space-y-2 relative" ref={selectRef}>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 pl-0.5">
                      Interest
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full px-4.5 py-4 bg-neutral-100/35 dark:bg-zinc-900/15 border border-neutral-200/50 dark:border-zinc-800/40 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-zinc-950 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-black/5 dark:focus:ring-white/5 dark:text-white transition-all duration-300 flex items-center justify-between text-left cursor-pointer font-medium"
                      >
                        <span>{formData.interest}</span>
                        <svg 
                          className={`w-4 h-4 stroke-neutral-450 dark:stroke-neutral-500 fill-none transition-transform duration-300 ${isSelectOpen ? "rotate-180" : "rotate-0"}`} 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      
                      {isSelectOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-white/95 dark:bg-zinc-950/95 border border-neutral-200/60 dark:border-zinc-800/50 rounded-2xl shadow-xl backdrop-blur-md z-50 py-1.5 overflow-hidden animate-in fade-in-50 slide-in-from-top-2 duration-200">
                          {interestOptions.map((option: string) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, interest: option });
                                setIsSelectOpen(false);
                              }}
                              className={`w-full text-left px-4.5 py-3 text-xs font-sans transition-colors duration-200 cursor-pointer ${
                                formData.interest === option
                                  ? "bg-neutral-100 dark:bg-zinc-900 font-semibold text-black dark:text-white"
                                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-zinc-900/50 hover:text-black dark:hover:text-white"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="form-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 pl-0.5">
                      Message
                    </label>
                    <textarea
                      id="form-message"
                      rows={4}
                      required
                      placeholder="Describe your idea or project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4.5 py-4 bg-neutral-100/35 dark:bg-zinc-900/15 border border-neutral-200/50 dark:border-zinc-800/40 rounded-2xl focus:outline-none focus:bg-white dark:focus:bg-zinc-950 focus:border-neutral-900 dark:focus:border-white focus:ring-1 focus:ring-black/5 dark:focus:ring-white/5 dark:text-white resize-none transition-all duration-300 placeholder-neutral-400/85"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-3.5 px-6.5 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 active:scale-95 group shadow-sm hover:shadow-md cursor-pointer hover:opacity-90"
                    >
                      <span>Get a Solution</span>
                      <div className="w-6 h-6 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5 shrink-0">
                        <svg className="w-3.5 h-3.5 stroke-white dark:stroke-black fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
