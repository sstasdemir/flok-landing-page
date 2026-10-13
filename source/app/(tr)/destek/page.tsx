import { LegalPage } from "@/components/site/legal-page";
import { legalMetadata } from "@/lib/metadata";

export const metadata = legalMetadata("tr", "support");

export default function Page() {
  return <LegalPage locale="tr" page="support" />;
}
