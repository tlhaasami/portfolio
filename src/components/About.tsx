"use client";

import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative bg-black text-white py-24 overflow-hidden border-t border-neutral-900">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-900/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column (Image - spanning 5 columns) */}
          <div className="aspect-[4/5] md:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-900 group">
            {/* Dark elegant inner shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-40" />
            <Image
              src="/profile.png"
              alt="Talha Sami"
              fill
              sizes="(max-w-768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>

          {/* Right Column (The Information Card - spanning 7 columns) */}
          <div className="md:col-span-7 bg-neutral-950/60 backdrop-blur-md border border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(245,158,11,0.05)] md:translate-x-[-2rem] md:z-20 md:relative max-md:mt-[-3rem] max-md:mx-4 max-md:z-20">
            
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white mb-6">
              Bridging the gap between complex engineering and clear strategy.
            </h2>

            <div className="text-neutral-400 text-base md:text-lg leading-relaxed font-sans">
              <p>
                I am a software engineer specializing in building robust, scalable applications from the ground up, with a technical foundation spanning full-stack web architectures, cross-platform mobile development, and workflow automation. Writing clean, high-performance code is only half the equation; my true strength lies in communication strategy—translating intricate technical requirements into clear, actionable roadmaps that bridge the divide between development teams and stakeholders to deliver a seamless user experience aligned with the business vision.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
