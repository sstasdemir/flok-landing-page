import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { RootDocument, viewport as documentViewport } from "@/components/site/root-document";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { trackAttrs } from "@/lib/analytics/events";
import { routes } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı · Flok",
  robots: { index: false },
};
export const viewport = documentViewport;

export default function GlobalNotFound() {
  return (
    <RootDocument locale="tr">
      <SiteHeader locale="tr" alternateHref={routes.en.home} />
      <main id="main" className="px-6 pt-20 pb-32 lg:pt-28">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p aria-hidden="true" className="font-logo text-[clamp(5rem,16vw,8rem)] leading-none text-mint">
            404
          </p>
          <h1 className="mt-6 text-[clamp(2rem,4.4vw,3rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">
            Bu buluşma burada değil.
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-mute">
            Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Ana sayfadan devam edebilirsin.
          </p>
          <Link
            href={routes.tr.home}
            {...trackAttrs("cta_clicked", { button: "not_found_home", section: "not_found" })}
            className="group mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 font-display font-semibold text-white transition-colors hover:bg-forest-deep"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Ana sayfaya dön
          </Link>
          <p lang="en" className="mt-6 text-sm text-mute">
            This page doesn&apos;t exist.{" "}
            <Link href={routes.en.home} className="font-medium text-forest underline underline-offset-4">
              Go to the English home page
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter locale="tr" />
    </RootDocument>
  );
}
