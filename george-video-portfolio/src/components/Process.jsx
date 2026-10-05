"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// The editing workflow as a stack of layers, ordered bottom-up: each step
// rests on the one below. Click a layer (or Back/Next) to read about it.
const STEPS = [
  {
    title: "Brief",
    body: "Every edit starts with who it's for and where it will live. We agree on the goal, the audience, the platform and a few reference videos, so the first cut is already pointed in the right direction.",
    delivers: ["Creative brief", "Deliverables list"],
  },
  {
    title: "Organise",
    body: "I ingest and back up the footage, then log, label and sync it. Multicam angles line up, audio is matched to picture, and the best takes are pulled into selects. Good organisation is what makes a fast edit possible.",
    delivers: ["Organised project", "Selects"],
  },
  {
    title: "Rough cut",
    body: "The story comes first: structure, pacing and the moments that carry it. The rough cut is about getting the shape right before polishing anything, so feedback goes into the story, not the details.",
    delivers: ["Rough cut for review"],
  },
  {
    title: "Fine cut",
    body: "With the structure agreed, I tighten every cut, add B-roll, transitions, titles and motion graphics, and work through your notes until the picture is locked.",
    delivers: ["Locked cut", "Titles & graphics"],
  },
  {
    title: "Colour & sound",
    body: "Colour correction and a cinematic grade set the mood, then the audio is mixed, cleaned up and layered with sound effects and music so the video feels finished, not just edited.",
    delivers: ["Graded master", "Mixed audio"],
  },
  {
    title: "Deliver",
    body: "Finally I export for every place it will play: YouTube, Reels and TikTok, a website or a screen at an event, with captions and thumbnails where they're needed.",
    delivers: ["Platform-ready exports", "Captions"],
  },
];

const LAST = STEPS.length - 1;
const pad = (n) => String(n + 1).padStart(2, "0");

// Planes are squares turned into an isometric diamond: --s is the side, --gap
// the vertical distance between layers.
const tone = {
  active: "border-accent-text bg-[color-mix(in_oklab,var(--accent)_22%,var(--background))] text-accent-text/40 shadow-[8px_8px_24px_rgb(37_99_235/0.4)]",
  done: "border-accent-text/50 bg-[color-mix(in_oklab,var(--accent)_10%,var(--background))] text-accent-text/20",
  todo: "border-line-strong/50 bg-background text-foreground/10",
};

const gridStyle = {
  backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
  backgroundSize: "calc(var(--s) / 8) calc(var(--s) / 8)",
};

export default function Process() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section aria-labelledby="process-heading" className="mt-24 md:mt-32">
      <h2 id="process-heading" className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
        My <span className="text-accent-text">Process</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted text-lg leading-relaxed">
        Every edit moves through the same six layers. Each rests on the one below, so when something feels off in
        the final cut, I trace it back down and fix it at the source.
      </p>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
        <ol
          aria-label="Process steps"
          className="relative mx-auto shrink-0 w-[calc(var(--s)*1.4142+160px)] sm:w-[calc(var(--s)*1.4142+190px)] [--s:90px] min-[360px]:[--s:100px] [--gap:44px] sm:[--s:128px] sm:[--gap:50px]"
          style={{ height: `calc(${LAST} * var(--gap) + var(--s) * 0.7071 + 12px)` }}
        >
          {STEPS.map(({ title }, i) => {
            const state = i === active ? "active" : i < active ? "done" : "todo";
            const top = `calc(${LAST - i} * var(--gap) + 12px)`;
            return (
              <li key={title}>
                <div
                  aria-hidden="true"
                  className={`absolute left-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${state === "active" ? "-translate-y-2.5" : ""}`}
                  style={{ top, width: "calc(var(--s) * 1.4142)", height: "calc(var(--s) * 0.7071)" }}
                >
                  <div
                    className={`absolute left-1/2 top-1/2 size-(--s) rounded-md border ${tone[state]}`}
                    style={{ ...gridStyle, transform: "translate(-50%, -50%) rotateX(60deg) rotateZ(-45deg)" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active ? "step" : undefined}
                  className="group absolute right-0 flex items-center gap-2 pr-1 text-left text-sm sm:text-base rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                  style={{
                    top: `calc(${LAST - i} * var(--gap) + 12px + var(--s) * 0.3535 - var(--gap) / 2)`,
                    height: "var(--gap)",
                    left: "calc(var(--s) * 1.4142 + 8px)",
                  }}
                >
                  <span aria-hidden="true" className={`h-px w-5 sm:w-8 ${state === "active" ? "bg-accent-text" : "border-t border-dashed border-line-strong"}`} />
                  <span className={`tabular-nums text-xs font-semibold ${state === "active" ? "text-accent-text" : "text-muted"}`}>{pad(i)}</span>
                  <span className={`font-semibold ${state === "active" ? "text-accent-text" : "text-muted group-hover:text-foreground"}`}>{title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="min-w-0 rounded-2xl border border-line bg-card p-5 sm:p-6 md:p-8">
          <div aria-live="polite" className="min-h-64 sm:min-h-56">
            {/* Keyed so the panel replays its entrance on each step. */}
            <div key={active} className="animate-fade-in-up">
              <h3 className="flex items-baseline gap-3 text-2xl font-bold text-foreground">
                <span className="tabular-nums text-accent-text">{pad(active)}</span>
                {step.title}
              </h3>
              <p className="mt-4 max-w-prose leading-relaxed text-muted">{step.body}</p>
              <h4 className="mt-6 text-sm font-semibold text-muted">What you get</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {step.delivers.map((item) => (
                  <li key={item} className="rounded-full border border-line-strong/60 px-3 py-1 text-sm font-medium text-foreground">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <div className="flex gap-1 sm:gap-1.5" aria-hidden="true">
              {STEPS.map(({ title }, i) => (
                <span key={title} className={`h-1 w-3.5 sm:w-7 rounded-full transition-colors duration-300 ${i <= active ? "bg-accent" : "bg-foreground/15"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActive((a) => a - 1)}
                disabled={active === 0}
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 font-semibold text-foreground transition-colors hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                <ArrowLeft className="size-4" aria-hidden="true" /> Back
              </button>
              <button
                type="button"
                onClick={() => setActive((a) => a + 1)}
                disabled={active === LAST}
                className="inline-flex h-11 items-center gap-1.5 rounded-full bg-accent px-4 font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                Next <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
