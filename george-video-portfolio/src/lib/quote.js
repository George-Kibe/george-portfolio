// Pricing for the "Get a quote" builder (/quote).
//
// The public form asks for type, features and timeline only; length and
// footage prep stay at their defaults (standard, footage ready) but remain
// supported so the rates can be tuned without touching the form.
//
// PLACEHOLDER RATES: every number below is a starting point for George to
// adjust, not a published price list. Ranges are in USD. Change them here;
// the builder, the emailed summary and the tests all read from this file.

export const CURRENCY = "USD";

export const PROJECT_TYPES = [
  { id: "social", label: "Reels & short-form", blurb: "TikTok, Reels and Shorts, edited to hold attention.", price: [80, 300], weeks: [1, 1] },
  { id: "youtube", label: "YouTube video", blurb: "Long-form edits with pacing, B-roll and graphics.", price: [150, 600], weeks: [1, 2] },
  { id: "commercial", label: "Commercial or ad", blurb: "Product and brand spots for web, TV or social.", price: [400, 1500], weeks: [1, 3] },
  { id: "music", label: "Music video", blurb: "Rhythm-driven cuts, effects and a cinematic grade.", price: [400, 1800], weeks: [2, 4] },
  { id: "corporate", label: "Corporate or brand film", blurb: "Company stories, explainers and training videos.", price: [500, 2000], weeks: [2, 4] },
  { id: "event", label: "Wedding or event film", blurb: "Highlights and full-length films of the day.", price: [400, 1500], weeks: [2, 4] },
  { id: "documentary", label: "Documentary", blurb: "Story-led editing across hours of footage.", price: [1500, 6000], weeks: [4, 10] },
];

const ALL = ["social", "youtube", "commercial", "music", "corporate", "event", "documentary"];
const LONG = ["youtube", "corporate", "event", "documentary"];

// `for` limits a feature to the project types where it makes sense.
export const FEATURES = [
  { id: "grading", label: "Colour grading", price: [100, 600], for: ALL },
  { id: "motion", label: "Motion graphics & titles", price: [150, 800], for: ALL },
  { id: "sound", label: "Sound design & mixing", price: [100, 500], for: ALL },
  { id: "captions", label: "Captions or subtitles", price: [50, 250], for: ALL },
  { id: "formats", label: "Extra formats (vertical, square)", price: [80, 300], for: ALL },
  { id: "thumbnail", label: "Thumbnail or cover design", price: [30, 120], for: ["social", "youtube", "music"] },
  { id: "music", label: "Licensed music & stock footage sourcing", price: [50, 300], for: ALL },
  { id: "multicam", label: "Multi-camera editing", price: [150, 700], for: ["music", "corporate", "event", "documentary"] },
  { id: "story", label: "Script or story structure help", price: [150, 800], for: LONG },
];

export const SIZES = [
  { id: "small", label: "Short", blurb: "Under a minute of finished video.", factor: 0.8 },
  { id: "medium", label: "Standard", blurb: "A typical length for the format.", factor: 1 },
  { id: "large", label: "Long", blurb: "Well beyond the usual length.", factor: 1.6 },
];

export const DESIGN = [
  { id: "have", label: "Footage is ready", blurb: "Everything is shot and organised.", share: 0 },
  { id: "need", label: "Help organising footage", blurb: "Logging, syncing and selects first.", share: 0.15 },
];

export const TIMELINES = [
  { id: "flexible", label: "Flexible", blurb: "No fixed deadline.", factor: 1, weeks: 1.15 },
  { id: "standard", label: "Standard", blurb: "A normal, steady schedule.", factor: 1, weeks: 1 },
  { id: "rush", label: "Rush", blurb: "Priority scheduling, +25%.", factor: 1.25, weeks: 0.75 },
];

export const DEFAULT_SELECTION = {
  type: "youtube",
  features: [],
  size: "medium",
  design: "have",
  timeline: "standard",
};

const byId = (list, id) => list.find((item) => item.id === id);
const round50 = (n) => Math.round(n / 50) * 50;

export const featuresFor = (typeId) => FEATURES.filter((f) => f.for.includes(typeId));

// Pure: selection in, estimate out. Unknown ids fall back to the defaults so a
// stale or hand-edited selection can never produce NaN.
export function estimateQuote(selection) {
  const type = byId(PROJECT_TYPES, selection.type) ?? byId(PROJECT_TYPES, DEFAULT_SELECTION.type);
  const size = byId(SIZES, selection.size) ?? byId(SIZES, DEFAULT_SELECTION.size);
  const design = byId(DESIGN, selection.design) ?? byId(DESIGN, DEFAULT_SELECTION.design);
  const timeline = byId(TIMELINES, selection.timeline) ?? byId(TIMELINES, DEFAULT_SELECTION.timeline);
  const features = featuresFor(type.id).filter((f) => selection.features?.includes(f.id));

  const items = [
    { label: `${type.label} (${size.label.toLowerCase()})`, low: type.price[0] * size.factor, high: type.price[1] * size.factor },
    ...features.map((f) => ({ label: f.label, low: f.price[0], high: f.price[1] })),
  ];

  const base = items.reduce((sum, i) => ({ low: sum.low + i.low, high: sum.high + i.high }), { low: 0, high: 0 });
  if (design.share) {
    items.push({ label: "Footage preparation", low: base.low * design.share, high: base.high * design.share });
  }
  if (timeline.factor !== 1) {
    const subtotal = items.reduce((sum, i) => ({ low: sum.low + i.low, high: sum.high + i.high }), { low: 0, high: 0 });
    items.push({
      label: `${timeline.label} timeline`,
      low: subtotal.low * (timeline.factor - 1),
      high: subtotal.high * (timeline.factor - 1),
    });
  }

  const rounded = items.map((i) => ({ ...i, low: round50(i.low), high: round50(i.high) }));
  const low = rounded.reduce((sum, i) => sum + i.low, 0);
  const high = rounded.reduce((sum, i) => sum + i.high, 0);

  // Each feature adds roughly half a week; size and timeline stretch the rest.
  const extraWeeks = features.length * 0.5;
  const weeks = [
    Math.max(1, Math.round((type.weeks[0] * size.factor + extraWeeks) * timeline.weeks)),
    Math.max(1, Math.round((type.weeks[1] * size.factor + extraWeeks) * timeline.weeks)),
  ];

  return { items: rounded, low, high, weeks, type, size, design, timeline, features };
}

export const formatMoney = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: CURRENCY, maximumFractionDigits: 0 }).format(n);

// Short, human-readable reference, e.g. Q-261005-4K7P.
export function makeReference(date = new Date(), random = Math.random) {
  const ymd = date.toISOString().slice(2, 10).replace(/-/g, "");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const tail = Array.from({ length: 4 }, () => chars[Math.floor(random() * chars.length)]).join("");
  return `Q-${ymd}-${tail}`;
}
