import Reveal from "./Reveal";
import StatCounter from "./StatsCounter";
import { STATS } from "@/lib/site-data";

export default function Stats() {
  return (
    <Reveal className="mx-auto grid max-w-[1100px] grid-cols-3 gap-4 px-6 py-14 text-center md:gap-7 md:px-12 md:py-20">
      {STATS.map((s) => (
        <div key={s.etiqueta}>
          <div className="font-heading text-2xl font-extrabold text-accent sm:text-3xl md:text-[44px]">
            <StatCounter
              valor={s.valor}
              prefijo={s.prefijo}
              sufijo={s.sufijo}
            />
          </div>
          <div className="mt-1.5 font-body text-xs text-text-tertiary md:text-sm">
            {s.etiqueta}
          </div>
        </div>
      ))}
    </Reveal>
  );
}
