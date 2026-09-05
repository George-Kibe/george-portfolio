import ProjectsSection from "@/components/ProjectsSection";

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

export default function ProjectsPage() {
  return <ProjectsSection />;
}
