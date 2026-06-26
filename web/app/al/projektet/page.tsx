import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { ScrollToSection } from "@/components/common/ScrollToSection";

export default function ProjektetPage() {
  return (
    <>
      <ScrollToSection id="projektet" />
      <PortfolioPage locale="al" />
    </>
  );
}