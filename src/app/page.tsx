import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/home/Hero";
import { TrustSteps } from "@/components/home/TrustSteps";
import { CarGrid } from "@/components/cars/CarGrid";
import { getFeaturedCars } from "@/lib/api/cars";

export default async function Home() {
  const featuredCars = await getFeaturedCars(8);

  return (
    <>
      <Hero />
      <TrustSteps />

      <section className="bg-slate-50 py-16">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Autos destacados</h2>
              <p className="mt-1 text-sm text-slate-500">Selección de vehículos verificados publicados recientemente.</p>
            </div>
            <Link href="/autos" className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block">
              Ver todos →
            </Link>
          </div>

          <div className="mt-8">
            <CarGrid cars={featuredCars} />
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/autos" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Ver todos los autos →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
