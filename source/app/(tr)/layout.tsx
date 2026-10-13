import { RootDocument, viewport as documentViewport } from "@/components/site/root-document";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata("tr");
export const viewport = documentViewport;

export default function TurkishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="tr">{children}</RootDocument>;
}
