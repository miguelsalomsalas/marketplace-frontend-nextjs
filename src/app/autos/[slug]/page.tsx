import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CarGallery } from "@/components/cars/CarGallery";
import { CarSpecs } from "@/components/cars/CarSpecs";
import { CarHistoryCard } from "@/components/cars/CarHistoryCard";
import { SellerCard } from "@/components/cars/SellerCard";
import { getCarBySlug } from "@/lib/api/cars";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: PageProps<"/autos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    return { title: "Auto no encontrado" };
  }

  const title = `${car.title} en venta`;
  const description = `${car.title} · ${car.year} · ${car.mileageKm.toLocaleString("es-CL")} km · ${car.city}, ${car.country}. ${car.description}`.slice(0, 160);
  const image = car.images[0]?.url;

  return {
    title,
    description,
    alternates: { canonical: `/autos/${car.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/autos/${car.slug}`,
      images: image ? [{ url: image, width: 1200, height: 800, alt: car.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function CarDetailPage({
  params,
}: PageProps<"/autos/[slug]">) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: car.title,
    description: car.description,
    image: car.images.map((img) => img.url),
    brand: { "@type": "Brand", name: car.brand },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.mileageKm,
      unitCode: "KMT",
    },
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission,
    color: car.color,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: car.currency,
      availability: "https://schema.org/InStock",
      itemCondition:
        car.condition === "nuevo"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
      url: `${siteConfig.url}/autos/${car.slug}`,
    },
  };

  return (
    <Container className="py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <nav className="mb-4 text-xs text-slate-500">
        <Link href="/autos" className="hover:text-slate-700">
          Autos
        </Link>{" "}
        / <span className="text-slate-700">{car.title}</span>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{car.title}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {car.city}, {car.country}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <CarGallery images={car.images} title={car.title} />

          <div className="mt-8">
            <h2 className="text-base font-semibold text-slate-900">Especificaciones</h2>
            <div className="mt-3">
              <CarSpecs car={car} />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-base font-semibold text-slate-900">Descripción</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{car.description}</p>
          </div>

          {car.features.length > 0 && (
            <div className="mt-8">
              <h2 className="text-base font-semibold text-slate-900">Equipamiento</h2>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {car.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <CarHistoryCard history={car.history} />
          </div>
        </div>

        <div>
          <SellerCard seller={car.seller} price={car.price} currency={car.currency} />
        </div>
      </div>
    </Container>
  );
}
