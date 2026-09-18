const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 lg:px-20"
    >
      <div className="border-t border-[var(--color-border)] py-28 sm:py-32 lg:py-40">
        <p className="mb-8 font-mono text-xs tracking-[0.18em] text-[var(--color-text-secondary)] uppercase">
          Contact
        </p>

        <div className="max-w-3xl">
          <h2
            id="contact-heading"
            className="text-4xl leading-tight font-normal tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl"
          >
            Want to get in touch?
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            I&apos;m always open to talking about software, opportunities, or
            interesting projects.
          </p>

          <div className="mt-10 flex flex-wrap gap-8">
            <a
              href="mailto:miguelangelortega2021@gmail.com"
              className="xmb-link text-base"
            >
              Email 
            </a>

            <a
              href="https://www.linkedin.com/in/miguel-ortega77/"
              target="_blank"
              rel="noopener noreferrer"
              className="xmb-link text-base"
            >
              LinkedIn 
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
