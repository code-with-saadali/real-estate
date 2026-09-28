export const areas = [
  { slug: "lake-geneva", name: "Lake Geneva", image: "terrace", mood: "Life by the water", description: "Open lake views, generous terraces, and homes with a little more room to breathe." },
  { slug: "ticino", name: "Ticino", image: "garden", mood: "A softer rhythm", description: "Stone courtyards, leafy gardens, and a warm connection between indoors and out." },
  { slug: "alpine", name: "The Alps", image: "estate", mood: "A different perspective", description: "Mountain horizons, quiet surroundings, and spaces made for a slower kind of living." },
];

export type Property = {
  slug: string; title: string; area: string; location: string; image: string;
  gallery: string[]; type: "sale" | "rent" | "new"; luxury: boolean;
  price: number; bedrooms: number; bathrooms: number; size: number; description: string; features: string[];
};

// Illustrative inventory only. Replace with verified listings before launch.
export const properties: Property[] = [
  { slug: "the-lake-house", title: "The Lake House", area: "lake-geneva", location: "Lake Geneva", image: "villa", gallery: ["living", "terrace", "suite"], type: "sale", luxury: true, price: 4850000, bedrooms: 4, bathrooms: 4, size: 340, description: "An open, light-filled residence imagined around the water. Natural stone, generous glazing, and a private pool create a seamless connection to the landscape.", features: ["Lake-facing terrace", "Private pool", "Four bedroom suites", "Natural stone finishes"] },
  { slug: "the-garden-residence", title: "The Garden Residence", area: "ticino", location: "Ticino", image: "garden", gallery: ["courtyard", "dining", "kitchen"], type: "sale", luxury: false, price: 2950000, bedrooms: 3, bathrooms: 3, size: 265, description: "A secluded garden setting with considered spaces for everyday life. Soft textures and leafy outlooks bring a sense of calm to each room.", features: ["Landscaped garden", "Covered outdoor dining", "Private courtyard", "Open-plan living"] },
  { slug: "alpine-horizon", title: "Alpine Horizon", area: "alpine", location: "The Alps", image: "estate", gallery: ["suite", "living", "terrace"], type: "new", luxury: true, price: 6200000, bedrooms: 5, bathrooms: 5, size: 420, description: "An architectural concept framed by mountain views. Layered stone volumes, broad terraces, and inviting interiors offer a fresh perspective on alpine living.", features: ["Mountain panorama", "Terraced gardens", "Five bedroom suites", "Contemporary architecture"] },
  { slug: "the-lakeside-suite", title: "The Lakeside Suite", area: "lake-geneva", location: "Lake Geneva", image: "suite", gallery: ["living", "dining", "terrace"], type: "rent", luxury: true, price: 8500, bedrooms: 2, bathrooms: 2, size: 165, description: "A thoughtfully furnished lakeside home with quiet corners and open views. A refined base for a more unhurried everyday rhythm.", features: ["Furnished interiors", "Private balcony", "Lake outlook", "Two bedroom suites"] },
  { slug: "courtyard-house", title: "Courtyard House", area: "ticino", location: "Ticino", image: "courtyard", gallery: ["kitchen", "garden", "suite"], type: "new", luxury: false, price: 3250000, bedrooms: 3, bathrooms: 3, size: 280, description: "A home arranged around a peaceful courtyard. Stone, greenery, and reflecting water form the heart of this considered residential concept.", features: ["Central courtyard", "Reflecting pool", "Natural materials", "Private garden"] },
  { slug: "the-mountain-retreat", title: "The Mountain Retreat", area: "alpine", location: "The Alps", image: "living", gallery: ["suite", "dining", "estate"], type: "rent", luxury: false, price: 6200, bedrooms: 3, bathrooms: 2, size: 210, description: "Warm interiors and expansive windows create an inviting retreat. A place for shared evenings, long mornings, and the quiet of the mountains.", features: ["Mountain views", "Generous living room", "Furnished residence", "Private terrace"] },
];

export const advisors = [
  { slug: "alex-morel", name: "Alex Morel", initials: "AM", role: "Residential advisor", area: "Lake Geneva", languages: "English / French", image: "terrace", description: "A considered approach to lakeside homes, with an eye for natural light, setting, and the details of everyday living." },
  { slug: "camille-laurent", name: "Camille Laurent", initials: "CL", role: "Property & lifestyle advisor", area: "Ticino", languages: "English / Italian", image: "garden", description: "A perspective shaped by architecture, outdoor spaces, and the connection between a home and its surroundings." },
  { slug: "luca-meyer", name: "Luca Meyer", initials: "LM", role: "Alpine collection advisor", area: "The Alps", languages: "English / German", image: "estate", description: "A focus on mountain retreats and thoughtfully designed spaces for a quieter, more personal way of living." },
];

export function priceLabel(property: Property) {
  // ICU versions in Node and browsers can use different Swiss grouping marks.
  const price = new Intl.NumberFormat("en-CH").formatToParts(property.price)
    .map((part) => part.type === "group" ? "\u2019" : part.value).join("");
  return `CHF ${price}${property.type === "rent" ? " / month" : ""}`;
}

export const typeLabels = { sale: "For sale", rent: "For rent", new: "New development" };
