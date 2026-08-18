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
      { threshold: 0 }
    );
    io.observe(el);

    // Red de seguridad: si por un salto de scroll (ej. entrar directo por un
    // link con #ancla) el observer nunca llega a disparar, mostramos el
    // contenido igual pasado un momento en vez de dejarlo invisible.
    const timeout = setTimeout(() => el.classList.add("in"), 1200);

    return () => {
      io.disconnect();
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div id={id} ref={ref} className={`reveal section-anchor ${className}`}>
      {children}
    </div>
  );
}
