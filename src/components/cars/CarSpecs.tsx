import type { Car } from "@/types/car";
import { formatMileage } from "@/lib/format";
import { bodyTypeLabels, conditionLabels, fuelTypeLabels, transmissionLabels } from "@/lib/carLabels";

export function CarSpecs({ car }: { car: Car }) {
  const specs = [
    { label: "Año", value: String(car.year) },
    { label: "Kilometraje", value: formatMileage(car.mileageKm) },
    { label: "Transmisión", value: transmissionLabels[car.transmission] },
    { label: "Combustible", value: fuelTypeLabels[car.fuelType] },
    { label: "Carrocería", value: bodyTypeLabels[car.bodyType] },
    { label: "Condición", value: conditionLabels[car.condition] },
    { label: "Color", value: car.color },
    { label: "Ubicación", value: `${car.city}, ${car.country}` },
  ];

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
      {specs.map((spec) => (
        <div key={spec.label}>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{spec.label}</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-900">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
