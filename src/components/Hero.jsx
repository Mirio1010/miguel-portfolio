
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
      id="home"
      aria-labelledby="hero-heading"
      className="relative mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-6 sm:px-12 lg:px-20"
    >
      {/* <header className="flex items-center justify-between border-b border-[var(--color-border)] py-7"></header> */}

      <div className="hero-enter grid flex-1 content-center items-center gap-6 pt-24 pb-20 text-center md:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] md:gap-12 md:py-8 md:text-left lg:gap-20">
        <img
          src="https://avatars.githubusercontent.com/u/115763001?v=4"
          alt="Miguelangel Ortega"
          width="460"
          height="460"
          fetchPriority="high"
          className="order-2 aspect-square w-[clamp(8.75rem,40vw,11.25rem)] justify-self-center rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] object-cover md:w-full md:max-w-sm md:justify-self-end"
        />

        {/* Mobile exposes the two text groups to the grid; md restores one text column. */}
        <div className="contents min-w-0 md:block">
          <div className="order-1 min-w-0">
            <p className="mb-4 font-mono text-xs tracking-wide text-[var(--color-accent)] sm:text-sm md:mb-6">
              Full-Stack Web Developer
            </p>

            <h1
              id="hero-heading"
              className="text-[clamp(3.5rem,17vw,4.5rem)] leading-[0.98] font-normal tracking-[-0.065em] md:text-[clamp(3rem,min(8.8vw,13svh),8.5rem)]"
            >
              <span className="block">Miguel</span>
              <span className="block">Ortega</span>
            </h1>
          </div>

          <div className="order-3 min-w-0">
            <p className="mx-auto max-w-sm text-base leading-relaxed text-[var(--color-text-secondary)] md:mx-0 md:mt-6 md:max-w-md md:text-lg">
              I build full-stack web applications and enjoy understanding how the
              different pieces of a system fit together.
            </p>

            <nav
              aria-label="Find me online"
              className="mt-6 flex flex-wrap items-center justify-center gap-6 md:mt-10 md:justify-start md:gap-8"
            >
              {links.map(({ label, href, icon: Icon }) => {
                const className =
                  "xmb-link group inline-flex min-h-12 min-w-12 flex-col items-center justify-center gap-2 text-sm md:min-h-0 md:min-w-0 md:justify-start";

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
