/**
 * @license
 * Copyright (c) 2026 Ammad Waseem. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * Project: Portfolio
 * Author: Ammad Waseem (ammadwaseem)
 * Website: https://devcore.website
 */
import CustomerStories from "./components/home/customer-stories";
import Faq from "./components/home/faq";
import HeroSection from "./components/home/hero";
import Innovation from "./components/home/innovation";
import PortfolioIntro from "./components/home/portfolio-intro";
import OnlinePresence from "./components/home/online-presence";
import FullStackProjects from "./components/home/fullstack-projects";
import AiProjects from "./components/home/ai-projects";
import AppProjects from "./components/home/app-projects";
import BlockchainProjects from "./components/home/blockchain-projects";
import Solutions from "./components/home/solution";
import WebResult from "./components/home/web-result";


'use client';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useEffect, useRef } from 'react';
import HomeBanner from '@/components/sections/HomeBanner';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import MarqueeStrip from '@/components/sections/MarqueeStrip';
import CurvedSectionDivider from '@/components/ui/CurvedSectionDivider';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { scrollToSection } from '@/lib/navigation';
export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const reuniteRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const home = homeRef.current;
    const reunite = reuniteRef.current;
    const techStack = techStackRef.current;
    const projects = document.querySelector('section');
    if (!home || !reunite || !techStack || !projects) return;

    const ctx = gsap.context(() => {
      gsap.set(reunite, {
        zIndex: 2,
      });
      gsap.set(home, {
        zIndex: 1,
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
      });

      const updatePointerEvents = (self: ScrollTrigger) => {
        if (self.progress >= 0.85) {
          home.style.pointerEvents = 'none';
        } else {
          home.style.pointerEvents = 'auto';
        }
      };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: reunite,
            start: 'top bottom',
            end: 'top 10%',
            scrub: 1.2,
            onUpdate: updatePointerEvents,
            onLeave: () => {
              home.style.pointerEvents = 'none';
            },
            onEnterBack: () => {
              home.style.pointerEvents = 'auto';
            },
            onRefresh: updatePointerEvents,
          },
        })
        .to(home, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          ease: 'power2.out',
        });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    try {
      const target = sessionStorage.getItem('nav_target_section');
      if (target) {
        sessionStorage.removeItem('nav_target_section');
        const timer = setTimeout(() => {
          scrollToSection(target);
        }, 350);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);
  return (
<>
  <Navbar />
  <main className="relative">
    {/* ---------------------Hero section Starts-----------------  */}
    <HeroSection />
    {/* ---------------------Hero section Ends-----------------  */}

    {/* ---------------------Web result section Starts-----------------  */}
    <WebResult />
    {/* ---------------------Web result section Ends-----------------  */}

    {/* ---------------------Innovation section Starts-----------------  */}
    <Innovation />
    {/* ---------------------Innovation section Ends-----------------  */}

    {/* ---------------------Portfolio intro section Starts-----------------  */}
    <PortfolioIntro />
    {/* ---------------------Portfolio intro section Ends-----------------  */}

    {/* ---------------------AI Projects section Starts-----------------  */}
    <AiProjects />
    {/* ---------------------AI Projects section Ends-----------------  */}

    {/* ---------------------App Projects section Starts-----------------  */}
    <AppProjects />
    {/* ---------------------App Projects section Ends-----------------  */}

    {/* ---------------------Web & CRM Projects section Starts-----------------  */}
    <FullStackProjects />
    {/* ---------------------Web & CRM Projects section Ends-----------------  */}

    {/* ---------------------Client Websites section Starts-----------------  */}
    <OnlinePresence />
    {/* ---------------------Client Websites section Ends-----------------  */}

    {/* ---------------------Blockchain Projects section Starts-----------------  */}
    <BlockchainProjects />
    {/* ---------------------Blockchain Projects section Ends-----------------  */}

    {/* ---------------------Customer Stories section Starts-----------------  */}
    <CustomerStories />
    {/* ---------------------Customer Stories section Ends-----------------  */}

    {/* ---------------------Faq section Starts-----------------  */}
    <Faq />
    {/* ---------------------Faq section Ends-----------------  */}

    {/* ---------------------Solutions section Starts-----------------  */}
    <Solutions />
    {/* ---------------------Solutions section Ends-----------------  */}
  </main>

  <MarqueeStrip />
  <CurvedSectionDivider curveColor="#E8E4DE" bottomColor="#0F0E0C" />
  <div className="relative z-25 bg-ink overflow-hidden">
    <Contact />
    <Footer />
  </div>
</>

}
