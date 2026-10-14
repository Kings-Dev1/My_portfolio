import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { expertiseAreas } from "@/data/expertise";

export default function ExpertiseSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className="h-px w-9 shrink-0 bg-accent" />

          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase sm:text-sm">
            Areas of Interest
          </p>

          <span className="h-px w-9 shrink-0 bg-accent" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="Where knowledge meets possibility."
            description="My work and learning span several disciplines, connected by a common interest in solving practical problems and creating meaningful impact."
            className="mx-auto"
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16">
          {expertiseAreas.map((area) => (
            <article
              key={area.id}
              className="rounded-2xl border border-border bg-surface p-7 transition-colors duration-300 hover:border-accent/40 sm:p-9 lg:p-10"
            >
              <p className="text-xs font-medium tracking-widest text-accent">
                {area.number}
              </p>

              <h3 className="mt-8 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                {area.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted">
                {area.description}
              </p>

              {area.technologies && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {area.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}