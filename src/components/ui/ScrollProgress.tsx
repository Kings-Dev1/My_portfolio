"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const ORB_SIZE = 64;
const EDGE_PADDING = 12;
const INITIAL_TOP = 96;

type Position = {
  x: number;
  y: number;
};

function getStage(progress: number) {
  if (progress >= 100) {
    return { emoji: "🎉", label: "You made it!" };
  }

  if (progress >= 70) {
    return { emoji: "🚀", label: "Almost there" };
  }

  if (progress >= 30) {
    return { emoji: "🔥", label: "Keep going" };
  }

  return { emoji: "🌱", label: "Just getting started" };
}

function clampPosition(x: number, y: number): Position {
  const maxX = Math.max(
    EDGE_PADDING,
    window.innerWidth - ORB_SIZE - EDGE_PADDING,
  );

  const maxY = Math.max(
    EDGE_PADDING,
    window.innerHeight - ORB_SIZE - EDGE_PADDING,
  );

  return {
    x: Math.min(Math.max(EDGE_PADDING, x), maxX),
    y: Math.min(Math.max(EDGE_PADDING, y), maxY),
  };
}

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);

  const dragOffset = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId = 0;

    const updateScrollProgress = () => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        const currentScroll = window.scrollY;

        const percentage =
          scrollableHeight > 0
            ? Math.min(
                100,
                Math.max(0, (currentScroll / scrollableHeight) * 100),
              )
            : 0;

        setProgress(Math.round(percentage));
        setShowScrollTop(currentScroll > 300);
      });
    };

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const initializePosition = () => {
      setPosition(
        clampPosition(
          window.innerWidth - ORB_SIZE - 20,
          INITIAL_TOP,
        ),
      );
    };

    initializePosition();

    const keepInsideScreen = () => {
      setPosition((current) => {
        if (!current) {
          return clampPosition(
            window.innerWidth - ORB_SIZE - 20,
            INITIAL_TOP,
          );
        }

        return clampPosition(current.x, current.y);
      });
    };

    window.addEventListener("resize", keepInsideScreen);

    return () => {
      window.removeEventListener("resize", keepInsideScreen);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!position) {
      return;
    }

    event.preventDefault();

    event.currentTarget.setPointerCapture(event.pointerId);

    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };

    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const newX = event.clientX - dragOffset.current.x;
    const newY = event.clientY - dragOffset.current.y;

    setPosition(clampPosition(newX, newY));
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const stage = getStage(progress);

  const ringRadius = 29;
  const circumference = 2 * Math.PI * ringRadius;
  const strokeOffset = circumference * (1 - progress / 100);
  const waterY = 60 - (progress / 100) * 56;

  const isOnLeftSide = position
    ? position.x < window.innerWidth / 2
    : false;

  const showDetails = isHovered || isDragging;

  return (
    <>
      {position && (
        <div
          className="fixed z-50 select-none"
          style={{
            left: position.x,
            top: position.y,
            width: ORB_SIZE,
            height: ORB_SIZE,
            touchAction: "none",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          role="img"
          aria-label={`Page scroll progress: ${progress}%`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          <div
            className={`relative h-full w-full ${
              isDragging ? "" : "animate-orb-drift"
            }`}
          >
            <span
              className={`pointer-events-none absolute -inset-2 rounded-full bg-accent/10 blur-md transition-opacity duration-500 ${
                showDetails ? "opacity-100" : "opacity-40"
              }`}
              aria-hidden="true"
            />

            <div
              className={`relative flex h-full w-full items-center justify-center rounded-full border border-border bg-surface shadow-lg shadow-black/10 transition-transform duration-300 ${
                isDragging
                  ? "scale-110"
                  : isHovered
                    ? "scale-105"
                    : "scale-100"
              }`}
            >
              <svg
                width={ORB_SIZE}
                height={ORB_SIZE}
                viewBox="0 0 64 64"
                className="absolute inset-0"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="orb-clip">
                    <circle cx="32" cy="32" r="24" />
                  </clipPath>
                </defs>

                <g clipPath="url(#orb-clip)">
                  <g
                    style={{
                      transform: `translateY(${waterY}px)`,
                      transition: "transform 400ms ease-out",
                    }}
                  >
                    <path
                      className="wave-back text-accent/25"
                      fill="currentColor"
                      d="M0 6 Q14 0 28 6 T56 6 T84 6 T112 6 V70 H0 Z"
                    />

                    <path
                      className="wave-front text-accent/50"
                      fill="currentColor"
                      d="M0 6 Q14 12 28 6 T56 6 T84 6 T112 6 V70 H0 Z"
                    />
                  </g>
                </g>

                <circle
                  cx="32"
                  cy="32"
                  r={ringRadius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-border"
                />

                <circle
                  cx="32"
                  cy="32"
                  r={ringRadius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 32 32)"
                  className="text-accent transition-[stroke-dashoffset] duration-300 ease-out"
                />

                <g
                  style={{
                    transform: `rotate(${progress * 3.6}deg)`,
                    transformOrigin: "32px 32px",
                    transition: "transform 300ms ease-out",
                  }}
                >
                  <circle
                    cx="32"
                    cy="3"
                    r="5"
                    className="animate-dot-pulse text-accent"
                    fill="currentColor"
                    opacity="0.35"
                  />

                  <circle
                    cx="32"
                    cy="3"
                    r="3"
                    className="text-background"
                    fill="currentColor"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>

              <span className="relative text-lg leading-none">
                {showDetails ? (
                  <span className="text-xs font-bold tabular-nums text-foreground">
                    {progress}%
                  </span>
                ) : (
                  <span className="animate-emoji-bounce inline-block">
                    {stage.emoji}
                  </span>
                )}
              </span>
            </div>

            <div
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background shadow-lg transition-all duration-300 ${
                isOnLeftSide ? "left-full ml-3" : "right-full mr-3"
              } ${
                showDetails
                  ? "translate-x-0 opacity-100"
                  : isOnLeftSide
                    ? "-translate-x-2 opacity-0"
                    : "translate-x-2 opacity-0"
              }`}
              aria-hidden="true"
            >
              {isDragging ? "Drop me anywhere" : stage.label}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Back to top"
        tabIndex={showScrollTop ? 0 : -1}
        className={`group fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-black/15 transition-[opacity,transform,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {showScrollTop && (
          <span
            className="animate-button-ping pointer-events-none absolute inset-0 rounded-full border-2 border-accent"
            aria-hidden="true"
          />
        )}

        <svg
          className={showScrollTop ? "animate-arrow-bob" : ""}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m17 11-5-5-5 5" />
          <path d="m17 18-5-5-5 5" />
        </svg>
      </button>
    </>
  );
}