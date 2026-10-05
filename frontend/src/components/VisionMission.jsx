import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function VisionMission({ onThemeChange }) {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);

  // GSAP ScrollTrigger: Pinned Section + PURE SOLID BLACK Circle Bubble Expansion + Instant White Text Switch
  useGSAP(
    () => {
      const section = sectionRef.current;
      const circle = circleRef.current;

      if (!section || !circle) return;

      // Master Pinned Timeline for Pure Black Circle Expansion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2400', // Pinned scroll distance
          pin: true,     // Section stays pinned until pure black circle fills 100% of the screen
          scrub: 1.2,    // Silky smooth momentum scrub
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Notify parent App component to toggle dark navbar & global theme when black circle fills screen
            if (self.progress > 0.35) {
              onThemeChange && onThemeChange(true);
            } else {
              onThemeChange && onThemeChange(false);
            }
          },
        },
      });

      // 1. Expand PURE SOLID BLACK (#000000) circle bubble from center (scale 0 to 1)
      tl.to(
        circle,
        {
          scale: 1,
          ease: 'power2.inOut',
          duration: 0.65,
        },
        0.2
      );

      // 2. Transition section background to 100% PURE SOLID BLACK (#000000)
      tl.to(
        section,
        {
          backgroundColor: '#000000',
          ease: 'none',
          duration: 0.5,
        },
        0.2
      );

      // 3. INSTANT SWITCH to PURE BRIGHT CRISP WHITE (#ffffff) right when black circle expands (NO BLUE TINT)
      tl.to(
        ['.theme-heading', '.theme-text-body', '.theme-text-sub', '.theme-text-accent'],
        {
          color: '#ffffff',
          ease: 'none',
          duration: 0.05, // Instant switch to pure white
        },
        0.2
      );

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative h-screen w-full bg-white text-slate-900 overflow-hidden flex flex-col justify-center items-center pt-24 sm:pt-28 pb-10 transition-colors duration-500"
    >
      {/* EXPANDING 100% PURE SOLID BLACK CIRCLE BUBBLE (#000000) */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320vw] h-[320vw] min-w-[320vh] min-h-[320vh] rounded-full bg-black pointer-events-none z-0 scale-0 will-change-transform"
      />

      {/* CONTENT LAYER */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center space-y-6 sm:space-y-8 my-auto">

        {/* SECTION 1: OUR VISION */}
        <div className="space-y-2.5">
          <h2 className="theme-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 transition-colors duration-200">
            Our Vision
          </h2>

          <div className="max-w-2xl mx-auto space-y-2 font-normal leading-relaxed">
            <p className="theme-text-body text-base sm:text-xl font-medium text-slate-800 transition-colors duration-200">
              To be a global leader in software innovation and tech education, empowering businesses with smart digital solutions and shaping individuals into creators of the future.
            </p>
            <p className="theme-text-sub text-xs sm:text-base text-slate-600 transition-colors duration-200">
              We envision a world where technology and talent grow together, driving progress, possibilities, and positive change.
            </p>
          </div>
        </div>

        {/* SECTION 2: OUR MISSION */}
        <div className="space-y-2.5 pt-2">
          <h2 className="theme-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 transition-colors duration-200">
            Our Mission
          </h2>

          <div className="max-w-2xl mx-auto space-y-2 font-normal leading-relaxed">
            <p className="theme-text-body text-sm sm:text-lg text-slate-800 transition-colors duration-200">
              Deliver cutting-edge software solutions that solve real-world challenges.
            </p>
            <p className="theme-text-body text-sm sm:text-lg text-slate-800 transition-colors duration-200">
              Provide world-class programming education to transform learners into industry leaders.
            </p>
            <p className="theme-text-body text-sm sm:text-lg text-slate-800 transition-colors duration-200">
              Foster continuous learning, creativity, and technological excellence.
            </p>
            <p className="theme-text-accent text-emerald-600 font-bold text-base sm:text-xl pt-1 transition-colors duration-200">
              Making digital transformation accessible, impactful, and sustainable for all.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
