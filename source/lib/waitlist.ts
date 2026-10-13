import { useSyncExternalStore } from "react";

import type { Locale } from "@/lib/i18n";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").replace(/\/$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type WaitlistSource = "hero" | "footer";
export type WaitlistResult = "joined" | "alreadyJoined";

export class WaitlistError extends Error {
  constructor(public readonly reason: "invalid" | "config" | "network") {
    super(reason);
  }
}

let result: WaitlistResult | null = null;
const listeners = new Set<() => void>();

function markDone(next: WaitlistResult) {
  result = next;
  listeners.forEach((listener) => listener());
}

export function useWaitlistResult() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => result,
    () => null,
  );
}

export async function joinWaitlist(rawEmail: string, source: WaitlistSource, locale: Locale): Promise<WaitlistResult> {
  const email = rawEmail.trim().toLowerCase();
  if (!emailPattern.test(email)) throw new WaitlistError("invalid");
  if (!supabaseUrl || !supabaseAnonKey) throw new WaitlistError("config");

  let response: Response;
  try {
    response = await fetch(`${supabaseUrl}/rest/v1/landing_waitlist`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      // Turkish sign-ups keep the original source values so existing rows stay comparable.
      body: JSON.stringify({ email, source: locale === "tr" ? source : `${source}-${locale}` }),
    });
  } catch {
    throw new WaitlistError("network");
  }

  if (response.ok) {
    markDone("joined");
    return "joined";
  }

  const detail = await response.text().catch(() => "");
  if (response.status === 409 || /duplicate|unique|23505/i.test(detail)) {
    markDone("alreadyJoined");
    return "alreadyJoined";
  }
  throw new WaitlistError("network");
}
