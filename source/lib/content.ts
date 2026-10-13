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

const screenSources: Record<ScreenKey, string> = {
  discover: "/images/screens/discover.webp",
  map: "/images/screens/map.webp",
  detail: "/images/screens/detail.webp",
  chat: "/images/screens/chat.webp",
  qr: "/images/screens/qr.webp",
  organizer: "/images/screens/organizer.webp",
  profile: "/images/screens/profile.webp",
  myEvents: "/images/screens/my-events.webp",
  welcome: "/images/screens/welcome.webp",
  organizerCreate: "/images/screens/organizer-create.webp",
  organizerPublished: "/images/screens/organizer-published.webp",
  organizerInfo: "/images/screens/organizer-info.webp",
  organizerChat: "/images/screens/organizer-chat.webp",
};

export function resolveScreen(key: ScreenKey, alts: Record<ScreenKey, string>): Screen {
  return { src: screenSources[key], alt: alts[key] };
}

const photo = (name: string) => `/images/strip/${name}.webp`;

export const memoryRows = [
  ["acoustic", "friends", "yoga", "hike", "ceramics", "food"].map(photo),
  ["concert", "bike", "dinner", "dj", "run", "festival"].map(photo),
];
