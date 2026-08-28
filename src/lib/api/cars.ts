import { apiConfig } from "@/lib/config";
import { mockCars } from "@/lib/mock/cars";
import { filterMockCars } from "@/lib/mock/filterCars";
import type { Car, CarListResponse, CarSearchParams, CarSummary } from "@/types/car";
import { ApiError, apiFetch } from "./http";

const USE_MOCK = !apiConfig.baseUrl;

/**
 * Returns a paginated, filtered list of cars.
 * Backed by GET {API_URL}/cars — falls back to bundled mock data when
 * API_URL is not configured (see src/lib/config.ts).
 */
export async function getCars(
  params: CarSearchParams = {}
): Promise<CarListResponse> {
  if (USE_MOCK) return filterMockCars(params);

  return apiFetch<CarListResponse>("/cars", {
    params: {
      q: params.q,
      brand: params.brand,
      bodyType: params.bodyType,
      fuelType: params.fuelType,
      transmission: params.transmission,
      condition: params.condition,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      minYear: params.minYear,
      maxYear: params.maxYear,
      sort: params.sort,
      page: params.page,
      pageSize: params.pageSize,
    },
    tags: ["cars"],
  });
}

/** Returns a single car by slug, or null if it doesn't exist. */
export async function getCarBySlug(slug: string): Promise<Car | null> {
  if (USE_MOCK) return mockCars.find((car) => car.slug === slug) ?? null;

  try {
    return await apiFetch<Car>(`/cars/${slug}`, { tags: [`car:${slug}`] });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

/** Returns a short list of cars to highlight on the homepage. */
export async function getFeaturedCars(limit = 6): Promise<CarSummary[]> {
  if (USE_MOCK) {
    return mockCars.filter((car) => car.featured).slice(0, limit);
  }

  const res = await apiFetch<CarListResponse>("/cars", {
    params: { featured: true, pageSize: limit },
    tags: ["cars"],
  });
  return res.data;
}

/** Returns every car's slug + last update time, used to build the sitemap. */
export async function getAllCarsForSitemap(): Promise<
  Pick<Car, "slug" | "updatedAt">[]
> {
  if (USE_MOCK) {
    return mockCars.map(({ slug, updatedAt }) => ({ slug, updatedAt }));
  }

  const res = await apiFetch<CarListResponse>("/cars", {
    params: { pageSize: 50000 },
    revalidate: 3600,
  });
  return res.data.map(({ slug }) => ({
    slug,
    updatedAt: new Date().toISOString(),
  }));
}
