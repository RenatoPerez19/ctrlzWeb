import Reveal from "./Reveal";
import { CONTACTO } from "@/lib/site-data";

export default function Contacto() {
  return (
    <Reveal id="contacto" className="px-6 py-24 text-center md:py-[130px]">
      <h2 className="mx-auto max-w-[640px] font-heading text-3xl font-extrabold tracking-tight md:text-[44px]">
        ¿Hablamos? Escribinos y lo resolvemos.
      </h2>
      <p className="mt-4 font-body text-base text-text-tertiary md:text-[17px]">
        Consultas, presupuestos y turnos por WhatsApp o Instagram.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={`https://wa.me/${CONTACTO.whatsappNumero}`}
          target="_blank"
          rel="noopener"
          className="rounded-xl bg-accent px-8 py-4 font-heading text-base font-bold text-[#0D0D0D] hover:text-[#0D0D0D]"
        >
          WhatsApp: {CONTACTO.whatsappLabel}
        </a>
        <a
          href={CONTACTO.instagramUrl}
          target="_blank"
          rel="noopener"
          className="rounded-xl border border-white/25 px-8 py-4 font-heading text-base font-semibold text-white hover:text-white"
        >
          {CONTACTO.instagramLabel}
        </a>
      </div>
    </Reveal>
  );
}
