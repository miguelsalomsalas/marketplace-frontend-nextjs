import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold text-blue-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">No encontramos esta página</h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        El auto o la página que buscas ya no está disponible. Explora otros vehículos publicados en Marketplace.
      </p>
      <Link
        href="/autos"
        className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Explorar autos
      </Link>
    </Container>
  );
}
