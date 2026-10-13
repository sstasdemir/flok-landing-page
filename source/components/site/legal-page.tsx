import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getDictionary, otherLocale, routes, type Locale } from "@/lib/i18n";
import { readLegalDoc, renderInline, type LegalPageKey } from "@/lib/legal";

export async function LegalPage({ locale, page }: { locale: Locale; page: LegalPageKey }) {
  const doc = await readLegalDoc(locale, page);
  const { legal } = getDictionary(locale);

  return (
    <>
      <SiteHeader locale={locale} alternateHref={routes[otherLocale(locale)][page]} />
      <main id="main" className="px-6 pt-12 pb-24 lg:pt-20">
        <article className="mx-auto max-w-2xl">
          <header className="border-b border-line pb-8">
            <p className="font-display text-sm font-bold text-flame">Flok</p>
            <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
              {doc.title}
            </h1>
            {doc.updated && (
              <p className="mt-4 text-sm text-mute">
                {legal.updatedLabel} {doc.updated}
              </p>
            )}
          </header>

          <div className="mt-8 text-[1.0625rem] leading-relaxed text-mute">
            {doc.blocks.map((block, index) => {
              switch (block.kind) {
                case "h2":
                  return (
                    <h2 key={index} className="mt-12 mb-4 text-2xl leading-snug font-bold tracking-[-0.02em] first:mt-0">
                      {block.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={index} className="mt-8 mb-3 text-lg font-bold">
                      {block.text}
                    </h3>
                  );
                case "ul":
                  return (
                    <ul key={index} className="my-4 grid gap-2 pl-5 marker:text-forest [list-style:disc]">
                      {block.items.map((item) => (
                        <li key={item} className="pl-1">{renderInline(item)}</li>
                      ))}
                    </ul>
                  );
                default:
                  return (
                    <p key={index} className="my-4">
                      {renderInline(block.text)}
                    </p>
                  );
              }
            })}
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
