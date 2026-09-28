"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { FiArrowLeft, FiArrowRight, FiMaximize2, FiX } from "react-icons/fi";

export default function PropertyGallery({ title, images }: { title: string; images: string[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<number | null>(null);
  const lenis = useLenis();
  const move = (delta: number) => setIndex((current) => (current + delta + images.length) % images.length);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      lenis?.start();
    };
  }, [open, lenis]);
  return <>
    <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">{images.map((src, i) => <button key={`${src}-${i}`} type="button" aria-label={`View photo ${i + 1} of ${title}`} onClick={() => { setIndex(i); setOpen(true); }} className={`group relative overflow-hidden bg-[#d7d5cf] ${i === 0 ? "col-span-3 h-[62svh] min-h-80" : "aspect-[4/3]"}`}><Image src={`/images/vistelya/${src}.webp`} alt={`${title} — ${src}`} fill preload={i === 0} sizes={i === 0 ? "100vw" : "30vw"} className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />{i === 0 && <span className="font absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-[#fafaf7] px-4 py-3 text-xs"><FiMaximize2 aria-hidden="true" />View all {images.length} photos</span>}</button>)}</div>
    <dialog ref={dialog} aria-label={`${title} photo gallery`} onCancel={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-[#161615] p-4 text-white backdrop:bg-black/85 sm:p-8" data-lenis-prevent>
      {open && <div className="flex h-full flex-col gap-4"><div className="flex items-center justify-between gap-4"><p className="text-sm sm:text-xl">{title}</p><button type="button" aria-label="Close photo gallery" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25"><FiX aria-hidden="true" /></button></div><div className="relative min-h-0 flex-1 touch-pan-y" onTouchStart={(event) => { touch.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touch.current !== null) { const delta = event.changedTouches[0].clientX - touch.current; if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1); } touch.current = null; }}><Image src={`/images/vistelya/${images[index]}.webp`} alt={`${title} — ${images[index]}`} fill sizes="100vw" className="object-contain" /></div><div className="font flex items-center justify-between"><button type="button" aria-label="Previous photo" onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25"><FiArrowLeft aria-hidden="true" /></button><p aria-live="polite" className="text-xs">{index + 1} / {images.length}</p><button type="button" aria-label="Next photo" onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25"><FiArrowRight aria-hidden="true" /></button></div><div className="flex justify-center gap-2 pb-[env(safe-area-inset-bottom)]">{images.map((src, i) => <button key={`${src}-${i}`} type="button" aria-label={`Show photo ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)} className={`relative h-12 w-16 overflow-hidden rounded border-2 ${index === i ? "border-white" : "border-transparent opacity-50 hover:opacity-100"}`}><Image src={`/images/vistelya/${src}.webp`} alt="" fill sizes="64px" className="object-cover" /></button>)}</div></div>}
    </dialog>
  </>;
}
