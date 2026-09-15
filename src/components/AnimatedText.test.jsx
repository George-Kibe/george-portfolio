import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AnimatedText from "./AnimatedText";

describe("AnimatedText", () => {
  it("renders the heading text visibly, not at opacity 0", () => {
    const { container } = render(<AnimatedText text="Turning Vision Into Reality" />);

    // The heading is the LCP element. Nothing in the server-rendered markup may
    // hide it behind a JS-driven animation.
    const hidden = Array.from(container.querySelectorAll("[style]")).filter((el) =>
      /opacity:\s*0(?!\.)/.test(el.getAttribute("style") || "")
    );
    expect(hidden).toHaveLength(0);
  });

  it("renders the full text content", () => {
    render(<AnimatedText text="Turning Vision Into Reality" />);
    expect(screen.getByRole("heading")).toHaveTextContent("Turning Vision Into Reality");
  });

  it("honours the `as` prop for section headings", () => {
    render(<AnimatedText text="Experience" as="h2" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("sizes a section heading below the page heading", () => {
    render(
      <>
        <AnimatedText text="Page" />
        <AnimatedText text="Section" as="h2" />
      </>
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("text-4xl", "lg:text-6xl");
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveClass("text-3xl", "md:text-5xl");
    expect(h2).not.toHaveClass("lg:text-6xl");
  });
});
