import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import CertificationsSection from "@/components/CertificationsSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Chironjit Roy Portfolio | Precision Engineering & Design</title>
        <meta
          name="description"
          content="Professional CAD Engineer specializing in precision mechanical design, 3D modeling, and engineering solutions. View portfolio, certifications, and expertise."
        />
        <meta
          name="keywords"
          content="CAD Engineer, SolidWorks, AutoCAD, Mechanical Design, 3D Modeling, Engineering Portfolio"
        />
      </Helmet>

      <main className="bg-background min-h-screen">
        <Navigation />
        <HeroSection />
        <SkillsSection />
        <PortfolioSection />
        <CertificationsSection />
        <ResumeSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
