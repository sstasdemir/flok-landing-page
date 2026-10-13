import { LegalPage } from "@/components/site/legal-page";
import { legalMetadata } from "@/lib/metadata";

export const metadata = legalMetadata("tr", "privacy");

export default function Page() {
  return <LegalPage locale="tr" page="privacy" />;
}
