import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { ScrollToSection } from "@/components/common/ScrollToSection";

export default function SkillsPage() {
  return (
    <>
      <ScrollToSection id="skills" />
      <PortfolioPage locale="en" />
    </>
  );
}