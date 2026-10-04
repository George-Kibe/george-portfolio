// Pricing for the "Get a quote" builder (/quote).
//
// PLACEHOLDER RATES: every number below is a starting point for George to
// adjust, not a published price list. Ranges are in USD. Change them here;
// the builder, the emailed summary and the tests all read from this file.

export const CURRENCY = "USD";

export const PROJECT_TYPES = [
  { id: "website", label: "Website or landing page", blurb: "A marketing site, portfolio or company website.", price: [400, 1200], weeks: [1, 3] },
  { id: "webapp", label: "Web application", blurb: "Accounts, dashboards and data behind a login.", price: [2000, 6000], weeks: [4, 10] },
  { id: "mobile", label: "Mobile app", blurb: "One React Native app for iOS and Android.", price: [3000, 8000], weeks: [6, 12] },
  { id: "webmobile", label: "Web + mobile app", blurb: "A web app and mobile apps sharing one backend.", price: [4500, 12000], weeks: [8, 16] },
  { id: "data", label: "Data engineering", blurb: "Pipelines, ETL, warehousing and reporting.", price: [1500, 5000], weeks: [3, 8] },
  { id: "automation", label: "Automation & AI workflows", blurb: "n8n, AI agents and the boring stuff, automated.", price: [500, 2500], weeks: [1, 4] },
];

const APPS = ["webapp", "mobile", "webmobile"];
const MOBILE = ["mobile", "webmobile"];

// `for` limits a feature to the project types where it makes sense.
export const FEATURES = [
  { id: "auth", label: "User accounts & login", price: [300, 700], for: APPS },
  { id: "payments", label: "Online payments (Stripe)", price: [400, 900], for: ["website", ...APPS] },
  { id: "admin", label: "Admin dashboard", price: [600, 1500], for: [...APPS, "data"] },
  { id: "cms", label: "Blog or content management", price: [300, 800], for: ["website", "webapp", "webmobile"] },
  { id: "chat", label: "Real-time chat or messaging", price: [700, 1600], for: APPS },
  { id: "maps", label: "Maps & location", price: [300, 800], for: APPS },
  { id: "push", label: "Push notifications", price: [200, 500], for: MOBILE },
  { id: "stores", label: "App Store & Google Play publishing", price: [300, 600], for: MOBILE },
  { id: "ai", label: "AI features (chatbot, LLM integration)", price: [600, 2000], for: ["website", ...APPS, "automation"] },
  { id: "integrations", label: "Third-party API integrations", price: [300, 900], for: PROJECT_TYPES.map((t) => t.id) },
  { id: "analytics", label: "Reports & analytics dashboards", price: [500, 1500], for: ["webapp", "webmobile", "data"] },
];

export const SIZES = [
  { id: "small", label: "Small", blurb: "A few pages or screens, one main flow.", factor: 0.8 },
  { id: "medium", label: "Medium", blurb: "Several flows and user roles.", factor: 1 },
  { id: "large", label: "Large", blurb: "Many screens, roles and integrations.", factor: 1.6 },
];

export const DESIGN = [
  { id: "have", label: "I have designs", blurb: "Figma or similar, ready to build.", share: 0 },
  { id: "need", label: "Design it for me", blurb: "UI/UX design before the build.", share: 0.15 },
];

export const TIMELINES = [
  { id: "flexible", label: "Flexible", blurb: "No fixed deadline.", factor: 1, weeks: 1.15 },
  { id: "standard", label: "Standard", blurb: "A normal, steady schedule.", factor: 1, weeks: 1 },
  { id: "rush", label: "Rush", blurb: "Priority scheduling, +25%.", factor: 1.25, weeks: 0.75 },
];

export const DEFAULT_SELECTION = {
  type: "webapp",
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
    items.push({ label: "UI/UX design", low: base.low * design.share, high: base.high * design.share });
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

// Plain-text summary for the email George receives.
export function quoteSummary(estimate, { name, email, company, details, reference }) {
  const lines = [
    `Quote request ${reference}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    `Project: ${estimate.type.label}`,
    `Size: ${estimate.size.label}`,
    `Design: ${estimate.design.label}`,
    `Timeline: ${estimate.timeline.label}`,
    `Features: ${estimate.features.map((f) => f.label).join(", ") || "None selected"}`,
    "",
    "Breakdown:",
    ...estimate.items.map((i) => `  - ${i.label}: ${formatMoney(i.low)} – ${formatMoney(i.high)}`),
    "",
    `Estimate: ${formatMoney(estimate.low)} – ${formatMoney(estimate.high)}`,
    `Duration: ${estimate.weeks[0]}–${estimate.weeks[1]} weeks`,
    "",
    "Project details:",
    details || "(none given)",
  ];
  return lines.filter((l) => l !== null).join("\n");
}

// Short, human-readable reference, e.g. Q-261005-4K7P.
export function makeReference(date = new Date(), random = Math.random) {
  const ymd = date.toISOString().slice(2, 10).replace(/-/g, "");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const tail = Array.from({ length: 4 }, () => chars[Math.floor(random() * chars.length)]).join("");
  return `Q-${ymd}-${tail}`;
}
