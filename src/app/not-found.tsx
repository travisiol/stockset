import { Orb } from "@/components/Orb";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4 py-24 text-center sm:px-6">
      <Orb className="w-28" markSize={34} />
      <div>
        <p className="type-label">404</p>
        <h1 className="type-section mt-4">No set at this address</h1>
        <p className="type-lead mx-auto mt-4 max-w-md text-pretty">
          Nothing has been deployed yet, so most set URLs point at empty
          ground. The example sets on the front page show the format.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to the front page</ButtonLink>
        <ButtonLink href="/launch" variant="ghost">
          Open the builder
        </ButtonLink>
      </div>
    </section>
  );
}
