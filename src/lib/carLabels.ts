import type { BodyType, CarCondition, FuelType, Transmission } from "@/types/car";

export const bodyTypeLabels: Record<BodyType, string> = {
  sedan: "Sedán",
  suv: "SUV",
  hatchback: "Hatchback",
  pickup: "Pickup",
  coupe: "Coupé",
  van: "Van",
  convertible: "Convertible",
};

export const fuelTypeLabels: Record<FuelType, string> = {
  gasolina: "Gasolina",
  diesel: "Diésel",
  hibrido: "Híbrido",
  electrico: "Eléctrico",
  gas: "Gas",
};

export const transmissionLabels: Record<Transmission, string> = {
  manual: "Manual",
  automatica: "Automática",
};

export const conditionLabels: Record<CarCondition, string> = {
  nuevo: "Nuevo",
  usado: "Usado",
};

// Generic starter list — swap for a brands facet from the backend once available.
export const brandOptions = [
  "Toyota",
  "Honda",
  "Nissan",
  "Mazda",
  "Ford",
  "Chevrolet",
  "Volkswagen",
  "Kia",
  "Hyundai",
  "BMW",
  "Mercedes-Benz",
  "Audi",
];

export const sortLabels: Record<string, string> = {
  recientes: "Más recientes",
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  "menor-km": "Menor kilometraje",
};
