import { CONTACTO, waLink } from "@/lib/site-data";
import type { Producto } from "@/lib/invid-api";

export default function ProductoCard({ producto }: { producto: Producto }) {
  const mensaje = `Hola, quiero consultar el precio de ${producto.nombre}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-white/8 bg-elevated transition-transform duration-[250ms] ease-out hover:scale-[1.03] hover:shadow-[0_16px_30px_-10px_rgba(0,0,0,0.5)]">
      <div className="flex h-[170px] w-full items-center justify-center bg-base/60">
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
      <div className="flex flex-1 flex-col p-6">
        <div className="font-heading text-lg font-bold text-white">
          {producto.nombre}
        </div>
        {producto.descripcion && (
          <div className="mt-2 line-clamp-3 flex-1 font-body text-sm text-text-tertiary">
            {producto.descripcion}
          </div>
        )}
        <div className="mt-5 flex flex-col gap-2.5">
          <a
            href={waLink(mensaje)}
            target="_blank"
            rel="noopener"
            className="rounded-xl bg-accent px-5 py-3 text-center font-heading text-sm font-bold text-[#0D0D0D] hover:text-[#0D0D0D]"
          >
            Consultar precio
          </a>
          <a
            href={CONTACTO.instagramUrl}
            target="_blank"
            rel="noopener"
            className="rounded-xl border border-white/25 px-5 py-3 text-center font-heading text-sm font-semibold text-white hover:text-white"
          >
            Ver en Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
