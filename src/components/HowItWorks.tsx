import { SectionHead } from "@/components/SectionHead";

const steps = [
  {
    n: "01",
    title: "Define the set",
    body: "Pick the tokenized equities it holds and the rule that weights them — equal, cap, or a fixed table you write yourself. The definition is the product; everything after this is mechanical.",
  },
  {
    n: "02",
    title: "Deploy it",
    body: "One transaction publishes the set and mints its token. From that point it has a symbol, a contract that holds the underlying positions, and a market that never closes for the weekend.",
  },
  {
    n: "03",
    title: "Earn on the flow",
    body: "Every mint, redemption and trade in the set pays a fee. A share of it goes to whoever defined the set, for as long as it trades — including after they have sold their own position.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="reveal px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="How it works"
          title="Three steps, then it trades itself"
          lead="There is no listing process, no committee and no window. A set is deployed by the person who thought of it, and the market opens the moment it exists."
        />

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="glass glass-hover p-7">
              <span className="type-num text-[13px] text-blue-bright">
                {step.n}
              </span>
              <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-soft text-pretty">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-[12.5px] text-mute">
          This describes the design the front end is built against. No
          contracts are deployed, so none of it has been demonstrated on
          chain yet.
        </p>
      </div>
    </section>
  );
}
