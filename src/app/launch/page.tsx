import type { Metadata } from "next";
import { SetBuilder } from "@/components/SetBuilder";
import { SectionHead } from "@/components/SectionHead";

export const metadata: Metadata = {
  title: "Launch a set",
  description:
    "Assemble a basket of tokenized equities, name it, and see exactly what would be deployed.",
};

export default function LaunchPage() {
  return (
    <section className="px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Builder"
          title="Write the definition"
          lead="Holdings, a name, a weighting rule. That is the whole product — everything after it is the contract doing what the definition says."
        />
        <div className="mt-12">
          <SetBuilder />
        </div>
      </div>
    </section>
  );
}
