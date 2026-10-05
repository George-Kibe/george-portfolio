"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectGrid from "./ProjectGrid";

// The Projects page body. Projects come from the database (managed in
// /admin/projects); the filters are built from the categories actually in use.
export default function ProjectsSection({ projects }) {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative overflow-hidden bg-background pt-32 pb-20 md:pb-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--glow),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Featured <span className="text-accent-text">Projects</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            A selection of recent work across genres and styles. Click a project to play it.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-line-strong/60 p-10 text-center">
            <p className="text-lg font-semibold text-foreground">The reel is being updated.</p>
            <p className="mt-2 text-muted">New projects are on their way. In the meantime, I&apos;m happy to share recent work on a quick call.</p>
            <Link href="/quote" className="mt-6 inline-flex h-12 items-center rounded-full bg-accent px-6 font-semibold text-white hover:bg-accent-hover">
              Get a quote
            </Link>
          </div>
        ) : (
          <>
            {categories.length > 2 && (
              <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActive(category)}
                    aria-pressed={active === category}
                    className={`min-h-11 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      active === category
                        ? "bg-accent text-white shadow-lg shadow-blue-500/25"
                        : "border border-line-strong/60 bg-accent/5 text-muted hover:bg-accent/10 hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
            <ProjectGrid key={active} projects={shown} priorityFirst />
          </>
        )}
      </div>
    </section>
  );
}
