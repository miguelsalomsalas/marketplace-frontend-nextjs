import type { CarHistory } from "@/types/car";

function Row({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
          ok ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        }`}
      >
        {ok ? "✓" : "✕"}
      </span>
      <span className="text-slate-700">{label}</span>
    </li>
  );
}

export function CarHistoryCard({ history }: { history: CarHistory }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <h2 className="text-base font-semibold text-slate-900">Historial del vehículo</h2>
      <ul className="mt-3 space-y-2.5">
        <Row ok={history.accidentFree} label="Sin reporte de accidentes" />
        <Row ok={history.serviceRecords} label="Historial de mantenimiento disponible" />
        <li className="flex items-center gap-2 text-sm text-slate-700">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600">
            {history.ownersCount}
          </span>
          {history.ownersCount === 1 ? "Único dueño" : `${history.ownersCount} dueños anteriores`}
        </li>
        {history.originCountry && (
          <li className="text-sm text-slate-500">Origen: {history.originCountry}</li>
        )}
      </ul>
    </div>
  );
}
