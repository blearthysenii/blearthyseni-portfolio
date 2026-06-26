import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { ScrollToSection } from "@/components/common/ScrollToSection";

export default function AboutPage() {
  return (
    <>
      <ScrollToSection id="about" />
      <PortfolioPage locale="en" />
    </>
  );
}