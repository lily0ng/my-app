import React, { useId, useLayoutEffect, useMemo, useState } from "react";

type AnimatedBeamProps = {
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  duration?: number;
  delay?: number;
  reverse?: boolean;
  pingPong?: boolean;
  curvature?: number;
  dashArray?: string;
  baseDashArray?: string;
  baseColor?: string;
  beamColor?: string;
  arrow?: boolean;
  arrowSize?: number;
  glow?: boolean;
  baseOpacity?: number;
  beamOpacity?: number;
  beamWidth?: number;
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
  pingPong = true,
  curvature = 0.35,
  dashArray = "10 80",
  baseDashArray,
  baseColor,
  beamColor,
  arrow = false,
  arrowSize = 10,
  glow = true,
  baseOpacity = 0.26,
  beamOpacity = 0.9,
  beamWidth = 1.7,
  className,
}: AnimatedBeamProps) {
  const id = useId();
  const [start, setStart] = useState<Point | null>(null);
  const [end, setEnd] = useState<Point | null>(null);

  useLayoutEffect(() => {
    const warmupDeadline =
      typeof performance !== "undefined" ? performance.now() + 1500 : Date.now() + 1500;

    let scheduledRaf: number | null = null;
    const scheduleUpdate = () => {
      if (scheduledRaf != null) return;
      scheduledRaf = window.requestAnimationFrame(() => {
        scheduledRaf = null;
        update();
      });
    };

    const update = () => {
      const container = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!container || !fromEl || !toEl) return;

      const containerRect = container.getBoundingClientRect();
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      if (
        containerRect.width === 0 ||
        containerRect.height === 0 ||
        fromRect.width === 0 ||
        fromRect.height === 0 ||
        toRect.width === 0 ||
        toRect.height === 0
      ) {
        const now = typeof performance !== "undefined" ? performance.now() : Date.now();
        if (now < warmupDeadline) scheduleUpdate();
        return;
      }

      const fromCenter = {
        x: fromRect.left + fromRect.width / 2 - containerRect.left,
        y: fromRect.top + fromRect.height / 2 - containerRect.top,
      };

      const toCenter = {
        x: toRect.left + toRect.width / 2 - containerRect.left,
        y: toRect.top + toRect.height / 2 - containerRect.top,
      };

      const dx = toCenter.x - fromCenter.x;
      const dy = toCenter.y - fromCenter.y;
      const len = Math.max(1, Math.hypot(dx, dy));
      const ux = dx / len;
      const uy = dy / len;

      const fromR = Math.min(fromRect.width, fromRect.height) / 2;
      const toR = Math.min(toRect.width, toRect.height) / 2;

      const inset = -1;
      const fromOffset = Math.max(0, fromR - inset);
      const toOffset = Math.max(0, toR - inset);

      const nextStart = {
        x: fromCenter.x + ux * fromOffset,
        y: fromCenter.y + uy * fromOffset,
      };
      const nextEnd = {
        x: toCenter.x - ux * toOffset,
        y: toCenter.y - uy * toOffset,
      };

      if (
        !Number.isFinite(nextStart.x) ||
        !Number.isFinite(nextStart.y) ||
        !Number.isFinite(nextEnd.x) ||
        !Number.isFinite(nextEnd.y)
      ) {
        return;
      }

      setStart((prev) =>
        prev && prev.x === nextStart.x && prev.y === nextStart.y ? prev : nextStart,
      );
      setEnd((prev) =>
        prev && prev.x === nextEnd.x && prev.y === nextEnd.y ? prev : nextEnd,
      );
    };

    let rafId: number | null = null;
    let ro: ResizeObserver | null = null;
    let intervalId: number | null = null;
    let liveRaf: number | null = null;
    let lastTick = 0;

    const ensureObservers = () => {
      const container = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!container || !fromEl || !toEl) {
        rafId = window.requestAnimationFrame(ensureObservers);
        return;
      }

      update();

      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(scheduleUpdate);
        ro.observe(container);
        ro.observe(fromEl);
        ro.observe(toEl);
      } else {
        intervalId = window.setInterval(update, 250);
      }
    };

    ensureObservers();

    const tick = (t: number) => {
      if (t - lastTick > 150) {
        lastTick = t;
        update();
      }
      liveRaf = window.requestAnimationFrame(tick);
    };
    liveRaf = window.requestAnimationFrame(tick);

    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, true);

    return () => {
      if (rafId != null) window.cancelAnimationFrame(rafId);
      if (scheduledRaf != null) window.cancelAnimationFrame(scheduledRaf);
      if (liveRaf != null) window.cancelAnimationFrame(liveRaf);
      if (ro) ro.disconnect();
      if (intervalId != null) window.clearInterval(intervalId);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate, true);
    };
  }, [containerRef, fromRef, toRef]);

  const d = useMemo(() => {
    if (!start || !end) return "";

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    const len = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / len;
    const ny = dx / len;
    const dir = dx === 0 ? 1 : Math.sign(dx);
    const bend = curvature * len * 0.22;

    const c1: Point = {
      x: start.x + dx * 0.25 + nx * bend * dir,
      y: start.y + dy * 0.25 + ny * bend * dir,
    };

    const c2: Point = {
      x: start.x + dx * 0.75 + nx * bend * dir,
      y: start.y + dy * 0.75 + ny * bend * dir,
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
        <filter id={`cng-beam-glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {arrow ? (
          <marker
            id={`cng-beam-arrow-${id}`}
            markerWidth={arrowSize}
            markerHeight={arrowSize}
            refX={arrowSize - 1}
            refY={arrowSize / 2}
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path
              d={`M0 0 L${arrowSize} ${arrowSize / 2} L0 ${arrowSize} Z`}
              fill={beamColor ?? `rgba(var(--net-rgb),${beamOpacity})`}
            />
          </marker>
        ) : null}
      </defs>

      <path
        d={d}
        fill="none"
        stroke={baseColor ?? `rgba(var(--net-rgb),${baseOpacity})`}
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeDasharray={baseDashArray}
        opacity={baseColor ? 1 : undefined}
        vectorEffect="non-scaling-stroke"
      />

      {pingPong ? (
        <>
          <path
            d={d}
            fill="none"
            stroke={beamColor ?? `rgba(var(--net-rgb),${beamOpacity})`}
            strokeWidth={beamWidth}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            filter={glow ? `url(#cng-beam-glow-${id})` : undefined}
            markerEnd={arrow ? `url(#cng-beam-arrow-${id})` : undefined}
            opacity={beamColor ? 1 : undefined}
            vectorEffect="non-scaling-stroke"
            style={{
              animationName: "cng-beam",
              animationDuration: `${duration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${delay}s`,
            }}
          />
          <path
            d={d}
            fill="none"
            stroke={beamColor ?? `rgba(var(--net-rgb),${Math.max(0, beamOpacity - 0.20)})`}
            strokeWidth={beamWidth}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            filter={glow ? `url(#cng-beam-glow-${id})` : undefined}
            markerStart={arrow ? `url(#cng-beam-arrow-${id})` : undefined}
            opacity={beamColor ? 0.75 : undefined}
            vectorEffect="non-scaling-stroke"
            style={{
              animationName: "cng-beam-rev",
              animationDuration: `${duration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${delay + duration * 0.35}s`,
            }}
          />
        </>
      ) : (
        <path
          d={d}
          fill="none"
          stroke={beamColor ?? `rgba(var(--net-rgb),${beamOpacity})`}
          strokeWidth={beamWidth}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          filter={glow ? `url(#cng-beam-glow-${id})` : undefined}
          markerEnd={arrow ? `url(#cng-beam-arrow-${id})` : undefined}
          opacity={beamColor ? 1 : undefined}
          vectorEffect="non-scaling-stroke"
          style={{
            animationName: reverse ? "cng-beam-rev" : "cng-beam",
            animationDuration: `${duration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDelay: `${delay}s`,
          }}
        />
      )}
    </svg>
  );
}
