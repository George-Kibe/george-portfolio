import AboutSection from "@/components/AboutSection";

export const metadata = {
  title: "About — Video Editor & Colourist",
  description:
    "George Kibe is a professional video editor in Nairobi, Kenya, working in " +
    "Adobe Premiere Pro, DaVinci Resolve, After Effects and Final Cut Pro. " +
    "Video editing, colour grading, sound design and motion graphics.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: "About — Video Editor & Colourist",
    description:
      "Skills, services and software behind GeorgeEditPro's video editing work.",
  },
};

export default function AboutPage() {
  return <AboutSection />;
}
