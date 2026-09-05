import { describe, it, expect, vi, afterEach } from "vitest";
import { reportError } from "./reportError";

afterEach(() => {
  vi.restoreAllMocks();
  delete window.Sentry;
});

describe("reportError", () => {
  it("emits a structured line when no provider is configured", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    reportError(new Error("boom"), { boundary: "test" });

    expect(spy).toHaveBeenCalledOnce();
    const payload = JSON.parse(spy.mock.calls[0][0]);
    expect(payload).toMatchObject({ level: "error", message: "boom", boundary: "test" });
  });

  it("forwards to Sentry when present", () => {
    const captureException = vi.fn();
    window.Sentry = { captureException };
    const err = new Error("boom");

    reportError(err, { boundary: "test" });

    expect(captureException).toHaveBeenCalledWith(err, { extra: { boundary: "test" } });
  });

  it("never throws, even if the provider blows up", () => {
    window.Sentry = {
      captureException() {
        throw new Error("reporter is down");
      },
    };
    expect(() => reportError(new Error("boom"))).not.toThrow();
  });
});
