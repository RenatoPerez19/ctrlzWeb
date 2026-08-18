"use client";

import { useState } from "react";
import ProductoCard from "./ProductoCard";
import type { Producto } from "@/lib/invid-api";

export default function ProductosFiltrados({
  agrupado,
  categorias,
}: {
  agrupado: Record<string, Producto[]>;
  categorias: string[];
}) {
  const [seleccionada, setSeleccionada] = useState(categorias[0]);

  return (
    <div>
      <div className="-mx-6 overflow-x-auto md:-mx-12">
        <div className="flex gap-2.5 px-6 pb-2 md:px-12">
          {categorias.map((categoria) => {
            const activa = categoria === seleccionada;
            return (
              <button
                key={categoria}
                type="button"
                onClick={() => setSeleccionada(categoria)}
                className={`flex-none rounded-full px-5 py-2.5 font-heading text-sm font-semibold whitespace-nowrap transition-colors ${
                  activa
                    ? "bg-accent text-[#0D0D0D]"
                    : "border border-white/25 text-white hover:border-accent hover:text-accent"
                }`}
              >
                {categoria}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agrupado[seleccionada].map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}