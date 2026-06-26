import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { ScrollToSection } from "@/components/common/ScrollToSection";

export default function ContactPage() {
  return (
    <>
      <ScrollToSection id="contact" />
      <PortfolioPage locale="en" />
    </>
  );
}