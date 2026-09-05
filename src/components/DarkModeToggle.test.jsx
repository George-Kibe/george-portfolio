import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/context/ThemeContext";
import DarkModeToggle from "./DarkModeToggle";

const renderToggle = () =>
  render(
    <ThemeProvider>
      <DarkModeToggle />
    </ThemeProvider>
  );

beforeEach(() => {
  document.documentElement.className = "dark";
  window.localStorage.clear();
});

describe("DarkModeToggle accessibility", () => {
  it("exposes a button with an accessible name", () => {
    renderToggle();
    expect(
      screen.getByRole("button", { name: /theme|mode|dark|light/i })
    ).toBeInTheDocument();
  });

  it("reports the current theme via aria-pressed", () => {
    renderToggle();
    const toggle = screen.getByRole("button", { name: /theme|mode|dark|light/i });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("can be operated with the keyboard alone", async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.tab();
    const toggle = screen.getByRole("button", { name: /theme|mode|dark|light/i });
    expect(toggle).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(document.documentElement).toHaveClass("light");

    await user.keyboard(" ");
    expect(document.documentElement).toHaveClass("dark");
  });
});
