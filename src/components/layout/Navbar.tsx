"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Button from "../ui/Button";
import { navigationItems } from "@/data/navigation";

type Theme = "light" | "dark";

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// "#about" and "/#about" both give "about"
function getHash(href: string) {
  const index = href.indexOf("#");

  if (index === -1) {
    return null;
  }

  return href.slice(index + 1) || null;
}

// "#about" only works on the home page, so send it to "/#about"
function resolveHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeId, setActiveId] = useState("");

  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // theme
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

  // shrink after scrolling, hide on the way down, show on the way up
  useEffect(() => {
    let frame = 0;

    function update() {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const y = window.scrollY;

        setIsScrolled(y > 8);

        if (y < 120) {
          setActiveId("");
        }

        if (isMenuOpen || y < 200) {
          setIsHidden(false);
          lastScrollY.current = y;
          return;
        }

        const delta = y - lastScrollY.current;

        // ignore tiny movements so the bar doesn't flicker
        if (Math.abs(delta) < 6) {
          return;
        }

        setIsHidden(delta > 0);
        lastScrollY.current = y;
      });
    }

    update();

    window.addEventListener("scroll", update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [isMenuOpen]);

  // which section is on screen (home page only)
  useEffect(() => {
    if (pathname !== "/") {
      setActiveId("");
      return;
    }

    const elements = navigationItems
      .map((item) => getHash(item.href))
      .filter((id): id is string => id !== null)
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  // mobile menu: lock page scroll, Escape, resize, move focus inside
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    const focusTimer = window.setTimeout(() => {
      overlayRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }, 60);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
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

  function isActive(href: string) {
    const hash = getHash(href);

    if (hash) {
      return pathname === "/" && activeId === hash;
    }

    if (href === "/") {
      return false;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const nextThemeName = theme === "light" ? "dark" : "light";

  const themeButton = mounted ? (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextThemeName} mode`}
      title={`Switch to ${nextThemeName} mode`}
      className="relative h-10 w-10 shrink-0 rounded-full border border-border text-foreground transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0"
        }`}
      >
        <MoonIcon />
      </span>

      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-50 opacity-0"
        }`}
      >
        <SunIcon />
      </span>
    </button>
  ) : (
    <span aria-hidden="true" className="h-10 w-10 shrink-0" />
  );

  return (
    <>
      <header
        onFocusCapture={() => setIsHidden(false)}
        className={`sticky top-0 z-50 border-b transition-[transform,background-color,border-color,box-shadow] duration-300 ${
          isHidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled || isMenuOpen
            ? "border-border bg-background/85 shadow-sm shadow-black/5 backdrop-blur-xl"
            : "border-transparent bg-background"
        }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-60 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
        >
          Skip to content
        </a>

        <Container>
          <nav
            aria-label="Main navigation"
            className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${
              isScrolled ? "h-16" : "h-20"
            }`}
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
              {navigationItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={resolveHref(item.href)}
                    aria-current={active ? "location" : undefined}
                    className={`group relative whitespace-nowrap py-1 text-sm font-medium transition-colors duration-200 hover:text-accent ${
                      active ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {item.label}

                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}

              {themeButton}

              <Button href="/#contact" arrow className="shrink-0">
                Let&apos;s Talk
              </Button>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:hidden">
              {themeButton}

              <button
                ref={menuButtonRef}
                type="button"
                aria-label={
                  isMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsMenuOpen((previous) => !previous)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
        </Container>
      </header>

      {/* kept outside the header so its blur doesn't trap this fixed panel */}
      <div
        id="mobile-navigation"
        ref={overlayRef}
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-[opacity,visibility] duration-300 md:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-6 pt-28 pb-10">
          <nav aria-label="Mobile navigation">
            {navigationItems.map((item, index) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={resolveHref(item.href)}
                  onClick={closeMenu}
                  aria-current={active ? "location" : undefined}
                  style={{
                    transitionDelay: isMenuOpen
                      ? `${120 + index * 60}ms`
                      : "0ms",
                  }}
                  className={`flex items-baseline gap-4 border-b border-border/70 py-5 transition-[opacity,translate,color] duration-500 ease-out hover:text-accent ${
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  } ${active ? "text-accent" : "text-foreground"}`}
                >
                  <span
                    aria-hidden="true"
                    className="text-xs font-medium tabular-nums text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-2xl font-semibold tracking-tight">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div
            style={{
              transitionDelay: isMenuOpen
                ? `${140 + navigationItems.length * 60}ms`
                : "0ms",
            }}
            className={`pt-8 transition-[opacity,translate] duration-500 ease-out ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <Button
              href="/#contact"
              arrow
              onClick={closeMenu}
              className="w-full"
            >
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}