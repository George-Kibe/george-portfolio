import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import ProjectCta from "@/components/ProjectCta";
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

// Brands, featured projects and testimonials come from MongoDB: cached,
// refreshed every five minutes and immediately when edited in the admin panel.
export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-28 lg:px-8">
        <BrandMarquee />
        <FeaturedProjects />
        <Testimonials />
        <ProjectCta className="mt-20 md:mt-28" />
      </div>
    </>
  );
}
