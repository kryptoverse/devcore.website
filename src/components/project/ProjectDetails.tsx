'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Link } from 'next-transition-router';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { FaArrowUp, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Mic, Phone, PhoneCall } from 'lucide-react';
import { Project } from '@/lib/projects';
import { getAdjacentProjects } from '@/lib/projects';
import { site } from '@/lib/site';
import { CALL_LIMITS, isVapiConfigured, openVoiceAgent } from '@/lib/vapi';

export default function ProjectDetails({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { prev, next } = getAdjacentProjects(project.slug);
  const showVoiceDemo = project.demo === 'voice-agent' && isVapiConfigured;

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const split = SplitText.create(titleRef.current.querySelector('.pd-title-text'), {
        type: 'lines',
        mask: 'lines',
      });
      gsap.fromTo(
        split.lines,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1,
          ease: EASE.outQuart,
          stagger: 0.08,
          delay: 0.15,
        }
      );

      gsap.fromTo(
        '.pd-meta-item',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: EASE.outCubic, stagger: 0.07, delay: 0.4 }
      );

      gsap.utils.toArray<HTMLElement>('.pd-figure-parallax').forEach((wrap) => {
        const inner = wrap.querySelector('.pd-figure-inner');
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      return () => split.revert();
    },
    { scope: rootRef, dependencies: [project.slug] }
  );

  const scrollToTop = () => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section ref={rootRef} className="min-h-screen bg-[#080807] text-white px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20 relative">
      <div className="max-w-6xl mx-auto">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-muted hover:text-white transition-all duration-300 group mb-10 md:mb-14"
          >
            <span className="text-base md:text-xl transform group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest">Back to Projects</span>
          </Link>
        </div>

        {/* ---------- Hero ---------- */}
        <header className="mb-16 md:mb-24">
          <h1
            ref={titleRef}
            aria-label={project.title}
            className="font-display font-black uppercase tracking-tight leading-[1.02] text-[clamp(2.4rem,6.5vw,5.5rem)] mb-10"
          >
            <span aria-hidden="true" className="pd-title-text block">
              {project.title}
            </span>
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/[0.08] pt-6 items-start">
            <div className="pd-meta-item">
              <p className="font-mono text-[11px] uppercase tracking-widest text-warm mb-1.5">Role</p>
              <p className="text-sm md:text-base font-medium">{project.role}</p>
            </div>
            <div className="pd-meta-item">
              <p className="font-mono text-[11px] uppercase tracking-widest text-warm mb-1.5">Type</p>
              <p className="text-sm md:text-base font-medium">{project.type}</p>
            </div>
            <div className="pd-meta-item col-span-2 sm:col-span-1 flex flex-wrap items-start sm:justify-end gap-2.5">
              {showVoiceDemo && (
                <AnimatedButton
                  onClick={openVoiceAgent}
                  topText={
                    <span className="flex items-center gap-2">
                      <Mic size={13} />
                      <span>TRY IT LIVE</span>
                    </span>
                  }
                  bottomText={
                    <span className="flex items-center gap-2">
                      <span>START CALL ↗</span>
                    </span>
                  }
                  variant="primary"
                />
              )}
              {project.liveUrl && (
                <AnimatedButton
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  topText={
                    <span className="flex items-center gap-2">
                      <span>LIVE</span>
                      <FaExternalLinkAlt className="text-[11px]" />
                    </span>
                  }
                  bottomText={
                    <span className="flex items-center gap-2">
                      <span>EXPLORE ↗</span>
                    </span>
                  }
                  variant="primary"
                />
              )}
              {project.github && (
                <AnimatedButton
                  as="a"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  topText={
                    <span className="flex items-center gap-2">
                      <FaGithub className="text-sm" />
                      <span>CODE</span>
                    </span>
                  }
                  bottomText={
                    <span className="flex items-center gap-2">
                      <FaGithub className="text-sm" />
                      <span>GITHUB ↗</span>
                    </span>
                  }
                  variant="dark"
                  className="!border !border-white/15 hover:!border-white/40"
                />
              )}
            </div>
          </div>
        </header>

        {/* ---------- Stats band ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.08] rounded-2xl overflow-hidden mb-20 md:mb-28 border border-white/[0.08]">
          {project.stats.map((stat) => (
            <div key={stat.label} className="bg-[#0d0d0c] px-6 py-8 md:py-10 text-center sm:text-left">
              <p
                className="font-display font-black leading-none mb-2 text-stat"
                style={{ color: project.accent }}
              >
                {stat.value}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* ---------- Live demo band ---------- */}
        {showVoiceDemo && (
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-[#141312] mb-20 md:mb-28">
            <div
              aria-hidden="true"
              className="absolute -top-32 -right-24 w-[26rem] h-[26rem] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(196,93,62,0.22) 0%, rgba(196,93,62,0) 70%)',
              }}
            />
            <div className="relative px-7 py-10 sm:px-12 sm:py-14 md:px-16 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-5 flex items-center gap-2.5">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
                  </span>
                  Live demo · no sign-up
                </p>
                <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,3.6rem)] text-white mb-5">
                  Don&apos;t read about it.
                  <br />
                  <span className="font-serif italic font-normal normal-case text-accent-light">
                    talk to it.
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-light/70 font-sans leading-relaxed max-w-xl">
                  The agent picks up in your browser. Ask what {site.firstName} builds, what a
                  project costs, or whether he is free next month — then interrupt it mid-sentence
                  and watch it stop.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5">
                <button
                  type="button"
                  onClick={openVoiceAgent}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3.5 h-16 px-8 sm:px-10 rounded-full bg-accent text-white font-display text-sm sm:text-base font-black uppercase tracking-[0.14em] hover:bg-accent-light transition-colors duration-300 cursor-pointer shadow-[0_16px_40px_-12px_rgba(196,93,62,0.6)]"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 shrink-0">
                    <PhoneCall size={17} strokeWidth={2.4} />
                  </span>
                  Start the call
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-warm leading-relaxed lg:text-right">
                  Microphone required · {Math.floor(CALL_LIMITS.maxDurationSeconds / 60)} min max
                  <br />
                  Best with headphones on
                </p>

                <div className="w-full pt-5 border-t border-white/[0.08] flex flex-col items-start lg:items-end gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-warm">
                    Prefer a real phone call?
                  </span>
                  <a
                    href={`tel:${site.agentPhone}`}
                    className="group inline-flex items-center gap-2.5 font-display text-xl sm:text-2xl font-black tracking-tight text-white hover:text-accent transition-colors duration-300"
                  >
                    <Phone size={18} strokeWidth={2.4} className="text-accent shrink-0" />
                    <span className="relative">
                      {site.agentPhoneLabel}
                      <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out block" />
                    </span>
                  </a>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-warm/70 lg:text-right">
                    Same agent, over the phone network
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------- Narrative ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-20 md:mb-28">
          <div className="md:col-span-4">
            <p className="font-mono text-xs uppercase tracking-widest text-warm">(Overview)</p>
          </div>
          <div className="md:col-span-8">
            <ScrollWordReveal
              text={project.overview}
              offset={['start 0.98', 'end 0.85']}
              className="text-lg sm:text-xl md:text-2xl text-light font-sans leading-relaxed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-20 md:mb-28">
          <div className="md:col-span-5 space-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">(The Challenge)</p>
              <ScrollWordReveal
                text={project.challenge}
                offset={['start 0.98', 'end 0.88']}
                className="text-sm sm:text-base text-light/70 font-sans leading-relaxed"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8 space-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">(The Solution)</p>
              <ScrollWordReveal
                text={project.solution}
                offset={['start 0.98', 'end 0.88']}
                className="text-sm sm:text-base text-light/70 font-sans leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* ---------- Contributions ---------- */}
        <div className="mb-20 md:mb-28">
          <AnimatedHeading
            words={[{ t: 'KEY' }, { t: 'moves', serif: true }]}
            showLine={false}
            containerClassName="mb-10"
            className="text-[clamp(1.9rem,4.5vw,3.4rem)] text-white"
          />
          <ul className="divide-y divide-white/[0.06] border-t border-b border-white/[0.06]">
            {project.myRole.map((role, i) => (
              <li key={i} className="py-5 flex items-start gap-5 group">
                <span className="font-mono text-xs text-accent mt-1 shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ScrollWordReveal
                  text={role}
                  offset={['start 0.99', 'end 0.92']}
                  className="text-sm sm:text-base text-light/80 font-sans leading-relaxed flex-1 group-hover:text-light transition-colors duration-300"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Parallax gallery ---------- */}
        <div className="flex flex-col gap-12 md:gap-16 mb-24 md:mb-32">
          {project.images?.map((img, i) => {
            const wide = i % 3 === 0;
            return (
              <figure
                key={`${project.slug}-img-${i}`}
                className={`relative ${wide ? 'w-full' : 'w-full md:w-10/12'} ${
                  i % 3 === 1 ? 'md:ml-auto' : ''
                }`}
              >
                <div
                  className={`overflow-hidden rounded-xl bg-[#121211] border border-[#1f1f1d] relative aspect-[21/9] ${
                    wide ? 'max-h-[500px]' : 'max-h-[420px]'
                  } w-full`}
                >
                  <div className="pd-figure-parallax absolute inset-0 overflow-hidden">
                    <div className="pd-figure-inner absolute inset-x-0 -top-[8%] h-[116%]" style={{ willChange: 'transform' }}>
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1100px"
                        priority={i === 0}
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted">
                  <span>{project.title}</span>
                  <span>
                    {String(i + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* ---------- Tech stack chips ---------- */}
        <div className="mb-24 md:mb-32">
          <p className="font-mono text-xs uppercase tracking-widest text-warm mb-5">Built with</p>
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-surface-mid border border-white/[0.08] text-cream"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- Prev / Next ---------- */}
        <nav aria-label="Project navigation" className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.08] mb-20">
          {prev && (
            <Link
              href={`/projects/${prev.slug}`}
              className="group py-10 md:py-14 md:pr-10 border-b md:border-b-0 md:border-r border-white/[0.08] no-underline"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3 flex items-center gap-2">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
                Previous
              </p>
              <p className="font-display font-black uppercase tracking-tight leading-none text-[clamp(1.5rem,3.5vw,2.8rem)] text-light/60 group-hover:text-accent transition-colors duration-400">
                {prev.title}
              </p>
            </Link>
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className={`group py-10 md:py-14 md:pl-10 no-underline text-right items-end ${
                prev ? '' : 'md:col-span-2'
              }`}
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3 flex items-center justify-end gap-2">
                Next
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </p>
              <p className="font-display font-black uppercase tracking-tight leading-none text-[clamp(1.5rem,3.5vw,2.8rem)] text-light/60 group-hover:text-accent transition-colors duration-400">
                {next.title}
              </p>
            </Link>
          )}
        </nav>

        {/* ---------- CTA ---------- */}
        <div className="relative flex justify-center py-8">
          <div className="text-center flex flex-col items-center">
            <ScrollWordReveal
              text="Have a project in mind?"
              offset={['start 0.98', 'end 0.88']}
              className="text-muted text-lg justify-center mb-1"
            />
            <a
              href={`mailto:${site.email}`}
              className="text-xl font-semibold text-[#bab6b3] hover:text-[#d4d2d0] transition"
            >
              {site.email}
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="absolute right-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 group focus:outline-none"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
