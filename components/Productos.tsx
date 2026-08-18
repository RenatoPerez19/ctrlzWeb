import Reveal from "./Reveal";
import ProductosFiltrados from "./ProductosFiltrados";
import { getProductosPorCategoria } from "@/lib/invid-api";
import { CONTACTO } from "@/lib/site-data";

export default async function Productos() {
  const agrupado = await getProductosPorCategoria();
  const categorias = Object.keys(agrupado).sort((a, b) =>
    a.localeCompare(b, "es")
  );

  return (
    <Reveal
      id="productos"
      className="mx-auto max-w-[1100px] px-6 py-20 md:px-12 md:py-[120px]"
    >
      <div className="font-mono-heading text-sm tracking-[0.1em] text-accent uppercase">
        Productos
      </div>
      <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-[42px]">
        Nuestro catálogo, actualizado directo de stock.
      </h2>

      {categorias.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/8 bg-elevated p-8 text-center">
          <p className="font-body text-text-tertiary">
            No pudimos cargar el catálogo en este momento. Escribinos por
            WhatsApp y te contamos qué tenemos disponible.
          </p>
          <a
            href={`https://wa.me/${CONTACTO.whatsappNumero}`}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-block rounded-xl bg-accent px-7 py-3 font-heading text-sm font-bold text-[#0D0D0D] hover:text-[#0D0D0D]"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      ) : (
        <div className="mt-10">
          <ProductosFiltrados agrupado={agrupado} categorias={categorias} />
        </div>
      )}
    </Reveal>
  );
}