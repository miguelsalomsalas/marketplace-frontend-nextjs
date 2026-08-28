import { Container } from "@/components/layout/Container";
import { brandOptions } from "@/lib/carLabels";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.5), transparent 40%), radial-gradient(circle at 80% 0%, rgba(37,99,235,0.35), transparent 45%)",
        }}
      />
      <Container className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Encuentra tu próximo auto con confianza
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Miles de vehículos verificados, con historial revisado y vendedores confiables.
          </p>
        </div>

        <form
          method="GET"
          action="/autos"
          className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row"
        >
          <input
            type="text"
            name="q"
            placeholder="Busca por marca o modelo, ej. Toyota Corolla"
            className="flex-1 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
          />
          <select
            name="brand"
            defaultValue=""
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none sm:w-48"
          >
            <option value="">Todas las marcas</option>
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Buscar autos
          </button>
        </form>
      </Container>
    </section>
  );
}
