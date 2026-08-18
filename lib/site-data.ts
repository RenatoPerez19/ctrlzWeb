export const CONTACTO = {
  whatsappNumero: "542355480710",
  whatsappLabel: "2355 48-0710",
  instagramUrl: "https://www.instagram.com/ctrlz.informatica_/",
  instagramLabel: "@ctrlz.informatica_",
};

export function waLink(mensaje: string) {
  return `https://wa.me/${CONTACTO.whatsappNumero}?text=${encodeURIComponent(
    mensaje
  )}`;
}

export const MARCAS = [
  { name: "AMD", slug: "amd", url: "https://www.amd.com" },
  { name: "Corsair", slug: "corsair", url: "https://www.corsair.com" },
  { name: "Epson", slug: "epson", url: "https://www.epson.com.ar" },
  { name: "Genius", slug: "genius", url: "https://www.geniusnet.com" },
  { name: "Gigabyte", slug: "gigabyte", url: "https://www.gigabyte.com" },
  { name: "Hikvision", slug: "hikvision", url: "https://www.hikvision.com" },
  { name: "HP", slug: "hp", url: "https://www.hp.com" },
  { name: "HyperX", slug: "hyperx", url: "https://www.hyperx.com" },
  { name: "Intel", slug: "intel", url: "https://www.intel.com" },
  { name: "JBL", slug: "jbl", url: "https://www.jbl.com" },
  { name: "Kelyx", slug: "kelyx", url: "https://www.kelyx.com.ar" },
  { name: "Kingston", slug: "kingston", url: "https://www.kingston.com" },
  { name: "Lenovo", slug: "lenovo", url: "https://www.lenovo.com" },
  { name: "Logitech", slug: "logitech", url: "https://www.logitech.com" },
  { name: "MSI", slug: "msi", url: "https://www.msi.com" },
  { name: "Raptor", slug: "raptor", url: "https://raptorph.com" },
  { name: "Razer", slug: "razer", url: "https://www.razer.com" },
  { name: "Sapphire", slug: "sapphire", url: "https://www.sapphiretech.com" },
  { name: "Seagate", slug: "seagate", url: "https://www.seagate.com" },
  {
    name: "Thermaltake",
    slug: "thermaltake",
    url: "https://www.thermaltake.com",
  },
  { name: "TP-Link", slug: "tp-link", url: "https://www.tp-link.com" },
  {
    name: "Western Digital",
    slug: "western-digital",
    url: "https://www.westerndigital.com",
  },
];

export const SERVICIOS = [
  {
    icono: "🔧",
    titulo: "Reparación y mantenimiento",
    descripcion:
      "Formateo, limpieza, cambio de componentes y diagnóstico sin cargo.",
  },
  {
    icono: "🖥️",
    titulo: "Armado de PC",
    descripcion:
      "Setups a medida para trabajo, diseño o gaming, con componentes originales.",
  },
  {
    icono: "🛒",
    titulo: "Venta de insumos",
    descripcion:
      "Notebooks, monitores, periféricos y consumibles de impresión.",
  },
];

export const STATS = [
  { valor: 48, prefijo: "+", sufijo: "", etiqueta: "servicios realizados" },
  { valor: 2, prefijo: "", sufijo: "", etiqueta: "zonas de cobertura" },
  { valor: 24, prefijo: "", sufijo: "hs", etiqueta: "respuesta por WhatsApp" },
];

export const UBICACIONES = [
  {
    label: "Lincoln, Buenos Aires",
    href: "https://www.google.com/maps/search/?api=1&query=Lincoln,Buenos+Aires,Argentina",
  },
  {
    label: "CABA · Palermo (a coordinar)",
    href: "https://www.google.com/maps/search/?api=1&query=Palermo,Buenos+Aires,Argentina",
  },
];
