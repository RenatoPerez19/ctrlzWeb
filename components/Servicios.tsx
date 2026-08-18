import Reveal from "./Reveal";
import { SERVICIOS } from "@/lib/site-data";

export default function Servicios() {
  return (
    <Reveal id="servicios" className="mx-auto max-w-[1100px] px-6 py-20 md:px-12 md:py-[120px]">
      <div className="font-mono-heading text-sm tracking-[0.1em] text-accent uppercase">
        Servicios
      </div>
      <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight md:text-[42px]">
        Lo revisamos, lo arreglamos, lo resolvemos.
      </h2>
      <div className="mt-10 grid gap-7 md:mt-14 md:grid-cols-3">
        {SERVICIOS.map((s) => (
          <div
            key={s.titulo}
            className="rounded-[20px] border border-white/8 bg-elevated p-8 transition-transform duration-[250ms] ease-out hover:scale-[1.04] hover:shadow-[0_16px_30px_-10px_rgba(0,0,0,0.5)]"
          >
            <div className="text-3xl">{s.icono}</div>
            <div className="mt-4 font-heading text-xl font-bold">
              {s.titulo}
            </div>
            <div className="mt-2 font-body text-[15px] leading-relaxed text-text-tertiary">
              {s.descripcion}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
