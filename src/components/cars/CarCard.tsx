import Image from "next/image";
import Link from "next/link";
import type { CarSummary } from "@/types/car";
import { formatMileage, formatPrice } from "@/lib/format";
import { transmissionLabels } from "@/lib/carLabels";

export function CarCard({ car }: { car: CarSummary }) {
  const cover = car.images[0];

  return (
    <Link
      href={`/autos/${car.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {cover && (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {car.condition === "nuevo" && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
            Nuevo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-lg font-bold text-slate-900">{formatPrice(car.price, car.currency)}</p>
        <h3 className="line-clamp-2 text-sm font-medium text-slate-700">{car.title}</h3>

        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>{car.year}</span>
          <span>·</span>
          <span>{formatMileage(car.mileageKm)}</span>
          <span>·</span>
          <span>{transmissionLabels[car.transmission]}</span>
        </div>

        <p className="mt-2 text-xs text-slate-400">{car.city}, {car.country}</p>
      </div>
    </Link>
  );
}
