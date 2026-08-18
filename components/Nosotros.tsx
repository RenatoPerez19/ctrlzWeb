import Reveal from "./Reveal";

export default function Nosotros() {
  return (
    <Reveal
      id="nosotros"
      className="mx-auto grid max-w-[1100px] items-center gap-10 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-12 md:py-[120px]"
    >
      <div className="flex h-[280px] items-center justify-center rounded-3xl bg-base text-center text-sm text-text-dim md:h-[500px]">
        Foto del equipo / local
      </div>
      <div>
        <div className="font-mono-heading text-sm tracking-[0.1em] text-accent uppercase">
          Quiénes somos
        </div>
        <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-[48px]">
          ¿Fanáticos de la tecnología, igual que vos?
        </h2>
        <p className="mt-5 font-body text-lg text-text-secondary md:text-[19px] md:leading-[1.65]">
          Desde Lincoln y CABA armamos, vendemos y reparamos equipos. Atención
          cercana, sin vueltas y con buena onda. Ctrl+Z es esa segunda
          oportunidad que tu compu se merece.
        </p>
      </div>
    </Reveal>
  );
}
