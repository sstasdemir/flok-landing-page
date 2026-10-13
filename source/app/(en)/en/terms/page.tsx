import { LegalPage } from "@/components/site/legal-page";
import { legalMetadata } from "@/lib/metadata";

export const metadata = legalMetadata("en", "terms");

export default function Page() {
  return <LegalPage locale="en" page="terms" />;
}
