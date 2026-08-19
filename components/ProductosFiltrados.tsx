"use client";

import { useMemo, useState } from "react";
import ProductoCard from "./ProductoCard";
import type { Producto } from "@/lib/invid-api";

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function distanciaLevenshtein(a: string, b: string): number {
  const filas = a.length + 1;
  const columnas = b.length + 1;
  const dp: number[][] = Array.from({ length: filas }, () =>
    new Array(columnas).fill(0)
  );
  for (let i = 0; i < filas; i++) dp[i][0] = i;
  for (let j = 0; j < columnas; j++) dp[0][j] = j;
  for (let i = 1; i < filas; i++) {
    for (let j = 1; j < columnas; j++) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + costo
      );
    }
  }
  return dp[filas - 1][columnas - 1];
}

// Busca, entre todos los productos, el que tenga las palabras más parecidas
// a la búsqueda (por si escribieron mal el nombre o el modelo). Compara
// palabra por palabra para que funcione aunque se hayan escrito mal varias
// palabras a la vez (ej. "moose logitch" -> "Mouse Logitech").
function buscarSugerencia(
  queryNormalizada: string,
  productos: Producto[]
): Producto | null {
  const palabrasQuery = queryNormalizada.split(/\s+/).filter(Boolean);
  if (palabrasQuery.length === 0) return null;

  let mejor: { producto: Producto; puntaje: number } | null = null;

  for (const producto of productos) {
    const palabrasNombre = normalizar(producto.nombre)
      .split(/\s+/)
      .filter(Boolean);
    if (palabrasNombre.length === 0) continue;

    let sumaDistancias = 0;
    for (const pq of palabrasQuery) {
      let mejorParaEstaPalabra = Infinity;
      for (const pn of palabrasNombre) {
        const distancia = distanciaLevenshtein(pq, pn);
        if (distancia < mejorParaEstaPalabra) mejorParaEstaPalabra = distancia;
      }
      sumaDistancias += mejorParaEstaPalabra;
    }
    const puntaje = sumaDistancias / palabrasQuery.length;

    if (!mejor || puntaje < mejor.puntaje) {
      mejor = { producto, puntaje };
    }
  }

  const longitudPromedio =
    palabrasQuery.reduce((acc, p) => acc + p.length, 0) / palabrasQuery.length;
  const umbral = Math.max(2, Math.ceil(longitudPromedio * 0.45));

  if (mejor && mejor.puntaje <= umbral) {
    return mejor.producto;
  }
  return null;
}

export default function ProductosFiltrados({
  agrupado,
  categorias,
}: {
  agrupado: Record<string, Producto[]>;
  categorias: string[];
}) {
  const [seleccionada, setSeleccionada] = useState(categorias[0]);
  const [busqueda, setBusqueda] = useState("");

  const todosLosProductos = useMemo(
    () => categorias.flatMap((c) => agrupado[c]),
    [agrupado, categorias]
  );

  const queryNormalizada = normalizar(busqueda);
  const buscando = queryNormalizada.length > 0;

  const resultados = useMemo(() => {
    if (!buscando) return [];
    return todosLosProductos.filter((p) =>
      normalizar(p.nombre).includes(queryNormalizada)
    );
  }, [buscando, queryNormalizada, todosLosProductos]);

  const sugerencia = useMemo(() => {
    if (!buscando || resultados.length > 0) return null;
    return buscarSugerencia(queryNormalizada, todosLosProductos);
  }, [buscando, resultados, queryNormalizada, todosLosProductos]);

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o modelo…"
          className="w-full rounded-xl border border-white/15 bg-base px-5 py-3.5 pr-11 font-body text-sm text-white placeholder:text-text-dim focus:border-accent focus:outline-none"
        />
        {busqueda && (
          <button
            type="button"
            onClick={() => setBusqueda("")}
            aria-label="Limpiar búsqueda"
            className="absolute top-1/2 right-4 -translate-y-1/2 text-text-dim hover:text-accent"
          >
            ✕
          </button>
        )}
      </div>

      {!buscando && (
        <div className="-mx-6 mt-6 overflow-x-auto md:-mx-12">
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
      )}

      {buscando ? (
        resultados.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/8 bg-elevated p-8 text-center">
            <p className="font-body text-text-tertiary">
              No encontramos productos para &quot;{busqueda}&quot;.
            </p>
            {sugerencia && (
              <button
                type="button"
                onClick={() => setBusqueda(sugerencia.nombre)}
                className="mt-3 font-heading text-sm font-semibold text-accent hover:text-accent-hover"
              >
                ¿Quisiste decir &quot;{sugerencia.nombre}&quot;?
              </button>
            )}
          </div>
        )
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agrupado[seleccionada].map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}