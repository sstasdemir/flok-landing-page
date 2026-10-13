import { useSyncExternalStore } from "react";

/**
 * The visitor's analytics consent. Stored in localStorage under our own key (never a PostHog key) so the
 * choice survives reloads; storing it is strictly necessary to honour it.
 */

export type ConsentChoice = "granted" | "denied";

export type ConsentState = {
  /** `false` until the stored choice has been read on the client. */
  ready: boolean;
  choice: ConsentChoice | null;
  /** The visitor reopened the banner from the footer to change an earlier choice. */
  reopened: boolean;
};

const storageKey = "flok_consent";
// Bump when the banner text or the processing it describes changes materially, to ask again.
const consentVersion = 1;

const serverState: ConsentState = { ready: false, choice: null, reopened: false };
let state: ConsentState = serverState;
const listeners = new Set<() => void>();

function readStored(): ConsentChoice | null {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? "null") as { choice?: unknown; version?: unknown } | null;
    if (stored?.version !== consentVersion) return null;
    return stored.choice === "granted" || stored.choice === "denied" ? stored.choice : null;
  } catch {
    return null;
  }
}

function update(next: Partial<ConsentState>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

function handleStorage(event: StorageEvent) {
  // Keep tabs in sync: withdrawing consent in one tab stops tracking in the others.
  if (event.key === storageKey || event.key === null) update({ choice: readStored() });
}

function subscribe(listener: () => void) {
  if (!state.ready) state = { ready: true, choice: readStored(), reopened: false };
  if (listeners.size === 0) window.addEventListener("storage", handleStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
  };
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, () => state, () => serverState);
}

export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify({ choice, version: consentVersion, at: new Date().toISOString() }));
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  update({ choice, reopened: false });
}

export function reopenConsent() {
  update({ reopened: true });
}

export function closeConsent() {
  update({ reopened: false });
}
