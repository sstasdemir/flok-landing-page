import { RootDocument, viewport as documentViewport } from "@/components/site/root-document";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata("en");
export const viewport = documentViewport;

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
