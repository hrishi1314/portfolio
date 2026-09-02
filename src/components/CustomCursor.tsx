"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);
  const hasMoved = useRef(false);

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  const animate = useCallback(() => {
    // Smooth trailing lerp
    ring.current.x = lerp(ring.current.x, mouse.current.x, 0.15);
    ring.current.y = lerp(ring.current.y, mouse.current.y, 0.15);

    const scale = isHovering.current ? 0.6 : 1;
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0) scale(${scale})`;
    }
    if (ringRef.current) {
      const half = isHovering.current ? 26 : 18;
      ringRef.current.style.transform = `translate3d(${ring.current.x - half}px, ${ring.current.y - half}px, 0)`;
    }
    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouchDevice || prefersReducedMotion) return;

    document.body.classList.add("cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!hasMoved.current) {
        hasMoved.current = true;
        ring.current = { x: e.clientX, y: e.clientY };
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const onMouseEnterWindow = () => {
      if (hasMoved.current) {
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const onMouseLeaveWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnterInteractive = () => {
      isHovering.current = true;
      if (ringRef.current) ringRef.current.classList.add("hovering");
    };

    const onMouseLeaveInteractive = () => {
      isHovering.current = false;
      if (ringRef.current) ringRef.current.classList.remove("hovering");
    };

    const attachListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover], input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnterWindow);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      observer.disconnect();
      document.body.classList.remove("cursor-active");
    };
  }, [animate]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}
