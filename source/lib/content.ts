export type ScreenKey =
  | "discover"
  | "map"
  | "detail"
  | "chat"
  | "qr"
  | "organizer"
  | "profile"
  | "myEvents"
  | "welcome"
  | "organizerCreate"
  | "organizerPublished"
  | "organizerInfo"
  | "organizerChat";

export type Screen = {
  src: string;
  alt: string;
};

// Bump whenever the screenshots are replaced: file names stay the same and
// GitHub Pages lets browsers cache them, so old screens would linger.
const screensVersion = "2026-10-15a";

const screen = (name: string) => `/images/screens/${name}.webp?v=${screensVersion}`;

const screenSources: Record<ScreenKey, string> = {
  discover: screen("discover"),
  map: screen("map"),
  detail: screen("detail"),
  chat: screen("chat"),
  qr: screen("qr"),
  organizer: screen("organizer"),
  profile: screen("profile"),
  myEvents: screen("my-events"),
  welcome: screen("welcome"),
  organizerCreate: screen("organizer-create"),
  organizerPublished: screen("organizer-published"),
  organizerInfo: screen("organizer-info"),
  organizerChat: screen("organizer-chat"),
};

export function resolveScreen(key: ScreenKey, alts: Record<ScreenKey, string>): Screen {
  return { src: screenSources[key], alt: alts[key] };
}

const photo = (name: string) => `/images/strip/${name}.webp`;

export const memoryRows = [
  ["acoustic", "friends", "yoga", "hike", "ceramics", "food"].map(photo),
  ["concert", "bike", "dinner", "dj", "run", "festival"].map(photo),
];
