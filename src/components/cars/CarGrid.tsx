import type { CarSummary } from "@/types/car";
import { CarCard } from "./CarCard";

export function CarGrid({ cars }: { cars: CarSummary[] }) {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-20 text-center">
        <p className="text-lg font-semibold text-slate-700">No encontramos autos con esos filtros</p>
        <p className="mt-1 text-sm text-slate-500">Intenta ajustar tu búsqueda o quitar algunos filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
