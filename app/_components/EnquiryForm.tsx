"use client";

import { useState, type FormEvent } from "react";
import { FiArrowUpRight, FiDownload, FiCheck } from "react-icons/fi";
import { advisors, properties, areas } from "../_lib/collection";

const fieldClass = "form-field mt-2";

export default function EnquiryForm({ propertySlug = "", advisorSlug = "", intent = "buy" }: { propertySlug?: string; advisorSlug?: string; intent?: string }) {
  const [draft, setDraft] = useState("");
  const property = properties.find((item) => item.slug === propertySlug);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selectedProperty = properties.find((item) => item.slug === data.get("property"));
    const advisor = advisors.find((item) => item.slug === data.get("advisor"));
    const lines = ["VISTELYA — ENQUIRY DRAFT", "This draft has not been sent.", "", `Name: ${data.get("name")}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone") || "Not provided"}`, `Interest: ${data.get("intent")}`, `Area: ${data.get("area") || "Open to suggestions"}`, `Property: ${selectedProperty?.title ?? "Not selected"}`, `Advisor: ${advisor?.name ?? "No preference"}`, "", String(data.get("message") ?? "")];
    setDraft(lines.join("\n"));
  }

  function download() {
    const url = URL.createObjectURL(new Blob([draft], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "vistelya-enquiry.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <form onSubmit={prepare} onChange={() => { if (draft) setDraft(""); }} className="font" aria-label="Prepare an enquiry">
    <p className="mb-7 border-l-2 border-[#8A7045] pl-4 text-xs leading-relaxed text-black/60">Preview mode: prepare and download an enquiry draft. Nothing is sent or uploaded.</p>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-xs">Full name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} className={fieldClass} /></label>
      <label className="text-xs">Email address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={200} className={fieldClass} /></label>
      <label className="text-xs">Phone <span className="text-black/45">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} className={fieldClass} /></label>
      <label className="text-xs">I’m interested in<select name="intent" defaultValue={intent} className="custom-select mt-2"><option value="buy">Buying a home</option><option value="rent">Renting a home</option><option value="list">Listing a property</option><option value="general">A general conversation</option></select></label>
      <label className="text-xs">Preferred area<select name="area" defaultValue={property?.location ?? ""} className="custom-select mt-2"><option value="">Open to suggestions</option>{areas.map((area) => <option key={area.slug} value={area.name}>{area.name}</option>)}</select></label>
      <label className="text-xs">Preferred advisor<select name="advisor" defaultValue={advisorSlug} className="custom-select mt-2"><option value="">No preference</option>{advisors.map((advisor) => <option key={advisor.slug} value={advisor.slug}>{advisor.name} (sample)</option>)}</select></label>
      <label className="text-xs sm:col-span-2">A home from the collection<select name="property" defaultValue={propertySlug} className="custom-select mt-2"><option value="">No particular property</option>{properties.map((item) => <option key={item.slug} value={item.slug}>{item.title} (sample)</option>)}</select></label>
      <label className="text-xs sm:col-span-2">Tell us a little more <span aria-hidden="true">*</span><textarea name="message" required minLength={10} maxLength={3000} rows={5} defaultValue={property ? `I would like to learn more about ${property.title}.` : ""} placeholder="The setting you love, the space you need, and what matters most to you." className={`${fieldClass} resize-y leading-relaxed`} /></label>
    </div>
    <p className="mt-4 text-[10px] text-black/50">* Required fields. Your details stay in this browser until you choose to download the draft.</p>
    <button type="submit" className="group mt-7 inline-flex items-center gap-3 bg-[#1C1C1A] px-6 py-4 text-xs text-white hover:bg-black">Prepare enquiry<FiArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
    {draft && <div className="mt-7 border border-[#8A7045]/40 p-5"><p role="status" className="flex items-center gap-3 text-sm"><FiCheck aria-hidden="true" />Your draft is ready. It has not been sent.</p><p className="mt-3 text-xs leading-relaxed text-black/60">Download a copy to keep your preferences together.</p><button type="button" onClick={download} className="mt-4 flex items-center gap-2 border-b border-black/40 pb-1 text-xs"><FiDownload aria-hidden="true" />Download enquiry draft</button></div>}
  </form>;
}
