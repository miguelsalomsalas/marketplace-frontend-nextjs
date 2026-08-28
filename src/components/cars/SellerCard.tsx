import type { CarSeller } from "@/types/car";
import { formatPrice } from "@/lib/format";

export function SellerCard({ seller, price, currency }: { seller: CarSeller; price: number; currency: string }) {
  return (
    <div className="sticky top-24 rounded-2xl border border-slate-200 p-6">
      <p className="text-3xl font-extrabold text-slate-900">{formatPrice(price, currency)}</p>

      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
          {seller.name.charAt(0)}
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
            {seller.name}
            {seller.verified && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                Verificado
              </span>
            )}
          </p>
          <p className="text-xs text-slate-500">
            {seller.type === "concesionario" ? "Concesionario" : "Vendedor particular"} · {seller.city}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <a
          href={seller.phone ? `tel:${seller.phone.replace(/\s+/g, "")}` : "#"}
          className="rounded-full bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Contactar al vendedor
        </a>
        <button
          type="button"
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Guardar auto
        </button>
      </div>
    </div>
  );
}
