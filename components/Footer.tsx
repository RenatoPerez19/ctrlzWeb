import { CONTACTO } from "@/lib/site-data";

export default function Footer() {
  return (
    <div className="flex flex-col items-center gap-2 border-t border-white/8 px-6 py-8 font-mono-heading text-xs text-text-dim sm:flex-row sm:justify-between md:px-12">
      <span>© ctrlZ Informática · Lincoln y CABA</span>
      <a href={CONTACTO.instagramUrl} target="_blank" rel="noopener" className="text-text-dim hover:text-accent">
        {CONTACTO.instagramLabel}
      </a>
    </div>
  );
}
