import Reveal from "./Reveal";

export default function Nosotros() {
  return (
    <Reveal
      id="nosotros"
      className="mx-auto max-w-[1100px] px-6 py-20 md:px-12 md:py-[120px]"
    >
      <div className="font-mono-heading text-sm tracking-[0.1em] text-accent uppercase">
        Quiénes somos
      </div>
      <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight md:text-[48px]">
        ¿Fanáticos de la tecnología, igual que vos?
      </h2>
      <p className="mt-5 max-w-[720px] font-body text-lg text-text-secondary md:text-[19px] md:leading-[1.65]">
        Desde Lincoln y CABA armamos, vendemos y reparamos equipos. Atención
        cercana, sin vueltas y con buena onda. Ctrl+Z es esa segunda
        oportunidad que tu compu se merece.
      </p>
    </Reveal>
  );
}
