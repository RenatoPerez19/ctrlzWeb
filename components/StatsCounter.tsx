"use client";

import { useEffect, useRef, useState } from "react";

const DURACION_MS = 1400;

export default function StatCounter({
  valor,
  prefijo = "",
  sufijo = "",
}: {
  valor: number;
  prefijo?: string;
  sufijo?: string;
}) {
  const [actual, setActual] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const yaAnimo = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !yaAnimo.current) {
            yaAnimo.current = true;
            const inicio = performance.now();

            const tick = (ahora: number) => {
              const progreso = Math.min(
                (ahora - inicio) / DURACION_MS,
                1
              );
              const facilitado = 1 - Math.pow(1 - progreso, 3);
              setActual(Math.round(facilitado * valor));
              if (progreso < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [valor]);

  return (
    <div ref={ref}>
      {prefijo}
      {actual}
      {sufijo}
    </div>
  );
}