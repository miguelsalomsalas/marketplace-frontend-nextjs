import Link from "next/link";
import type { CarSearchParams } from "@/types/car";
import {
  bodyTypeLabels,
  brandOptions,
  conditionLabels,
  fuelTypeLabels,
  sortLabels,
  transmissionLabels,
} from "@/lib/carLabels";

function Select({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
      >
        <option value="">Todos</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CarFilters({ searchParams }: { searchParams: CarSearchParams & { q?: string } }) {
  return (
    <form method="GET" action="/autos" className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-slate-700">Buscar</span>
        <input
          type="text"
          name="q"
          defaultValue={searchParams.q ?? ""}
          placeholder="Marca, modelo..."
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>

      <Select
        name="brand"
        label="Marca"
        defaultValue={searchParams.brand}
        options={brandOptions.map((b) => ({ value: b, label: b }))}
      />

      <Select
        name="bodyType"
        label="Carrocería"
        defaultValue={searchParams.bodyType}
        options={Object.entries(bodyTypeLabels).map(([value, label]) => ({ value, label }))}
      />

      <Select
        name="fuelType"
        label="Combustible"
        defaultValue={searchParams.fuelType}
        options={Object.entries(fuelTypeLabels).map(([value, label]) => ({ value, label }))}
      />

      <Select
        name="transmission"
        label="Transmisión"
        defaultValue={searchParams.transmission}
        options={Object.entries(transmissionLabels).map(([value, label]) => ({ value, label }))}
      />

      <Select
        name="condition"
        label="Condición"
        defaultValue={searchParams.condition}
        options={Object.entries(conditionLabels).map(([value, label]) => ({ value, label }))}
      />

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-slate-700">Precio mín.</span>
          <input
            type="number"
            name="minPrice"
            min={0}
            defaultValue={searchParams.minPrice ?? ""}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-slate-700">Precio máx.</span>
          <input
            type="number"
            name="maxPrice"
            min={0}
            defaultValue={searchParams.maxPrice ?? ""}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-slate-700">Año mín.</span>
          <input
            type="number"
            name="minYear"
            min={1980}
            defaultValue={searchParams.minYear ?? ""}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-slate-700">Año máx.</span>
          <input
            type="number"
            name="maxYear"
            min={1980}
            defaultValue={searchParams.maxYear ?? ""}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </label>
      </div>

      <Select
        name="sort"
        label="Ordenar por"
        defaultValue={searchParams.sort}
        options={Object.entries(sortLabels).map(([value, label]) => ({ value, label }))}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Aplicar filtros
        </button>
        <Link
          href="/autos"
          className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Limpiar
        </Link>
      </div>
    </form>
  );
}
