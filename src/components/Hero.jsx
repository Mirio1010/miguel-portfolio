// Add your profile URLs and a resume URL (or "/resume.pdf" in public/) here.
// Empty destinations stay inactive instead of leading to a broken page.
const links = [
  { label: 'GitHub', href: '' },
  { label: 'LinkedIn', href: '' },
  { label: 'Resume', href: '' },
]

const Hero = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto flex min-h-svh w-full max-w-[1600px] flex-col px-6 sm:px-12 lg:px-20"
    >
      <header className="flex items-center justify-between border-b border-[var(--color-border)] py-7">
      
       
      </header>

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
            Full-Stack Developer
          </p>

          <h1 id="hero-heading" className="text-[clamp(3rem,min(8.8vw,13svh),8.5rem)] leading-[0.98] font-normal tracking-[-0.065em]">
            <span className="block">Miguel</span>
            <span className="block">Ortega</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            I build useful web applications and enjoy learning how things work
            under the hood.
          </p>

          <nav aria-label="Find me online" className="mt-8 flex flex-wrap items-center gap-3">
            {links.map(({ label, href }) => {
              const className = 'inline-flex min-h-12 items-center gap-3 rounded-sm border border-[var(--color-border)] px-3 text-sm text-[var(--color-text-primary)] transition-colors duration-200 motion-reduce:transition-none sm:gap-5 sm:px-5'

              return href ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className={`${className} hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]`}
                >
                  {label}<span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span key={label} role="link" aria-disabled="true" title={`${label} link coming soon`} className={className}>
                  {label}<span aria-hidden="true" className="text-[var(--color-text-secondary)]">↗</span>
                  <span className="sr-only"> (coming soon)</span>
                </span>
              )
            })}
          </nav>
        </div>
      </div>

     
    </section>
  )
}

export default Hero

