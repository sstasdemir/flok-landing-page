import { BlurFade } from "@/components/magicui/blur-fade";
import { FaqItem } from "@/components/site/faq-item";
import { SectionHeading } from "@/components/site/section-heading";
import { trackAttrs } from "@/lib/analytics/events";
import type { Dictionary } from "@/lib/dictionaries/types";

export function Faq({ copy, supportEmail }: { copy: Dictionary["faq"]; supportEmail: string }) {
  return (
    <section id={copy.id} className="pt-24 lg:pt-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={
            <>
              <span className="block">{copy.prompt}</span>
              <a
                href={`mailto:${supportEmail}`}
                {...trackAttrs("cta_clicked", { button: "faq_support_email", section: "faq" })}
                className="mt-1 inline-block font-medium text-forest underline underline-offset-4"
              >
                {supportEmail}
              </a>
            </>
          }
          className="lg:sticky lg:top-23 lg:self-start"
        />
        <ul className="divide-y divide-line border-y border-line">
          {copy.items.map(({ question, answer }, index) => (
            <li key={question}>
              <BlurFade delay={0.05 * index}>
                <FaqItem questionId={`q${String(index + 1).padStart(2, "0")}`} question={question} answer={answer} />
              </BlurFade>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
