"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

const phrases = [
"Healthcare innovation.",
"Clinical decision support.",
"Medical data intelligence.",
"Medical image analysis.",
];

export default function HeroSection() {
const [phraseIndex, setPhraseIndex] = useState(0);
const [displayText, setDisplayText] = useState("");
const [isDeleting, setIsDeleting] = useState(false);
const [isPortraitOpen, setIsPortraitOpen] = useState(false);

const closeButtonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
const currentPhrase = phrases[phraseIndex];


if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setDisplayText(currentPhrase);
  return;
}

let timeout: ReturnType<typeof setTimeout>;

if (!isDeleting && displayText !== currentPhrase) {
  timeout = setTimeout(() => {
    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
  }, 65);
} else if (!isDeleting && displayText === currentPhrase) {
  timeout = setTimeout(() => setIsDeleting(true), 1800);
} else if (isDeleting && displayText.length > 0) {
  timeout = setTimeout(() => {
    setDisplayText(displayText.slice(0, -1));
  }, 30);
} else {
  setIsDeleting(false);
  setPhraseIndex((index) => (index + 1) % phrases.length);
}

return () => clearTimeout(timeout);


}, [displayText, isDeleting, phraseIndex]);

useEffect(() => {
if (!isPortraitOpen) return;


const previouslyFocusedElement = document.activeElement;
const previousOverflow = document.body.style.overflow;

document.body.style.overflow = "hidden";
closeButtonRef.current?.focus();

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    setIsPortraitOpen(false);
  }

  if (event.key === "Tab") {
    event.preventDefault();
    closeButtonRef.current?.focus();
  }
}

window.addEventListener("keydown", handleKeyDown);

return () => {
  document.body.style.overflow = previousOverflow;
  window.removeEventListener("keydown", handleKeyDown);

  if (previouslyFocusedElement instanceof HTMLElement) {
    previouslyFocusedElement.focus();
  }
};


}, [isPortraitOpen]);

