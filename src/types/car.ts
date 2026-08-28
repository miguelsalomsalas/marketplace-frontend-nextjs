export type FuelType =
  | "gasolina"
  | "diesel"
  | "hibrido"
  | "electrico"
  | "gas";

export type Transmission = "manual" | "automatica";

export type BodyType =
  | "sedan"
  | "suv"
  | "hatchback"
  | "pickup"
  | "coupe"
  | "van"
  | "convertible";

export type CarCondition = "nuevo" | "usado";

export interface CarImage {
  url: string;
  alt: string;
}

export interface CarSeller {
  id: string;
  name: string;
  type: "concesionario" | "particular";
  verified: boolean;
  phone?: string;
  city: string;
}

export interface CarHistory {
  ownersCount: number;
  accidentFree: boolean;
  serviceRecords: boolean;
  originCountry?: string;
}

export interface Car {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileageKm: number;
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  condition: CarCondition;
  color: string;
  description: string;
  features: string[];
  images: CarImage[];
  seller: CarSeller;
  history: CarHistory;
  city: string;
  country: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CarSummary = Pick<
  Car,
  | "id"
  | "slug"
  | "title"
  | "brand"
  | "model"
  | "year"
  | "price"
  | "currency"
  | "mileageKm"
  | "transmission"
  | "fuelType"
  | "bodyType"
  | "condition"
  | "city"
  | "country"
  | "images"
  | "featured"
>;

export interface CarSearchParams {
  q?: string;
  brand?: string;
  bodyType?: BodyType;
  fuelType?: FuelType;
  transmission?: Transmission;
  condition?: CarCondition;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  sort?: "recientes" | "precio-asc" | "precio-desc" | "menor-km";
  page?: number;
  pageSize?: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface CarListResponse {
  data: CarSummary[];
  meta: PaginationMeta;
}
