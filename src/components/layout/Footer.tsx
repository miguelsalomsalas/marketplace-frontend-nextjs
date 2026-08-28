import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "@/lib/config";

const columns = [
  {
    title: "Comprar",
    links: [
      { href: "/autos", label: "Explorar autos" },
      { href: "/autos?condition=nuevo", label: "Autos nuevos" },
      { href: "/autos?condition=usado", label: "Autos usados" },
    ],
  },
  {
    title: "Vender",
    links: [
      { href: "/vender", label: "Publicar un anuncio" },
      { href: "/vender", label: "Para concesionarios" },
    ],
  },
  {
    title: "Marketplace",
    links: [
      { href: "/", label: "Sobre nosotros" },
      { href: "/", label: "Confianza y seguridad" },
      { href: "/", label: "Contacto" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">
              M
            </span>
            {siteConfig.name}
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {siteConfig.description}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-slate-900">{col.title}</h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-slate-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-slate-200 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <p>Hecho para comprar y vender autos con confianza.</p>
        </Container>
      </div>
    </footer>
  );
}
