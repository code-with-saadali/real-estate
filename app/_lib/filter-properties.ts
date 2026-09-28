import type { Property } from "./collection";

export function filterProperties(items: Property[], filters: { type?: string; area?: string; query?: string; beds?: string; sort?: string }) {
  const query = (filters.query ?? "").trim().toLowerCase();
  const results = items.filter((property) =>
    (!filters.type || filters.type === "all" || (filters.type === "luxury" ? property.luxury : property.type === filters.type)) &&
    (!filters.area || property.area === filters.area) &&
    (!filters.beds || property.bedrooms >= Number(filters.beds)) &&
    (!query || `${property.title} ${property.location} ${property.description} ${property.features.join(" ")}`.toLowerCase().includes(query))
  );
  if (filters.sort === "price-asc") results.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") results.sort((a, b) => b.price - a.price);
  if (filters.sort === "size") results.sort((a, b) => b.size - a.size);
  return results;
}
