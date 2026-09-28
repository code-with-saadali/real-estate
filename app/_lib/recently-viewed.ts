"use client";

import { useSyncExternalStore } from "react";

const key = "vistelya-recently-viewed";
let memory = "[]";
let memoryOnly = false;
function snapshot() {
  if (memoryOnly) return memory;
  try { return localStorage.getItem(key) ?? "[]"; } catch { return memory; }
}
function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === "string"))].slice(0, 6) : [];
  } catch { return []; }
}
function subscribe(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener("recently-viewed-change", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("recently-viewed-change", notify);
  };
}
function write(slugs: string[]) {
  memory = JSON.stringify(slugs);
  try { localStorage.setItem(key, memory); memoryOnly = false; } catch { memoryOnly = true; }
  window.dispatchEvent(new Event("recently-viewed-change"));
}
export function recordViewed(slug: string) {
  write([slug, ...parse(snapshot()).filter((item) => item !== slug)].slice(0, 6));
}
export function useRecentlyViewed() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  return { viewed: parse(raw), clear: () => write([]) };
}
