import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { CarFilters } from "@/components/cars/CarFilters";
import { CarGrid } from "@/components/cars/CarGrid";
import { Pagination } from "@/components/cars/Pagination";
import { getCars } from "@/lib/api/cars";
import { bodyTypeLabels } from "@/lib/carLabels";
import type { BodyType, CarCondition, FuelType, Transmission } from "@/types/car";

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseSearchParams(sp: SearchParams) {
  return {
    q: first(sp.q),
    brand: first(sp.brand),
    bodyType: first(sp.bodyType) as BodyType | undefined,
    fuelType: first(sp.fuelType) as FuelType | undefined,
    transmission: first(sp.transmission) as Transmission | undefined,
    condition: first(sp.condition) as CarCondition | undefined,
    minPrice: first(sp.minPrice) ? Number(first(sp.minPrice)) : undefined,
    maxPrice: first(sp.maxPrice) ? Number(first(sp.maxPrice)) : undefined,
    minYear: first(sp.minYear) ? Number(first(sp.minYear)) : undefined,
    maxYear: first(sp.maxYear) ? Number(first(sp.maxYear)) : undefined,
    sort: first(sp.sort) as
      | "recientes"
      | "precio-asc"
      | "precio-desc"
      | "menor-km"
      | undefined,
    page: first(sp.page) ? Number(first(sp.page)) : 1,
  };
}

export async function generateMetadata({
  searchParams,
}: PageProps<"/autos">): Promise<Metadata> {
  const sp = await searchParams;
  const parsed = parseSearchParams(sp);

  const parts: string[] = [];
  if (parsed.brand) parts.push(parsed.brand);
  if (parsed.bodyType) parts.push(bodyTypeLabels[parsed.bodyType]);
  parts.push(parsed.condition === "nuevo" ? "nuevos" : "en venta");

  const title = `Autos ${parts.join(" ")}`;
  const description = parsed.brand
    ? `Encuentra autos ${parsed.brand} en venta con historial verificado en Marketplace.`
    : "Explora miles de autos verificados en venta: filtra por marca, precio, año y más.";

  return {
    title,
    description,
    alternates: { canonical: "/autos" },
    openGraph: { title, description },
  };
}

export default async function AutosPage({ searchParams }: PageProps<"/autos">) {
  const sp = await searchParams;
  const parsed = parseSearchParams(sp);
  const { data: cars, meta } = await getCars(parsed);

  const searchParamsForLinks: Record<string, string | undefined> = {
    q: parsed.q,
    brand: parsed.brand,
    bodyType: parsed.bodyType,
    fuelType: parsed.fuelType,
    transmission: parsed.transmission,
    condition: parsed.condition,
    minPrice: parsed.minPrice?.toString(),
    maxPrice: parsed.maxPrice?.toString(),
    minYear: parsed.minYear?.toString(),
    maxYear: parsed.maxYear?.toString(),
    sort: parsed.sort,
  };

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Explorar autos</h1>
        <p className="mt-1 text-sm text-slate-500">
          {meta.total} {meta.total === 1 ? "auto encontrado" : "autos encontrados"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <CarFilters searchParams={parsed} />
        </aside>

        <div>
          <CarGrid cars={cars} />
          <Pagination meta={meta} searchParams={searchParamsForLinks} />
        </div>
      </div>
    </Container>
  );
}
