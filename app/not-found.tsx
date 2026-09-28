import { ActionLink } from "./_components/PageElements";
export default function NotFound() {
  return (
    <main className="site-shell flex min-h-[80svh] flex-col items-center justify-center gap-7 py-36 text-center">
      <p className="font text-xs text-black/50">404 / A different direction</p>
      <h1 className="text-5xl sm:text-7xl">Not quite home.</h1>
      <p className="font max-w-md text-sm text-black/60">
        This page could not be found. Let’s take you back to the collection.
      </p>
      <ActionLink href="/properties">Explore properties</ActionLink>
    </main>
  );
}
