import { cache } from "react";

export type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string | null;
};

const SITE_ORIGIN = "https://www.invidcomputers.com";
const BASE_URL = process.env.INVID_API_BASE_URL ?? `${SITE_ORIGIN}/api/v1`;
const API_USER = process.env.INVID_API_USER;
const API_PASS = process.env.INVID_API_PASS;

// Revalida el catálogo cada hora: suficiente para que se vean altas/bajas de
// productos sin pegarle a la API en cada visita, y sin exponer nunca el
// token/credenciales al navegador (todo esto corre en el servidor).
const REVALIDATE_SECONDS = 3600;

/**
 * Busca un token en formas de respuesta habituales de APIs .NET/Node:
 * { token }, { accessToken }, { access_token }, { data: { token } }, etc.
 * Documentación real del proveedor no disponible al momento de integrar
 * (ver README) — si el login real usa otro nombre de campo, ajustar acá.
 */
function extractToken(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const obj = payload as Record<string, unknown>;
  const directKeys = [
    "token",
    "Token",
    "accessToken",
    "AccessToken",
    "access_token",
    "jwt",
    "Jwt",
  ];
  for (const key of directKeys) {
    const val = obj[key];
    if (typeof val === "string" && val.length > 0) return val;
  }
  const nested = obj["data"] ?? obj["result"] ?? obj["resultado"];
  if (nested && typeof nested === "object") {
    return extractToken(nested);
  }
  return null;
}

/**
 * Normaliza la respuesta de /articulo a un array, sin importar si viene
 * como array plano o envuelta en { data: [...] } / { items: [...] } / etc.
 */
function extractArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  const obj = payload as Record<string, unknown>;
  const candidates = ["data", "items", "articulos", "result", "resultado"];
  for (const key of candidates) {
    const val = obj[key];
    if (Array.isArray(val)) return val;
  }
  return [];
}

function firstString(
  obj: Record<string, unknown>,
  keys: string[]
): string | null {
  for (const key of keys) {
    const val = obj[key];
    if (typeof val === "string" && val.trim().length > 0) return val.trim();
    if (Array.isArray(val) && typeof val[0] === "string") return val[0];
    if (val && typeof val === "object") {
      const nestedUrl = (val as Record<string, unknown>)["url"];
      if (typeof nestedUrl === "string") return nestedUrl;
    }
  }
  return null;
}

function resolveImageUrl(raw: string | null): string | null {
  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `${SITE_ORIGIN}${raw.startsWith("/") ? "" : "/"}${raw}`;
}

function normalizeProducto(raw: unknown, index: number): Producto | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const nombre = firstString(obj, [
    "nombre",
    "Nombre",
    "name",
    "titulo",
    "Titulo",
    "descripcionCorta",
  ]);
  if (!nombre) return null;

  const descripcion =
    firstString(obj, [
      "descripcion",
      "Descripcion",
      "description",
      "detalle",
      "Detalle",
      "observaciones",
    ]) ?? "";

  const categoria =
    firstString(obj, [
      "categoria",
      "Categoria",
      "category",
      "rubro",
      "Rubro",
      "familia",
      "Familia",
    ]) ?? "Otros";

  const imagen = resolveImageUrl(
    firstString(obj, [
      "imagen",
      "Imagen",
      "image",
      "imagenUrl",
      "ImagenUrl",
      "foto",
      "Foto",
      "urlImagen",
      "imagenes",
      "Imagenes",
      "picture",
    ])
  );

  const id =
    firstString(obj, ["id", "Id", "codigo", "Codigo", "sku", "Sku"]) ??
    `${index}-${nombre}`;

  return { id, nombre, descripcion, categoria, imagen };
}

async function login(): Promise<string | null> {
  if (!API_USER || !API_PASS) {
    console.error(
      "[invid-api] Faltan INVID_API_USER / INVID_API_PASS en las variables de entorno."
    );
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: API_USER, clave: API_PASS }),
      // Se revalida junto con el catálogo, así no se re-loguea en cada
      // visita (ver REVALIDATE_SECONDS).
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(
        `[invid-api] Login falló con status ${res.status} ${res.statusText}`
      );
      return null;
    }

    const payload = await res.json();
    const token = extractToken(payload);
    if (!token) {
      console.error(
        "[invid-api] No se encontró un token en la respuesta de /auth. Revisar el shape real de la respuesta."
      );
    }
    return token;
  } catch (err) {
    console.error("[invid-api] Error de red en login:", err);
    return null;
  }
}

async function fetchArticulos(token: string): Promise<unknown[]> {
  try {
    const res = await fetch(`${BASE_URL}/articulo`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(
        `[invid-api] GET /articulo falló con status ${res.status} ${res.statusText}`
      );
      return [];
    }

    const payload = await res.json();
    return extractArray(payload);
  } catch (err) {
    console.error("[invid-api] Error de red obteniendo /articulo:", err);
    return [];
  }
}

/**
 * Trae todos los productos y los agrupa por categoría.
 * Nunca lanza: si la API falla, devuelve un objeto vacío para que la UI
 * pueda mostrar un estado de fallback en vez de romper la página.
 */
export const getProductosPorCategoria = cache(async (): Promise<
  Record<string, Producto[]>
> => {
  const token = await login();
  if (!token) return {};

  const raw = await fetchArticulos(token);
  const productos = raw
    .map((item, i) => normalizeProducto(item, i))
    .filter((p): p is Producto => p !== null);

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
