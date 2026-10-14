import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className="h-px w-9 shrink-0 bg-accent" />

          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase sm:text-sm">
            Get in Touch
          </p>

          <span className="h-px w-9 shrink-0 bg-accent" />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="Have an idea worth building?"
            description="I'm interested in meaningful conversations, innovative projects, research opportunities, and collaborations across medicine, technology, and entrepreneurship."
            className="mx-auto"
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-surface p-7 sm:p-9 lg:p-10">
          <p className="text-center text-sm leading-7 text-muted sm:text-base sm:leading-8">
            Whether you're exploring a healthcare technology idea, discussing
            a potential collaboration, or simply looking to connect, I'd be
            happy to hear from you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="mailto:kudochukwu18@gmail.com">
              Email Me <span aria-hidden="true">↗</span>
            </Button>

            <Button
              href="https://www.linkedin.com/in/kingsley-udochukwu-aleke"
              external
              variant="outline"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </Button>
          </div>

          <div className="mt-8 border-t border-border pt-6 text-center">
            <a
              href="mailto:kudochukwu18@gmail.com"
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              kudochukwu18@gmail.com
            </a>

            <p className="mt-2 text-xs leading-6 text-muted sm:text-sm">
              Open to conversations about medicine, AI, software development,
              research, and business.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}