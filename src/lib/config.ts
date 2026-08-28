const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteConfig = {
  name: "Marketplace",
  shortName: "Marketplace",
  description:
    "Compra y vende autos con confianza. Explora vehículos verificados, revisa su historial y contacta directamente con vendedores.",
  url: rawSiteUrl.replace(/\/$/, ""),
  locale: "es_CL",
};

export const apiConfig = {
  // Base URL of the separate NestJS backend, e.g. https://api.marketplace.com/v1
  // Leave unset locally to fall back to bundled mock data.
  baseUrl: process.env.API_URL?.replace(/\/$/, ""),
};
