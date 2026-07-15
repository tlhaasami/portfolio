"use client";

import TiltedCard from "@/components/ui/TiltedCard";
import BorderGlow from "@/components/ui/BorderGlow";
import { motion } from "framer-motion";

interface AboutProps {
  heading?: string;
  paragraph?: string;
  image?: string;
}

export default function About({
  heading = "Bridging the gap between complex engineering and clear strategy.",
  paragraph = "I am a software engineer specializing in building robust, scalable applications from the ground up, with a technical foundation spanning full-stack web architectures, cross-platform mobile development, and workflow automation. Writing clean, high-performance code is only half the equation; my true strength lies in communication strategy—translating intricate technical requirements into clear, actionable roadmaps that bridge the divide between development teams and stakeholders to deliver a seamless user experience aligned with the business vision.",
  image = "/profile.png"
}: AboutProps) {
  return (
    <section id="about" className="relative bg-white dark:bg-black text-neutral-900 dark:text-white py-24 overflow-hidden border-t border-neutral-200 dark:border-neutral-900">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-200/25 dark:bg-neutral-900/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1300px] xl:max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

          {/* Left Column (Image - spanning 5 columns, sliding in from left) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-5 w-full max-w-[416px] h-[520px] md:ml-auto max-md:mx-auto relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.06)] border border-neutral-200 dark:border-neutral-900 group"
          >
            <TiltedCard
              imageSrc={image}
              altText="Talha Sami"
              captionText="Talha Sami - Software Engineer"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.03}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              className="absolute inset-0 w-full h-full"
              overlayContent={
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              }
            />
          </motion.div>

          {/* Right Column (The Information Card using BorderGlow - spanning 7 columns, sliding in from right) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="md:col-span-7 w-full h-auto min-h-[400px] md:h-[520px] backdrop-blur-md"
          >
            <BorderGlow
              edgeSensitivity={30}
              glowColor="40 80 80"
              backgroundColor="var(--about-card-bg)"
              borderRadius={24}
              glowRadius={45}
              glowIntensity={0.8}
              coneSpread={25}
              animated={true}
              colors={['#ffffff', '#71717a', '#18181b']}
              className="w-full h-full"
            >
              <div className="p-8 md:p-12 h-full flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white mb-6">
                  {heading}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed font-sans">
                  {paragraph}
                </p>
              </div>
            </BorderGlow>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

