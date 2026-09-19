const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 lg:px-20"
    >
      <div className="border-t border-[var(--color-border)] py-24 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.35fr] lg:gap-24">
          <div className="max-w-2xl">
            <p className="mb-6 font-mono text-xs tracking-[0.18em] text-[var(--color-text-secondary)] uppercase">
              About Me :D
            </p>

            <h2
              id="about-heading"
              className="text-3xl leading-tight font-normal tracking-[-0.035em] text-[var(--color-text-primary)] sm:text-4xl"
            >
              I&apos;m a NYC-based Computer Science graduate who enjoys building
              full-stack applications and learning through real projects.
            </h2>

            <p className="mt-8 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              I like working across the stack, from building interfaces in React
              to designing APIs and backend logic. What interests me most is
              understanding how the different pieces of a system fit together.
            </p>

            <p className="mt-6 text-sm text-[var(--color-text-secondary)]">
              Brooklyn College · B.S. Computer Science
            </p>
          </div>

          <div className="lg:self-center">
            <Hobbies />
          </div>
        </div>
      </div>
    </section>
  );
};

const hobbies = [
  "Gaming",
  "Anime & Movies",
  "Building Side Projects",
  "Learning New Tech",
];

const Hobbies = () => {
  return (
    <aside>
      <p className="mb-5 font-mono text-xs tracking-[0.18em] text-[var(--color-text-secondary)] uppercase">
        My Hobbies
      </p>

      <div className="space-y-4">
        {hobbies.map((hobby) => (
          <div
            key={hobby}
            className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] sm:text-base"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-wave-highlight)]"
            />

            <span>{hobby}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default About;
