import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getAllCarsForSitemap } from "@/lib/api/cars";

// NOTE: Google's limit is 50,000 URLs per sitemap file. If the catalog grows
// past that, switch to `generateSitemaps` to split this into multiple files:
// https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getAllCarsForSitemap();

  const carEntries: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${siteConfig.url}/autos/${car.slug}`,
    lastModified: car.updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/autos`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    ...carEntries,
  ];
}
