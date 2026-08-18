export default function Hero() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-20 md:min-h-[88vh] md:px-12 md:py-24">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full bg-accent opacity-[0.08]" />
      <div className="relative z-10 grid w-full max-w-[1100px] items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div>
          <div className="mb-4 font-mono-heading text-sm text-text-tertiary">
            {"// insumos y servicio técnico"}
          </div>
          <h1 className="font-heading text-5xl leading-[1.05] font-extrabold tracking-tight md:text-[64px] md:leading-[1.02]">
            Se rompió? <span className="text-accent">Ctrl+Z.</span>
          </h1>
          <p className="mt-6 max-w-[520px] font-body text-lg text-text-secondary md:text-[19px] md:leading-[1.55]">
            Reparación, armado de PC y venta de periféricos, notebooks y
            componentes. Rápido, honesto y sin vueltas.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contacto"
              className="rounded-xl bg-accent px-7 py-4 text-center font-heading text-[15px] font-bold text-[#0D0D0D] hover:text-[#0D0D0D]"
            >
              Escribinos por WhatsApp
            </a>
            <a
              href="#servicios"
              className="rounded-xl border border-white/25 px-7 py-4 text-center font-heading text-[15px] font-semibold text-white hover:text-white"
            >
              Ver servicios
            </a>
          </div>
        </div>
        <div className="min-h-[280px] md:min-h-[460px]">
          <div className="flex h-[280px] w-full items-center justify-center rounded-3xl bg-elevated text-center text-sm text-text-dim md:h-[460px]">
            Foto de equipo / notebook / servicio técnico
          </div>
        </div>
      </div>
    </div>
  );
}
