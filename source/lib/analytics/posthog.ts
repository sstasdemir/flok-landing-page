import type { CaptureResult, PostHog, PostHogConfig } from "posthog-js";

import type { Locale } from "@/lib/i18n";

import type { AnalyticsEventName, AnalyticsEvents } from "./events";

// Public project token: safe to ship in client code.
const token = process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_x6nHDTyhGDboXL56DLF8Fqi9UZR4g9pFZq73hvGMndmX";
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const uiHost = "https://us.posthog.com";

const devHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]", "::1"]);
const emailPattern = /[A-Z0-9._%+-]+@(?!flok\.ist\b)[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const storagePattern = /^(?:ph_|__ph|_ph_)/;

let client: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;
let enabled = false;
let locale: Locale = "tr";
const pending: Array<() => void> = [];

/** Local development never sends events. */
export function isAnalyticsHost() {
  const { hostname } = window.location;
  return !devHosts.has(hostname) && !hostname.endsWith(".localhost");
}

export function setAnalyticsLocale(next: Locale) {
  locale = next;
}

function scrub<T>(value: T, depth = 0): T {
  if (typeof value === "string") return value.replace(emailPattern, "[redacted]") as T;
  if (depth > 4 || value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((item) => scrub(item, depth + 1)) as T;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, scrub(item, depth + 1)])) as T;
}

/** Last line of defence: nothing leaves without consent, and no email address ever leaves. */
function beforeSend(event: CaptureResult | null): CaptureResult | null {
  if (!event || !enabled) return null;
  if (event.event === "$snapshot") return event; // replay masks every input value at the source
  event.properties = scrub({ locale, ...event.properties });
  if (event.$set) event.$set = scrub(event.$set);
  if (event.$set_once) event.$set_once = scrub(event.$set_once);
  return event;
}

const config: Partial<PostHogConfig> = {
  api_host: apiHost,
  ui_host: uiHost,
  defaults: "2026-01-30",
  person_profiles: "identified_only",
  persistence: "localStorage+cookie",
  // Persistence is switched off (and wiped) whenever capturing is opted out, e.g. on withdrawal.
  opt_out_persistence_by_default: true,
  capture_pageview: "history_change",
  capture_pageleave: true,
  autocapture: true,
  capture_heatmaps: true,
  capture_dead_clicks: true,
  capture_performance: { web_vitals: true, network_timing: true },
  save_campaign_params: true,
  save_referrer: true,
  disable_session_recording: false,
  session_recording: { maskAllInputs: true, recordHeaders: false, recordBody: false },
  // Keep PostHog from adding any UI of its own to the site.
  disable_surveys: true,
  disable_product_tours: true,
  disable_conversations: true,
  disable_web_experiments: true,
  before_send: beforeSend,
};

/** Loads PostHog (only ever after consent) or resumes it after an in-page withdrawal. */
export async function enableAnalytics() {
  if (!isAnalyticsHost()) return;
  enabled = true;
  if (client) {
    client.set_config({ opt_out_capturing_by_default: false, disable_session_recording: false });
    return;
  }
  loading ??= import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(token, config);
      client = posthog;
      pending.splice(0).forEach((send) => send());
      return posthog;
    })
    .catch(() => {
      loading = null;
      return null;
    });
  await loading;
  if (!enabled) disableAnalytics(); // consent withdrawn while the script was loading
}

/** Stops all capture and replay and removes everything PostHog stored in this browser. */
export function disableAnalytics() {
  enabled = false;
  pending.length = 0;
  if (client) {
    client.set_config({ opt_out_capturing_by_default: true, disable_session_recording: true });
    client.opt_out_capturing();
  }
  clearPostHogStorage();
}

export function clearPostHogStorage() {
  for (const storage of [window.localStorage, window.sessionStorage]) {
    try {
      Object.keys(storage)
        .filter((key) => storagePattern.test(key))
        .forEach((key) => storage.removeItem(key));
    } catch {
      // Storage unavailable: nothing to clear.
    }
  }

  const labels = window.location.hostname.split(".");
  const domains = [undefined, ...labels.slice(0, -1).map((_, index) => labels.slice(index).join("."))];
  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => storagePattern.test(name))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=.${domain}` : ""}`;
      });
    });
}

type TrackOptions = { instant?: boolean };

export function track<E extends AnalyticsEventName>(event: E, props: AnalyticsEvents[E], options: TrackOptions = {}) {
  if (!enabled) return;
  const properties = { ...props, locale, page: window.location.pathname };
  const send = () => client?.capture(event, properties, options.instant ? { send_instantly: true } : undefined);
  if (client) send();
  else pending.push(send);
}
