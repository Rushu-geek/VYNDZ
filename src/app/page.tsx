import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import AudienceSection from "@/components/AudienceSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import WaitlistForm from "@/components/WaitlistForm";
import SocialProofSection from "@/components/SocialProofSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d1a]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <AudienceSection />
      <HowItWorksSection />
      <BenefitsSection />
      <WaitlistForm />
      <SocialProofSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
