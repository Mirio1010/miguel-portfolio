
import {links} from '../data'
import { useEffect, useState } from "react";
// Add your profile URLs and a resume URL (or "/resume.pdf" in public/) here.
// Empty destinations stay inactive instead of leading to a broken page.


const Hero = () => {

     const [showScrollCue, setShowScrollCue] = useState(true);

     useEffect(() => {
       const handleScroll = () => {
         setShowScrollCue(window.scrollY < 80);
       };

       window.addEventListener("scroll", handleScroll);

       return () => {
         window.removeEventListener("scroll", handleScroll);
       };
     }, []);



  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-6 sm:px-12 lg:px-20"
    >
      <header className="flex items-center justify-between border-b border-[var(--color-border)] py-7"></header>

      <div className="hero-enter grid flex-1 content-center items-center gap-8 py-12 sm:py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] md:gap-12 lg:gap-20">
        <img
          src="https://avatars.githubusercontent.com/u/115763001?v=4"
          alt="Miguelangel Ortega"
          width="460"
          height="460"
          fetchPriority="high"
          className="aspect-square w-28 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] object-cover sm:w-36 md:order-2 md:w-full md:max-w-sm md:justify-self-end"
        />

        <div className="min-w-0">
          <p className="mb-6 font-mono text-xs tracking-wide text-[var(--color-accent)] sm:text-sm">
            Full-Stack Web Developer
          </p>

          <h1
            id="hero-heading"
            className="text-[clamp(3rem,min(8.8vw,13svh),8.5rem)] leading-[0.98] font-normal tracking-[-0.065em]"
          >
            <span className="block">Miguel</span>
            <span className="block">Ortega</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            I build full-stack web applications and enjoy understanding how the
            different pieces of a system fit together.
          </p>

          <nav
            aria-label="Find me online"
            className="mt-10 flex flex-wrap items-center gap-8"
          >
            {links.map(({ label, href, icon: Icon }) => {
              const className =
                "xmb-link group inline-flex flex-col items-center gap-2 text-sm";

              return href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ) : (
                <span
                  key={label}
                  role="link"
                  aria-disabled="true"
                  className={`${className} opacity-40`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span>{label}</span>
                </span>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Go to about section"
        className={`scroll-cue ${showScrollCue ? "scroll-cue-visible" : "scroll-cue-hidden"}`}
      >
        ↓
      </a>
    </section>
  );
};

export default Hero;
