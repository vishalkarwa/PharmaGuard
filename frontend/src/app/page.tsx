import Background from "@/components/Background";
import Capsule3D from "@/components/Capsule3D";
import ImageSequence from "@/components/ImageSequence";
import CompanyMarquee from "@/components/CompanyMarquee";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksMinimal from "@/components/HowItWorksMinimal";
import DrugRiskPreview from "@/components/DrugRiskPreview";
import GenomicConfidencePanel from "@/components/GenomicConfidencePanel";
import FinalCTA from "@/components/FinalCTA";
import SmoothScroller from "@/components/SmoothScroller";
import MetricsSection from "@/components/MetricsSection";

export default function Home() {
  return (
    <SmoothScroller>
      <main className="relative w-full overflow-hidden bg-background min-h-screen">
        <Background />

        {/* Persistent 3D Rotating Background Element */}
        <Capsule3D />

        {/* Core Sections: Apple Minimal Flow */}
        <CompanyMarquee />
        <ImageSequence />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksMinimal />
        <DrugRiskPreview />
        <GenomicConfidencePanel />
        <MetricsSection />
        <FinalCTA />

        {/* Footer */}
        <footer className="w-full pt-16 pb-8 bg-zinc-950 border-t border-white/10 text-center flex flex-col items-center justify-center relative z-10 overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-[2px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <h2 className="text-2xl font-bold tracking-widest gap-2 flex flex-col items-center mb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 font-sans tracking-[0.2em]">PHARMAGUARD</span>
          </h2>
          <p className="text-sm text-zinc-500 font-medium tracking-wide">© 2026 PharmaGuard AI. Decoding the future of medicine.</p>
        </footer>
      </main>
    </SmoothScroller>
  );
}
