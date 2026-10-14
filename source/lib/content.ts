const photo = (name: string) => `/images/strip/${name}.webp`;

export const memoryRows = [
  ["acoustic", "friends", "yoga", "hike", "ceramics", "food"].map(photo),
  ["concert", "bike", "dinner", "dj", "run", "festival"].map(photo),
];
