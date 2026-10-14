import type { IconKey } from "@/lib/icons";

export type FeatureCopy = {
  icon: IconKey;
  title: string;
  body: string;
};

export type SectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export type WaitlistCopy = {
  placeholder: string;
  submit: string;
  submitting: string;
  consentBefore: string;
  consentLink: string;
  consentAfter: string;
  joined: string;
  alreadyJoined: string;
  errors: { invalid: string; config: string; network: string };
};

export type ConsentCopy = {
  title: string;
  bodyBefore: string;
  link: string;
  bodyAfter: string;
  accept: string;
  decline: string;
};

export type HeaderCopy = {
  homeLabel: string;
  navLabel: string;
  cta: string;
  languageLabel: string;
  links: { id: string; label: string }[];
};

export type StoreBadge = { src: string; alt: string; width: number; height: number };

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    /** Bump the ?v= query whenever the image changes: link previews (WhatsApp, iMessage, Slack, X) cache it by URL. */
    ogImage: string;
    ogImageAlt: string;
    ogLocale: string;
  };
  header: HeaderCopy;
  footer: { legalLabel: string; privacy: string; terms: string; support: string; cookies: string };
  hero: {
    srOnly: string;
    before: string;
    /** Appended to each rotating word, e.g. ",". Empty string for none. */
    wordSuffix: string;
    after: string;
    words: string[];
    lead: string;
    /** Substring of `lead` rendered in bold ink, e.g. the city name. Must appear in `lead` verbatim. */
    leadHighlight: string;
    /** Accessible label of the desktop "scroll down" cue at the bottom of the hero. */
    scrollCue: string;
    /** Official App Store and Google Play badges for this locale, in display order. Shown as plain images, not links. */
    storeBadges: StoreBadge[];
  };
  trust: SectionCopy & { id: string; points: FeatureCopy[] };
  categories: SectionCopy & {
    id: string;
    listLabel: string;
    perks: FeatureCopy[];
    items: { icon: IconKey; label: string }[];
  };
  eventDay: SectionCopy & { id: string; moments: (FeatureCopy & { time: string })[] };
  memories: SectionCopy & { id: string };
  faq: {
    id: string;
    eyebrow: string;
    title: string;
    prompt: string;
    items: { question: string; answer: string }[];
  };
  preRegister: { id: string; title: string; body: string };
  waitlist: WaitlistCopy;
  consent: ConsentCopy;
  legal: {
    updatedLabel: string;
    titles: { privacy: string; terms: string; support: string };
    descriptions: { privacy: string; terms: string; support: string };
  };
};
