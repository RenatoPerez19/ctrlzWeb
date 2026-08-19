"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CONTACTO, waLink } from "@/lib/site-data";
import type { Producto } from "@/lib/invid-api";

function ImagenProducto({
  producto,
  className,
}: {
  producto: Producto;
  className: string;
}) {
  return (
    <div className={className}>
      {producto.imagen ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-full w-full object-contain p-4"
          loading="lazy"
        />
      ) : (
        <span className="text-sm text-text-dim">Sin imagen</span>
      )}
    </div>
  );
}

function BotonesContacto({
  producto,
  tamano = "sm",
}: {
  producto: Producto;
  tamano?: "sm" | "base";
}) {
  const mensaje = `Hola, quiero consultar el precio de ${producto.nombre}`;
  const padding = tamano === "base" ? "px-6 py-3.5" : "px-5 py-3";
  const texto = tamano === "base" ? "text-base" : "text-sm";

  return (
    <div className="flex flex-col gap-2.5" onClick={(e) => e.stopPropagation()}>
      <a
        href={waLink(mensaje)}
        target="_blank"
        rel="noopener"
        className={`rounded-xl bg-accent ${padding} text-center font-heading ${texto} font-bold text-[#0D0D0D] hover:text-[#0D0D0D]`}
      >
        Consultar precio
      </a>
      <a
        href={CONTACTO.instagramUrl}
        target="_blank"
        rel="noopener"
        className={`rounded-xl border border-white/25 ${padding} text-center font-heading ${texto} font-semibold text-white hover:text-white`}
      >
        Ver en Instagram
      </a>
    </div>
  );
}

export default function ProductoCard({ producto }: { producto: Producto }) {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (!abierto) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [abierto]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setAbierto(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setAbierto(true);
        }}
        className="flex cursor-pointer flex-col overflow-hidden rounded-[20px] border border-white/8 bg-elevated text-left transition-transform duration-[250ms] ease-out hover:scale-[1.03] hover:shadow-[0_16px_30px_-10px_rgba(0,0,0,0.5)]"
      >
        <ImagenProducto
          producto={producto}
          className="flex h-[170px] w-full items-center justify-center bg-base/60"
        />
        <div className="flex flex-1 flex-col p-6">
          <div className="font-heading text-lg font-bold text-white">
            {producto.nombre}
          </div>
          {producto.descripcion && (
            <div className="mt-2 line-clamp-3 flex-1 font-body text-sm text-text-tertiary">
              {producto.descripcion}
            </div>
          )}
          <div className="mt-5">
            <BotonesContacto producto={producto} />
          </div>
        </div>
      </div>

      {abierto &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setAbierto(false)}
          >
            <div
              className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-[20px] border border-white/8 bg-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <ImagenProducto
                  producto={producto}
                  className="flex h-[260px] w-full items-center justify-center bg-base/60"
                />
                <button
                  type="button"
                  onClick={() => setAbierto(false)}
                  aria-label="Cerrar"
                  className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-base/80 text-lg text-white hover:text-accent"
                >
                  ✕
                </button>
              </div>
              <div className="p-7">
                <div className="font-heading text-xl font-bold text-white">
                  {producto.nombre}
                </div>
                {producto.descripcion && (
                  <div className="mt-3 font-body text-sm leading-relaxed text-text-tertiary">
                    {producto.descripcion}
                  </div>
                )}
                <div className="mt-6">
                  <BotonesContacto producto={producto} tamano="base" />
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}