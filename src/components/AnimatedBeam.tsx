import React, { useId, useLayoutEffect, useMemo, useState } from "react";

type AnimatedBeamProps = {
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  duration?: number;
  delay?: number;
  reverse?: boolean;
  curvature?: number;
  className?: string;
};

type Point = { x: number; y: number };

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  duration = 3,
  delay = 0,
  reverse = false,
  curvature = 0.35,
  className,
}: AnimatedBeamProps) {
  const id = useId();
  const [start, setStart] = useState<Point | null>(null);
  const [end, setEnd] = useState<Point | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const fromEl = fromRef.current;
    const toEl = toRef.current;

    if (!container || !fromEl || !toEl) return;

    const update = () => {
      const containerRect = container.getBoundingClientRect();
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      setStart({
        x: fromRect.left + fromRect.width / 2 - containerRect.left,
        y: fromRect.top + fromRect.height / 2 - containerRect.top,
      });

      setEnd({
        x: toRect.left + toRect.width / 2 - containerRect.left,
        y: toRect.top + toRect.height / 2 - containerRect.top,
      });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(container);
    ro.observe(fromEl);
    ro.observe(toEl);

    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [containerRef, fromRef, toRef]);

  const d = useMemo(() => {
    if (!start || !end) return "";

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    const c1: Point = {
      x: start.x + dx * 0.15,
      y: start.y + dy * curvature,
    };

    const c2: Point = {
      x: start.x + dx * 0.85,
      y: end.y - dy * curvature,
    };

    return `M ${start.x} ${start.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${end.x} ${end.y}`;
  }, [curvature, end, start]);

  if (!start || !end || !d) return null;

  return (
    <svg
      className={
        "pointer-events-none absolute inset-0 h-full w-full overflow-visible " +
        (className ?? "")
      }
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`cng-beam-grad-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(var(--net-rgb),0.0)" />
          <stop offset="0.35" stopColor="rgba(var(--net-rgb),0.72)" />
          <stop offset="0.65" stopColor="rgba(var(--net-rgb),0.72)" />
          <stop offset="1" stopColor="rgba(var(--net-rgb),0.0)" />
        </linearGradient>

        <filter id={`cng-beam-glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.75 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={d}
        fill="none"
        stroke="rgba(var(--net-rgb),0.10)"
        strokeWidth={1.0}
        strokeLinecap="round"
      />

      <path
        d={d}
        fill="none"
        stroke={`url(#cng-beam-grad-${id})`}
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeDasharray="28 220"
        filter={`url(#cng-beam-glow-${id})`}
        style={{
          animationName: reverse ? "cng-beam-rev" : "cng-beam",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDelay: `${delay}s`,
        }}
      />
    </svg>
  );
}
