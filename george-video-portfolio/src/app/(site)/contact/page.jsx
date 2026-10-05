import ContactSection from "@/components/ContactSection";
import { AUTHOR } from "@/lib/site";

export const metadata = {
  title: "Contact — Hire a Video Editor",
  description:
    `Get a quote for video editing, colour grading, motion graphics or sound ` +
    `design. Based in ${AUTHOR.locality}, ${AUTHOR.country}, working with clients worldwide.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact — Hire a Video Editor",
    description:
      "Send a brief and get a quote for video editing, colour grading and motion graphics.",
  },
};

export default function ContactPage() {
  return <ContactSection />;
}
