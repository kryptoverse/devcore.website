'use client';

import React, { useRef } from 'react';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { site, socialList } from '@/lib/site';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { isVapiConfigured, openVoiceAgent } from '@/lib/vapi';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaExternalLinkAlt } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';
import { Mic, Phone } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  instagram: <FaInstagram />,
  whatsapp: <FaWhatsapp />,
  linktree: <SiLinktree />,
};

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bubblesContainerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const reduced = useReducedMotion();

  // Physics state
  const physicsRef = useRef(socialList.map((_, i) => {
    const angle = (i / socialList.length) * Math.PI * 2;
    const radius = 100;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: 48,
      mass: 1,
      isHovered: false,
    };
  }));

  const headingWords = [
    { t: "LET'S" },
    { t: 'connect', serif: true },
  ];

  useGSAP(
    () => {
      if (reduced) return;
      const card = cardRef.current;
      const cta = ctaRef.current;

      if (card) {
        gsap.fromTo(
          card,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: EASE.outCubic,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          }
        );
      }
      if (cta) {
        gsap.fromTo(
          cta,
          { x: 48, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: EASE.outCubic,
            scrollTrigger: { trigger: cta, start: 'top 94%', once: true },
          }
        );
      }
      
      // Physics Engine
      const physics = physicsRef.current;
      const elements = bubblesRef.current.filter(Boolean) as HTMLAnchorElement[];
      if (elements.length !== physics.length) return;

      const xSetters = elements.map(el => gsap.quickSetter(el, "x", "px"));
      const ySetters = elements.map(el => gsap.quickSetter(el, "y", "px"));

      let boundsX = 300;
      let boundsY = 150;

      const handleResize = () => {
        if (bubblesContainerRef.current) {
          boundsX = (bubblesContainerRef.current.offsetWidth / 2) - 60;
          boundsY = (bubblesContainerRef.current.offsetHeight / 2) - 60;
          physics.forEach(p => p.radius = window.innerWidth < 640 ? 40 : 48);
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      const tick = () => {
        const numBubbles = physics.length;
        const time = gsap.ticker.time;

        // Apply movement and boundary collisions
        for (let i = 0; i < numBubbles; i++) {
          const b = physics[i];
          if (b.isHovered) {
            // Smoothly dampen velocity if hovered
            b.vx *= 0.85;
            b.vy *= 0.85;
            continue;
          }

          // Smooth roaming force using time-based sine waves instead of jittery Math.random()
          // Different frequencies and phase offsets per bubble
          b.vx += Math.cos(time * 0.8 + i * 1.5) * 0.03;
          b.vy += Math.sin(time * 0.7 + i * 2.0) * 0.03;

          // Gentle friction to prevent endless acceleration
          b.vx *= 0.99;
          b.vy *= 0.99;

          // Cap speed gracefully
          const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
          const maxSpeed = 1.8;
          if (speed > maxSpeed) {
            b.vx = (b.vx / speed) * maxSpeed;
            b.vy = (b.vy / speed) * maxSpeed;
          }

          b.x += b.vx;
          b.y += b.vy;

          // Soft boundary collisions
          if (b.x < -boundsX) { b.x = -boundsX; b.vx *= -1; }
          if (b.x > boundsX) { b.x = boundsX; b.vx *= -1; }
          if (b.y < -boundsY) { b.y = -boundsY; b.vy *= -1; }
          if (b.y > boundsY) { b.y = boundsY; b.vy *= -1; }
        }

        // Apply Bubble-to-Bubble collisions
        for (let i = 0; i < numBubbles; i++) {
          for (let j = i + 1; j < numBubbles; j++) {
            const b1 = physics[i];
            const b2 = physics[j];
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = b1.radius + b2.radius;

            if (dist < minDist && dist > 0.001) {
              // Resolve overlap
              const overlap = minDist - dist;
              const nx = dx / dist;
              const ny = dy / dist;

              if (!b1.isHovered && !b2.isHovered) {
                b1.x -= nx * (overlap / 2);
                b1.y -= ny * (overlap / 2);
                b2.x += nx * (overlap / 2);
                b2.y += ny * (overlap / 2);
              } else if (!b1.isHovered && b2.isHovered) {
                b1.x -= nx * overlap;
                b1.y -= ny * overlap;
              } else if (b1.isHovered && !b2.isHovered) {
                b2.x += nx * overlap;
                b2.y += ny * overlap;
              }

              // Elastic collision (velocity exchange)
              const kx = b1.vx - b2.vx;
              const ky = b1.vy - b2.vy;
              const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass);

              if (!b1.isHovered) {
                b1.vx = b1.vx - p * b2.mass * nx;
                b1.vy = b1.vy - p * b2.mass * ny;
              }
              if (!b2.isHovered) {
                b2.vx = b2.vx + p * b1.mass * nx;
                b2.vy = b2.vy + p * b1.mass * ny;
              }
            }
          }
        }

        // Render positions
        for (let i = 0; i < numBubbles; i++) {
          xSetters[i](physics[i].x);
          ySetters[i](physics[i].y);
        }
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener('resize', handleResize);
      };
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const handleMouseEnter = (index: number) => {
    physicsRef.current[index].isHovered = true;
    const el = bubblesRef.current[index];
    if (el) gsap.to(el, { scale: 1.25, zIndex: 10, duration: 0.4, ease: 'back.out(2)' });
  };
  
  const handleMouseLeave = (index: number) => {
    physicsRef.current[index].isHovered = false;
    const el = bubblesRef.current[index];
    if (el) gsap.to(el, { scale: 1, zIndex: 1, duration: 0.4, ease: 'back.out(2)' });
  };


  return (
    <section ref={sectionRef} id="contact" className="bg-ink text-light pt-12 pb-16 md:pt-14 md:pb-24 relative overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full">
        <div
          ref={cardRef}
          className="rounded-3xl bg-surface text-light p-8 sm:p-12 md:p-16 lg:p-20 border border-elevated-dark flex flex-col min-h-[600px] relative"
          style={{ willChange: 'transform' }}
        >
          <div className="z-10 relative pointer-events-none">
            <AnimatedHeading
              words={headingWords}
              className="text-[clamp(2.75rem,8.5vw,7.5rem)] tracking-tight mb-6 text-light"
            />
            <div className="max-w-2xl mb-12">
              <ScrollWordReveal
                text="Find me across the web. Hover to catch them, click to connect."
                offset={['start 0.95', 'end 0.7']}
                className="text-base sm:text-lg text-gray-soft font-sans leading-relaxed"
              />
            </div>
          </div>

          <div ref={bubblesContainerRef} className="flex-1 relative w-full overflow-hidden mt-[-80px] md:mt-[-120px] min-h-[350px]">
            {socialList.map((social, idx) => {
              const key = social.label.toLowerCase();
              const icon = ICONS[key] || <FaExternalLinkAlt />;
              return (
                <a
                  key={social.label}
                  ref={(el) => {
                    bubblesRef.current[idx] = el;
                  }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  className="absolute top-1/2 left-1/2 -ml-10 -mt-10 sm:-ml-12 sm:-mt-12 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-surface-mid border border-white/[0.08] flex items-center justify-center text-3xl sm:text-4xl text-muted hover:text-accent hover:border-accent hover:bg-accent/10 transition-colors duration-300 shadow-xl"
                  aria-label={social.label}
                  style={{ willChange: 'transform' }}
                >
                  {icon}
                </a>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-elevated-dark flex flex-col items-center justify-center text-center w-full z-10 relative bg-surface/50 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
              <p className="text-xs uppercase tracking-widest text-warm mb-3 font-mono text-center">
                Direct Contact
              </p>

              <div ref={ctaRef} className="inline-block" style={{ willChange: 'transform' }}>
                <button
                  type="button"
                  aria-label={`Copy ${site.email} to clipboard`}
                  onClick={() => {
                    navigator.clipboard.writeText(site.email);
                    const toast = document.getElementById('email-copy-toast');
                    if (toast) {
                      toast.style.opacity = '1';
                      toast.style.transform = 'translateY(0)';
                      setTimeout(() => {
                        toast.style.opacity = '0';
                        toast.style.transform = 'translateY(8px)';
                      }, 2000);
                    }
                  }}
                  className="group relative inline-flex items-center justify-center cursor-pointer text-light font-display font-black uppercase leading-tight hover:text-accent transition-colors duration-300 max-w-full text-center"
                  style={{
                    fontSize: 'clamp(1.1rem, 4.2vw, 3rem)',
                  }}
                >
                  <span className="break-all sm:break-normal">{site.email}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out block" />
                </button>
              </div>

              <span className="font-mono text-[11px] text-warm/70 uppercase tracking-widest mt-2 block text-center">
                Click to copy email address
              </span>

              {isVapiConfigured && (
                <div className="mt-8 pt-6 border-t border-elevated-dark/70 w-full flex flex-col items-center">
                  <p className="text-xs uppercase tracking-widest text-warm mb-3 font-mono text-center">
                    Or skip the typing
                  </p>
                  <button
                    type="button"
                    onClick={openVoiceAgent}
                    className="group inline-flex items-center gap-3 h-12 pl-4 pr-6 rounded-full bg-accent text-white font-display text-xs font-black uppercase tracking-[0.14em] hover:bg-accent-light transition-colors duration-300 cursor-pointer"
                  >
                    <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                      <Mic size={14} strokeWidth={2.4} />
                    </span>
                    Talk to my AI agent
                  </button>
                  <span className="font-mono text-[11px] text-warm/70 uppercase tracking-widest mt-3 block text-center">
                    Live voice call, right in your browser
                  </span>

                  <div className="mt-5 flex flex-col items-center">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-warm/70 mb-2">
                      Or ring the same agent
                    </span>
                    <a
                      href={`tel:${site.agentPhone}`}
                      className="group inline-flex items-center gap-2.5 font-display text-lg sm:text-xl font-black tracking-tight text-light hover:text-accent transition-colors duration-300"
                    >
                      <Phone size={16} strokeWidth={2.4} className="text-accent" />
                      <span className="relative">
                        {site.agentPhoneLabel}
                        <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out block" />
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        id="email-copy-toast"
        role="status"
        aria-live="polite"
        className="fixed bottom-8 right-8 z-[9998] pointer-events-none"
        style={{
          background: '#C45D3E',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.75rem 1.25rem',
          borderRadius: '9999px',
          opacity: 0,
          transform: 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        ✓ Copied to clipboard
      </div>
    </section>
  );
};

export default Contact;
