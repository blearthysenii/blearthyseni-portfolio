import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { ScrollToSection } from "@/components/common/ScrollToSection";

export default function ProjectsPage() {
  return (
    <>
      <ScrollToSection id="projects" />
      <PortfolioPage locale="en" />
    </>
  );
}