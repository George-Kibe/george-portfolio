import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { createSubmissionGuard, MIN_INTERVAL_MS, MAX_PER_WINDOW, WINDOW_MS } from "./submissionGuard";

let guard;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  window.localStorage.clear();
  guard = createSubmissionGuard("test-form");
});

afterEach(() => {
  vi.useRealTimers();
});

describe("submission guard", () => {
  it("allows a first submission", () => {
    expect(guard.check().allowed).toBe(true);
  });

  it("blocks a second submission fired immediately after the first", () => {
    guard.record();
    const result = guard.check();
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("too-fast");
  });

  it("allows another submission once the cooldown has passed", () => {
    guard.record();
    vi.advanceTimersByTime(MIN_INTERVAL_MS + 1);
    expect(guard.check().allowed).toBe(true);
  });

  it("caps submissions per rolling window", () => {
    for (let i = 0; i < MAX_PER_WINDOW; i += 1) {
      expect(guard.check().allowed).toBe(true);
      guard.record();
      vi.advanceTimersByTime(MIN_INTERVAL_MS + 1);
    }
    const result = guard.check();
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("rate-limited");
  });

  it("lets the window expire and allows submissions again", () => {
    for (let i = 0; i < MAX_PER_WINDOW; i += 1) {
      guard.record();
      vi.advanceTimersByTime(MIN_INTERVAL_MS + 1);
    }
    expect(guard.check().allowed).toBe(false);
    vi.advanceTimersByTime(WINDOW_MS);
    expect(guard.check().allowed).toBe(true);
  });

  it("treats a filled honeypot as a bot regardless of timing", () => {
    expect(guard.isBot({ website: "http://spam.example" })).toBe(true);
    expect(guard.isBot({ website: "" })).toBe(false);
  });

  it("survives localStorage being unavailable", () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => guard.check()).not.toThrow();
    expect(guard.check().allowed).toBe(true);
    spy.mockRestore();
  });
});
