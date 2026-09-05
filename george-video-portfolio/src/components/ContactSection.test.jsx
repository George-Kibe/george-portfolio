import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactSection from "./ContactSection";

describe("contact form accessibility", () => {
  it("associates every visible field with its label", () => {
    render(<ContactSection />);

    // getByLabelText only resolves when a label is actually bound to the input.
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("gives the submit button an accessible name", () => {
    render(<ContactSection />);
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("announces async submission feedback to assistive tech", () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector("[aria-live]")).not.toBeNull();
  });
});
