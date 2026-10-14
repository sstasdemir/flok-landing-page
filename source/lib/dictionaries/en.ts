import type { Dictionary } from "@/lib/dictionaries/types";

const ids = {
  story: "how-it-works",
  organizers: "organizers",
  trust: "trust",
  categories: "categories",
  eventDay: "event-day",
  memories: "memories",
  faq: "faq",
  preRegister: "waitlist",
};

export const en: Dictionary = {
  meta: {
    title: "Flok · Nearby events, all in one app",
    description:
      "Flok brings small meetups in Istanbul, like concerts, workshops and runs, into one place. Apply, join the chat, get in with a QR code. Join the waitlist.",
    ogTitle: "Flok · Small meetups in Istanbul, all in one app",
    ogImage: "images/og-home-en.jpg?v=5",
    ogImageAlt: "Flok: Small meetups in Istanbul, all in one app.",
    ogLocale: "en_US",
  },
  header: {
    homeLabel: "Flok home",
    navLabel: "Menu",
    cta: "Join the waitlist",
    languageLabel: "Language",
    links: [
      { id: ids.story, label: "How it works" },
      { id: ids.organizers, label: "Organizers" },
      { id: ids.trust, label: "Trust" },
      { id: ids.faq, label: "FAQ" },
    ],
  },
  footer: {
    legalLabel: "Legal",
    privacy: "Privacy",
    terms: "Terms of Use",
    support: "Support",
    cookies: "Cookie preferences",
  },
  screens: {
    welcome: "Sign-in screen: Apple, Google or email",
    discover: "Discover feed: nearby events",
    map: "Map view: event pins",
    detail: "Event detail with Join button at the top",
    qr: "QR ticket screen",
    myEvents: "My Events list",
    chat: "Event chat with attendee messages",
    profile: "Profile with photos from attended events",
    organizerCreate: "Create event: cover and basics",
    organizerPublished: "Event published with share poster",
    organizerInfo: "Organizer event page",
    organizer: "Organizer dashboard: applications and door",
    organizerChat: "Organizer event chat",
  },
  carousel: { previous: "Previous screen", next: "Next screen" },
  hero: {
    srOnly: "Nearby people and events, all in one app.",
    before: "Nearby",
    wordSuffix: ",",
    after: "all in one app.",
    words: [
      "people",
      "events",
      "runs",
      "concerts",
      "dinners",
      "workshops",
      "hikes",
      "stand-ups",
      "exhibitions",
      "picnics",
      "communities",
    ],
    lead: "Concerts, workshops, runs, stand-up in Istanbul… Flok brings scattered small meetups into one place. Apply, join the chat and get in at the door with a QR code.",
    leadHighlight: "Istanbul",
    stageLabel: "Flok app screens",
    scrollCue: "Scroll down",
    storeBadges: [
      { src: "/images/badges/app-store-en.svg", alt: "Download on the App Store", width: 119.66, height: 40 },
      { src: "/images/badges/google-play-en.png", alt: "Get it on Google Play", width: 134.29, height: 40 },
    ],
  },
  story: {
    id: ids.story,
    eyebrow: "How it works",
    title: ["From sign-up to meetup,", "Flok in eight steps."],
    regionLabel: "Flok screens, scroll horizontally",
    steps: [
      {
        label: "Sign in",
        title: "Sign up in seconds, start exploring.",
        body: "Open an account with Apple, Google or email. Pick your interests and nearby meetups are ready for you.",
        screen: "welcome",
      },
      {
        label: "Discover",
        title: "Find events easily.",
        body: "Featured picks, recommendations and upcoming events in one feed. See how many people are going and spots left.",
        screen: "discover",
      },
      {
        label: "Map",
        title: "Browse the map view.",
        body: "See which meetups are within walking distance. Tap a pin and the event card slides up.",
        screen: "map",
      },
      {
        label: "Join",
        title: "Join with one tap.",
        body: "Time, place, rules and attendees on one screen. Tap Join at the top to apply; your ticket is ready once you're approved.",
        screen: "detail",
      },
      {
        label: "Get in",
        title: "Your ticket's in your pocket, check-in takes seconds.",
        body: "Once you're approved, your QR ticket is ready in the app. Show it at the door, the organizer scans it, you're in.",
        screen: "qr",
      },
      {
        label: "My Events",
        title: "All your plans in one list.",
        body: "Your next event sits at the top, with your ticket, chat and directions one tap away.",
        screen: "myEvents",
      },
      {
        label: "Chat",
        title: "Talk to everyone in one place.",
        body: "Every event has its own chat. Organizers post announcements; attendees figure out where to meet.",
        screen: "chat",
      },
      {
        label: "Profile",
        title: "Meetups live on your profile.",
        body: "Photos from events you've joined, your karma score and history — so people recognize you before you arrive.",
        screen: "profile",
      },
    ],
  },
  organizers: {
    id: ids.organizers,
    eyebrow: "Your own event",
    title: ["Flok for organizers."],
    regionLabel: "Organizer screens, scroll horizontally",
    steps: [
      {
        label: "Create",
        title: "Launch your event in minutes.",
        body: "Cover, category, date, capacity and rules. Go step by step, then publish with a single tap.",
        screen: "organizerCreate",
      },
      {
        label: "Publish",
        title: "Live and ready to share.",
        body: "Your event shows up for people nearby. Share the ready-made poster and watch the first applications come in.",
        screen: "organizerPublished",
      },
      {
        label: "Event page",
        title: "Your event page is your storefront.",
        body: "Location, schedule, rules and attendees on one page. Everything your guests need to know, in one place.",
        screen: "organizerInfo",
      },
      {
        label: "Manage",
        title: "Approve applications, run the door.",
        body: "You decide who comes; the waitlist runs itself. Scan QR codes at the door and watch capacity live.",
        screen: "organizer",
      },
      {
        label: "Announce",
        title: "Reach every attendee with one message.",
        body: "Post announcements in the event chat and answer questions. Everyone arrives with the same information.",
        screen: "organizerChat",
      },
    ],
  },
  trust: {
    id: ids.trust,
    eyebrow: "Trust",
    title: "Meet new people with peace of mind.",
    description:
      "Behind every meetup on Flok are approved applications, a visible trust score and a profile you control.",
    points: [
      {
        icon: "shieldCheck",
        title: "Organizers decide who comes.",
        body: "For events that require approval, the organizer approves attendees. When a spot opens up, the waitlist moves on its own.",
      },
      {
        icon: "sparkles",
        title: "Karma makes trust visible.",
        body: "Every approved application, every check-in and every shared photo grows your score. You know who you're meeting before you go.",
      },
      {
        icon: "flag",
        title: "Report, block, relax.",
        body: "Report an inappropriate event or user with one tap and block anyone you don't want to see. Every report is reviewed.",
      },
      {
        icon: "eyeOff",
        title: "Your profile, your rules.",
        body: "You choose who can see your profile. Hide photos you're tagged in from your profile whenever you want.",
      },
    ],
  },
  categories: {
    id: ids.categories,
    eyebrow: "Something for everyone",
    title: "What are you up to tonight?",
    description:
      "From concerts to workshops, from runs to stand-up. Flok connects you with the things you love and the people who love them too.",
    listLabel: "Event categories",
    perks: [
      { icon: "heart", title: "Recommendations based on your interests", body: "The categories you pick shape your feed." },
      { icon: "bell", title: "Get notified when something opens nearby", body: "Turn on notifications and never miss what's around you." },
    ],
    items: [
      { icon: "music", label: "Music" },
      { icon: "palette", label: "Art" },
      { icon: "dumbbell", label: "Sports" },
      { icon: "utensils", label: "Food" },
      { icon: "users", label: "Social" },
      { icon: "briefcase", label: "Networking" },
      { icon: "cpu", label: "Tech" },
      { icon: "drama", label: "Comedy" },
      { icon: "plane", label: "Travel" },
      { icon: "trees", label: "Outdoors" },
      { icon: "clapperboard", label: "Film" },
    ],
  },
  eventDay: {
    id: ids.eventDay,
    eyebrow: "The story of a meetup",
    title: "From application to memory, in one app.",
    description: "From the moment you discover an event to the day its photos land on your profile, it all happens on Flok.",
    moments: [
      {
        time: "Tue 14:20",
        icon: "search",
        title: "You found it and applied.",
        body: "An acoustic night in Kadıköy caught your eye. You applied with one tap.",
      },
      {
        time: "Tue 18:05",
        icon: "badgeCheck",
        title: "You're approved.",
        body: "The organizer approved your application and your QR ticket is ready in the app.",
      },
      {
        time: "Fri 17:30",
        icon: "messageCircle",
        title: "You met in the chat.",
        body: "The meeting point was announced. Weather and directions are one tap away.",
      },
      { time: "Fri 20:00", icon: "qrCode", title: "Seconds at the door.", body: "Your QR ticket was scanned and you're in." },
      {
        time: "Saturday",
        icon: "camera",
        title: "The night lives on your profile.",
        body: "Photos were shared and your karma score grew.",
      },
    ],
  },
  memories: {
    id: ids.memories,
    eyebrow: "This week in the city",
    title: "A new meetup every week.",
    description: "Acoustic nights, morning runs, ceramics workshops, long dinners. Each one started with someone's idea.",
  },
  faq: {
    id: ids.faq,
    eyebrow: "FAQ",
    title: "No questions left unanswered.",
    prompt: "Can't find what you're looking\u00a0for?",
    items: [
      {
        question: "When is Flok launching?",
        answer: "We're putting on the finishing touches. Join the waitlist and you'll be the first to know when Flok hits the App Store.",
      },
      {
        question: "Will Flok be on Android?",
        answer: "Yes. Flok is coming to both iPhone and Android. We'll let everyone on the waitlist know when it's on Google Play.",
      },
      {
        question: "Does Flok cost anything?",
        answer: "No. Downloading Flok, discovering events, applying and creating events are all free.",
      },
      {
        question: "Will there be paid events?",
        answer:
          "Yes. Some events may be paid; the price is clearly shown on the event page, and for now tickets are bought on the organizer's own page. In the future, anyone will be able to create paid events on Flok and sell tickets right in the app.",
      },
      {
        question: "How do I join an event?",
        answer:
          "Apply from the event page. For open events your spot is reserved right away; for events that require approval, the organizer approves you. Once approved, your QR ticket is ready in the app and you join the event chat.",
      },
      {
        question: "What if an event is full?",
        answer:
          "If the organizer has enabled a waitlist, you can join it. When a spot opens up, the line moves on its own and we let you know.",
      },
      {
        question: "Who organizes events? Is it safe?",
        answer:
          "Events are organized by Flok users. For events that require approval, the organizer decides who attends, and karma scores, reporting and blocking keep the community safe.",
      },
      {
        question: "What is a karma score?",
        answer:
          "A score that shows how reliable you are on Flok. It grows with every approved application, every check-in and every shared photo, so you can see who you're meeting ahead of time.",
      },
      {
        question: "Who can see my profile?",
        answer:
          "You decide. If you make your profile private, only people you approve can see it. You can also hide photos you're tagged in from your profile at any time.",
      },
      {
        question: "What do I need to become an organizer?",
        answer:
          "Just a Flok account. Create and publish your event step by step, then manage applications, the chat and check-in from the app.",
      },
      {
        question: "Who checks attendees at the door?",
        answer:
          "The event's organizer. Organizers must verify attendees at the entrance themselves, using the QR tickets and verification tools in the app. Flok does not provide staff, stewards or security for events; it only provides the platform to create and manage them.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes. You can delete your account from your profile settings at any time; your profile and personal information are permanently removed.",
      },
    ],
  },
  preRegister: {
    id: ids.preRegister,
    title: "Be among the first attendees and organizers.",
    body: "Leave your email and be the first to know when Flok hits the App Store.",
  },
  waitlist: {
    placeholder: "Your email address",
    submit: "Join the waitlist",
    submitting: "Joining…",
    consentBefore: "By joining, you confirm you've read our ",
    consentLink: "Privacy Policy",
    consentAfter: ".",
    joined: "You're on the list! We'll email you first when we launch.",
    alreadyJoined: "You're already on the list, thanks!",
    errors: {
      invalid: "Please enter a valid email address.",
      config: "Sign-ups are closed right now. Please try again shortly.",
      network: "Something went wrong. Check your connection and try again.",
    },
  },
  consent: {
    title: "Your cookie choice",
    bodyBefore:
      "We use analytics cookies to improve the site. If you decline, no analytics data is collected. Details in our ",
    link: "Privacy Policy",
    bodyAfter: ".",
    accept: "Accept",
    decline: "Decline",
  },
  legal: {
    updatedLabel: "Last updated:",
    titles: { privacy: "Privacy Policy", terms: "Terms of Use", support: "Support" },
    descriptions: {
      privacy: "What data Flok collects, how it's used and your rights.",
      terms: "The terms for using the Flok app, subscriptions and account deletion.",
      support: "Frequently asked questions about Flok and how to reach us.",
    },
  },
};
