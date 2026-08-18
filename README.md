# ctrlZ Informática — sitio web

Landing page de una sola página para ctrlZ Informática (Lincoln y CABA), con
un catálogo de productos que se trae en vivo desde la API de Invid Computers,
agrupado por categoría.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá las credenciales reales:

```bash
cp .env.example .env.local
```

```
INVID_API_BASE_URL=https://www.invidcomputers.com/api/v1
INVID_API_USER=...
INVID_API_PASS=...
```

**Importante:** `.env.local` nunca se commitea (está en `.gitignore`). Las
credenciales solo se usan del lado del servidor (`lib/invid-api.ts`) — nunca
llegan al navegador. En producción (Vercel u otro hosting), cargá estas
mismas tres variables en la configuración de entorno de la plataforma, no en
el código.

Si la clave `Yanina_F` que se compartió para armar esta integración se usa en
otros sistemas, se recomienda rotarla — quedó en texto plano en una
conversación de chat.

## Cómo funciona la integración con la API (`lib/invid-api.ts`)

1. `login()` hace `POST {INVID_API_BASE_URL}/auth` con `{ usuario, clave }` y
   busca un token en las formas de respuesta más comunes (`token`,
   `accessToken`, `access_token`, `data.token`, etc.).
2. `fetchArticulos()` hace `GET {INVID_API_BASE_URL}/articulo` con
   `Authorization: Bearer <token>` y acepta la respuesta tanto si es un array
   plano como si viene envuelta (`{ data: [...] }`, `{ items: [...] }`, etc.).
3. Cada producto se normaliza probando varios nombres de campo posibles
   (español/inglés, mayúscula/minúscula) para `nombre`, `descripcion`,
   `categoria` e `imagen`.
4. Los productos se agrupan por `categoria` y se cachean 1 hora (ISR) para no
   pegarle a la API en cada visita.
5. Si el login o el fetch fallan, la sección de Productos muestra un mensaje
   de fallback con un botón directo a WhatsApp, en vez de romper la página.

### ⚠️ Pendiente de validar contra la API real

Esta integración se armó **sin poder probar la API real**: el entorno donde
se desarrolló no tiene salida de red hacia `invidcomputers.com` (política de
egress del sandbox), y no se contaba con la documentación exacta de
`/auth` ni con un JSON de ejemplo de `/articulo`. El código es defensivo
(prueba varios nombres de campo posibles), pero conviene correr
`npm run dev` con las credenciales reales y confirmar:

- Que `POST /auth` con `{ usuario, clave }` efectivamente devuelve un token
  (revisar la consola del servidor: si falla, loguea
  `[invid-api] Login falló...` o `No se encontró un token...`).
- Que `GET /articulo` con ese token devuelve los productos esperados.
- Los nombres reales de los campos `nombre` / `descripcion` / `categoria` /
  `imagen` en la respuesta — si no coinciden con los que ya se prueban en
  `firstString(...)` dentro de `normalizeProducto()`, agregar el nombre real
  a la lista correspondiente.
- Si `imagen` viene como una ruta relativa, `resolveImageUrl()` la resuelve
  contra `https://www.invidcomputers.com`; ajustar si el dominio de imágenes
  es otro.

## Contacto (WhatsApp / Instagram)

Centralizado en `lib/site-data.ts` (`CONTACTO`). El botón "Consultar precio"
de cada tarjeta de producto arma el link de WhatsApp con
`Hola, quiero consultar el precio de [nombre del producto]` vía `waLink()`.

## Marcas y fotos faltantes

El diseño original contempla logos de marca (PNG) y dos fotos reales (hero y
sección "Nosotros") que no se incluyeron en los archivos de diseño
recibidos. Mientras tanto:

- Las marcas se muestran como tarjetas blancas con el nombre en texto
  (`components/Marcas.tsx`, datos en `lib/site-data.ts`).
- El hero y "Nosotros" muestran un placeholder de texto en el lugar de la
  foto.

Para reemplazarlos: poner los PNG en `public/logos/` y usar `<img>` en
`Marcas.tsx`, y poner las fotos reales en `public/` y reemplazar los
placeholders en `Hero.tsx` / `Nosotros.tsx`.

## Build de producción

```bash
npm run build
npm run start
```
