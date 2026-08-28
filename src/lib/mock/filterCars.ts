import type { Car, CarListResponse, CarSearchParams } from "@/types/car";
import { mockCars } from "./cars";

function toSummary(car: Car) {
  const {
    id,
    slug,
    title,
    brand,
    model,
    year,
    price,
    currency,
    mileageKm,
    transmission,
    fuelType,
    bodyType,
    condition,
    city,
    country,
    images,
    featured,
  } = car;
  return {
    id,
    slug,
    title,
    brand,
    model,
    year,
    price,
    currency,
    mileageKm,
    transmission,
    fuelType,
    bodyType,
    condition,
    city,
    country,
    images,
    featured,
  };
}

export function filterMockCars(params: CarSearchParams): CarListResponse {
  const {
    q,
    brand,
    bodyType,
    fuelType,
    transmission,
    condition,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    sort = "recientes",
    page = 1,
    pageSize = 12,
  } = params;

  let results = mockCars.filter((car) => {
    if (q) {
      const needle = q.toLowerCase();
      const haystack = `${car.brand} ${car.model} ${car.title}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    if (brand && car.brand.toLowerCase() !== brand.toLowerCase()) return false;
    if (bodyType && car.bodyType !== bodyType) return false;
    if (fuelType && car.fuelType !== fuelType) return false;
    if (transmission && car.transmission !== transmission) return false;
    if (condition && car.condition !== condition) return false;
    if (minPrice && car.price < minPrice) return false;
    if (maxPrice && car.price > maxPrice) return false;
    if (minYear && car.year < minYear) return false;
    if (maxYear && car.year > maxYear) return false;
    return true;
  });

  results = results.sort((a, b) => {
    switch (sort) {
      case "precio-asc":
        return a.price - b.price;
      case "precio-desc":
        return b.price - a.price;
      case "menor-km":
        return a.mileageKm - b.mileageKm;
      case "recientes":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const paged = results.slice(start, start + pageSize);

  return {
    data: paged.map(toSummary),
    meta: { page: currentPage, pageSize, total, totalPages },
  };
}
