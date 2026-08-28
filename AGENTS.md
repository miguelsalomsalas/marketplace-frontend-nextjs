# Contexto del proyecto: Marketplace Web

Marketplace de venta de autos. Vendedores publican vehículos; compradores buscan, revisan historial y compran con confianza.

## Stack
- Next.js 16.3.2 (frontend, SSR/SEO)
- Tailwind CSS 4.3.3
- Backend separado en NestJS — este proyecto NO implementa lógica de negocio, solo consume su API

## Arquitectura
- Cliente API: src/lib/api/http.ts y src/lib/api/cars.ts
- Si API_URL no está definida en .env.local, usa datos de ejemplo en src/lib/mock/cars.ts
- Contrato de datos (Car, CarListResponse, etc.) en src/types/car.ts
- JSON-LD schema.org/Vehicle + Offer en cada anuncio para SEO

## Reglas para el agente
- No actualices versiones de dependencias automáticamente. Si detectas una versión más nueva disponible, menciónalo al usuario, pero la actualización debe pedirse explícitamente.
- No inventes rutas de documentación ni archivos que no existan en el proyecto. Si necesitas verificar una API o versión, usa context7 o busca en la documentación oficial.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
