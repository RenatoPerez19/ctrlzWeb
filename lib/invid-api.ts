import { cache } from "react";

export type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string | null;
};

const BASE_URL =
  process.env.INVID_API_BASE_URL ?? "https://www.invidcomputers.com/api/v1";
const API_USER = process.env.INVID_API_USER;
const API_PASS = process.env.INVID_API_PASS;

// Revalida el catálogo cada hora: alcanza para ver altas/bajas de productos
// sin acercarse al límite de 50 requests/hora que impone la API, y las
// credenciales/token nunca llegan al navegador (todo esto corre en el server).
const REVALIDATE_SECONDS = 3600;

// GET /articulo.php pagina de a 100 resultados. Un tope defensivo para no
// gastar de más la cuota de 50 requests/hora si el catálogo es enorme.
const MAX_PAGINAS = 10;

type AuthSuccess = {
  status: 1;
  access_token: string;
  token_type: string;
  expiration_time: number;
  username: string;
};

type ErrorResponse = {
  status: 0;
  message: string;
};

type ArticuloApi = {
  ID: string;
  TITLE: string;
  DESCRIPTION: string | null;
  LONG_DESCRIPTION: string | null;
  IMAGE_URL: string | null;
  CATEGORY: string | null;
};

type ArticuloResponse = {
  status: 1;
  data: ArticuloApi | ArticuloApi[];
  next_page_url?: string | null;
};

async function login(): Promise<string | null> {
  if (!API_USER || !API_PASS) {
    console.error(
      "[invid-api] Faltan INVID_API_USER / INVID_API_PASS en las variables de entorno."
    );
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/auth.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: API_USER, password: API_PASS }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    const payload = await res.json();

    if (!res.ok) {
      const err = payload as ErrorResponse;
      console.error(
        `[invid-api] Login falló (${res.status}): ${err.message ?? res.statusText}`
      );
      return null;
    }

    return (payload as AuthSuccess).access_token;
  } catch (err) {
    console.error("[invid-api] Error de red en login:", err);
    return null;
  }
}

async function fetchPagina(
  token: string,
  offset: number
): Promise<{ items: ArticuloApi[]; hayMas: boolean }> {
  const url =
    `${BASE_URL}/articulo.php` +
    `?exclude_zero_price=1&exclude_zero_stock=1&published_only=1&offset=${offset}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    const payload = await res.json();

    if (!res.ok) {
      const err = payload as ErrorResponse;
      const retryAfter = res.headers.get("Retry-After");
      const detalle = retryAfter
        ? `${err.message ?? res.statusText} — reintentar en ${retryAfter}s`
        : err.message ?? res.statusText;
      console.error(
        `[invid-api] GET articulo.php falló (${res.status}): ${detalle}`
      );
      return { items: [], hayMas: false };
    }

    const { data, next_page_url } = payload as ArticuloResponse;
    const items = Array.isArray(data) ? data : [data];
    return { items, hayMas: Boolean(next_page_url) };
  } catch (err) {
    console.error("[invid-api] Error de red obteniendo articulo.php:", err);
    return { items: [], hayMas: false };
  }
}

// Algunos campos del proveedor (título, categoría, descripción) traen HTML
// crudo pegado (incluso <script> de tracking). Lo limpiamos antes de mostrar
// nada en la web.
const ENTIDADES_HTML: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  aacute: "á",
  eacute: "é",
  iacute: "í",
  oacute: "ó",
  uacute: "ú",
  uuml: "ü",
  Aacute: "Á",
  Eacute: "É",
  Iacute: "Í",
  Oacute: "Ó",
  Uacute: "Ú",
  Uuml: "Ü",
  ntilde: "ñ",
  Ntilde: "Ñ",
  iquest: "¿",
  iexcl: "¡",
  ordm: "º",
  ordf: "ª",
  deg: "°",
  middot: "·",
  hellip: "…",
  mdash: "—",
  ndash: "–",
};

function decodificarEntidades(texto: string): string {
  return texto
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&([a-zA-Z]+);/g, (m, nombre) => ENTIDADES_HTML[nombre] ?? m);
}

function limpiarHtml(raw: string | null): string {
  if (!raw) return "";
  const sinScripts = raw.replace(
    /<(script|style)[^>]*>[\s\S]*?<\/\1>/gi,
    " "
  );
  const sinTags = sinScripts.replace(/<[^>]+>/g, " ");
  return decodificarEntidades(sinTags).replace(/\s+/g, " ").trim();
}

function normalizeProducto(raw: ArticuloApi): Producto {
  return {
    id: raw.ID,
    nombre: limpiarHtml(raw.TITLE),
    descripcion: limpiarHtml(raw.LONG_DESCRIPTION || raw.DESCRIPTION),
    categoria: limpiarHtml(raw.CATEGORY) || "Otros",
    imagen: raw.IMAGE_URL || null,
  };
}

/**
 * Trae todos los productos (paginando de a 100) y los agrupa por categoría.
 * Nunca lanza: si el login o el fetch fallan, devuelve un objeto vacío para
 * que la UI muestre un estado de fallback en vez de romper la página.
 */
export const getProductosPorCategoria = cache(async (): Promise<
  Record<string, Producto[]>
> => {
  const token = await login();
  if (!token) return {};

  const productos: Producto[] = [];
  let offset = 0;

  for (let pagina = 0; pagina < MAX_PAGINAS; pagina++) {
    const { items, hayMas } = await fetchPagina(token, offset);
    productos.push(...items.map(normalizeProducto));
    if (!hayMas) break;
    offset += 100;
  }

  const agrupado: Record<string, Producto[]> = {};
  for (const producto of productos) {
    if (!agrupado[producto.categoria]) agrupado[producto.categoria] = [];
    agrupado[producto.categoria].push(producto);
  }

  for (const categoria of Object.keys(agrupado)) {
    agrupado[categoria].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }

  return agrupado;
});