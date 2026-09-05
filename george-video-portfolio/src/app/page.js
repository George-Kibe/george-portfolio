import Hero from "@/components/Hero";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";

export const metadata = {
  // `absolute` opts out of the layout's "%s | GeorgeEditPro" template, which
  // would otherwise repeat the brand on the home page.
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function HomePage() {
  return <Hero />;
}
