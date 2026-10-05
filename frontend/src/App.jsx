import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SectionSkeleton from './components/SectionSkeleton';

// Lazy-load below-the-fold heavy sections for ultra-fast LCP & FCP
const Courses = lazy(() => import('./components/courses/Courses'));
const Team = lazy(() => import('./components/team/Team'));
const Testimonials = lazy(() => import('./components/testimonials/Testimonials'));
const Contact = lazy(() => import('./components/contact/Contact'));
const Footer = lazy(() => import('./components/footer/Footer'));
const GetStartedModal = lazy(() => import('./components/GetStartedModal'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// On-demand section loader: defers component network request until scrolled near viewport
function LazySection({ children, fallback = <SectionSkeleton /> }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldLoad ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  // Initialize Lenis Smooth Scroll & Sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Update Lenis on GSAP ticker frame with lag smoothing optimization
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#284e51] selection:text-white relative">
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <About onOpenModal={() => setModalOpen(true)} />

      <LazySection>
        <Courses onOpenModal={() => setModalOpen(true)} />
      </LazySection>

      <LazySection>
        <Team onOpenModal={() => setModalOpen(true)} />
      </LazySection>

      <LazySection>
        <Testimonials />
      </LazySection>

      <LazySection>
        <Contact />
      </LazySection>

      <LazySection>
        <Footer />
      </LazySection>

      {modalOpen && (
        <Suspense fallback={null}>
          <GetStartedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </Suspense>
      )}

      {/* FIXED GLOBAL BOTTOM FROSTED GRADIENT BLUR OVERLAY ACROSS ENTIRE WEBSITE */}
      <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 pointer-events-none z-40 bg-gradient-to-t from-white/90 via-white/50 to-transparent backdrop-blur-[3px]" />
    </div>
  );
}

