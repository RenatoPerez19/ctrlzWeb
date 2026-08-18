import Reveal from "./Reveal";
import { MARCAS } from "@/lib/site-data";

export default function Marcas() {
  const logosX2 = [...MARCAS, ...MARCAS];

  return (
    <Reveal
      id="marcas"
      className="overflow-hidden bg-elevated py-16 md:py-[100px]"
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <div className="font-mono-heading text-sm tracking-[0.1em] text-accent uppercase">
          Nuestras marcas
        </div>
        <h2 className="mt-3 font-heading text-2xl font-extrabold md:text-[34px]">
          Te conseguimos productos de las mejores marcas.
        </h2>
      </div>
      <div className="relative mt-10 overflow-hidden md:mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r from-elevated to-transparent md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l from-elevated to-transparent md:w-20" />
        <div className="marquee-track flex w-max">
          {logosX2.map((logo, i) => (
            <div
              key={`${logo.slug}-${i}`}
              className="mr-4 flex h-[80px] w-[130px] flex-none items-center justify-center rounded-2xl bg-white px-4 text-center font-heading text-sm font-bold text-[#0D0D0D] md:h-[100px] md:w-[170px] md:text-base"
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}