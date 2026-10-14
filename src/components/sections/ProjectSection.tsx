import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className="h-px w-9 shrink-0 bg-accent" />

          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase sm:text-sm">
            Selected Work
          </p>

          <span className="h-px w-9 shrink-0 bg-accent" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="Projects driven by curiosity."
            description="A selection of projects through which I explore software development, machine learning, and practical applications of technology."
            className="mx-auto"
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-7 transition-colors duration-300 hover:border-accent/40 sm:p-9 lg:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium tracking-widest text-accent uppercase">
                  Project {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs capitalize text-muted">
                  {project.status.replace("-", " ")}
                </span>
              </div>

              <h3 className="mt-8 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                {project.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {project.liveUrl || project.sourceUrl ? (
                <div className="mt-8 flex flex-wrap gap-5 border-t border-border pt-5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground underline underline-offset-4 transition-colors hover:text-accent"
                    >
                      Live Project ↗
                    </a>
                  )}

                  {project.sourceUrl && (
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground underline underline-offset-4 transition-colors hover:text-accent"
                    >
                      Source Code ↗
                    </a>
                  )}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/projects" variant="outline">
            View All Projects <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}