"use client";

import { reopenConsent } from "@/lib/analytics/consent";

export function ConsentPreferencesButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={reopenConsent} className={className}>
      {label}
    </button>
  );
}
