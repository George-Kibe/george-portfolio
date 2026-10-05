import ProjectsSection from "@/components/ProjectsSection";
import { getPublishedProjects } from "@/lib/queries";

export const metadata = {
  title: "Portfolio — Commercials, Music Videos & Docs",
  description:
    "A selection of edited work by GeorgeEditPro: commercials, music videos, " +
    "documentaries and corporate films, with colour grading and motion graphics.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    title: "Portfolio — Commercial, Music Video & Documentary Edits",
    description:
      "Commercials, music videos, documentaries and corporate films edited by George Kibe.",
  },
};

// Projects come from MongoDB: cached, refreshed every five minutes and
// immediately when one is saved in the admin panel.
export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  return <ProjectsSection projects={projects} />;
}
