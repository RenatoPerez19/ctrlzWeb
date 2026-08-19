export default function Nav() {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/8 bg-base/90 px-4 py-4 backdrop-blur-md md:px-12">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative h-[37px] w-[44px] rounded-[9px] border-[3px] border-white">
          <span className="absolute top-[6px] left-[7px] font-heading text-[9px] font-bold text-white">
            &gt;_
          </span>
          <span className="absolute right-[5px] bottom-[-1px] font-heading text-2xl leading-none font-extrabold text-accent">
            Z
          </span>
        </div>
        <span className="font-heading text-[17px] font-extrabold md:text-[19px]">
          ctrlZ Informática
        </span>
      </div>
      <div className="hidden items-center gap-8 font-heading text-sm font-semibold md:flex">
        <a href="#servicios">Servicios</a>
        <a href="#marcas">Marcas</a>
        <a href="#productos">Productos</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#ubicacion">Ubicación</a>
        <a
          href="#contacto"
          className="rounded-full bg-accent px-[18px] py-2 text-base font-semibold text-[#0D0D0D] hover:text-[#0D0D0D]"
        >
          Contacto
        </a>
      </div>
      <div className="flex items-center gap-1.5 md:hidden">
        <a
          href="#productos"
          className="rounded-full border border-accent px-3 py-2 font-heading text-xs font-semibold whitespace-nowrap text-accent hover:text-accent"
        >
          Catálogo
        </a>
        <a
          href="#contacto"
          className="rounded-full bg-accent px-3 py-2 font-heading text-xs font-semibold whitespace-nowrap text-[#0D0D0D] hover:text-[#0D0D0D]"
        >
          Contacto
        </a>
      </div>
    </div>
  );
}