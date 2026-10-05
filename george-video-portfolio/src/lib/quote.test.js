import { describe, it, expect } from "vitest";
import { DEFAULT_SELECTION, PROJECT_TYPES, estimateQuote, featuresFor, makeReference } from "./quote";

const quote = (overrides) => estimateQuote({ ...DEFAULT_SELECTION, ...overrides });

describe("estimateQuote (video)", () => {
  it("prices the base edit", () => {
    const q = quote({ type: "social" });
    expect(q.low).toBe(100); // 80 rounded to the nearest 50
    expect(q.items).toHaveLength(1);
  });

  it("adds features that apply and ignores ones that don't", () => {
    const q = quote({ type: "social", features: ["grading", "multicam"] });
    expect(q.items.map((i) => i.label)).toEqual(["Reels & short-form (standard)", "Colour grading"]);
  });

  it("charges a rush premium and shortens the schedule", () => {
    const standard = quote({ type: "documentary" });
    const rush = quote({ type: "documentary", timeline: "rush" });
    expect(rush.low).toBeGreaterThan(standard.low);
    expect(rush.weeks[1]).toBeLessThan(standard.weeks[1]);
  });

  it("keeps low <= high for every type with every feature", () => {
    for (const { id } of PROJECT_TYPES) {
      const q = quote({ type: id, features: featuresFor(id).map((f) => f.id), timeline: "rush" });
      expect(q.low).toBeLessThanOrEqual(q.high);
      expect(Number.isFinite(q.low)).toBe(true);
    }
  });

  it("falls back to defaults for unknown ids", () => {
    expect(estimateQuote({ type: "nope" }).type.id).toBe(DEFAULT_SELECTION.type);
  });
});

describe("makeReference", () => {
  it("encodes the date", () => {
    expect(makeReference(new Date("2026-10-05T10:00:00Z"), () => 0)).toBe("Q-261005-AAAA");
  });
});