return ( <section
   id="home"
   className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-background py-12 sm:py-16 lg:py-24"
 >
{/* Quiet background texture */} <div
     aria-hidden="true"
     className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
   > <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(148,163,184,0.10)_1px,transparent_1px)] [background-size:28px_28px] opacity-30" /> </div>


  <Container>
    <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      {/* Introduction */}
      <div className="relative min-w-0">
        {/* Professional identity */}
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-7 shrink-0 animate-pulse bg-blue-500/50"
          />

          <p className="text-[10px] font-medium uppercase leading-relaxed tracking-[0.10em] text-muted-foreground min-[400px]:text-[11px] sm:text-xs sm:tracking-[0.14em]">
            Medical Doctor
            <span className="mx-1.5 text-muted-foreground/60 sm:mx-2">
              ·
            </span>
            Software Developer
            <span className="mx-1.5 text-muted-foreground/60 sm:mx-2">
              ·
            </span>
            Entrepreneur
          </p>
        </div>

        {/* Name and subtle glow */}
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-5 -inset-y-4 -z-10 bg-[radial-gradient(ellipse_at_35%_50%,rgba(59,130,246,0.055),transparent_70%)] sm:-inset-x-8 sm:-inset-y-6"
          />

          <h1 className="text-[clamp(1.8rem,6.2vw,4.5rem)] font-bold leading-[1.12] tracking-[-0.055em] text-foreground sm:whitespace-nowrap">
            <span className="whitespace-nowrap">Dr. Kingsley</span>{" "}
            <span className="whitespace-nowrap">
              U. Aleke<span className="text-blue-500/70">.</span>
            </span>
          </h1>
        </div>

        {/* Introduction */}
        <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
          I explore how medicine, artificial intelligence, and data science
          can come together to solve meaningful healthcare challenges.
        </p>

        {/* Animated focus areas */}
        <div className="mt-6 min-h-[3.5rem]">
          <p className="mb-1.5 text-xs text-muted-foreground sm:text-sm">
            Areas of interest:
          </p>

          <div
            className="flex min-h-7 items-center text-sm font-medium text-slate-500 dark:text-slate-400 sm:text-base"
            aria-hidden="true"
          >
            <span>{displayText}</span>
            <span className="ml-1 inline-block h-4 w-px animate-pulse bg-slate-400/60 dark:bg-slate-500/60" />
          </div>

          <p className="sr-only">
            Areas of interest include healthcare innovation, clinical
            decision support, medical data intelligence, and medical image
            analysis.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button href="#projects">Explore My Work</Button>

          <Button href="#contact" variant="outline">
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Portrait and orbital rings */}
      <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[350px]">
        <div className="relative aspect-square w-full">
          {/* Diffused blue radiance beyond the rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-12 hidden rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.13)_0%,rgba(59,130,246,0.055)_45%,transparent_72%)] opacity-80 blur-2xl motion-safe:animate-[pulse_7s_ease-in-out_infinite] lg:block"
          />

          {/* Soft ambient glow close to the portrait */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-5 hidden rounded-full bg-blue-500/[0.035] blur-xl lg:block"
          />

          {/* Outer circular ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 hidden rounded-full border border-blue-500/15 shadow-[0_0_22px_rgba(59,130,246,0.045)] lg:block"
          />

          {/* Inner dashed ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 hidden rounded-full border border-dashed border-blue-500/20 lg:block"
          />

          {/* Portrait */}
          <button
            type="button"
            onClick={() => setIsPortraitOpen(true)}
            aria-label="View an enlarged portrait of Dr. Kingsley U. Aleke"
            className="absolute inset-0 overflow-hidden rounded-full bg-muted shadow-[0_12px_50px_rgba(0,0,0,0.10)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <Image
              src="/kingsley.png"
              alt="Portrait of Dr. Kingsley U. Aleke"
              fill
              priority
              sizes="(max-width: 639px) 75vw, (max-width: 1023px) 320px, 350px"
              className="object-cover"
            />
          </button>

          {/* Medicine label — smaller and farther from portrait */}
          <div className="absolute -left-5 top-[12%] -translate-x-1 sm:-left-9 lg:-left-14">
            <div className="rounded-md border border-border/70 bg-background/95 px-2.5 py-1.5 shadow-[0_4px_18px_rgba(0,0,0,0.045)] backdrop-blur-md sm:px-3 sm:py-2">
              <p className="text-[10px] font-semibold tracking-wide text-foreground sm:text-xs">
                Medicine
              </p>
              <p className="mt-0.5 text-[9px] text-muted-foreground sm:text-[10px]">
                Clinical thinking
              </p>
            </div>
          </div>

          {/* AI label — smaller and farther from portrait */}
          <div className="absolute -right-5 bottom-[12%] translate-x-1 sm:-right-9 lg:-right-14">
            <div className="rounded-md border border-border/70 bg-background/95 px-2.5 py-1.5 shadow-[0_4px_18px_rgba(0,0,0,0.045)] backdrop-blur-md sm:px-3 sm:py-2">
              <p className="text-[10px] font-semibold tracking-wide text-foreground sm:text-xs">
                AI & Technology
              </p>
              <p className="mt-0.5 text-[9px] text-muted-foreground sm:text-[10px]">
                Intelligent solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>

  {/* Enlarged portrait modal — original sizing preserved */}
  {isPortraitOpen && (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsPortraitOpen(false);
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged portrait of Dr. Kingsley U. Aleke"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={() => setIsPortraitOpen(false)}
        aria-label="Close enlarged portrait"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 sm:right-6 sm:top-6"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <div className="relative aspect-[4/5] max-h-[85svh] w-full max-w-lg overflow-hidden rounded-xl">
        <Image
          src="/kingsley.png"
          alt="Enlarged portrait of Dr. Kingsley U. Aleke"
          fill
          priority
          sizes="(max-width: 639px) 92vw, 512px"
          className="object-contain"
        />
      </div>
    </div>
  )}
</section>


);
}
