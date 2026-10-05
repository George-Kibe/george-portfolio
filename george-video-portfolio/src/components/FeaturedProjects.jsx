import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectGrid from "./ProjectGrid";
import { getFeaturedProjects } from "@/lib/queries";

// Home page: up to three projects marked "Featured" in the admin panel.
export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects(3);
  if (projects.length === 0) return null;
  return (
    <section aria-labelledby="featured-heading" className="mt-20 md:mt-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id="featured-heading" className="text-3xl md:text-4xl font-bold text-foreground">
          Recent <span className="text-accent-text">work</span>
        </h2>
        <Link href="/projects" className="group inline-flex items-center gap-1.5 font-semibold text-accent-text">
          All projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
      <ProjectGrid projects={projects} />
    </section>
  );
}
