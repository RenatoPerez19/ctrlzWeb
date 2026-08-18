import Reveal from "./Reveal";
import { UBICACIONES } from "@/lib/site-data";

export default function Ubicacion() {
  return (
    <Reveal id="ubicacion" className="bg-elevated px-6 py-16 md:px-12 md:py-[100px]">
      <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <div className="font-mono-heading text-sm tracking-[0.1em] text-accent uppercase">
            Ubicación
          </div>
          <h2 className="mt-3 font-heading text-2xl font-extrabold md:text-[34px]">
            Lincoln y CABA, Buenos Aires.
          </h2>
          <p className="mt-4 font-body text-base text-text-tertiary md:leading-relaxed">
            Atendemos en persona en Lincoln y coordinamos entregas y servicio
            técnico en CABA. Consultá disponibilidad por WhatsApp.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {UBICACIONES.map((u) => (
            <a
              key={u.label}
              href={u.href}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-base px-6 py-5 text-white transition-transform duration-200 ease-out hover:scale-[1.06] hover:text-white"
            >
              <span className="text-2xl">📍</span>
              <span>{u.label}</span>
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
