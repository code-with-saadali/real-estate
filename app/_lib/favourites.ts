"use client";

import { useSyncExternalStore } from "react";

const key = "vistelya-favourites";
let fallback = "[]";
function snapshot() {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function subscribe(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener("favourites-change", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("favourites-change", notify);
  };
}
export function useFavourites() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  let saved: string[] = [];
  try {
    const value: unknown = JSON.parse(raw);
    if (Array.isArray(value)) saved = value.filter((item): item is string => typeof item === "string");
  } catch { /* Ignore damaged browser storage. */ }
  function toggle(slug: string) {
    fallback = JSON.stringify(saved.includes(slug) ? saved.filter((item) => item !== slug) : [...saved, slug]);
    try { localStorage.setItem(key, fallback); } catch { /* Keep working in memory if storage is unavailable. */ }
    window.dispatchEvent(new Event("favourites-change"));
  }
  return { saved, toggle };
}
