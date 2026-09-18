import { projects } from "../data";


const Projects = () => {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 lg:px-20"
    >
      <div className="border-t border-[var(--color-border)] py-24 sm:py-28">
        <p className="mb-12 font-mono text-xs tracking-[0.18em] text-[var(--color-text-secondary)] uppercase">
          Projects
        </p>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <Project
              key={project.title}
              project={project}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};




const Project = ({ project, reverse }) => {
  const { title, description, technologies, image, github, live } = project;

  return (
    <article
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <img
          src={image}
          alt={`${title} screenshot`}
          className="w-full border border-[var(--color-border)] object-cover"
        />
      </div>

      <div className="max-w-xl">
        <h3 className="text-3xl font-normal tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl">
          {title}
        </h3>

        <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-[var(--color-text-secondary)]">
          {technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="mt-8 flex gap-6 text-sm">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="xmb-link"
            >
              Live ↗
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="xmb-link"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default Projects;
