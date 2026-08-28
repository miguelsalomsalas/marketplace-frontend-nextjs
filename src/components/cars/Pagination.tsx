import Link from "next/link";
import type { PaginationMeta } from "@/types/car";

function buildHref(searchParams: Record<string, string | undefined>, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value && key !== "page") params.set(key, value);
  }
  params.set("page", String(page));
  return `/autos?${params.toString()}`;
}

export function Pagination({
  meta,
  searchParams,
}: {
  meta: PaginationMeta;
  searchParams: Record<string, string | undefined>;
}) {
  if (meta.totalPages <= 1) return null;

  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === meta.totalPages || Math.abs(p - meta.page) <= 1
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Paginación">
      <Link
        href={buildHref(searchParams, Math.max(1, meta.page - 1))}
        aria-disabled={meta.page === 1}
        className={`rounded-md px-3 py-2 text-sm font-medium ${
          meta.page === 1
            ? "pointer-events-none text-slate-300"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        Anterior
      </Link>

      {pages.map((page, idx) => {
        const prevPage = pages[idx - 1];
        const showEllipsis = prevPage !== undefined && page - prevPage > 1;
        return (
          <span key={page} className="flex items-center gap-1">
            {showEllipsis && <span className="px-1 text-slate-400">…</span>}
            <Link
              href={buildHref(searchParams, page)}
              className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                page === meta.page
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </Link>
          </span>
        );
      })}

      <Link
        href={buildHref(searchParams, Math.min(meta.totalPages, meta.page + 1))}
        aria-disabled={meta.page === meta.totalPages}
        className={`rounded-md px-3 py-2 text-sm font-medium ${
          meta.page === meta.totalPages
            ? "pointer-events-none text-slate-300"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        Siguiente
      </Link>
    </nav>
  );
}
