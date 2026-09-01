import { Hero, Stats } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Sets } from "@/components/Sets";
import { HowItWorks } from "@/components/HowItWorks";
import { Fees } from "@/components/Fees";
import { Faq } from "@/components/Faq";
import { ClosingCta } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <div className="mt-24 sm:mt-32">
        <Ticker />
      </div>
      <Sets />
      <HowItWorks />
      <Fees />
      <Faq />
      <ClosingCta />
    </>
  );
}
