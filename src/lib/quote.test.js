import { describe, it, expect } from "vitest";
import {
  DEFAULT_SELECTION,
  estimateQuote,
  featuresFor,
  makeReference,
  quoteSummary,
} from "./quote";

const quote = (overrides) => estimateQuote({ ...DEFAULT_SELECTION, ...overrides });

describe("estimateQuote", () => {
  it("prices the base project at the medium size", () => {
    const q = quote({ type: "website" });
    expect(q.low).toBe(400);
    expect(q.high).toBe(1200);
    expect(q.items).toHaveLength(1);
  });

  it("adds selected features and ignores ones that don't apply to the type", () => {
    const withPayments = quote({ type: "website", features: ["payments", "push"] });
    expect(withPayments.items.map((i) => i.label)).toEqual([
      "Website or landing page (medium)",
      "Online payments (Stripe)",
    ]);
    expect(withPayments.low).toBe(800);
  });

  it("scales by size and charges design as a share of the build", () => {
    const small = quote({ type: "website", size: "small" });
    expect(small.low).toBe(300); // 400 * 0.8, rounded to 50
    const designed = quote({ type: "website", design: "need" });
    expect(designed.items.at(-1).label).toBe("UI/UX design");
    expect(designed.low).toBe(400 + 50); // 15% of 400 = 60 -> 50
  });

  it("charges a rush premium and shortens the schedule", () => {
    const standard = quote({ type: "mobile" });
    const rush = quote({ type: "mobile", timeline: "rush" });
    expect(rush.low).toBeGreaterThan(standard.low);
    expect(rush.weeks[1]).toBeLessThan(standard.weeks[1]);
  });

  it("falls back to defaults for unknown ids instead of returning NaN", () => {
    const q = estimateQuote({ type: "nope", size: "huge", design: "?", timeline: "yesterday", features: ["x"] });
    expect(Number.isFinite(q.low)).toBe(true);
    expect(q.type.id).toBe(DEFAULT_SELECTION.type);
  });

  it("keeps the low end at or below the high end", () => {
    for (const type of ["website", "webapp", "mobile", "webmobile", "data", "automation"]) {
      const all = featuresFor(type).map((f) => f.id);
      const q = quote({ type, features: all, design: "need", timeline: "rush", size: "large" });
      expect(q.low).toBeLessThanOrEqual(q.high);
      expect(q.weeks[0]).toBeLessThanOrEqual(q.weeks[1]);
    }
  });
});

describe("quoteSummary", () => {
  it("includes the contact details, breakdown and total", () => {
    const q = quote({ type: "website", features: ["cms"] });
    const text = quoteSummary(q, { name: "Ada", email: "ada@example.com", details: "A bakery site", reference: "Q-1" });
    expect(text).toContain("Quote request Q-1");
    expect(text).toContain("Email: ada@example.com");
    expect(text).toContain("Blog or content management");
    expect(text).toContain("A bakery site");
    expect(text).not.toContain("Company:");
  });
});

describe("makeReference", () => {
  it("encodes the date and a short random tail", () => {
    const ref = makeReference(new Date("2026-10-05T10:00:00Z"), () => 0);
    expect(ref).toBe("Q-261005-AAAA");
  });
});
