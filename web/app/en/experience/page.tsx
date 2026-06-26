import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { ScrollToSection } from "@/components/common/ScrollToSection";

export default function ExperiencePage() {
  return (
    <>
      <ScrollToSection id="experience" />
      <PortfolioPage locale="en" />
    </>
  );
}