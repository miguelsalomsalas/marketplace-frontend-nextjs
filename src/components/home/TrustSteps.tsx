import { Container } from "@/components/layout/Container";

const steps = [
  {
    title: "Busca",
    description: "Filtra entre miles de vehículos por marca, precio, año y más hasta encontrar el ideal para ti.",
  },
  {
    title: "Revisa el historial",
    description: "Consulta el historial de propietarios, accidentes y mantenimiento antes de decidir.",
  },
  {
    title: "Compra con confianza",
    description: "Contacta directamente al vendedor y cierra tu compra sabiendo exactamente qué estás llevando.",
  },
];

export function TrustSteps() {
  return (
    <section className="bg-white py-16">
      <Container>
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Comprar un auto nunca fue tan simple
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
