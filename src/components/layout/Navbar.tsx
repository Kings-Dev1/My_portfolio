"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { navigationItems } from "@/data/navigation";

type Theme = "light" | "dark";

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

type ThemeToggleProps = {
  mounted: boolean;
  theme: Theme;
  onToggle: () => void;
};

function ThemeToggle({ mounted, theme, onToggle }: ThemeToggleProps) {
  // same-size placeholder so the bar doesn't jump when the button appears
  if (!mounted) {
    return <span aria-hidden="true" className="h-10 w-10 shrink-0" />;
  }

  const nextLabel = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextLabel} mode`}
      title={`Switch to ${nextLabel} mode`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const initialTheme: Theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  // close the mobile menu with Escape, or when the screen grows past the md breakpoint
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex min-h-20 items-center justify-between gap-4"
        >
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Dr Kings home"
            className="group flex shrink-0 flex-col"
          >
            <span className="text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="text-accent">Dr_</span>{" "}
              <span className="text-foreground">Kings</span>
            </span>

            <span className="mt-0.5 h-0.5 w-8 rounded-full bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-7">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}

            <ThemeToggle
              mounted={mounted}
              theme={theme}
              onToggle={toggleTheme}
            />

            <Button href="#contact" variant="primary" className="shrink-0">
              Let&apos;s Talk <span aria-hidden="true">↗</span>
            </Button>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle
              mounted={mounted}
              theme={theme}
              onToggle={toggleTheme}
            />

            <button
              type="button"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span
                className="flex w-5 flex-col items-end gap-1.5"
                aria-hidden="true"
              >
                <span
                  className={`h-0.5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "w-5 translate-y-2 rotate-45" : "w-5"
                  }`}
                />

                <span
                  className={`h-0.5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "w-0 opacity-0" : "w-3.5"
                  }`}
                />

                <span
                  className={`h-0.5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "w-5 -translate-y-2 -rotate-45" : "w-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* "invisible" when closed removes the whole menu from the tab order and screen readers */}
        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-[max-height,opacity,visibility] duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "visible max-h-128 opacity-100"
              : "invisible max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border py-4">
            <div className="flex flex-col">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-border/70 py-4 text-sm text-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-5">
                <Button
                  href="#contact"
                  variant="primary"
                  className="w-full"
                >
                  Let&apos;s Talk <span aria-hidden="true">↗</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}