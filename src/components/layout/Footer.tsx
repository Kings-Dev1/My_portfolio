import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border py-8">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              aria-label="Dr Kings home"
              className="group flex w-fit flex-col"
            >
              <span className="text-xl font-bold tracking-tight sm:text-2xl">
                <span className="text-accent">Dr_</span>{" "}
                <span className="text-foreground">Kings</span>
                <span className="text-muted">.</span>
              </span>

              <span className="mt-0.5 h-0.5 w-8 rounded-full bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>

            <p className="mt-3 text-xs leading-6 text-muted">
              Medicine, technology, and meaningful innovation.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs text-muted sm:items-end">
            <p>© {currentYear} Aleke Kingsley Udochukwu.</p>

            <p>Designed and built with purpose.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}