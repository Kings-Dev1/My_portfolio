"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const phrases = [
  "Medicine.",
  "Artificial Intelligence.",
  "Healthcare Innovation.",
  "Technology.",
];

function delay(ms: number) {
  return { animationDelay: `${ms}ms` };
}

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  const photoButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(currentPhrase);
      return;
    }

    const isPhraseComplete = displayText === currentPhrase;
    const typingDelay =
      isPhraseComplete && !isDeleting ? 1600 : isDeleting ? 35 : 75;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isPhraseComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((previous) => (previous + 1) % phrases.length);
        return;
      }

      setDisplayText(
        isDeleting
          ? displayText.slice(0, -1)
          : currentPhrase.slice(0, displayText.length + 1),
      );
    }, typingDelay);

    return () => window.clearTimeout(timeout);
  }, [displayText, phraseIndex, isDeleting]);

  useEffect(() => {
    if (!isPhotoOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPhotoOpen(false);
      }

      // the close button is the only focusable thing in the dialog,
      // so Tab just keeps focus on it
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    // stops the page from jumping sideways when the scrollbar disappears
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      photoButtonRef.current?.focus();
    };
  }, [isPhotoOpen]);

  return (
    <>
      <section className="relative overflow-hidden bg-background py-14 transition-colors duration-300 sm:py-20 lg:py-28">
        {/* faint dot grid that fades out toward the edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
        />

        <Container>
          <div className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* left: introduction */}
            <div className="relative z-10 min-w-0">
              <div
                className="hero-reveal mb-7 flex items-center gap-3"
                style={delay(0)}
              >
                <span className="h-px w-9 shrink-0 bg-accent" />

                <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase sm:text-sm">
                  Medical Graduate · Software Developer · Entrepreneur
                </p>
              </div>

              <h1
                className="hero-reveal text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.045em] text-foreground"
                style={delay(100)}
              >
                Dr. Kingsley{" "}
                <span className="block">U. Aleke</span>
              </h1>

              <p
                className="hero-reveal mt-8 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8"
                style={delay(200)}
              >
                Exploring how medicine, AI, technology, and entrepreneurship
                can come together to solve meaningful healthcare challenges.
              </p>

              <div className="hero-reveal mt-10" style={delay(300)}>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  Advancing healthcare through:
                </p>

                <div className="mt-2 min-h-[2.2em]">
                  {/* screen readers get the full list once instead of every typed letter */}
                  <span className="sr-only">
                    Medicine, Artificial Intelligence, Healthcare Innovation,
                    and Technology.
                  </span>

                  <span
                    aria-hidden="true"
                    className="whitespace-nowrap text-[clamp(1.2rem,5vw,2.5rem)] leading-tight font-semibold tracking-tight text-accent"
                  >
                    {displayText}
                    <span className="animate-caret ml-1 inline-block font-light">
                      |
                    </span>
                  </span>
                </div>
              </div>

              <div
                className="hero-reveal mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
                style={delay(400)}
              >
                <Button href="#projects" variant="primary">
                  Explore My Work <span aria-hidden="true">↗</span>
                </Button>

                <Button href="#contact" variant="outline">
                  Get in Touch
                </Button>
              </div>
            </div>

            {/* right: photo, exactly as in your original */}
            <div className="hero-reveal-soft relative flex min-h-70 items-center justify-center sm:min-h-90 lg:min-h-120" style={delay(200)}>
              <div
                aria-hidden="true"
                className="absolute h-56 w-56 rounded-full bg-accent/10 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80"
              />

              <div
                aria-hidden="true"
                className="absolute h-64 w-64 rounded-full border border-border/70 sm:h-80 sm:w-80 lg:h-96 lg:w-96"
              />

              <div
                aria-hidden="true"
                className="absolute h-48 w-48 rounded-full border border-accent/15 sm:h-60 sm:w-60 lg:h-72 lg:w-72"
              />

              <div
                aria-hidden="true"
                className="absolute top-[12%] right-[15%] h-2 w-2 rounded-full bg-accent/70"
              />

              <div
                aria-hidden="true"
                className="absolute bottom-[18%] left-[12%] h-2.5 w-2.5 rounded-full bg-accent/50"
              />

              <button
                ref={photoButtonRef}
                type="button"
                onClick={() => setIsPhotoOpen(true)}
                aria-label="View portrait of Dr. Kingsley Udochukwu Aleke"
                aria-haspopup="dialog"
                className="group relative z-10 h-32 w-32 overflow-hidden rounded-full border-4 border-background shadow-xl shadow-black/10 ring-1 ring-accent/30 transition duration-300 hover:scale-105 hover:ring-4 hover:ring-accent/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:h-40 sm:w-40 lg:h-48 lg:w-48"
              >
                <Image
                  src="/kingsley.jpeg"
                  alt="Dr. Kingsley Udochukwu Aleke"
                  fill
                  priority
                  sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute inset-x-0 bottom-0 bg-black/55 py-2 text-center text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View photo
                </span>
              </button>

              <div
                aria-hidden="true"
                className="absolute top-[15%] left-0 rounded-full border border-border bg-background/90 px-3 py-2 text-xs font-medium text-muted shadow-sm backdrop-blur sm:left-[2%] sm:px-4"
              >
                Medicine
              </div>

              <div
                aria-hidden="true"
                className="absolute right-0 bottom-[14%] rounded-full border border-border bg-background/90 px-3 py-2 text-xs font-medium text-muted shadow-sm backdrop-blur sm:right-[2%] sm:px-4"
              >
                Artificial Intelligence
              </div>
            </div>
          </div>
        </Container>
      </section>

      {isPhotoOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md sm:p-8"
          onClick={() => setIsPhotoOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Portrait of Dr. Kingsley Udochukwu Aleke"
            className="relative w-full max-w-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsPhotoOpen(false)}
              aria-label="Close portrait"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-2xl text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              ×
            </button>

            <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-2xl">
              <Image
                src="/kingsley.jpeg"
                alt="Dr. Kingsley Udochukwu Aleke"
                fill
                sizes="(max-width: 640px) 90vw, 512px"
                className="object-cover object-top"
              />
            </div>

            <div className="mt-5 text-center">
              <p className="text-lg font-semibold text-white">
                Dr. Kingsley Udochukwu Aleke
              </p>

              <p className="mt-1 text-sm text-white/70">
                Medical Graduate · Software Developer · Entrepreneur
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}