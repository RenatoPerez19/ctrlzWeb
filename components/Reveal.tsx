"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <div id={id} ref={ref} className={`reveal section-anchor ${className}`}>
      {children}
    </div>
  );
}
