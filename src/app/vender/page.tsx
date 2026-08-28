import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Vende tu auto",
  description:
    "Publica tu auto en Marketplace y llega a miles de compradores interesados. Crea tu anuncio en minutos.",
  alternates: { canonical: "/vender" },
};

const steps = [
  { title: "Crea tu anuncio", description: "Agrega fotos, especificaciones y el precio de tu vehículo." },
  { title: "Publícalo", description: "Tu auto aparece en las búsquedas de compradores verificados." },
  { title: "Vende con confianza", description: "Recibe contactos directos y cierra la venta a tu ritmo." },
];

export default function VenderPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Vende tu auto en Marketplace</h1>
        <p className="mt-4 text-slate-500">
          Llega a miles de compradores buscando su próximo vehículo. Publicar un anuncio es rápido, seguro y sin
          intermediarios.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="flex flex-col items-center text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {i + 1}
            </span>
            <h2 className="mt-3 text-sm font-semibold text-slate-900">{step.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-500">
          La publicación de anuncios estará disponible muy pronto. Déjanos tu contacto y te avisamos.
        </p>
        <a
          href="mailto:hola@marketplace.com"
          className="mt-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Contáctanos
        </a>
      </div>
    </Container>
  );
}
