import { AboutHero } from "@/components/about-hero";
import { AboutStats } from "@/components/about-stats";
import { AboutTeam } from "@/components/about-team";
import { MainLayout } from "@/components/main-layout";

export default function AboutPage() {
  return (
    <MainLayout>
      <AboutHero />
      <AboutStats />
      <AboutTeam />
    </MainLayout>
  );
}

export const metadata = {
  title: "About Us - RULLING Gadget Hub",
  description: "Learn more about our company and mission",
};
